import React, { Component } from "react";
import { withStyles, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import { Text } from "components/LayoutElements";
import { Pending, ConfirmButtons, Select } from "components";
import { ReportDateIntervalInput } from "components/Report/ReportElement";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Report/ReportElement/Form/SimpleForm";
import { ReportFormSelectService } from "../Input";
import { Accordion } from "../Accordion";

class SimpleForm extends Component {
  state = {
    report: undefined, // set by componentDidMount
    expanded: false,
    selectedService: [],
    showAdvanceSettings: true,
    showAdvancedOptions: false,
    selectionList: null,
    selectedNumber: [],
    selectedTimeInterval: null,
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  pickUpTodayTime = report => report.setStartTime(ScalaDate.dateToTs(new Date()));

  promiseToDiode = () => {
    this.props
      .getReportData()
      .then(report => {
        const reportWithTime = report;
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

  handleChange = index => {
    event.stopPropagation();
    this.setState({ expanded: !this.state.expanded });
  };

  setService = setter => e => {
    this.setState({
      selectedService: e
    });
    let report = setter(this.state.selectedService);
    this.setState({ report });
  };
  handleTimePeriod = selectedValue => {
    this.setState({
      selectedTimeInterval: selectedValue
    });
    // let report = setter(this.state.selectedTimeInterval);
    // this.setState({ report });
  };

  showVisualization = setter => () => {
    this.props.showVisualization()
    const report = !this.state.report.graph.showGraph
    this.setState({report})

  }
  showAdvanceSettings = setter => () => {
    // this.props.showAdvance(this.state.showAdvanceSettings);
    this.setState({ showAdvanceSettings: !this.state.showAdvanceSettings });
    this.setState({ report });
  };

  renderForm = report => () => {
    const { numbers, services, timePeriods, t, classes } = this.props;
    const { selectedService, selectedTimeInterval } = this.state;

    return (
      <Accordion headingText="reportParameters" icon="edit">
        <ReportFormSelectService
          fullWidth
          name="services"
          options={Object.keys(services)}
          value={selectedService}
          renderOption={id => services[id]}
          label={t("services")}
          onChange={() => null}
          required
        />
        <br />
        <br />

        <ReportFormSelectService
          fullWidth
          name="numbers"
          options={Object.keys(numbers)}
          value={selectedService}
          renderOption={id => numbers[id]}
          label={t("numbers")}
          onChange={() => null}
          required
        />
        <br />
        <br />

        <Grid container>
          <Grid item md={selectedTimeInterval == "Custom" ? 6 : 12}>
            <Select
              className={classes.rightItemWidth + " " + classes.textField}
              getKey={timePeriods => timePeriods}
              renderOption={timePeriods => timePeriods}
              options={timePeriods}
              value={selectedTimeInterval ? selectedTimeInterval : t("select")}
              label={t("timeInterval")}
              onChange={this.handleTimePeriod}
              required
            />
          </Grid>
          {selectedTimeInterval == "Custom" && (
            <Grid item md={6}>
              <ReportDateIntervalInput
                withoutWarning
                value={"test"}
                // onChange={this.updateDateTimeInterval}
                // error={
                //   !!(
                //     this.isFieldInvalid(report.fieldStartTime) ||
                //     this.isFieldInvalid(report.fieldEndTime)
                //   )
                // }
                // helperText={t(
                //   this.getFieldErrorMessage(report.fieldStartTime) ||
                //     this.getFieldErrorMessage(report.fieldEndTime)
                // )}
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
              onChange={() => null}
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
              onChange={() => null}
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
          // onConfirm={event => savePanel(event, panelIndex, { ...this.state.report })}
          onConfirm={() => alert("update")}
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
      </Accordion>
    );
  };

  render() {
    const { classes } = this.props;
    const { diode, report } = this.state;

    return (
      <div className={classes.internalForm}>
        <Pending
          content={diode}
          onResponse={this.renderForm(report)}
          onFail={() => {
            return null;
          }}
          operationMode="diode"
          fullWidth
        />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "SimpleForm" })(translate("report")(SimpleForm));
