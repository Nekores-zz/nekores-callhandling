import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import { FormControlLabel, Checkbox, Grid, withStyles } from "@material-ui/core";
import { Pending, Select } from "components";
import { Column, Row, Text, TextField } from "components/LayoutElements";
import * as formFields from "../../../api/serviceDesigner";

const styleSheet = theme => ({
  formCheckboxControl: {
    width: 28,
    height: 28,
    marginLeft: 12,
    marginRight: 8
  },

  enableJumpsForm: {
    marginLeft: 36
  }
});

class KeyPressForm extends Component {
  static propTypes = {
    panelIndex: PropTypes.number, // should be set on creation mode
    data: PropTypes.shape({
      getKeyPress: PropTypes.func.isRequired
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_CCP_KEY_PRESS
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    keyPress: {
      preventCaller: false,
      flushOnInterrupt: false,
      flushAfterPlay: false,
      enableBackwardForwardJumps: false,
      jumpMode: "",
      delay: "",
      backwardsKey: "",
      forwardsKey: "",

      jumpModeOptions: [],
      delayOptions: []
    },
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  updateState = (setter, value) => this.setState({ grouping: setter(value) });

  handleChange = setter => event => this.updateState(setter, event.target.value);

  handleChangePreventCaller = () => {
    this.updateState(this.state.keyPress.setPreventCaller, !this.state.keyPress.preventCaller);
  };

  handleFlushOnInterrupt = () => {
    this.updateState(
      this.state.keyPress.setFlushOnInterrupt,
      !this.state.keyPress.flushOnInterrupt
    );
  };

  handleFlushAfterPlay = () => {
    this.updateState(this.state.keyPress.setFlushAfterPlay, !this.state.keyPress.flushAfterPlay);
  };

  handleEnableBackwardForwardJumps = () => {
    this.updateState(
      this.state.keyPress.setEnableBackwardForwardJumps,
      !this.state.keyPress.enableBackwardForwardJumps
    );
  };

  handleChangeJumpMode = jumpMode => {
    this.updateState(this.state.keyPress.setJumpMode, jumpMode);
  };

  handleChangeDelay = delay => {
    this.updateState(this.state.keyPress.setDelay, delay);
  };

  // handleStatus = selectedValue => {
  //   const basicInfo = this.state.basicInfo.setStatus(this.state.basicInfo.status.get(selectedValue.value));
  //   this.setState({ basicInfo });
  // };

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
      .getKeyPress()
      .then(keyPress => {
        this.setState({
          keyPress,
          diode: { loading: false, data: keyPress }
        });
      })
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  renderForm = keyPress => () => {
    const { panelIndex, classes, t } = this.props;
    const {
      preventCaller,
      flushOnInterrupt,
      flushAfterPlay,
      enableBackwardForwardJumps,
      jumpMode,
      delay,
      backwardsKey,
      forwardsKey
    } = keyPress;
    const { jumpModeOptions, delayOptions } = keyPress;

    return (
      <Column stretch>
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={preventCaller}
                onChange={this.handleChangePreventCaller}
                className={classes.formCheckboxControl}
              />
            }
            label={t("preventCallerWithKeypress")}
          />
        </Row>
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={flushOnInterrupt}
                onChange={this.handleFlushOnInterrupt}
                className={classes.formCheckboxControl}
              />
            }
            label={t("flushPendingKeys")}
          />
        </Row>
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={flushAfterPlay}
                onChange={this.handleFlushAfterPlay}
                className={classes.formCheckboxControl}
              />
            }
            label={t("flushPendingKeysAfterCompleted")}
          />
        </Row>
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={enableBackwardForwardJumps}
                onChange={this.handleEnableBackwardForwardJumps}
                className={classes.formCheckboxControl}
              />
            }
            label={t("enableBackForwardJumps")}
          />
        </Row>
        {enableBackwardForwardJumps && (
          <Row>
            <Column classes={{ box: classes.enableJumpsForm }}>
              <Row paddingTop>
                <Grid container spacing={16}>
                  <Grid item xs={6}>
                    <Select
                      onChange={this.handleChangeJumpMode}
                      getKey={mode => mode}
                      renderOption={t}
                      options={jumpModeOptions}
                      value={jumpMode}
                      label={t("jumpMode")}
                      fullWidth
                    />
                  </Grid>
                  {jumpMode === "milliSeconds" && (
                    <Grid item xs={6}>
                      <Select
                        onChange={this.handleChangeDelay}
                        getKey={delay => delay}
                        options={delayOptions}
                        value={delay}
                        label={t(jumpMode + "Delay")}
                        fullWidth
                      />
                    </Grid>
                  )}
                </Grid>
              </Row>
              <Row paddingTop>
                <Grid container spacing={16}>
                  <Grid item xs={3}>
                    <TextField
                      value={backwardsKey}
                      onChange={this.handleChange(keyPress.setBackwardsKey)}
                      label={t("backwardsKey")}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      value={forwardsKey}
                      onChange={this.handleChange(keyPress.setForwardsKey)}
                      label={t("forwardsKey")}
                    />
                  </Grid>
                </Grid>
              </Row>
            </Column>
          </Row>
        )}
      </Column>
    );
  };

  render = () => {
    const { diode, keyPress } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(keyPress)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "KeyPressForm" })(
  translate(["servicedesigner", "common"])(KeyPressForm)
);
