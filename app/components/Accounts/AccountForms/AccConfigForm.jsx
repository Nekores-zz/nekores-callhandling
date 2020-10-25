import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Avatar, Grid, Icon, Typography, withStyles } from "@material-ui/core";
import { ConfirmButtons, Pending, Select, TextField } from "components";
import * as formFields from "../api/account";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/CreateAccount";

class AccConfigForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number, // should be set on creation mode
    administerMode: PropTypes.bool, // should be set on administer mode
    data: PropTypes.shape({
      getConfigData: PropTypes.func.isRequired,
      accTypes: PropTypes.array.isRequired,
      checkDomainAvailability: PropTypes.func.isRequired,
      activeAccountStatusOptions: PropTypes.array // used only for administer mode
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_ACCOUNT_CONFIGURATION
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    config: undefined, // set by componentDidMount
    isDomainCodeAvailable: false,
    previousDomainCode: undefined,
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  revertToServer = () => this.promiseToDiode();

  promiseToDiode = () => {
    this.props.data
      .getConfigData()
      .then(config =>
        this.setState({
          config: config,
          previousDomainCode: config.domainCode,
          isDomainCodeAvailable: true,
          diode: { loading: false, data: config }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  handleSelect = selectedValue => {
    const config = this.state.config.setAccountType(
      this.state.config.accountType.get(selectedValue.value)
    );
    this.setState({ config });
  };

  updateState = (setter, value) => this.setState({ config: setter(value) });

  handleChange = setter => event => this.updateState(setter, event.target.value);

  handleStatus = selectedValue => {
    const config = this.state.config.setStatus(this.state.config.status.get(selectedValue.value));
    this.setState({ config });
  };

  timer = null;
  msWaitBeforeCheck = 2000;

  clearTimer = () => {
    this.timer ? clearTimeout(this.timer) : null;
    this.timer = null;
  };

  componentWillUnmount = () => this.clearTimer();
  componentDidMount() {
    this.promiseToDiode();
  }

  changeDomainCode = event => {
    const domainCode = event.target.value;

    this.clearTimer();
    this.timer = setTimeout(this.checkDomainAvailability(domainCode), this.msWaitBeforeCheck);

    this.updateState(this.state.config.setDomainCode, domainCode);
  };

  checkDomainAvailability = domainCode => () => {
    this.clearTimer();

    if (domainCode === this.state.previousDomainCode) {
      this.setState({ isDomainCodeAvailable: true });
    } else {
      this.props.data
        .checkDomainAvailability(domainCode)
        .then(response => {
          this.setState({ isDomainCodeAvailable: true });
        })
        .catch(error => {
          this.setState({ isDomainCodeAvailable: false });
          console.log(error);
        });
    }
  };

  validateDomain = () =>
    this.state.isDomainCodeAvailable ||
    this.state.config.domainCode === this.state.previousDomainCode;

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  renderDomainAvailable = () => {
    const { classes, t } = this.props;
    const isCurrentDomain = this.state.config.domainCode === this.state.previousDomainCode;

    return (
      <Fragment>
        <Avatar className={clsx(classes.avatarHelperAc, classes.colorDoneIcon)}>
          <Icon className={clsx(classes.iconHelper, classes.iconDone)}>done</Icon>
        </Avatar>
        <Typography className={classes.textHelperDone}>
          {t(isCurrentDomain ? "isCurrentDomain" : "available")}
        </Typography>
      </Fragment>
    );
  };

  renderDomainNotAvailable = () => {
    const { classes, t } = this.props;
    return (
      <Fragment>
        <Avatar className={clsx(classes.avatarHelperAc, classes.colorCloseIcon)}>
          <Icon className={classes.iconHelper}>close</Icon>
        </Avatar>
        <Typography className={clsx(classes.textHelper, classes.colorText)}>
          {t("domainNotAv")}
        </Typography>
      </Fragment>
    );
  };

  renderForm = config => () => {
    const { administerMode, panelIndex, classes, t } = this.props;
    const { accTypes, activeAccountStatusOptions } = this.props.data;
    const { isDomainCodeAvailable } = this.state;

    return (
      <form className={classes.formInput} autoComplete="off">
        <Grid container spacing={24} className={classes.gridMarginBottom}>
          <Grid className={classes.gridMargin} item xg={6} lg={6} md={6} sm={12} xs={12}>
            <Select
              onChange={this.handleSelect}
              className={classes.rightItemWidth + " " + classes.textField}
              getKey={accTypes => accTypes.value}
              renderOption={accTypes => accTypes.name}
              options={accTypes}
              value={config.accountType}
              label={t(config.fieldAccountType)}
              required
            />

            {administerMode && activeAccountStatusOptions && (
              <Fragment>
                <br />
                <br />

                <Select
                  onChange={this.handleStatus}
                  className={classes.rightItemWidth + " " + classes.textField}
                  getKey={status => status.value}
                  renderOption={status => status.name}
                  options={activeAccountStatusOptions}
                  value={config.status}
                  label={t(config.fieldStatus)}
                  required
                />
              </Fragment>
            )}
          </Grid>
          <Grid className={classes.gridMargin} item xg={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              endAdornment={<Typography className={classes.parentDomain}>.hubbub.ai</Typography>}
              onChange={this.changeDomainCode}
              className={classes.textField}
              label={t(config.fieldDomainCode)}
              value={config.domainCode}
              error={this.isFieldInvalid(config.fieldDomainCode)}
              helperText={t(this.getFieldErrorMessage(config.fieldDomainCode))}
              required
            />

            <div className={classes.helper}>
              {config.domainCode !== "" && !this.timer
                ? this.validateDomain()
                  ? this.renderDomainAvailable()
                  : this.renderDomainNotAvailable()
                : null}
            </div>
          </Grid>
        </Grid>

        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("update")}
          onConfirm={event =>
            !administerMode
              ? this.props.savePanel(event, panelIndex, config)
              : this.props.savePanel(config)
          }
          blocked={config.domainCode === "" || !isDomainCodeAvailable}
          onSuccess={() => this.setState({ errors: null, previousDomainCode: config.domainCode })}
          onFailure={errors => this.setState({ errors })}
          onCancel={this.revertToServer}
        />
      </form>
    );
  };

  render = () => {
    const { diode, config } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(config)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidthw
      />
    );
  };
}

export default withStyles(styleSheet, { name: "AccConfigForm" })(
  translate("accounts")(AccConfigForm)
);
