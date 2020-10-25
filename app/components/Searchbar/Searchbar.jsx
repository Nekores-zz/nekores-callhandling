/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: Andrzej,  mar-2018
 * Updated by: 4ητonio Prατєs [antonioprates@gmail.com], sep-2018 - oct-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormControl, Input, InputAdornment, Icon, withStyles } from "@material-ui/core";
import SearchbarResults from "./SearchbarResults";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/Searchbar/Searchbar";

class Searchbar extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleSearchResult: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired, // default results as: "dropdown" | "filter" ...other?

    handleOnEnterKeyPress: PropTypes.func, // if not provided, no action occurs
    defaultSearchText: PropTypes.string.isRequired, // if not provided, defaults to empty string
    clearSearchbar: PropTypes.func, // if provided, calls back when search is cleared
    onFocusOut: PropTypes.func, // if provided, calls back on blur (when loses focus)

    classes: PropTypes.object.isRequired
  };

  static defaultProps = { mode: "dropdown", defaultSearchText: "" };

  state = {
    query: this.props.defaultSearchText,
    previousQuery: this.props.defaultSearchText,
    resultsOpen: false,
    results: null,
    searchInput: null,
    mobileShow: false,
    selectByKeyboard: -1
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.defaultSearchText !== this.props.defaultSearchText)
      this.setState({
        query: this.props.defaultSearchText,
        previousQuery: this.props.defaultSearchText
      });
  };

  // config set interval before calling search on api
  msWaitBeforeSearch = 300;

  timer = null;

  clearTimer = () => {
    this.timer ? clearTimeout(this.timer) : null;
    this.timer = null;
  };

  componentWillUnmount = () => this.clearTimer();

  onFocus = () => {
    if (this.state.query !== "") {
      this.setState({
        resultsOpen: this.state.results && this.state.results.length > 0
      });
    }
  };

  clearSearchbar = () =>
    this.setState({ query: "" }, () => this.props.clearSearchbar && this.props.clearSearchbar());

  onBlur = event => {
    setTimeout(() => this.setState({ resultsOpen: false }), 0);
    this.props.onFocusOut && this.props.onFocusOut();
  };

  handleOnKeyPress = event => {
    const ENTER_KEY = 13;
    const ESC_KEY = 27;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const { results, selectByKeyboard } = this.state;
    const { value } = event.target;

    switch (event.keyCode) {
      case ENTER_KEY:
        this.setState(
          { query: value, resultsOpen: false },
          () => this.props.handleOnEnterKeyPress && this.props.handleOnEnterKeyPress(value)
        );
        break;

      case UP_KEY:
        if (selectByKeyboard > -1) this.setState({ selectByKeyboard: selectByKeyboard - 1 });
        else this.setState({ resultsOpen: false });
        break;

      case DOWN_KEY:
        if (results && !this.state.resultsOpen) this.setState({ resultsOpen: true });
        else if (results && results.length - 1 > selectByKeyboard)
          this.setState({ selectByKeyboard: selectByKeyboard + 1 });
        break;

      case ESC_KEY:
        this.setState({ resultsOpen: false });
        break;

      default:
        break;
    }
  };

  onChange = event => {
    const { handleSearch, mode } = this.props;
    const query = event.target.value;
    this.clearTimer();
    this.timer = setTimeout(this.performSearch(handleSearch, mode, query), this.msWaitBeforeSearch);
    this.setState({ query });
  };

  performSearch = (handleSearch, mode, query) => () =>
    query !== this.state.previousQuery &&
    this.setState({ previousQuery: query }, () =>
      mode === "filter"
        ? handleSearch(query) // if mode is "filter" -> fire and forget
        : handleSearch(query) // else if "dropdown" -> wait on results to display
            .then(response => this.setState({ results: response, resultsOpen: !!query.trim() }))
            .catch(error =>
              this.setState({ results: null, resultsOpen: false }, console.log(error))
            )
    );

  toggleSearchbar = () => {
    this.clearSearchbar();
    this.setState({ mobileShow: !this.state.mobileShow }, () => {
      if (this.state.mobileShow && this.searchInput) {
        this.searchInput.focus();
      }
    });
  };

  render = () => {
    const { placeholder, classes, t } = this.props;
    const { query, results, resultsOpen, mobileShow } = this.state;

    return (
      <div className={classes.searchbarWrapper}>
        <Icon className={classes.searchbarMobileToggle} onClick={this.toggleSearchbar}>
          search
        </Icon>
        <FormControl
          fullWidth
          className={`${classes.formControl} ${mobileShow ? "mobileShow" : "mobileHide"}`}
        >
          <Input
            disableUnderline
            value={query}
            inputRef={input => {
              this.searchInput = input;
            }}
            onFocus={this.onFocus}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onKeyDown={this.handleOnKeyPress}
            placeholder={t(placeholder)}
            classes={{
              root: classes.input,
              focused: classes.inputFocused
            }}
            startAdornment={
              <InputAdornment
                className="searchIcon"
                classes={{ root: classes.searchIcon }}
                position="start"
              >
                <Icon className={classes.searchIconAdornment}>search</Icon>
                <Icon onClick={this.toggleSearchbar} className={classes.closeSearchIconAdornment}>
                  keyboard_backspace
                </Icon>
              </InputAdornment>
            }
            endAdornment={
              query && (
                <InputAdornment
                  onClick={this.clearSearchbar}
                  className="clearIcon"
                  classes={{ root: classes.clearIcon }}
                  position="start"
                >
                  <Icon>close</Icon>
                </InputAdornment>
              )
            }
          />
          <SearchbarResults
            opened={resultsOpen}
            results={results}
            handleSearchResult={this.props.handleSearchResult}
            selectByKeyboard={this.state.selectByKeyboard}
          />
        </FormControl>
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "Searchbar" })(translate("common")(Searchbar));
