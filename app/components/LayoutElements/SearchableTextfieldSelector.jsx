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
} from "@material-ui/core";
import { TextField, InfiniteScroll, ListAvatar } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/LayoutElements/SearchableTextfieldSelector";
import { DiodeSearchable } from "utils/commonShapes";
import { Row, Column } from "components/LayoutElements";

class SearchableTextfieldSelector extends Component {
  static propTypes = {
    // usually searchable content comes and is updated from the back-end only
    searchable: DiodeSearchable.isRequired, // see commonShapes file for better understanding
    filters: PropTypes.array,

    label: PropTypes.string, // just text label printer over component
    emptyLabel: PropTypes.string, // alternative text displayed when value is empty array

    className: PropTypes.string, // gets passed down to ChipFacedePicker and Popover
    topLevelOnlyClassName: PropTypes.string, // gets passed only to the ChipFacedePicker

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = { name: "SearchableTextfieldSelector" };

  anchorEl = null;

  state = {
    query: "",
    previousQuery: "",
    open: false,
    initial: true, // for trying to get items with empty query on first open
    selectedItem: this.props.value ? this.props.value : null,
  };

  // config set interval before calling search on api
  msWaitBeforeSearch = 300;

  timer = null;

  clearTimer = () => {
    this.timer ? clearTimeout(this.timer) : null;
    this.timer = null;
  };

  componentWillUnmount = () => this.clearTimer();

  handleOpenSelector = event => {
    this.anchorEl = event.currentTarget;
    if (this.state.initial) this.props.searchable.search("");
    this.setState({ open: !this.state.open, initial: false });
  };

  handleCloseSelector = () => this.setState({ open: false });

  changeValue = selectedItem => {
    // this.props.onChange({ target: { name: this.props.name, value } });
    this.props.onChange({ target: { value: selectedItem } });
    this.setState({selectedItem});
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
    this.setState({ previousQuery: query }, () => this.props.searchable.search(query));

  // when scroll to end of list, if has more items to load, ask api to load more
  loadMore = searchable => () =>
    !searchable.isLoading &&
    searchable.items.length < searchable.itemsCount &&
    searchable.loadMore();

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

  render = () => {
    const {
      searchable,
      label,
      className,
      topLevelOnlyClassName,
      renderItemFn,
      classes,
      t
    } = this.props;

    const { items, isLoading } = searchable;

    const { query, open, selectedItem, } = this.state;

    const selectedItems = []; //oneValue ? (value ? [value] : []) : value;

    const filteredItems = items.filter(item => !selectedItems.find(s => s.id === item.id));

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

            <Row borderHalf>
              <Column stretch>
                <InfiniteScroll
                  className={classes.listPanelWrapper}
                  onScrolledToEnd={this.loadMore(searchable)}
                >
                  <div className={classes.listPanel}>
                    {filteredItems.map((item, i) =>
                      renderItemFn
                        ? renderItemFn(i, item, this.handleSelectItem)
                        : this.renderItem(i, item, this.handleSelectItem)
                    )}
                  </div>
                </InfiniteScroll>
              </Column>
            </Row>

            {isLoading && <LinearProgress variant="query" />}
          </Paper>
        </Popover>
      </>
    );
  };
}

export default withStyles(styleSheet, { name: "SearchableTextfieldSelector" })(
  translate("servicedesigner", "common")(SearchableTextfieldSelector)
);
