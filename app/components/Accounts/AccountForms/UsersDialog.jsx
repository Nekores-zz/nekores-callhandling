/**
 * No need to refactor this Dialog Module, Coz, it is not used anywhere. #Sajid U.
 */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormControlLabel,
  IconButton,
  Icon,
  withStyles,
  withWidth
} from "@material-ui/core";
import { PrimaryTextButton, ConfirmButtons, Text, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/UsersDialog";

class UsersDialog extends Component {
  static propTypes = {
    getEmptyUser: PropTypes.func.isRequired,
    validateInviteUser: PropTypes.func.isRequired,
    accountHolder: PropTypes.object,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    open: false,
    inviteUser: this.props.getEmptyUser(),
    errors: null,
    isAccHolder: false
  };

  handleClickOpen = () => this.setState({ open: true });

  handleChange = setter => event => this.setState({ inviteUser: setter(event.target.value) });

  validateInviteUser = () =>
    this.props.validateInviteUser(
      this.state.isAccHolder ? this.props.accountHolder : this.state.inviteUser
    );

  handleClose = () =>
    this.setState({
      open: false,
      inviteUser: this.props.getEmptyUser(),
      errors: null,
      isAccHolder: false
    });

  getFieldErrorMessage = fieldName => {
    const fieldError =
      (this.state.errors &&
        this.state.errors.formErrors &&
        this.state.errors.formErrors[fieldName]) ||
      (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);
    return fieldError;
  };

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  toggleCheckbox = event => this.setState({ isAccHolder: event.target.checked });

  render() {
    const { accountHolder, width, classes, t } = this.props;
    const { open, inviteUser, isAccHolder } = this.state;
    const fullScreen = width === "sm" || width === "xs";

    return (
      <Fragment>
        <PrimaryTextButton className={classes.inviteTypo} onClick={this.handleClickOpen}>
          {t("invite")}
        </PrimaryTextButton>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          classes={!fullScreen ? { paper: classes.dialogPaper } : undefined}
        >
          <DialogTitle className={classes.dialogTitle}>
            <div className={classes.typoWrapper}>
              <Text variant="modalHeader">{t("invite")}</Text>
              <IconButton className={classes.close} onClick={this.handleClose}>
                <Icon>close</Icon>
              </IconButton>
            </div>
          </DialogTitle>

          <DialogContent className={classes.dialogContent}>
            <TextField
              className={classes.marginField}
              onChange={this.handleChange(inviteUser.setFirstName)}
              label={t(inviteUser.fieldFirstName)}
              value={isAccHolder && accountHolder ? accountHolder.firstName : inviteUser.firstName}
              error={this.isFieldInvalid(inviteUser.fieldFirstName)}
              helperText={t(this.getFieldErrorMessage(inviteUser.fieldFirstName))}
              disabled={isAccHolder}
              fullWidth
              required
            />

            <TextField
              className={classes.marginField}
              onChange={this.handleChange(inviteUser.setLastName)}
              label={t(inviteUser.fieldLastName)}
              value={isAccHolder && accountHolder ? accountHolder.lastName : inviteUser.lastName}
              error={this.isFieldInvalid(inviteUser.fieldLastName)}
              helperText={t(this.getFieldErrorMessage(inviteUser.fieldLastName))}
              disabled={isAccHolder}
              fullWidth
              required
            />

            <TextField
              className={classes.marginField}
              onChange={this.handleChange(inviteUser.setEmail)}
              label={t(inviteUser.fieldEmail)}
              value={isAccHolder && accountHolder ? accountHolder.email : inviteUser.email}
              error={this.isFieldInvalid(inviteUser.fieldEmail)}
              helperText={t(this.getFieldErrorMessage(inviteUser.fieldEmail))}
              disabled={isAccHolder}
              fullWidth
              required
            />

            {accountHolder ? (
              <FormControlLabel
                className={classes.marginField}
                control={
                  <Checkbox
                    checked={isAccHolder}
                    onChange={this.toggleCheckbox}
                    value={"isAccHolder"}
                  />
                }
                label={t("useAccHolderDetails")}
              />
            ) : null}
          </DialogContent>

          <DialogActions>
            <ConfirmButtons
              className={classes.buttons}
              confirmLabel={t("inviteBtn")}
              onConfirm={event => this.validateInviteUser(event)}
              onFailure={errors => this.setState({ errors })}
              onSuccess={this.handleClose}
              onCancel={this.handleClose}
            />
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet, { name: "UsersDialog" })(translate("accounts")(UsersDialog))
);
