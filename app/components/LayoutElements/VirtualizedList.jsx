/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], mar-2019 - sep-2019
 */
import React, { Component, Profiler } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { EmptyOptionsHandler, HubbubList, InfiniteScroll } from "components";
import { AddButton } from "components/Elements";
import { hubbubTrack } from "utils/profiler";
import { styleSheet } from "jss/LayoutElements/VirtualizedList";

class VirtualizedList extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool, // empty state cannot be inferred from dataCount, as it depends on query/filtering results

    data: PropTypes.array.isRequired, // array of rows loaded so far... (ListResponse type from backend, being paginated)
    dataCount: PropTypes.number.isRequired, // hits cannot be inferred from data.length as total query/filtering results are lazily loaded

    // about getKeyFn: it is a UI identifier extractor/generator (we can't use row index on data), as this might change with filters applied
    // in most cases we can just use entity id (row => row.id), but field can vary on naming or might not even exist, generic solution is a function
    // this feature was introduced to speed up render when quickly filtering and unfiltering the list (which is done server side).
    getKeyFn: PropTypes.func.isRequired, // (row: Object, index: Number) => String

    emptyMessageKeys: PropTypes.shape({
      startCreatingTitle: PropTypes.string, // used on default empty page (dataCount === 0 && isEmpty === true)
      startCreatingMsg: PropTypes.string, //  used on default empty page (dataCount === 0 && isEmpty === true)
      noHitsTitle: PropTypes.string, //  used on default no results page (dataCount === 0 && isEmpty === false)
      noHitsMsg: PropTypes.string // used on default no results (dataCount === 0 && isEmpty === false)
    }),

    schema: PropTypes.arrayOf(
      PropTypes.shape({
        display: PropTypes.string.isRequired, // "hoverBar" | "flex" | "{size}px" | "spacer" | "actions"
        heading: PropTypes.string, // column header text key to be translated with t
        args: PropTypes.array, // used by CellType to extract data from row (name of properties of a row, mapped to a cell) | actions
        render: PropTypes.func, // a CellType to be rendered, inferred for "hoverBar" | "spacer" | "actions" type
        hidden: PropTypes.bool // should hide this column when on mobile mode? (defaults to false)
      })
    ).isRequired,

    // DISPLAY TYPES:

    // display: "hoverBar" -> sets a hoverBar placeholder (no other parameters needed)

    // display: "flex" -> content with adaptable width (all other parameters are required)

    // display: "{size}px" -> content with fixed width (all other parameters are required)
    // expects display prop as column width size, ex: "150px"
    // NOTE: you might want to avoid using fixed size, and let all columns be "flex", but there is a chance
    // you might need to use fixed size at one column to resolve an eventual ui/design issue...

    // display: "spacer" -> sets a adaptable space placeholder (no other parameters needed, except hidden)

    // display: "actions" -> expects hidden + "args" in the form of:
    // args: PropTypes.shape({
    //     label: PropTypes.string.isRequired, // action label used with getActionPermission | "menu" | "favorite" (reserved words)
    //     icon: PropTypes.string, // action material-ui icon name
    //     action: PropTypes.func, // action function
    //     isFavorite: PropTypes.func,
    //   })

    // NOTE 1: when display is "actions", for each argument in "args", the render only happens if getActionPermission returns true
    // NOTE 2: if label of an argument in "args" is "menu", it will render a "more_horiz" icon and action will trigger menu
    // as a pop over with items returned from getRowMenu function (works as placeholder, don't need to provide icon and action)
    // NOTE 3: if label of an argument in "args" is "favorite", you need to supply isFavorite function as well
    // see: ConfigurableActionsCell implementation for better understanding

    getActionPermission: PropTypes.func, // (row: Object, action: String) => Boolean

    // about menu and bulkActions: we have two different menus, as they work very differently under the hood, and not all menu options will
    // be available on both (single items).
    // menu -> items should expect (row: object) for onClick function

    // getRowMenu (row: Object) => menu: Array - available actions should be evaluated on a per row basis
    getRowMenu: PropTypes.func, // should return array of following structure:
    // menu: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     label: PropTypes.string, // menu option name to be translated with t
    //     icon: PropTypes.string, // menu option material-ui icon name
    //     onClick: PropTypes.func, // menu item function
    //     renderFn: PropTypes.func // alternative item render fn that gets (key, row) as argument (used for extended behaviour)
    //   })
    // ),

    // bulkActions -> should expect (items: array, inverted: bool, clearSelection: function) => undefined for onClick function
    // inverted means, that maybe not all items are loaded, but all are selected, except for those provided as items (that were unchecked)

    bulkActions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string, // bulk menu option name to be translated with t (optional)
        icon: PropTypes.string, // bulk menu option material-ui icon name
        onClick: PropTypes.func // bulk menu item function
      })
    ),

    headless: PropTypes.bool, // hides the column headings if true

    // handleRowClick (row: Object) => undefined
    handleRowClick: PropTypes.func, // on click is called with row data, most common approach is open QuickView, but could be navigation

    // handleAddClick () => undefined - it's just a callback, you should use to set navigation action to create page
    handleAddClick: PropTypes.func, // if defined will add the add the default create button to list.

    // about sortGroupFn: the list might be split in multiple groups (eg. favorites and other), but columns must be aligned
    // not always this information will be inside data, so we use a function to take that decision
    // should return the string name (already translated) of the group (also displayed on top of each section)
    sortGroupFn: PropTypes.func,

    onScrollPositionChange: PropTypes.func.isRequired, // needed for recovering list position when navigating back to list
    onScrollPositionSetter: PropTypes.func.isRequired, // needed for recovering list position when navigating back to list
    isLoading: PropTypes.bool, // displays loader if true
    loadMore: PropTypes.func, // api call to get more data if data.length < data.Count for InfiniteScroll onScrolledToEnd

    t: PropTypes.func.isRequired, // i18n translate function to be provided from parent

    children: PropTypes.any, // all other to be rendered no matter what, like dialogs

    classes: PropTypes.object.isRequired
  };

  // considering a row of 65px height, we can fit as much as 33 lines on a 4K screen
  windowSize = 32;

  // threshold defines how many rows we preload before and/or after windowSize,
  // and based on half of this amount we test if we should update/re-render list.
  threshold = 16;

  // we will keep {windowSize + 2x threshold} rows rendered at once.
  // e.g. with windowSize = 32 and threshold = 16 this means 64 rows (total).

  offset = 0;
  lastOffset = undefined;
  isMoving = false;
  timer = null;

  checkMovement = offset => () => {
    const halfThreshold = this.threshold / 2;

    if (offset === this.offset) {
      this.isMoving = false;

      if (offset > this.lastOffset + halfThreshold || offset < this.lastOffset - halfThreshold) {
        this.forceUpdate();
      }
    } else {
      setTimeout(this.checkMovement(this.offset), 200);
    }
  };

  onScrollPositionChange = scrollPosition => {
    // RowPlaceholder and a real Row must both match 65px height
    this.offset = Math.floor(scrollPosition / 65);

    if (!this.isMoving) {
      setTimeout(this.checkMovement(this.offset), 200);
      this.isMoving = true;
    }

    this.props.onScrollPositionChange(scrollPosition);
  };

  // when scroll to end of list, if has more items to load, ask api to load more
  loadMore = () =>
    !this.props.isLoading && this.props.data.length < this.props.dataCount && this.props.loadMore();

  preLoad = () => {
    clearTimeout(this.timer);
    this.timer = null;
    this.props.loadMore();
  };

  componentWillUnmount = () => clearTimeout(this.timer);

  renderList = () => {
    const {
      data,
      dataCount,
      schema,
      getKeyFn,
      getActionPermission,
      getRowMenu,
      bulkActions,
      headless,
      handleRowClick,
      sortGroupFn,
      onScrollPositionSetter,
      isLoading,
      t,
      classes,
      children
    } = this.props;

    this.lastOffset = this.offset;

    // we will try to pre-load at least 40 rows before only lazy loading with scroll
    // this amount of rows should fill even a 4K screen.
    if (!isLoading && data.length < dataCount && data.length < 40)
      if (!this.timer) this.timer = setTimeout(this.preLoad, 200);

    return (
      <Profiler id="VirtualizedList" onRender={hubbubTrack}>
        <InfiniteScroll
          onScrollPositionChange={this.onScrollPositionChange}
          onScrollPositionSetter={onScrollPositionSetter}
          onScrolledToEnd={this.loadMore} // this.loadMore adds check against dataCount
        >
          <div className={classes.pageContent}>
            <HubbubList
              className={clsx(classes.list, !sortGroupFn ? classes.noSortGroupFn : "")}
              data={data}
              dataCount={dataCount}
              offset={this.offset}
              threshold={this.threshold}
              windowSize={this.windowSize}
              schema={schema}
              getKeyFn={getKeyFn}
              getActionPermission={getActionPermission}
              getRowMenu={getRowMenu}
              bulkActions={bulkActions}
              headless={headless}
              handleRowClick={handleRowClick}
              sortGroupFn={sortGroupFn}
              isLoading={isLoading}
              t={t}
            />
          </div>

          {this.props.handleAddClick ? (
            <AddButton
              className={this.props.classes.addButton}
              onClick={this.props.handleAddClick}
            />
          ) : null}

          {children}
        </InfiniteScroll>
      </Profiler>
    );
  };

  render = () => (
    <EmptyOptionsHandler
      isLoading={this.props.isLoading}
      hasHits={this.props.dataCount > 0}
      isEmpty={this.props.isEmpty}
      List={this.renderList}
      handleAddClick={this.props.handleAddClick}
      //handleClearFilters={this.props.handleClearFilters}
      emptyMessageKeys={this.props.emptyMessageKeys}
      t={this.props.t}
    >
      {this.props.children}
    </EmptyOptionsHandler>
  );
}

export default withStyles(styleSheet, { name: "VirtualizedList" })(VirtualizedList);
