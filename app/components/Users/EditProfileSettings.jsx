import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Divider,
  FormControlLabel,
  List,
  Paper,
  Radio,
  Typography,
  withStyles
} from "@material-ui/core";
import { ConfirmDialog, Pending, PrimaryTextButton, Select, TextField } from "components";
import { EmailItem } from "./UserElements";
import Status from "./Status";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Users/EditProfileSettings";

class EditProfileSettings extends Component {
  static propTypes = {
    userProfile: PropTypes.object,
    errors: PropTypes.object,
    isActive: PropTypes.bool,
    userEmailsData: PropTypes.object,
    classes: PropTypes.object.isRequired,
    resendInvite: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    managePassword: PropTypes.shape({
      resetPasswordRequestForUser: PropTypes.func.isRequired,
      updatePassword: PropTypes.func.isRequired
    }),
    manageEmail: PropTypes.shape({
      addEmail: PropTypes.func.isRequired,
      updateEmail: PropTypes.func.isRequired,
      removeEmail: PropTypes.func.isRequired,
      markPrimaryEmail: PropTypes.func.isRequired
    })
  };

  state = {
    isActive: this.props.isActive,
    mode: "view",
    selectedEmailData: undefined,
    newPassword: "",
    confirmPassword: "",
    showPwd: false,
    confirmDialog: false
  };

  updateMode = mode => this.setState({ mode: mode });

  toggleShowPwd = () => this.setState({ showPwd: !this.state.showPwd });

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getPrimaryEmail = userEmails => {
    return userEmails.find(email => email.isPrimary);
  };

  handleUpdatePassword = event => {
    const { newPassword, confirmPassword } = this.state;
    this.props.managePassword
      .updatePassword(newPassword, confirmPassword)
      .then(response => {
        console.log("Success Response");
        console.log(response);
        this.setState({ response });
      })
      .catch(response => {
        console.log("Failed Response");
        console.log(response);
        this.setState({ response });
      });
    event.preventDefault();
  };

  handleResetPasswordViaEmail = defaultEmailData => event => {
    this.props.managePassword
      .resetPasswordRequestForUser((this.state.selectedEmailData || defaultEmailData).email)
      .then(response => {
        console.log("Success Response");
        console.log(response);
        this.setState({ response });
      })
      .catch(response => {
        console.log("Failed Response");
        console.log(response);
        this.setState({ response });
      });
  };

  handleOneTimePassword = emailData => event => {
    //this.handlePassword(emailData.email);
  };

  handleAddNewEmail = event => {
    this.updateMode("add");
  };

  cancelOrFinishAddEmail = () => {
    this.updateMode("view");
  };

  handleCancelInvite = () => {};

  ///// CONFIRM DELETE USER DIALOG SETUP /////

  deleteUser = () => this.props.deleteUser().then(response => {});

  closeConfirmDeleteUserDialog = () => this.setState({ confirmDialog: false });

  openConfirmDeleteUserDialog = () => this.setState({ confirmDialog: true });

  ConfirmDeleteUserDialog = () =>
    this.state.confirmDialog ? (
      <ConfirmDialog
        dialogMessage={this.props.t("thisUserWillBeDeletedMsg")}
        confirmMessage={this.props.t("iUnderstandDeletUserMsg")}
        selectedItems={[]}
        inverted={false}
        onCancel={this.closeConfirmDeleteUserDialog}
        onConfirm={this.deleteUser}
      />
    ) : null;

  //////

  handleManagePasswordChange = typeOfOption => event => {
    this.setState({ selectedEmailData: undefined }, () =>
      this.props.handlePasswordOptions(typeOfOption)
    );
  };

  handleChange = fieldName => event => {
    this.setState({ [fieldName]: event.target.value });
  };

  getFieldErrorMessage = fieldName =>
    (this.state.response &&
      this.state.response.formErrors &&
      this.state.response.formErrors[fieldName]) ||
    (this.state.response &&
      this.state.response.apiErrors &&
      this.state.response.apiErrors[fieldName]);

  isFieldInvalid = fieldName => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  handleSelect = selectedEmailData => {
    this.setState({ selectedEmailData: selectedEmailData });
  };

  getSelectedEmailData = defaultEmailData => {
    return this.state.selectedEmailData || defaultEmailData;
  };

  renderResetPasswordViaEmail = () => {
    const { classes, userProfile, userEmailsData, t } = this.props;
    const emailData = this.getPrimaryEmail(this.props.userEmailsData.data.userEmails);
    return (
      <div className={classes.managePasswordForm}>
        <Select
          onChange={this.handleSelect}
          value={this.getSelectedEmailData(emailData)}
          options={userEmailsData.data.userEmails.filter(emailData => emailData.isActivated)}
          getKey={emailOptions => emailOptions.email}
          renderOption={emailOptions => emailOptions.email}
          name={userProfile.email}
          label={t("selectEmail")}
          displayEmpty={false}
          className={classes.select}
        />
        <Typography className={classes.hintText}>{t("msgActive48h")}</Typography>
        <PrimaryTextButton onClick={this.handleResetPasswordViaEmail(emailData)} denseLeft>
          {t("sendPassword")}
        </PrimaryTextButton>
      </div>
    );
  };

  renderUpdatePassword = () => {
    const { classes, t } = this.props;
    const { showPwd, newPassword, confirmPassword } = this.state;
    const emailData = this.getPrimaryEmail(this.props.userEmailsData.data.userEmails);

    return (
      <form className={classes.managePasswordForm} method="post">
        <input
          // This "hidden" text input is for password manangers to use.
          // Chrome dev tools recommended it for better user experience.
          value={emailData.email}
          name="username"
          id="username"
          autoComplete="username"
          type="text"
          style={{ display: "none" }}
          readOnly
        />
        <TextField
          className={classes.textField}
          value={newPassword}
          onChange={this.handleChange("newPassword")}
          label={t("newPassword")}
          name={"newPassword"}
          error={this.isFieldInvalid("password")}
          helperText={t(this.getFieldErrorMessage("password"))}
          type={showPwd ? "text" : "password"}
          autoComplete="new-password"
        />
        <br />
        <TextField
          className={classes.textField}
          value={confirmPassword}
          onChange={this.handleChange("confirmPassword")}
          label={t("confirmPassword")}
          name={"confirmPassword"}
          error={this.isFieldInvalid("passwordRepeat")}
          helperText={t(this.getFieldErrorMessage("passwordRepeat"))}
          type={showPwd ? "text" : "password"}
          autoComplete="new-password"
        />
        <br />
        <PrimaryTextButton onClick={this.toggleShowPwd} denseLeft>
          {t(showPwd ? "hide" : "show")}
        </PrimaryTextButton>
        <PrimaryTextButton
          // ATENTION: This button should be type="submit" and it would
          // be good to allow it to reload page, so password mananger
          // knows that the password was updated and tryies to
          // store user data. Please do not use event.preventDefault()
          // on handleUpdatePassword function in this particular case.
          type="submit"
          onClick={this.handleUpdatePassword}
          denseRight
        >
          {t("save")}
        </PrimaryTextButton>
      </form>
    );
  };

  renderUseTemporaryPassword = () => {
    const { classes, t } = this.props;
    const emailData = this.getPrimaryEmail(this.props.userEmailsData.data.userEmails);

    return (
      <div className={classes.managePasswordForm}>
        <Typography className={classes.hintText}>{t("msgActive48h")}</Typography>
        <PrimaryTextButton onClick={this.handleOneTimePassword(emailData)} denseLeft>
          {t("resetTempPwd")}
        </PrimaryTextButton>
      </div>
    );
  };

  renderManageEmails = data => {
    const { classes, t } = this.props;

    return (
      <Fragment>
        <Typography
          variant="subtitle1"
          align="left"
          className={clsx(classes.sectionHeader, classes.marginBottomSmall)}
        >
          {t("manageEmails")}
        </Typography>

        <List
          classes={{
            root: clsx(classes.marginTopSmall, classes.marginBottomSmall)
          }}
        >
          {data.userEmails.map((emailData, index) => (
            <EmailItem
              key={index}
              emailData={emailData}
              manageEmail={this.props.manageEmail}
              resendInvite={this.props.resendInvite}
            />
          ))}

          {this.state.mode === "add" ? (
            <Fragment>
              <EmailItem
                key={"add_email"}
                emailData={{ email: "" }}
                cancelOrFinishAddEmail={this.cancelOrFinishAddEmail}
                manageEmail={this.props.manageEmail}
                resendInvite={this.props.resendInvite}
                mode="add"
              />
            </Fragment>
          ) : null}
          <Divider />
        </List>

        <PrimaryTextButton
          className={classes.listButton}
          onClick={this.handleAddNewEmail}
          denseLeft
        >
          {t("addNewEmail")}
        </PrimaryTextButton>
      </Fragment>
    );
  };

  renderActivatedOn = () => {
    const { classes, userProfile } = this.props;

    return (
      <Typography className={classes.hintText}>
        Activated on:{" "}
        <span className={classes.bold}>
          {this.props.t("date", {
            date: ScalaDate.tsToDate(userProfile.invitedAt)
          })}
        </span>
      </Typography>
    );
  };

  renderManagePassWord = data => {
    //const { password, managePassword } = this.state;
    const { typeOfOption, classes, t } = this.props;

    return (
      <Fragment>
        {this.renderActivatedOn()}
        <br />
        <br />
        <br />

        <Typography
          variant="subtitle1"
          align="left"
          className={clsx(classes.sectionHeader, classes.marginBottomSmall)}
        >
          {t("managePwd")}
        </Typography>
        {Object.keys(this.managePassword).map(key => (
          <div key={key}>
            <FormControlLabel
              value={key}
              control={
                <Radio
                  checked={typeOfOption === this.managePassword[key].typeOfOption}
                  onChange={this.handleManagePasswordChange(this.managePassword[key].typeOfOption)}
                  color="secondary"
                />
              }
              label={t(this.managePassword[key].label)}
              classes={{ root: classes.managePasswordOption }}
            />
            {typeOfOption === this.managePassword[key].typeOfOption
              ? this.managePassword[key].form()
              : null}
          </div>
        ))}
        <br />
        <br />

        {this.renderManageEmails(data)}
      </Fragment>
    );
  };

  renderResendInvite = data => {
    const { classes, t } = this.props;
    const primaryEmail = this.getPrimaryEmail(data.userEmails);

    return (
      <Fragment>
        <Typography className={classes.hintText}>
          Last invite sent on{" "}
          <span className={classes.bold}>
            {this.props.t("date", {
              date: ScalaDate.tsToDate(primaryEmail.createdAt)
            })}
          </span>
        </Typography>
        <br />
        <br />
        <br />

        <Typography
          variant="subtitle1"
          align="left"
          className={clsx(classes.sectionHeader, classes.marginBottomSmall)}
        >
          {t("manageEmails")}
        </Typography>

        <List
          classes={{
            root: clsx(classes.marginTopSmall, classes.marginBottomSmall)
          }}
        >
          <EmailItem
            emailData={primaryEmail}
            manageEmail={this.props.manageEmail}
            resendInvite={this.props.resendInvite}
          />

          <Divider />
        </List>

        <PrimaryTextButton
          className={classes.deleteButton}
          onClick={this.openConfirmDeleteUserDialog}
          denseLeft
        >
          {t("delUser")}
        </PrimaryTextButton>
      </Fragment>
    );
  };

  managePassword = {
    resetPassword: {
      typeOfOption: hubbub.globals.ManagePassword.ResetPassword,
      label: "requestForResetPassword",
      form: this.renderResetPasswordViaEmail
    },
    useTemporary: {
      typeOfOption: hubbub.globals.ManagePassword.Temporary,
      label: "useOnetimePwd",
      form: this.renderUseTemporaryPassword
    },
    updatePassword: {
      typeOfOption: hubbub.globals.ManagePassword.UpdatePassword,
      label: "updatePwd",
      form: this.renderUpdatePassword
    }
  };

  render() {
    const { classes, userProfile, userEmailsData, isActive, t } = this.props;

    const ConfirmDeleteUserDialog = this.ConfirmDeleteUserDialog;

    return (
      <div className={classes.pageContent}>
        <Paper className={classes.paper} elevation={4}>
          <Typography
            variant="subtitle1"
            align="left"
            className={clsx(classes.sectionHeader, classes.marginBottomMedium)}
          >
            {t("accountSettings")}
          </Typography>

          <Status status={userProfile.status} className={classes.status} />

          <Pending
            operationMode="diode"
            content={userEmailsData}
            onResponse={data =>
              isActive ? this.renderManagePassWord(data) : this.renderResendInvite(data)
            }
            fullWidth
          />
        </Paper>

        <ConfirmDeleteUserDialog />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "EditProfileSettings" })(
  translate("users")(EditProfileSettings)
);
