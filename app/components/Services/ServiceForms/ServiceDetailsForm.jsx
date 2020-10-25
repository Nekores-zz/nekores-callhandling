/**
 * by A. Prates, may-2018
 * updated by A. Prates, jul-2018, and than jul-2019, nov-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pending, ConfirmButtons, TextField, ChipInput } from "components";
import { ServiceDateIntervalInput } from "../ServiceElements";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Services/ServiceForms/ServiceDetailsForm";
import { getDateTimeInterval, getTimeStampInterval } from "utils/date";
import { getErrorProps } from "utils/errors";

class ServiceDetailsForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number.isRequired,
    data: PropTypes.shape({
      getServiceData: PropTypes.func.isRequired
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    service: undefined, // set by componentDidMount
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
    const service = setter(event.target.value);
    this.setState({ service });
  };

  addTag = service => tag =>
    this.handleChange(service.setTags)({ target: { value: [...service.tags, tag] } });

  delTag = service => tag =>
    this.handleChange(service.setTags)({ target: { value: service.tags.filter(s => s !== tag) } });

  updateDateTimeInterval = event => {
    const putDateInterval = getTimeStampInterval(
      event.target.value.startDateTime,
      event.target.value.endDateTime
    );
    const service = this.state.service
      .setStartTime(putDateInterval.startDateTime)
      .setEndTime(putDateInterval.endDateTime);
    this.setState({ service });
  };

  handleCancel = event => {};

  renderForm = service => () => {
    const { savePanel, panelIndex, classes, t } = this.props;
    const { errors } = this.state;

    const checkError = getErrorProps(t, errors);

    return (
      <div className={classes.internalForm}>
        <TextField
          value={service.name}
          onChange={this.handleChange(service.setName)}
          className={classes.textField}
          label={t(service.fieldName)}
          error={checkError(service.fieldName).error}
          helperText={checkError(service.fieldName).helperText}
          required
        />

        <br />
        <br />

        <TextField
          value={service.description}
          onChange={this.handleChange(service.setDescription)}
          className={classes.textField}
          label={t(service.fieldDescription)}
          error={checkError(service.fieldDescription).error}
          helperText={checkError(service.fieldDescription).helperText}
        />

        <br />
        <br />

        <ChipInput
          value={service.tags}
          onAdd={this.addTag(service)}
          onDelete={this.delTag(service)}
          className={classes.textField}
          name={service.fieldTags}
          label={t(service.fieldTags)}
        />

        <br />
        <br />
        <br />

        <ServiceDateIntervalInput
          value={getDateTimeInterval(service.startTime, service.endTime)}
          onChange={this.updateDateTimeInterval}
          error={checkError(service.fieldStartTime).error || checkError(service.fieldEndTime).error}
          helperText={
            checkError(service.fieldStartTime).helperText ||
            checkError(service.fieldEndTime).helperText
          }
        />

        <br />
        <br />

        <ConfirmButtons
          onConfirm={event => savePanel(event, panelIndex, { ...this.state.service })}
          // blocked={!service.name || !service.startTime}
          onSuccess={() => this.setState({ errors: null })}
          onFailure={errors => this.setState({ errors })}
          onCancel={this.revertToServer}
        />
      </div>
    );
  };

  pickUpTodayTime = service => service.setStartTime(ScalaDate.dateToTs(new Date()));

  promiseToDiode = () => {
    this.props.data
      .getServiceData()
      .then(service => {
        const serviceWithTime = !service.startTime ? this.pickUpTodayTime(service) : service;
        this.setState({
          service: serviceWithTime,
          diode: { loading: false, data: serviceWithTime },
          errors: null
        });
      })
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  revertToServer = () => this.promiseToDiode();

  componentDidMount = () => this.promiseToDiode();

  render() {
    const { diode, service } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(service)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceDetailsForm" })(
  translate("services")(ServiceDetailsForm)
);
