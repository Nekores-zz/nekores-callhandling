/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - sep-2019
 * Updated by: Sajid U. - sep-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Avatar, Icon, Typography, withStyles, withWidth } from "@material-ui/core";
import { Select, Text, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/PreCreateAccountDialog";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";

class PreCreateAccountDialog extends Component {
  static propTypes = {
    minimalAccInfo: PropTypes.object.isRequired,
    accTypes: PropTypes.array.isRequired,
    checkDomainAvailability: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = { minimalAccInfo: this.props.minimalAccInfo, errors: undefined };

  handleCreate = () => this.props.onCreate(this.state.minimalAccInfo.toScala());

  handleSelect = selectedValue => {
    const minimalAccInfo = this.state.minimalAccInfo.setAccountType(
      this.state.minimalAccInfo.accountType.get(selectedValue.value)
    );
    this.setState({ minimalAccInfo });
  };

  timer = null;
  msWaitBeforeCheck = 2000;

  clearTimer = () => {
    this.timer ? clearTimeout(this.timer) : null;
    this.timer = null;
  };

  componentWillUnmount = () => this.clearTimer();

  updateState = (setter, value) => this.setState({ minimalAccInfo: setter(value) });

  handleChange = setter => event => this.updateState(setter, event.target.value);

  changeDomainCode = event => {
    const domainCode = event.target.value;

    this.clearTimer();
    this.timer = setTimeout(this.checkDomainAvailability(domainCode), this.msWaitBeforeCheck);

    this.updateState(this.state.minimalAccInfo.setDomainCode, domainCode);
  };

  checkDomainAvailability = domainCode => () => {
    this.clearTimer();

    if (domainCode === this.state.lastValidDomain) {
      this.setState({ isDomainCodeAvailable: true });
    } else {
      this.props
        .checkDomainAvailability(domainCode)
        .then(response => {
          this.setState({ isDomainCodeAvailable: true, errors: undefined });
        })
        .catch(errors => {
          this.setState({ isDomainCodeAvailable: false, errors: errors });
        });
    }
  };

  validateDomain = () => this.state.isDomainCodeAvailable;

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  renderDomainAvailable = () => {
    const { classes, t } = this.props;
    return (
      <Fragment>
        <Avatar className={clsx(classes.avatarHelperAc, classes.colorDoneIcon)}>
          <Icon className={clsx(classes.iconHelper, classes.iconDone)}>done</Icon>
        </Avatar>
        <Typography className={classes.textHelperDone}>{t("available")}</Typography>
      </Fragment>
    );
  };

  renderDomainNotAvailable = () => {
    const { classes, t } = this.props;
    const { errors } = this.state;
    return errors ? null : (
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

  hasAllRequiredFields = () =>
    this.state.minimalAccInfo.domainCode &&
    this.state.isDomainCodeAvailable &&
    this.state.minimalAccInfo.companyName &&
    this.state.minimalAccInfo.firstName &&
    this.state.minimalAccInfo.lastName &&
    this.state.minimalAccInfo.email &&
    this.state.minimalAccInfo.workNo;

  render = () => {
    // Props Destructuring
    const { accTypes, classes, onClose, t } = this.props;

    // State Destructuring
    const { minimalAccInfo } = this.state;

    const DialogHeader = (
      <HubbubDialogHeader
        icon={false}
        avatar={
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
        }
        headerVariation="grey"
        headerTitle={t("createAccount")}
        onClose={onClose}
      />
    );

    // Dialog Content
    const DialogContent = (
      <>
        <Select
          onChange={this.handleSelect}
          className={classes.field}
          getKey={accTypes => accTypes.value}
          renderOption={accTypes => accTypes.name}
          options={accTypes}
          value={minimalAccInfo.accountType}
          label={t(minimalAccInfo.fieldAccountType)}
          required
        />

        <TextField
          endAdornment={<Typography className={classes.parentDomain}>.hubbub.ai</Typography>}
          onChange={this.changeDomainCode}
          className={classes.fieldWithHelper}
          label={t(minimalAccInfo.fieldDomainCode)}
          value={minimalAccInfo.domainCode}
          error={this.isFieldInvalid(minimalAccInfo.fieldDomainCode)}
          helperText={t(this.getFieldErrorMessage(minimalAccInfo.fieldDomainCode))}
          required
        />

        <div className={classes.helper}>
          {minimalAccInfo.domainCode !== "" && !this.timer ? (
            this.validateDomain() ? (
              this.renderDomainAvailable()
            ) : (
              this.renderDomainNotAvailable()
            )
          ) : (
            <Typography className={classes.textHelperDone}>&nbsp;</Typography>
          )}
        </div>

        <TextField
          value={minimalAccInfo.companyName}
          onChange={this.handleChange(minimalAccInfo.setCompanyName)}
          className={classes.field}
          label={t(minimalAccInfo.fieldCompanyName)}
          error={this.isFieldInvalid(minimalAccInfo.fieldCompanyName)}
          helperText={t(this.getFieldErrorMessage(minimalAccInfo.fieldCompanyName))}
          required
        />

        <br />
        <br />
        <br />

        <Text variant="subtitle" className={classes.field}>
          {t("accountHolder")}
        </Text>

        <TextField
          value={minimalAccInfo.firstName}
          onChange={this.handleChange(minimalAccInfo.setFirstName)}
          className={classes.field}
          label={t("contactFirstName")}
          error={this.isFieldInvalid(minimalAccInfo.fieldFirstName)}
          helperText={t(this.getFieldErrorMessage(minimalAccInfo.fieldFirstName))}
          required
        />

        <TextField
          value={minimalAccInfo.lastName}
          onChange={this.handleChange(minimalAccInfo.setLastName)}
          className={classes.field}
          label={t("contactLastName")}
          error={this.isFieldInvalid(minimalAccInfo.fieldLastName)}
          helperText={t(this.getFieldErrorMessage(minimalAccInfo.fieldLastName))}
          required
        />

        <TextField
          value={minimalAccInfo.email}
          onChange={this.handleChange(minimalAccInfo.setEmail)}
          className={classes.field}
          label={t("contactEmail")}
          error={this.isFieldInvalid(minimalAccInfo.fieldEmail)}
          helperText={t(this.getFieldErrorMessage(minimalAccInfo.fieldEmail))}
          required
        />

        <TextField
          value={minimalAccInfo.workNo}
          onChange={this.handleChange(minimalAccInfo.setWorkNo)}
          className={classes.field}
          label={t("contactPhoneNumber")}
          error={this.isFieldInvalid(minimalAccInfo.fieldWorkNo)}
          helperText={t(this.getFieldErrorMessage(minimalAccInfo.fieldWorkNo))}
          required
        />

        <br />
        <br />
      </>
    );

    // Dialog Footer
    const DialogFooter = (
      <HubbubDialogFooter
        onClose={onClose}
        blocked={!this.hasAllRequiredFields()}
        onConfirm={this.handleCreate}
        onCancel={onClose}
        onFailure={errors => this.setState({ errors })}
        confirmLabel={this.props.t("create")}
      />
    );

    return (
      <HubbubDialog
        onClose={onClose}
        open={true}
        maxWidth="md"
        dialogHeader={DialogHeader} // Header
        dialogContent={DialogContent} // Content
        dialogFooter={DialogFooter} // Footer
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "PreCreateAccountDialog" })(
    translate("accounts")(PreCreateAccountDialog)
  )
);
