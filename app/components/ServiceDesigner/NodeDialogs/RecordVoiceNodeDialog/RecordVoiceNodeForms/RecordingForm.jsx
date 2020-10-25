import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import { FormControlLabel, Checkbox, Grid, withStyles } from "@material-ui/core";
import { Pending, Select, Multiselect } from "components";
import { Box, Column, Row, Stretch, Text, Textfield } from "components/LayoutElements";
import * as formFields from "../../../api/serviceDesigner";

const styleSheet = theme => ({});

class RecordingForm extends Component {
  static propTypes = {
    panelIndex: PropTypes.number, // should be set on creation mode
    data: PropTypes.shape({
      getRecording: PropTypes.func,
      keyOptions: PropTypes.array
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_RV_RECORDING
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  updateState = (setter, value) => this.setState({ recording: setter(value) });

  handleChange = setter => event => this.updateState(setter, event.target.value);

  componentDidMount() {
    this.promiseToDiode();
  }

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  revertToServer = () => this.promiseToDiode();

  promiseToDiode = () => {
    this.props.data
      .getRecording()
      .then(recording =>
        this.setState({
          recording,
          diode: { loading: false, data: recording }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  handleChangeRecording = (key, value) => {
    const { recording } = this.state;
    recording[key] = value;
    this.setState({ recording: { ...recording } });
  };

  handleChangeStopKey = option => {
    this.handleChangeRecording("stopKeys", option);
  };

  handleChangeRecordingTimeLimit = recordingTimeLimit => {
    this.handleChangeRecording("recordingTimeLimit", recordingTimeLimit);
  };

  handleChangeSilenceThreshold = silenceThreshold => {
    this.handleChangeRecording("silenceThreshold", silenceThreshold);
  };

  handleChangeSilenceHits = silenceHits => {
    this.handleChangeRecording("silenceHits", silenceHits);
  };

  renderForm = recording => () => {
    if (!recording) return <></>;

    const { stopKeys, recordingTimeLimit, silenceThreshold, silenceHits } = recording;
    const { recordingTimeLimitOpitons, silenceThresholdOptions, silenceHitsOptions } = recording;
    const { keyOptions } = this.props.data;
    const { classes, t } = this.props;

    return (
      <Column stretch>
        <Row>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Multiselect
                onChange={this.handleChangeStopKey}
                getKey={mode => mode}
                renderOption={option => option}
                options={keyOptions}
                value={stopKeys}
                label={t("stopRecordingAfterKeypress")}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                onChange={this.handleChangeRecordingTimeLimit}
                getKey={delay => delay}
                renderOption={second => t("secsWithNumber", { second })}
                options={recordingTimeLimitOpitons}
                value={recordingTimeLimit}
                label={t("recordingTimeLimit")}
                fullWidth
              />
            </Grid>
          </Grid>
        </Row>
        <Row paddingTop>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Select
                onChange={this.handleChangeSilenceThreshold}
                getKey={delay => delay}
                renderOption={second => t("secsWithNumber", { second })}
                options={silenceThresholdOptions}
                value={silenceThreshold}
                label={t("silenceThreshold")}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                onChange={this.handleChangeSilenceHits}
                getKey={delay => delay}
                options={silenceHitsOptions}
                value={silenceHits}
                label={t("silenceHits")}
                fullWidth
              />
            </Grid>
          </Grid>
        </Row>
      </Column>
    );
  };

  render = () => {
    const { diode, recording } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(recording)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "RecordingForm" })(
  translate(["servicedesigner", "callcare", "common"])(RecordingForm)
);
