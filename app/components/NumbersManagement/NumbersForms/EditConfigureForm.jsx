import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Checkbox, FormControlLabel, MenuItem, Radio, withStyles } from "@material-ui/core";
import { ConfirmButtons, SearchableChipSelector, TextField, Text } from "components";
import { AddServiceItem } from "components/Services";
import { translate } from "react-i18next";
import { styleSheet } from "jss/NumbersManagement/NumbersForms/EditConfigureForm";
import { DiodeSearchable } from "utils/commonShapes";
import { allocationValues } from "utils/allocationValues";

class EditConfigureForm extends Component {
  static propTypes = {
    number: PropTypes.object.isRequired,
    savePanel: PropTypes.func.isRequired,
    bands: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    allocation: PropTypes.func.isRequired,
    searchableAccounts: DiodeSearchable.isRequired,
    searchableServices: DiodeSearchable.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    status: this.props.number.status.value,
    selectedOption: this.props.number.allocation.value,
    number: this.props.number,
    selectedAccount: this.props.searchableAccounts.items.find(item =>
                                                              item.id == this.props.number.accountId),
    selectedService: this.props.searchableServices.items.find(item =>
                                                              item.id == this.props.number.serviceId),
    bandOverride: false,
    bandType: this.props.number.bandType.value
  };

  addServiceOption = {
    name: this.props.t("newService"),
    label: this.props.t("plusService")
  };

  handleFormChange = setter => event => {
      const newNumber = setter(event.target.value);
      this.setState({ number: newNumber });
  };

  handleAllocationChange = ev => {
     const selected = Number(ev.target.value);
     const selectedAccount = ([1,2].find(v => v == selected) ? this.state.selectedAccount.id : undefined);
     const newAllocation = this.props.allocation(selected)(selectedAccount);
     const newNumber = this.state.number.setAllocation(newAllocation.toScala());
     const updatedState = {
         selectedOption: selected,
         number: newNumber,
         selectedAccount
     };
     this.setState(updatedState);
  };

  handleServiceChange = ev => {
      const service = ev.target.value;
      const serviceId = service.id;
      const newNumber = this.state.number.setServiceId(serviceId);
      this.setState({
          selectedService: service,
          number: newNumber
      });
  };

  changeAllocationUser = accountId => {
      const { number } = this.state;
      const newAllocation = this.props.allocation(number.allocation.value)(accountId);
      const newNumber = number.setAllocation(newAllocation.toScala());
      this.setState({
          number: newNumber
      });
  };

  handleAccountChange = ev => {
      const account = ev.target.value;
      const accountId = account.id;
      if([1,2].find( v => v == this.state.number.allocation.value))
          this.changeAllocationUser(accountId);
      const newNumber = this.state.number.setAccountId(accountId);
      this.setState({
          selectedAccount: account,
          number: newNumber
      });
  };

  toggleCheckbox = name => event => this.setState({ [name]: !this.state[name] });

  render = () => {
    const { savePanel, classes, t } = this.props;
    const { statusOptions, searchableAccounts, searchableServices, bands} = this.props;
    const { bandType, status, selectedOption, selectedAccount, selectedService, number } = this.state;

    return (
      <div className={classes.internalForm}>
        <Text className={classes.labelText} variant="title">
          {t("configuration")}
        </Text>
        <br />
        <br />
        <TextField
          name={"status"}
          value={number.status.value.toString()}
          label={t("status")}
          className={classes.textField}
          onChange={this.handleFormChange(v => number.setStatus(statusOptions[v].toScala()))}
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

        {(selectedOption == allocationValues.allocate ||
          selectedOption == allocationValues.reserve) && (
          <SearchableChipSelector
            className={classes.searchableChipSelector}
            name="selectedAccount"
            value={selectedAccount}
            emptyLabel={t("accountSearch")}
            searchable={searchableAccounts}
            onChange={this.handleAccountChange}
            oneValue
          />
        )}

        {selectedAccount && (
          <SearchableChipSelector
            className={classes.searchableChipSelector}
            name="selectedService"
            value={selectedService}
            emptyLabel={t("serviceSearch")}
            searchable={searchableServices}
            onChange={this.handleServiceChange}
            addOption={this.addServiceOption}
            AddOptionItem={AddServiceItem}
            oneValue
          />
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
              value={number.bandType.value.toString()}
              label={bandType ? t("band") : t("assignBand")}
              className={clsx(classes.textField, classes.assignBand)}
              onChange={this.handleFormChange(v => number.setBandType(bands[v].toScala()))}
              select
            >
              {bands.map(band => (
                <MenuItem key={band.value} value={band.value}>
                  {t(band.label)}
                </MenuItem>
              ))}
            </TextField>
          </div>
        ) : null}

        <br />
        <br />

        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={
            selectedService === this.addServiceOption ? t("saveCreateService") : t("save")
          }
          onConfirm={event => savePanel(event, { ...this.state })}
        />
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "EditConfigureForm" })(
  translate("numbers")(EditConfigureForm)
);
