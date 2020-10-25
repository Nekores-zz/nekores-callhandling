/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jan-2019 - oct-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, MenuItem, Radio, withStyles } from "@material-ui/core";
import { ConfirmButtons, SearchableChipSelector, TextField, Text } from "components";
import { AddServiceItem } from "components/Services";
import { translate } from "react-i18next";
import { styleSheet } from "jss/NumbersManagement/NumbersForms/ConfigureForm";
import { DiodeSearchable } from "utils/commonShapes";
import { allocationValues } from "utils/allocationValues";

class ConfigureForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    panelIndex: PropTypes.number.isRequired,
    data: PropTypes.shape({
      statusOptions: PropTypes.array.isRequired,
      allocation: PropTypes.func.isRequired,
      searchableAccounts: DiodeSearchable.isRequired,
      searchableServices: DiodeSearchable.isRequired,
      bands: PropTypes.array.isRequired,
      showDetailsPanel: PropTypes.func.isRequired,
      numberConfiguration: PropTypes.object.isRequired
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    selectedOption: 0,
    selectedAccount: null,
    selectedService: null,
    bandOverride: false,
    numberConfiguration: this.props.data.numberConfiguration
  };

  addServiceOption = {
    name: this.props.t("newService"),
    label: this.props.t("plusService")
  };

  componentDidMount = () => this.props.data.showDetailsPanel(true);

  componentWillUnmount = () => this.props.data.showDetailsPanel(false);

  formInputChange = event => this.setState({ [event.target.name]: event.target.value });

  handleChange = setter => event => {
      const newNumberConfiguration = setter(event.target.value);
      this.setState({ numberConfiguration: newNumberConfiguration });
  };
  handleBandOverride = numberConfiguration => bandType => {
      return this.state.bandOverride ?
          this.handleChange(numberConfiguration.setBandType)(bandType)
          : numberConfiguration;
  };

  toggleCheckbox = name => event => this.setState({ [name]: !this.state[name] });

  handleAllocationChange = ev => {
      this.setState({
          selectedOption: Number(ev.target.value) // value is getting converted to a String, Reconvert it to a Number for comparison
      });
  };

  render = () => {
    const { savePanel, panelIndex, classes, t } = this.props;
    const { statusOptions,
            searchableAccounts,
            searchableServices,
            bands
          } = this.props.data;
    const {selectedAccount, selectedOption, selectedService, numberConfiguration } = this.state;

    return (
      <div className={classes.internalForm}>
        <TextField
          value={numberConfiguration.status.value.toString()}
          label={t(numberConfiguration.fieldStatus)}
          className={classes.textField}
          onChange={this.handleChange(v => numberConfiguration.setStatus(statusOptions[v].toScala()))}
          select
        >
          {statusOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {t(option.label)}
            </MenuItem>
          ))}
        </TextField>

        <br />
        <br />

        <div>
          <FormControlLabel
            control={
              <Radio
                checked={selectedOption === allocationValues.noAccount}
                onChange={this.handleAllocationChange}
                name="selectedOption"
                value={allocationValues.noAccount}
              />
            }
            label={t("optionNoAccount")}
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedOption === allocationValues.allocate}
                onChange={this.handleAllocationChange}
                name="selectedOption"
                value={allocationValues.allocate}
              />
            }
            label={t("optionAllocate")}
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedOption === allocationValues.reserve}
                onChange={this.handleAllocationChange}
                name="selectedOption"
                value={allocationValues.reserve}
              />
            }
            label={t("optionReserve")}
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedOption === allocationValues.hidden}
                onChange={this.handleAllocationChange}
                name="selectedOption"
                value={allocationValues.hidden}
              />
            }
            label={t("optionHidden")}
          />
        </div>

        {(selectedOption !== allocationValues.noAccount || selectedOption !== allocationValues.hidden) && (
          <>
            <br />
            <SearchableChipSelector
              className={classes.searchableChipSelector}
              name="selectedAccount"
              value={selectedAccount}
              emptyLabel={t("accountSearch")}
              searchable={searchableAccounts}
              onChange={this.formInputChange}
              oneValue
            />
          </>
        )}

        {selectedAccount && (
          <>
            <br />
            <br />
            <SearchableChipSelector
              className={classes.searchableChipSelector}
              name="selectedService"
              value={selectedService}
              emptyLabel={t("serviceSearch")}
              searchable={searchableServices}
              onChange={this.formInputChange}
              addOption={this.addServiceOption}
              AddOptionItem={AddServiceItem}
              oneValue
            />
          </>
        )}

        <br />
        <br />

        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.bandOverride}
              onChange={this.toggleCheckbox("bandOverride")}
            />
          }
          label={t("bandOverride")}
        />
        <br />
        <Text variant="secondarySmallBody" className={classes.helperText} block>
          {t("bandOverrideWarning")}
        </Text>

        {this.state.bandOverride ? (
          <div className={classes.bandSelector}>
            <TextField
              name={"band"}
              value={numberConfiguration.bandType.value}
              label={t(numberConfiguration.fieldBandType)}
              className={classes.textField}
              onChange={this.handleChange(v => numberConfiguration.setBandType(bands[v].toScala()))}
              select
            >
              {bands.map((band, index) => (
                <MenuItem key={index} value={index}>
                  {band.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        ) : null}

        <br />
        <br />

        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("save")}
          onConfirm={event => savePanel(event, panelIndex, { ...this.state })}
          cancelLabel={t("cancel")}
          onSuccess={() => this.setState({error: null})}
          onError={errors => this.setState({ errors })}
          onCancel={this.props.handleBack}
        />
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "ConfigureForm" })(
  translate("numbers")(ConfigureForm)
);
