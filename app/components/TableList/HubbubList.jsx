/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - sep-2019
 */
import React, { Component, Profiler } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid, Hidden, withStyles, withWidth } from "@material-ui/core";
import {
  ConfigurableActionsCell,
  ConfigurableList,
  ConfigurableListColumn,
  RowPlaceholder,
  TableListColumnHead,
  TableListRow,
  TableListBarCell,
  BarCell,
  SpacerCell,
  SelectionBar,
  RowMenu,
  withHover
} from "components";
import {
  leftMiddleShadow as LeftShadowCell,
  rightMiddleShadow as RightShadowCell
} from "utils/shadows";
import { hubbubTrack } from "utils/profiler";
import { styleSheet } from "jss/components/TableList/TableList";

class HubbubList extends Component {
  static propTypes = {
    // see VirtualizedList PropTypes comments for better understanding
    data: PropTypes.array.isRequired,
    dataCount: PropTypes.number.isRequired,
    offset: PropTypes.number,
    threshold: PropTypes.number,
    windowSize: PropTypes.number,
    schema: PropTypes.array.isRequired,
    getKeyFn: PropTypes.func.isRequired,
    getActionPermission: PropTypes.func,
    getRowMenu: PropTypes.func,
    bulkActions: PropTypes.array,
    headless: PropTypes.bool,
    handleRowClick: PropTypes.func,
    headerVariation: PropTypes.string,
    sortGroupFn: PropTypes.func,
    isLoading: PropTypes.bool,

    t: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    rowMenu: {
      isOpen: false,
      anchorElement: null,
      row: null
    },
    selected: [],
    isSelectionInverted: false
  };

  holdInterval = null;
  isSelectionMode = false;
  hasUpdated = false;
  justActivatedSelectionMode = false;
  longPressRow = null;

  isWindowed = false;

  isMobileLayout = () => !!~["xs", "sm"].indexOf(this.props.width);

  startPressing = row => event => {
    event.stopPropagation();
    if (this.holdInterval === null && !this.isSelectionMode) {
      this.longPressRow = row;
      this.holdInterval = setInterval(this.longPress, 1000);
    }
  };

  clearHoldInterval = () => {
    if (this.holdInterval !== null) {
      clearInterval(this.holdInterval);
      this.holdInterval = null;
    }
  };

  componentWillUnmount = () => this.clearHoldInterval();

  longPress = () => {
    this.justActivatedSelectionMode = true;
    this.clearHoldInterval();
    this.toggleRow(this.longPressRow);
    this.longPressRow = null;
    this.forceUpdate();
  };

  turnSelectionModeOn = () => (this.isSelectionMode = true);

  turnSelectionModeOff = () => {
    if (this.isSelectionMode) {
      this.justActivatedSelectionMode = false;
      this.isSelectionMode = false;
    }
  };

  rowClick = row => event => {
    event.stopPropagation();
    if (this.isSelectionMode) {
      if (this.justActivatedSelectionMode) {
        this.justActivatedSelectionMode = false;
      } else if (!!this.props.bulkActions) this.toggleRow(row);
    } else if (!!this.props.handleRowClick) this.props.handleRowClick(row);
    else if (!!this.props.bulkActions) this.toggleRow(row);
  };

  componentDidUpdate = () => (this.hasUpdated = false);

  ConfigurableListRow = withHover(({ row, cells, args, hides, displays, index, hover }) => {
    const hasBulkActions = !!this.props.bulkActions;
    const hasRowClickAction = !!this.props.handleRowClick;
    const { isHover, ...hoverHandlers } = hover;
    const isSelected = this.isSelected(row);
    const isMobileLayout = this.isMobileLayout();

    const { offset, threshold, windowSize } = this.props;
    const handleMoreClick = this.props.getRowMenu ? this.handleMoreClick : undefined;

    return this.isWindowed &&
      (index < offset - threshold || index > offset + windowSize + threshold) ? (
      <Profiler id="VirtualizedList_RowPlaceholder" onRender={hubbubTrack}>
        <RowPlaceholder
          isMobileLayout={isMobileLayout}
          span={cells.length}
          hideCount={this.hideCount}
        />
      </Profiler>
    ) : (
      <Profiler id="VirtualizedList_RenderedRow" onRender={hubbubTrack}>
        <TableListRow
          onTouchStart={hasBulkActions ? this.startPressing(row) : undefined}
          onTouchEnd={hasBulkActions ? this.clearHoldInterval : undefined}
          onTouchMove={hasBulkActions ? this.clearHoldInterval : undefined}
          onClick={this.rowClick(row)}
          isSelected={
            (hasBulkActions || hasRowClickAction) && (isSelected || (!isMobileLayout && isHover))
          }
          {...hoverHandlers}
        >
          {cells.map((Cell, i) => {
            const commonProps = {
              key: i,
              rowData: row,
              args: args[i],
              hidden: hides[i],
              isSelected,
              isHover,
              isSelectionMode: this.isSelectionMode,
              isMobileLayout
            };
            switch (displays[i]) {
              case "actions":
                return (
                  <Cell
                    getActionPermission={this.props.getActionPermission}
                    handleMoreClick={handleMoreClick}
                    {...commonProps}
                  />
                );
              case "flex":
                return (
                  <Cell
                    display={displays[i]}
                    handleToggle={hasBulkActions ? this.toggleRow : undefined}
                    {...commonProps}
                  />
                );
              default:
                // expects display prop as column width size, ex: "150px"
                return (
                  <Cell
                    fixedWidth={{ width: `${displays[i]}` }}
                    display={displays[i]}
                    handleToggle={hasBulkActions ? this.toggleRow : undefined}
                    {...commonProps}
                  />
                );
            }
          })}
        </TableListRow>
      </Profiler>
    );
  });

  isSelected = row =>
    this.state.isSelectionInverted
      ? this.state.selected.indexOf(row) === -1
      : this.state.selected.indexOf(row) !== -1;

  areAllSelected = () =>
    this.state.isSelectionInverted
      ? this.state.selected.length === 0
      : this.state.selected.length === this.props.dataCount;

  toggleAll = () => {
    this.hasUpdated = true;
    const isSelectionInverted = !this.areAllSelected();
    isSelectionInverted ? this.turnSelectionModeOn() : this.turnSelectionModeOff();
    this.setState({ selected: [], isSelectionInverted });
  };

  unselectAll = () => {
    this.hasUpdated = true;
    this.turnSelectionModeOff();
    this.setState({ selected: [], isSelectionInverted: false });
  };

  toggleRow = row => {
    if (!this.hasUpdated) {
      this.hasUpdated = true;
      if (
        this.state.isSelectionInverted &&
        this.props.dataCount - this.state.selected.length === 0
      ) {
        this.unselectAll();
      } else {
        const selected = !this.state.isSelectionInverted
          ? this.isSelected(row)
            ? this.state.selected.filter(r => r !== row)
            : [row, ...this.state.selected]
          : this.isSelected(row)
          ? [row, ...this.state.selected]
          : this.state.selected.filter(r => r !== row);
        this.state.isSelectionInverted || selected.length !== 0
          ? this.turnSelectionModeOn()
          : this.turnSelectionModeOff();
        this.setState({ selected });
      }
    }
  };

  handleMoreClick = row => event => {
    event.stopPropagation();
    this.showRowMenu(row, event.target);
  };

  showRowMenu = (row, anchorElement) =>
    this.setState({ rowMenu: { isOpen: true, anchorElement, row } });

  hideRowMenu = () => this.setState({ rowMenu: { isOpen: false, anchorElement: null, row: null } });

  processedSchema = [{ display: "leftShadow" }, ...this.props.schema, { display: "rightShadow" }];
  hideCount = this.processedSchema.filter(s => s.hidden).length;

  render = () => {
    const {
      data,
      dataCount,
      getRowMenu,
      bulkActions,
      headless,
      getKeyFn,
      sortGroupFn,
      isLoading,
      headerVariation,

      classes,
      t
    } = this.props;

    const { selected, isSelectionInverted, rowMenu } = this.state;

    this.isWindowed =
      this.props.offset &&
      this.props.threshold &&
      this.props.windowSize &&
      data.length > this.props.threshold * 2 + this.props.windowSize;

    return (
      <>
        <div className={this.props.className}>
          {data.length ? (
            <ConfigurableList
              rows={data}
              Row={this.ConfigurableListRow}
              headless={headless}
              getKeyFn={getKeyFn}
              sortGroupFn={sortGroupFn}
              headerVariation={headerVariation}
              span={this.processedSchema.length}
              hideCount={this.hideCount}
            >
              {this.processedSchema.map((column, i) => {
                let headJSX, render;

                switch (column.display) {
                  case "spacer":
                    headJSX = <TableListColumnHead headerVariation={headerVariation} />;
                    render = SpacerCell;
                    break;
                  case "hoverBar":
                    headJSX = <TableListBarCell />;
                    render = BarCell;
                    break;
                  case "leftShadow":
                    headJSX = <LeftShadowCell />;
                    render = LeftShadowCell;
                    break;
                  case "rightShadow":
                    headJSX = <RightShadowCell />;
                    render = RightShadowCell;
                    break;
                  case "actions":
                    headJSX = <TableListColumnHead headerVariation={headerVariation} />;
                    render = ConfigurableActionsCell;
                    break;
                  default:
                    headJSX = (
                      <TableListColumnHead headerVariation={headerVariation}>
                        {t(column.heading)}
                      </TableListColumnHead>
                    );
                    render = column.render;
                }

                if (column.hidden) headJSX = <Hidden smDown>{headJSX}</Hidden>;

                return (
                  <ConfigurableListColumn
                    key={i}
                    head={headJSX}
                    Cell={render}
                    args={column.args}
                    hidden={column.hidden}
                    display={column.display}
                    width={column.ctWidth}
                  />
                );
              })}
            </ConfigurableList>
          ) : null}
          {isLoading ? (
            <Grid className={classes.progress} container justify="center">
              <CircularProgress />
            </Grid>
          ) : null}
        </div>

        {rowMenu.isOpen ? (
          <RowMenu
            menu={getRowMenu(rowMenu.row)}
            onClose={this.hideRowMenu}
            rowMenu={this.state.rowMenu}
            t={t}
          />
        ) : null}

        {selected.length > 0 || isSelectionInverted ? (
          <SelectionBar
            bulkActions={bulkActions}
            selected={selected}
            dataCount={dataCount}
            isSelectionInverted={isSelectionInverted}
            areAllSelected={this.areAllSelected()}
            toggle={this.toggleAll}
            unselect={this.unselectAll}
            t={t}
          />
        ) : null}
      </>
    );
  };
}

export default withWidth()(withStyles(styleSheet, { name: "HubbubList" })(HubbubList));
