/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - oct-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Icon,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Grid,
  Paper,
  Popover,
  Typography,
  withStyles
} from "@material-ui/core";
import { ChipFacedePicker, TextField, InfiniteScroll, ListAvatar, Text } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/LayoutElements/SearchableChipSelector";
import { DiodeSearchable, PromiseSearchable, PROMISE, DIODE } from "utils/commonShapes";

class SearchableChipSelector extends Component {
  static propTypes = {
    // usually searchable content comes and is updated from the back-end only
    searchable: PropTypes.oneOfType([DiodeSearchable, PromiseSearchable]).isRequired, // see commonShapes file for better understanding
    apiMode: PropTypes.oneOf([DIODE, PROMISE]).isRequired, // mode of the api call and see commonShapes file for better understanding
    label: PropTypes.string, // just text label printer over component
    name: PropTypes.string, // used for constructing synthetic event
    value: PropTypes.any, // null | object for oneValue | array of selected items of items
    oneValue: PropTypes.bool, // if set, makes selector allow only one value as object
    onChange: PropTypes.func.isRequired, // callback with a synthetic event when value is updated
    emptyLabel: PropTypes.string, // alternative text displayed when value is empty array
    savedIds: PropTypes.array, //Saved selected ids

    renderItemFn: PropTypes.func, // custom render, takes (key, item, handleSelect) as prop to render item
    addOption: PropTypes.shape({
      // content of a special item, will display before all other items to be listed
      name: PropTypes.string // text displayed when item is selected inside the chip
      // you can add whatever other props you want, that your AddOptionItem can use
    }),
    AddOptionItem: PropTypes.func, // renders special item, before other options with content of addOption

    className: PropTypes.string, // gets passed down to ChipFacedePicker and Popover
    topLevelOnlyClassName: PropTypes.string, // gets passed only to the ChipFacedePicker

    error: PropTypes.bool,
    helperText: PropTypes.string,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = { name: "SearchableChipSelector", apiMode: DIODE };

  anchorEl = null;

  state = {
    query: "",
    previousQuery: "",
    open: false,
    initial: true // for trying to get items with empty query on first open
  };

  // config set interval before calling search on api
  msWaitBeforeSearch = 300;

  timer = null;

  clearTimer = () => {
    this.timer ? clearTimeout(this.timer) : null;
    this.timer = null;
  };

  componentWillUnmount = () => this.clearTimer();
  componentDidMount = () => {
    const { searchable, savedIds, apiMode, value, t } = this.props;
    savedIds &&
      savedIds.length &&
      (!value || !value.length) &&
      (apiMode === PROMISE
        ? searchable.getSelectedItems(savedIds).then(searchableData => {
            this.changeValue(searchableData.data);
          })
        : apiMode === DIODE
        ? searchable.getSelectedItems(savedIds).then(searchableData => {
            this.changeValue(searchableData.data, true);
          })
        : null);
  };

  /**
   * Search list by search query using an API.
   * This function will search list based on apiMode.
   * If the API mode is `diode`, it means it must call an API through diode.
   * If the API mode is `api`, it means it must call an API directly.
   * @param searchQuery
   */
  handleServerSideSearch = searchQuery => {
    const { apiMode } = this.props;
    apiMode === PROMISE
      ? this.props.searchable.search(searchQuery).then(searchableData => {
          this.setState({ searchableData: { ...searchableData, isLoading: false } });
        })
      : apiMode === DIODE
      ? this.props.searchable.search(searchQuery)
      : null;
  };

  handleOpenSelector = event => {
    this.anchorEl = event.currentTarget;
    if (this.state.initial) /*this.props.searchable.search("");*/ this.handleServerSideSearch("");
    this.setState({ open: !this.state.open, initial: false });
  };

  handleCloseSelector = () => this.setState({ open: false });

  changeValue = (value, preventUpdate) => {
    this.props.onChange({ target: { name: this.props.name, value }, preventUpdate });
    this.handleCloseSelector();
  };

  addChip = chip => () =>
    this.props.oneValue
      ? this.changeValue(chip)
      : Array.isArray(this.props.value)
      ? this.props.value.find(v => v.id === chip.id)
        ? this.handleCloseSelector()
        : this.changeValue([...this.props.value, chip])
      : this.changeValue([chip]);

  delChip = chip => () => this.changeValue(this.props.value.filter(v => v !== chip));

  handleSearch = event => {
    const query = event.target.value;
    this.clearTimer();
    this.timer = setTimeout(this.requestSearchResults(query), this.msWaitBeforeSearch);
    this.setState({ query });
  };

  requestSearchResults = query => () =>
    query !== this.state.previousQuery &&
    this.setState({ previousQuery: query }, () => this.handleServerSideSearch(query));

  // when scroll to end of list, if has more items to load, ask api to load more
  loadMore = searchable => () => {
    console.log("Loading more items...");
    const { apiMode } = this.props;
    if (apiMode === DIODE) {
      // load more items using diode
      !searchable.isLoading &&
        (searchable.hasMore || searchable.items.length < searchable.itemsCount) &&
        searchable.loadMore();
    } else if (apiMode === PROMISE) {
      // load more items appending from the promise returned by api call
      const { page, ordering, filter, data } = this.state.searchableData;
      if (page.perPage !== 0 && page.index + 1 * page.perPage <= page.totalRecords) {
        this.setState({ searchableData: { ...this.state.searchableData, isLoading: true } }, () => {
          searchable
            .loadMore(filter.toScala(), page.setIndex(page.index + 1).toScala(), ordering)
            .then(searchableData => {
              this.setState({
                searchableData: {
                  ...searchableData,
                  ...{ data: data.concat(searchableData.data) },
                  isLoading: false
                }
              });
            });
        });
      } else {
        console.log("No more items to load");
      }
    }
  };

  isLoading = () => {
    const { apiMode } = this.props;
    if (apiMode === DIODE) return this.props.searchable.isLoading;
    else if (apiMode === PROMISE)
      return this.state.searchableData ? this.state.searchableData.isLoading : true;
    else return true;
  };

  /**
   * If apiMode is `diode` then we should get data from searchable.
   * If apiMode is `promise` then we should get data from this.state.searchableData as API returns data stored in searchableData
   * @returns {*}
   */
  getItems = selectedItems => {
    let apiMode = this.props.apiMode;
    if (apiMode === DIODE) {
      const { items } = this.props.searchable;
      return items.filter(item => !selectedItems.find(s => s.id === item.id));
    } else if (apiMode === PROMISE) {
      return this.state.searchableData
        ? this.state.searchableData.data.filter(item => !selectedItems.find(s => s.id === item.id))
        : [];
    } else return [];
  };

  searchAdornment = (
    <InputAdornment position="start">
      <Icon className={this.props.classes.searchIcon}>search</Icon>
    </InputAdornment>
  );

  renderItem = (key, item, handleSelect) => (
    <MenuItem
      key={key}
      onClick={handleSelect(item)}
      className={this.props.classes.listItem}
      divider
    >
      <Grid container direction="row" alignItems="center" spacing={24} wrap="nowrap">
        <Grid item>
          <ListAvatar color={item.id} name={item.name} />
        </Grid>
        <Grid item>
          <Typography>{item.name}</Typography>
          <Typography variant="caption">{item.tags && item.tags.join(", ")}</Typography>
        </Grid>
      </Grid>
    </MenuItem>
  );

  render = () => {
    const {
      searchable,
      label,
      emptyLabel,
      renderItemFn,
      value,
      oneValue,
      addOption,
      AddOptionItem,
      className,
      topLevelOnlyClassName,
      error,
      helperText,
      classes,
      t
    } = this.props;

    const { query, open } = this.state;

    const selectedItems = oneValue ? (value ? [value] : []) : value;

    return (
      <>
        <ChipFacedePicker
          className={clsx(className, topLevelOnlyClassName)}
          label={label}
          textValue={emptyLabel || t("search")}
          onClick={this.handleOpenSelector}
          onDelete={oneValue ? undefined : this.delChip}
          selectedItems={selectedItems}
          icon="search"
          chipSecondaryColor={oneValue}
        />

        {error && (
          <Text variant="errorMessage">
            {helperText}
            <br />
          </Text>
        )}

        <Popover
          marginThreshold={0}
          open={open}
          anchorEl={this.anchorEl}
          anchorReference={"anchorEl"}
          onClose={this.handleCloseSelector}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          classes={{ paper: clsx(classes.popover, className) }}
        >
          <Paper className={classes.popoverPaper}>
            <TextField
              name="searchField"
              className={classes.searchField}
              label=""
              variant="outlined"
              placeholder={t("search")}
              type="search"
              InputProps={{ startAdornment: this.searchAdornment }}
              value={query}
              onChange={this.handleSearch}
              autoFocus
            />

            <InfiniteScroll onScrolledToEnd={this.loadMore(searchable)}>
              <div className={classes.listPanel}>
                {addOption && AddOptionItem && (
                  <AddOptionItem item={addOption} handleSelect={this.addChip} />
                )}

                {this.getItems(selectedItems).map((item, i) =>
                  // an item can be rendered with alternative function provided renderItemFn
                  // taking key, item object, and handleSelect as argument; if applicable use
                  // material-ui MenuItem as container, see default 'renderItem' as reference.
                  renderItemFn
                    ? renderItemFn(i, item, this.addChip)
                    : this.renderItem(i, item, this.addChip)
                )}
              </div>
            </InfiniteScroll>

            {this.isLoading() && <LinearProgress variant="query" />}
          </Paper>
        </Popover>
      </>
    );
  };
}

export default withStyles(styleSheet, { name: "SearchableChipSelector" })(
  translate("common")(SearchableChipSelector)
);
