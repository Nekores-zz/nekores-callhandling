/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - oct-2019
 */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  Chip,
  FormGroup,
  FormControlLabel,
  MenuItem,
  Typography,
  Radio,
  withStyles
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import moment from "moment";
import "moment/locale/pt";
import i18n from "i18n";
import { SearchableChipSelector, TextField, Text } from "components";
import { SidemenuTextButton } from "../Sidemenu";
import { AccountStatus, AccountType } from "components/Accounts";
import { PromiseWithCallback } from "utils/promise";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Sidemenu/SidemenuFilters";

// TODO: check if locale loads correct language if we change language on the fly
moment.locale(i18n.language);

class SidemenuFilters extends Component {
  static propTypes = {
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        fieldName: PropTypes.string.isRequired, // we always have to think of fieldName as unique even in recursive tree
        filterType: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
            isSelected: PropTypes.bool,
            filter: PropTypes.object // optional, of same shape (for recursive filter, not validated with PropTypes)
          })
        )
      })
    ),

    onChange: PropTypes.func.isRequired, // filters => Callback

    getTags: PropTypes.func, // required only when using tags filter
    getSearchable: PropTypes.func, // required only when using searchable filter

    classes: PropTypes.object.isRequired,

    t: PropTypes.func.isRequired
  };

  state = {
    valueStore: {},
    showMoreTags: {},
    loadedTags: {}
  };

  getTags = fieldName => {
    PromiseWithCallback(
      this.props.getTags(fieldName),
      tags => this.setState({ loadedTags: { ...this.state.loadedTags, [fieldName]: tags } }),
      error => console.log(error)
    );
    return (
      <Text variant="caption" className={this.props.classes.tagsPureText}>
        {this.props.t("loading")}
      </Text>
    );
  };

  buildTagValues = filter =>
    this.state.loadedTags[filter.fieldName].map(tag => ({
      label: tag,
      value: tag.toLowerCase(),
      isSelected: !!filter.values.find(v => v.value === tag.toLowerCase() && v.isSelected)
    }));

  // if a value has a filter than it is a recursive filter -> push it!
  getNextLevelFilters = filters => {
    const recursiveFilters = [];
    filters.forEach(
      filter =>
        filter.values &&
        filter.values.forEach(value => value.filter && recursiveFilters.push(value.filter))
    );
    return recursiveFilters;
  };

  getFilterRecursive = (filters, fieldName) => {
    const inLevelFilter = filters.find(f => f.fieldName === fieldName);
    if (inLevelFilter) return inLevelFilter;
    const nextLevelFilters = this.getNextLevelFilters(filters);
    if (nextLevelFilters.length) return this.getFilterRecursive(nextLevelFilters, fieldName);
    return null;
  };

  getValueIndex = (values, value) =>
    values.findIndex(v => v.label.toLowerCase() === value.label.toLowerCase());

  // for toggling isSelected of MULTI selection filter (targets value by value.label)
  toggleFilter = (fieldName, value) => () => {
    const filters = this.props.filters.map(f => f.copy());
    const filter = this.getFilterRecursive(filters, fieldName);
    let vIndex = this.getValueIndex(filter.values, value);
    if (vIndex === -1) {
      // if value does not exist yet, adds it to filter values (used by tags filter)
      vIndex = filter.values.length;
      filter.values[vIndex] = value;
    }
    filter.values[vIndex].isSelected = !value.isSelected;
    this.props.onChange(filters);
  };

  // for setting isSelected of SINGLE selection filter (targets value by value.value)
  selectFilter = (fieldName, valueValue, toggle = false) => {
    const filters = this.props.filters.map(f => f.copy());
    const filter = this.getFilterRecursive(filters, fieldName);
    filter.values.forEach(v =>
      v.value === valueValue
        ? (v.isSelected = toggle ? !v.isSelected : true)
        : (v.isSelected = false)
    );
    this.props.onChange(filters);
  };

  // for editing content of a value (targets value by value.label)
  handleFilter = (fieldName, value, content) => {
    const filters = this.props.filters.map(f => f.copy());
    const filter = this.getFilterRecursive(filters, fieldName);
    const vIndex = this.getValueIndex(filter.values, value);
    filter.values[vIndex].value = content;
    filter.values[vIndex].isSelected = !!content;
    this.props.onChange(filters);
  };

  // for entirely replacing values from list of [id: String, name: String]
  updateFilterFromValues = (fieldName, values, preventUpdate) => {
    const filters = this.props.filters.map(f => f.copy());
    const filter = this.getFilterRecursive(filters, fieldName);
    filter.values = values.map(v => ({
      value: v.id,
      label: v.name,
      isSelected: true
    }));
    if (!preventUpdate) this.props.onChange(filters);
  };

  getSelectSelected = fieldName => {
    const { filters } = this.props;
    const filter = this.getFilterRecursive(filters, fieldName);
    const selected = filter.values.find(v => v.isSelected);
    return selected ? selected.value : "none";
  };

  clearFilterByFiledName = fieldName => {
    const filters = this.props.filters.map(f => f.copy());
    const f = this.getFilterRecursive(filters, fieldName);
    this.clearFilterContent(f);
    this.props.onChange(filters);
  };

  clearFilterContent = f =>
    f.filterType === "searchableChipSelector"
      ? (f.values = [])
      : f.values.forEach(v => {
          v.isSelected = false;
          if (f.filterType === "text" || f.filterType === "date") v.value = "";
          if (v.filter) v.filter = this.clearFilter(v.filter);
        });

  clearFilter = filter => {
    const f = filter.copy();
    this.clearFilterContent(f);
    return f;
  };

  clearAll = () => {
    const clearedFilter = this.props.filters.map(f => this.clearFilter(f));
    this.setState({ valueStore: {}, showMoreTags: {} });
    this.props.onChange(clearedFilter);
  };

  toggleShowMoreTags = (filter, showMoreTags) => () =>
    this.setState({ showMoreTags: { [filter.fieldName]: !showMoreTags[filter.fieldName] } });

  // we need to keep values of searchable selectors on state, because labels don't go to queryParams
  searchableChipSelectorChange = event =>
    this.setState(
      { valueStore: { ...this.state.valueStore, [event.target.name]: event.target.value } },
      () => this.updateFilterFromValues(event.target.name, event.target.value, event.preventUpdate)
    );

  getSearchableValue = filter =>
    this.state.valueStore[filter.fieldName]
      ? this.state.valueStore[filter.fieldName]
      : filter.values.map(v => ({ id: v.value, name: v.label }));

  renderFilter = filter => {
    const { classes, t } = this.props;
    const { loadedTags, showMoreTags } = this.state;

    switch (filter.filterType) {
      case "text":
        return (
          <FormGroup className={classes.formGroupText}>
            <TextField
              placeholder={t(filter.values[0].label)}
              className={classes.textField}
              value={filter.values[0].value}
              onChange={event =>
                this.handleFilter(filter.fieldName, filter.values[0], event.target.value)
              }
              margin="none"
            />
          </FormGroup>
        );

      case "select":
      case "dataSelect":
        return (
          <FormGroup className={classes.formGroupSelect}>
            <TextField
              id="selectFilter"
              label=""
              className={classes.textField}
              value={this.getSelectSelected(filter.fieldName)}
              onChange={event => this.selectFilter(filter.fieldName, event.target.value)}
              SelectProps={{ MenuProps: { className: classes.menu } }}
              margin="normal"
              select
            >
              <MenuItem key="none" value="none" disabled>
                <Typography className={classes.grayedOutSelectOption}>{t("select")}</Typography>
              </MenuItem>
              {filter.values.map(value => (
                <MenuItem key={value.value} value={value.value}>
                  {filter.filterType === "select" ? t(value.label) : value.label}
                </MenuItem>
              ))}
            </TextField>
          </FormGroup>
        );

      case "searchableChipSelector":
        const searchable = this.props.getSearchable(filter.fieldName);
        return (
          <SearchableChipSelector
            searchable={searchable}
            name={filter.fieldName}
            value={this.getSearchableValue(filter)}
            onChange={this.searchableChipSelectorChange}
            className={classes.textField}
            topLevelOnlyClassName={classes.searchableChipSelector}
            savedIds={searchable.savedIds}
          />
        );

      case "checkbox": // applies label as i18n key
      case "dataCheckbox": // applies label as raw data
      case "narrowCheckbox": // applies label as i18n key, with two columns layout
      case "narrowDataCheckbox": // applies label as raw data, with two columns layout
        return (
          <>
            {filter.values.map(value => (
              <FormGroup
                key={value.value}
                className={
                  filter.filterType === "checkbox" || filter.filterType === "dataCheckbox"
                    ? ""
                    : classes.narrowCheckboxGroup
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.isSelected}
                      onChange={this.toggleFilter(filter.fieldName, value)}
                      classes={{ root: classes.filtersCheckbox }}
                    />
                  }
                  label={
                    filter.filterType === "dataCheckbox" ||
                    filter.filterType === "narrowDataCheckbox"
                      ? value.label
                      : t(value.label)
                  }
                  classes={{
                    label:
                      filter.filterType === "checkbox" || filter.filterType === "dataCheckbox"
                        ? classes.filtersCheckboxLabel
                        : classes.narrowCheckboxLabel
                  }}
                />
              </FormGroup>
            ))}
          </>
        );

      case "dateRadioSelector":
        return (
          <>
            {filter.values.map(value => (
              <Fragment key={value.value}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={value.isSelected}
                        onClick={() => this.selectFilter(filter.fieldName, value.value, true)}
                        classes={{ root: classes.filtersCheckbox }}
                      />
                    }
                    label={t(value.label)}
                    classes={{
                      label: classes.filtersCheckboxLabel
                    }}
                  />
                </FormGroup>

                {value.filter && value.isSelected && (
                  <>
                    <br />
                    {this.renderFilter(value.filter)}
                  </>
                )}
              </Fragment>
            ))}
          </>
        );

      case "accountType":
        return (
          <>
            {filter.values.map(value => (
              <FormGroup key={value.value}>
                <FormControlLabel
                  key={value.value}
                  control={
                    <Checkbox
                      checked={value.isSelected}
                      onChange={this.toggleFilter(filter.fieldName, value)}
                      classes={{ root: classes.filtersCheckbox }}
                    />
                  }
                  label={<AccountType type={value.label.toLowerCase()} />}
                  classes={{ label: classes.filtersCheckboxLabel }}
                />
              </FormGroup>
            ))}
          </>
        );

      case "accountStatus":
        return (
          <>
            {filter.values.map(value => (
              <FormGroup key={value.value}>
                <FormControlLabel
                  key={value.value}
                  control={
                    <Checkbox
                      checked={value.isSelected}
                      onChange={this.toggleFilter(filter.fieldName, value)}
                      classes={{ root: classes.filtersCheckbox }}
                    />
                  }
                  label={<AccountStatus status={value.label.toLowerCase()} />}
                  classes={{ label: classes.filtersCheckboxLabel }}
                />
              </FormGroup>
            ))}
          </>
        );

      case "tags":
        return (
          <div className={classes.chipArea}>
            {loadedTags[filter.fieldName] ? (
              <>
                {loadedTags[filter.fieldName].length ? (
                  this.buildTagValues(filter).map(
                    (value, index) =>
                      (!!showMoreTags[filter.fieldName] || index < 4) && (
                        <Chip
                          key={index}
                          label={value.label}
                          className={classes.chip}
                          color={value.isSelected ? "secondary" : undefined}
                          onClick={this.toggleFilter(filter.fieldName, value)}
                        />
                      )
                  )
                ) : (
                  <Text variant="caption" className={classes.tagsPureText}>
                    {t("noTags")}
                  </Text>
                )}

                {loadedTags[filter.fieldName].length > 4 && (
                  <Chip
                    key={"moreOrLess"}
                    label={!!showMoreTags[filter.fieldName] ? t("less") : t("more")}
                    className={classes.chip}
                    color="secondary"
                    onClick={this.toggleShowMoreTags(filter, showMoreTags)}
                    variant="outlined"
                  />
                )}
              </>
            ) : (
              this.getTags(filter.fieldName)
            )}
          </div>
        );

      case "date":
        return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            {filter.values.map((value, id) => (
              <DatePicker
                key={id}
                keyboard
                className={classes.dateInputField}
                value={
                  value.value
                    ? moment(ScalaDate.timeStampToJSDate(ScalaDate.stringToTs(value.value)))
                    : null
                }
                clearable
                onChange={content =>
                  content
                    ? this.handleFilter(
                        filter.fieldName,
                        value,
                        ScalaDate.tsToString(ScalaDate.dateToTs(content.toDate()))
                      )
                    : this.clearFilterByFiledName(filter.fieldName)
                }
                label={t(value.label)}
                InputProps={{
                  classes: {
                    underline: classes.underline
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                  FormLabelClasses: {
                    asterisk: classes.asterisk,
                    root: classes.label
                  }
                }}
                okLabel={t("ok")}
                cancelLabel={t("cancel")}
              />
            ))}
          </MuiPickersUtilsProvider>
        );

      default:
        return null;
    }
  };

  render = () => {
    const { classes, t, filters } = this.props;

    return (
      <div className={classes.filters}>
        <SidemenuTextButton onClick={this.clearAll} className={classes.clearAllButton}>
          {t("clear")}
        </SidemenuTextButton>

        {filters.map(filter => (
          <Fragment key={filter.fieldName}>
            <Typography variant="subtitle1" className={classes.sidemenuSubheader}>
              {t(filter.label)}
            </Typography>

            {this.renderFilter(filter)}

            {filter.filterType === "narrowCheckbox" ||
            filter.filterType === "narrowDataCheckbox" ? (
              <>
                <br />
                <br />
              </>
            ) : (
              <br />
            )}
          </Fragment>
        ))}
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "SidemenuFilters" })(
  translate("filters")(SidemenuFilters)
);
