/**
 * by Sajid U. NOV-2019
 */

import React, { Component } from "react";
import { withStyles, Grid, FormControlLabel, Checkbox, Avatar } from "@material-ui/core";
import { Text } from "components/LayoutElements";
import { Pending, ConfirmButtons, TextField, Select, ChipInput } from "components";
// import { Multiselect } from "components/Elements";
import { ReportDateIntervalInput } from "components/Report/ReportElement";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Report/ReportForm/CallSummaryForm";
// import { Table } from "components/Report/ReportElement/Table/";
// import { reports, , services, timePeriods, tags, emptyReport } from "config/reportMockData";
import { getDateTimeInterval, getTimeStampInterval } from "utils/date";
import { ReportFormSelectService } from "../Input/";

// import { services } from "config/servicesMockData";
class CallSummaryForm extends Component {
  state = {
    report: undefined, // set by componentDidMount
    showAdvanceSettings: false,
    showAdvancedOptions: false,
    selectionList: null,
    selectedService: [],
    selectedNumber: [],
    selectedTimeInterval: null,
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  handleChange = setter => event => {
    const report = setter(event.target.value);
    this.setState({ report });
  };

  addTag = report => tag =>
    this.handleChange(report.setTags)({ target: { value: [...report.tags, tag] } });

  delTag = report => tag =>
    this.handleChange(report.setTags)({ target: { value: report.tags.filter(s => s !== tag) } });

  updateDateTimeInterval = event => {
    const putDateInterval = getTimeStampInterval(
      event.target.value.startDateTime,
      event.target.value.endDateTime
    );
    const report = this.state.report
      .setStartTime(putDateInterval.startDateTime)
      .setEndTime(putDateInterval.endDateTime);
    this.setState({ report });
  };

  handleCancel = event => {};

  handleTimePeriod = setter => selectedValue => {
    this.setState({
      selectedTimeInterval: selectedValue
    });
    let report = setter(this.state.selectedTimeInterval);
    this.setState({ report });
  };

  getFieldErrorMessage = fieldService =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldService]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldService]);

  isFieldInvalid = fieldService => !!this.getFieldErrorMessage(fieldService);

  showAdvanceSettings = setter => () => {
    this.props.showAdvance(this.state.showAdvanceSettings);
    this.setState({ showAdvanceSettings: !this.state.showAdvanceSettings });
    const report = setter(this.state.showAdvanceSettings);
    this.setState({ report });
  };

  setService = setter => e => {
    this.setState({
      selectedService: e
    });
    let report = setter(this.state.selectedService);
    this.setState({ report });
  };

  setNumber = setter => e => {
    this.setState({
      selectedNumber: e
    });
    let report = setter(this.state.selectedNumber);
    this.setState({ report });
  };

  renderForm = report => () => {
    const {
      savePanel,
      panelIndex,
      data,
      type,
      classes,
      numbers,
      services,
      timePeriods,
      tags,
      showAdvance,
      t
    } = this.props;
    const { selectedService, selectedNumber, selectedTimeInterval } = this.state;
    return (
      <div className={classes.internalForm}>
        <ReportFormSelectServices
          fullWidth
          name="services"
          options={Object.keys(services)}
          value={selectedService}
          renderOption={id => services[id]}
          label={t("services")}
          onChange={this.setService(report.setService)}
          required
        />
        <br />
        <br />
        <ReportFormSelectServices
          fullWidth
          name="numbers"
          options={Object.keys(numbers)}
          value={selectedNumber}
          renderOption={id => numbers[id]}
          label={t("numbers")}
          onChange={this.setNumber(report.setNumber)}
          required
        />
        <br />
        <br />

        <Grid container>
          <Grid item md={selectedTimeInterval == "Custom" ? 6 : 12}>
            <Select
              onChange={this.handleTimePeriod(report.setTimePeriod)}
              className={classes.rightItemWidth + " " + classes.textField}
              getKey={timePeriods => timePeriods}
              renderOption={timePeriods => timePeriods}
              options={timePeriods}
              value={selectedTimeInterval ? selectedTimeInterval : t("select")}
              label={t("timeInterval")}
              required
            />
          </Grid>
          {selectedTimeInterval == "Custom" && (
            <Grid item md={6}>
              <ReportDateIntervalInput
                withoutWarning
                value={getDateTimeInterval(report.startTime, report.endTime)}
                onChange={this.updateDateTimeInterval}
                error={
                  !!(
                    this.isFieldInvalid(report.fieldStartTime) ||
                    this.isFieldInvalid(report.fieldEndTime)
                  )
                }
                helperText={t(
                  this.getFieldErrorMessage(report.fieldStartTime) ||
                    this.getFieldErrorMessage(report.fieldEndTime)
                )}
              />
            </Grid>
          )}
        </Grid>

        <br />

        <FormControlLabel
          control={
            <Checkbox
              checked={!this.state.showAdvanceSettings}
              onChange={this.showAdvanceSettings(report.setAdvanceForm)}
              value={t("enableVisualization")}
            />
          }
          label={t("enableVisualization")}
        />
        {/* Show Advanced Options */}
        {this.state.showAdvancedOptions ? (
          <div>
            <br />
            <Text variant="subtitle" className={classes.advancedOptionsTitle}>
              {t("advancedOptions")}
            </Text>
            <br />
            <br />
            <Select
              onChange={this.handleTimePeriod(report.setTimePeriod)}
              className={classes.rightItemWidth + " " + classes.textField}
              getKey={timePeriods => timePeriods}
              renderOption={timePeriods => timePeriods}
              options={["Under Construction"]}
              value={"Under Construction"}
              label={t("columns")}
              required
            />
            <br />
            <br />
            <Select
              onChange={this.handleTimePeriod(report.setTimePeriod)}
              className={classes.rightItemWidth + " " + classes.textField}
              getKey={timePeriods => timePeriods}
              renderOption={timePeriods => timePeriods}
              options={["Under Construction"]}
              value={"Under Construction"}
              label={t("hours")}
              required
            />
          </div>
        ) : null}
        <ConfirmButtons
          onConfirm={event => savePanel(event, panelIndex, { ...this.state.report })}
          // blocked={!report.name || !report.startTime}
          confirmLabel={t("update")}
          onSuccess={() => this.setState({ errors: null })}
          onFailure={errors => this.setState({ errors })}
          onCancel={this.revertToServer}
          onAltAction={() => {
            this.setState({
              showAdvancedOptions: !this.state.showAdvancedOptions
            });
          }}
          altActionLabel={
            this.state.showAdvancedOptions ? t("hideAdvancedOptions") : t("showAdvancedOptions")
          }
        />
      </div>
    );
  };

  pickUpTodayTime = report => report.setStartTime(ScalaDate.dateToTs(new Date()));

  promiseToDiode = () => {
    this.props.data
      .getReportData()
      .then(report => {
        const reportWithTime = !report.startTime ? this.pickUpTodayTime(report) : report;
        this.setState({
          report: reportWithTime,
          diode: { loading: false, data: reportWithTime },
          errors: null
        });
      })
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  revertToServer = () => this.promiseToDiode();

  componentDidMount = () => this.promiseToDiode();

  render() {
    const { diode, report } = this.state;

    return (
      <>
        <Pending
          content={diode}
          onResponse={this.renderForm(report)}
          onFail={() => {
            return null;
          }}
          operationMode="diode"
          fullWidth
        />
      </>
    );
  }
}

export default withStyles(styleSheet, { name: "CallSummaryForm" })(
  translate("report")(CallSummaryForm)
);
