/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: Noah Brown
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
  withStyles,
  FormControl,
  InputLabel,
  Select,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Checkbox
} from "@material-ui/core";
import { ChipFacedePicker, TextField, InfiniteScroll, ListAvatar } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/LayoutElements/SearchableNodeSelector";
import { DiodeSearchable, PromiseSearchable, PROMISE, DIODE } from "utils/commonShapes";
import { Row, Column, Box, Stretch, Text } from "components/LayoutElements";
import { PrimaryTextLink } from "components/Elements";

class SearchableNodeSelector extends Component {
  static propTypes = {
    // usually searchable content comes and is updated from the back-end only
    searchable: PropTypes.oneOfType([DiodeSearchable, PromiseSearchable]).isRequired, // see commonShapes file for better understanding
    filters: PropTypes.array,

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

  static defaultProps = { name: "SearchableNodeSelector", apiMode: DIODE };

  anchorEl = null;

  state = {
    query: "",
    previousQuery: "",
    open: false,
    initial: true, // for trying to get items with empty query on first open
    selectedItem: null,
    selectedFilters: [],
    showFilters: false,
    expandedIndex: 0
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
    savedIds && savedIds.length && apiMode === PROMISE && (!value || !value.length)
      ? searchable.getSelectedItems(savedIds).then(searchableData => {
          this.changeValue(searchableData.data);
        })
      : null;
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
      ? this.props.searchable.search({name: new RegExp(searchQuery, "i"), }).then(searchableData => {
          this.setState({ searchableData: { ...searchableData, isLoading: false } });
        })
      : apiMode === DIODE
      ? this.props.searchable.search(searchQuery)
      : null;
  };

  handleOpenSelector = event => {
    this.anchorEl = event.currentTarget;
    if (this.state.initial) {
      // this.props.searchable.search("");
      this.handleServerSideSearch("");
    }
    this.setState({ open: !this.state.open, initial: false });
  };

  handleCloseSelector = () => this.setState({ open: false });

  changeValue = selectedItem => {
    // this.props.onChange({ target: { name: this.props.name, value } });
    this.props.onChange({ target: { value: selectedItem } });
    this.handleCloseSelector();
  };

  handleSelectItem = item => () => this.changeValue(item);

  handleSearch = event => {
    const query = event.target.value;
    this.clearTimer();
    this.timer = setTimeout(this.requestSearchResults(query), this.msWaitBeforeSearch);
    this.setState({ query });
  };

  requestSearchResults = query => () =>
    query !== this.state.previousQuery &&
    this.setState({ previousQuery: query }, () =>
      /*this.props.searchable.search(query)*/ this.handleServerSideSearch(query)
    );

  // when scroll to end of list, if has more items to load, ask api to load more
  loadMore = searchable => () => {
    console.log("Loading more items...");
    const { apiMode } = this.props;
    if (apiMode === DIODE) {
      // load more items using diode
      !searchable.isLoading &&
        searchable.items.length < searchable.itemsCount &&
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

  dropdownAdornment = (
    <InputAdornment position="end">
      <Icon className={this.props.classes.inputAdornmentIcon}>
        {this.props.icon ? this.props.icon : "arrow_drop_down"}
      </Icon>
    </InputAdornment>
  );

  searchAdornment = (
    <InputAdornment position="end">
      <Icon className={this.props.classes.searchIcon}>search</Icon>
    </InputAdornment>
  );

  renderItem = (key, item, handleSelect) => (
    <MenuItem
      key={key}
      onClick={handleSelect(item)}
      className={this.props.classes.listItem}
      // divider
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

  handleToggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  handleClearSelectedFilters = () => {
    this.setState({ selectedFilters: [] });
  };

  handleExpandFilter = expandedIndex => () => {
    this.setState({ expandedIndex });
  };

  handleSetFilter = filter => event => {
    const { selectedFilters } = this.state;
    if (event.target.checked && selectedFilters.indexOf(filter) === -1) {
      selectedFilters.push(filter);
    } else if (!event.target.checked && selectedFilters.indexOf(filter) !== -1) {
      selectedFilters.splice(selectedFilters.indexOf(filter), 1);
    }

    this.setState({ selectedFilters });
  };

  renderFilter = (index, item, classes) => (
    <Row key={index} classes={{ box: classes.filterRow }} paddingLeft paddingRightHalf>
      <item.icon />
      <Text className={classes.filterText}>{item.name}</Text>
      <Stretch />
      <Checkbox
        checked={this.state.selectedFilters.indexOf(item) !== -1}
        onChange={this.handleSetFilter(item)}
        className={classes.filterCheckbox}
      />
    </Row>
  );

  renderFilterGroup = (index, item, expandedIndex, classes) => {
    const selectedCount = item.values.reduce(
      (a, b) => a + (this.state.selectedFilters.indexOf(b) !== -1),
      0
    );
    return (
      <ExpansionPanel
        key={index}
        expanded={expandedIndex === index}
        onChange={this.handleExpandFilter(index)}
        className={classes.expansionPanel}
      >
        <ExpansionPanelSummary
          className={classes.expansionPanelSummary}
          expandIcon={expandedIndex === index ? <Icon>remove</Icon> : <Icon>add</Icon>}
        >
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Text className={classes.heading}>
                {item.name} {selectedCount ? "(" + selectedCount + ")" : null}
              </Text>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <Column>{item.values.map((filter, i) => this.renderFilter(i, filter, classes))}</Column>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  render = () => {
    const {
      searchable,
      filters,
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

    const { query, open, selectedItem, showFilters, selectedFilters, expandedIndex } = this.state;

    const selectedItems = []; //oneValue ? (value ? [value] : []) : value;

    // const filteredItems = items.filter(item => !selectedItems.find(s => s.id === item.id));

    const totalFilters = selectedFilters.length;

    return (
      <>
        <TextField
          onClick={this.handleOpenSelector}
          label={label}
          value={selectedItem ? selectedItem.name : ""}
          className={clsx(className, topLevelOnlyClassName)}
          endAdornment={this.dropdownAdornment}
          classes={{ label: classes.label, input: classes.input }}
          readOnly
          fullWidth
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
            <Row paddingHalf paddingTop paddingBottomNone>
              <TextField
                name="searchField"
                className={classes.searchField}
                label=""
                placeholder={t("search")}
                type="search"
                InputProps={{ endAdornment: this.searchAdornment }}
                value={query}
                onChange={this.handleSearch}
                autoFocus
              />
            </Row>
            <Row paddingHalf>
              <PrimaryTextLink className={classes.textLink} onClick={this.handleToggleFilters}>
                {showFilters ? t("hideFilters") : t("showFilters")}
              </PrimaryTextLink>
              <Stretch />
              {totalFilters ? (
                <PrimaryTextLink
                  className={classes.textLink}
                  onClick={this.handleClearSelectedFilters}
                >
                  ({totalFilters}) {t("clearAll")}
                </PrimaryTextLink>
              ) : null}
            </Row>

            <Row borderHalf>
              <Column stretch>
                <InfiniteScroll
                  className={classes.listPanelWrapper}
                  onScrolledToEnd={this.loadMore(searchable)}
                >
                  <div className={classes.listPanel}>
                    {addOption && AddOptionItem && (
                      <AddOptionItem item={addOption} handleSelect={this.addChip} />
                    )}
                    {!showFilters
                      ? this.getItems(selectedItems).map((item, i) =>
                          this.renderItem(i, item, this.handleSelectItem)
                        )
                      : filters.map((item, i) =>
                          this.renderFilterGroup(i, item, expandedIndex, classes)
                        )}
                  </div>
                </InfiniteScroll>
              </Column>
            </Row>

            {this.isLoading() && <LinearProgress variant="query" />}
          </Paper>
        </Popover>
      </>
    );
  };
}

export default withStyles(styleSheet, { name: "SearchableNodeSelector" })(
  translate("servicedesigner", "common")(SearchableNodeSelector)
);
