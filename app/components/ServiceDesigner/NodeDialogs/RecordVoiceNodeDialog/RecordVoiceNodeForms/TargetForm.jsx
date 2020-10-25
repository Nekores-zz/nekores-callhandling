import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import { FormControlLabel, Checkbox, TextField, Grid, withStyles } from "@material-ui/core";
import { Pending, Select, WarningMessage } from "components";
import { PrimaryTextLink } from "components/Elements";
import { Box, Column, Row, Stretch, Text } from "components/LayoutElements";
import * as formFields from "../../../api/serviceDesigner";

const styleSheet = theme => ({
  subField: {
    paddingLeft: 36,
    paddingRight: 36
  }
});

class TargetForm extends Component {
  static propTypes = {
    panelIndex: PropTypes.number, // should be set on creation mode
    data: PropTypes.shape({
      getTarget: PropTypes.func
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_RV_TARGET
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

  updateState = (setter, value) => this.setState({ target: setter(value) });

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
      .getTarget()
      .then(target =>
        this.setState({
          target,
          diode: { loading: false, data: target }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  handleChangeTarget = (key, value) => {
    const { target } = this.state;
    target[key] = value;
    this.setState({ target: { ...target } });
  };

  handleChangeTargetEvent = (key, value) => event => {
    this.handleChangeTarget(key, value);
  };

  handleChangeRecordingName = event => {
    this.handleChangeTarget("recordingName", event.target.value);
  };

  handleChangeMailBoxName = event => {
    this.handleChangeTarget("mailBoxName", event.target.value);
  };

  handleChangeEmailAddress = event => {
    this.handleChangeTarget("emailAddress", event.target.value);
  };

  handleChangeHost = event => {
    this.handleChangeTarget("host", event.target.value);
  };

  handleChangePort = event => {
    this.handleChangeTarget("port", event);
  };

  handleChangeLoginType = event => {
    this.handleChangeTarget("loginType", event);
  };

  handleChangeUser = event => {
    this.handleChangeTarget("user", event.target.value);
  };

  handleChangePassword = event => {
    this.handleChangeTarget("password", event.target.value);
  };

  handleChangeAccount = event => {
    this.handleChangeTarget("account", event.target.value);
  };

  handleAddVariable = () => {};

  renderForm = target => () => {
    if (!target) return <></>;

    const {
      recordingName,
      isVoiceMail,
      mailBoxName,
      isEmail,
      emailAddress,
      isSFTP,
      host,
      port,
      loginType,
      user,
      password,
      account
    } = target;
    const { portOptions, loginTypeOptions } = target;
    const { classes, t } = this.props;

    return (
      <Column stretch>
        <Row>
          <TextField
            value={recordingName}
            onChange={this.handleChangeRecordingName}
            label={t("recordingName")}
            fullWidth
          />
        </Row>
        <Row>
          <Stretch />
          <PrimaryTextLink onClick={this.handleAddVariable}>{t("addVariable")}</PrimaryTextLink>
        </Row>
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={isVoiceMail}
                onChange={this.handleChangeTargetEvent("isVoiceMail", !isVoiceMail)}
                className={classes.formCheckboxControl}
              />
            }
            label={t("voiceMail") + " (" + t("recommended") + ")"}
          />
        </Row>
        {isVoiceMail && (
          <Row classes={{ box: classes.subField }}>
            <TextField
              value={mailBoxName}
              onChange={this.handleChangeMailBoxName}
              label={t("mailboxToReceive")}
              fullWidth
            />
          </Row>
        )}
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={isEmail}
                onChange={this.handleChangeTargetEvent("isEmail", !isEmail)}
                className={classes.formCheckboxControl}
              />
            }
            label={t("email")}
          />
        </Row>
        {isEmail && (
          <Row classes={{ box: classes.subField }}>
            <Column>
              <Row>
                <TextField
                  value={emailAddress}
                  onChange={this.handleChangeEmailAddress}
                  label={t("emailAddress")}
                  placeholder={"johndoe@nhs.com, tobyjacson@nhs.com"}
                  type="email"
                  fullWidth
                />
              </Row>
              <Row paddingTopHalf>
                <WarningMessage>{t("emailWarning")}</WarningMessage>
              </Row>
            </Column>
          </Row>
        )}
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={isSFTP}
                onChange={this.handleChangeTargetEvent("isSFTP", !isSFTP)}
                className={classes.formCheckboxControl}
              />
            }
            label={t("sftp")}
          />
        </Row>
        {isSFTP && (
          <Row classes={{ box: classes.subField }}>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <TextField
                  value={host}
                  onChange={this.handleChangeHost}
                  label={t("host")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  onChange={this.handleChangePort}
                  getKey={delay => delay}
                  options={portOptions}
                  value={port}
                  label={t("port")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  onChange={this.handleChangeLoginType}
                  getKey={delay => delay}
                  options={loginTypeOptions}
                  value={loginType}
                  label={t("loginType")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={user}
                  onChange={this.handleChangeUser}
                  label={t("user")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={password}
                  onChange={this.handleChangePassword}
                  type="password"
                  label={t("password")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={account}
                  onChange={this.handleChangeAccount}
                  label={t("account")}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Row>
        )}
      </Column>
    );
  };

  render = () => {
    const { diode, target } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(target)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "TargetForm" })(
  translate(["servicedesigner", "callcare", "common"])(TargetForm)
);
