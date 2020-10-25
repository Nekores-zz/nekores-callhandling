/**
 * Created by Andrzej on 05.02.2018.
 * updated by A. Prates, jun-2019
 * updated by Noah, july-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { ConfirmButtons, Text, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/LoginCommons/ResetPasswordForm";
import { renderGeneralErrors } from "utils/errors";
class ResetPasswordForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    policy: PropTypes.object.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    // uncomment bellow lines to simulate errors on interface:
    // errors object can contain one or many items...
    // errors: {
    //   ensureMinChars: 5,
    //   ensureMaxChars: 20,
    //   ensureLowercase: 1,
    //   ensureUppercase: 1,
    //   ensureNumbers: 1,
    //   ensureSpecialNumber: 1,
    //   ensureSpecial: 1,
    //   meetComplexity: true,
    //   meetComplexityConsecutiveNumbers: true,
    //   meetComplexityFirstName: true,
    //   meetComplexityLastName: true,
    //   meetComplexityUsername: true,
    //   enforceMinimumAgeInDays: 1,
    //   enforceMaximumAgeInDays: 365,
    //   enforceHistory: 2,
    //   regularExpressions: [""]
    // },
    password: "",
    passwordRepeat: "",
    validation: {
      password: { valid: true, message: "" },
      passwordRepeat: { valid: true, message: "" }
    },
    errors: null
  };

  submitHandler = () => {
    const updatedValidation = this.getValidation();
    this.setState({ validation: updatedValidation });
    if (!this.isFormValid(updatedValidation)) {
      return new Promise((resolve, reject) => {
        reject(null);
      });
    } else {
      console.log("Form submit is ok, calling api...");
      return this.props.submitHandler(this.state.password, this.state.passwordRepeat);
    }
  };

  shouldBlock = () => !this.state.password || !this.state.passwordRepeat;

  passwordsEqual = () => this.state.password === this.state.passwordRepeat;

  // for now, we are not validating anything specific on UI, just checking if both fields are equal...
  validate = fieldName =>
    !this.passwordsEqual()
      ? {
          valid: false,
          message: "passwordsNotEqual"
        }
      : {
          valid: true,
          message: ""
        };

  getValidation = () => ({
    password: this.validate("password"),
    passwordRepeat: this.validate("passwordRepeat")
  });

  isFormValid = validation => validation.password.valid && validation.passwordRepeat.valid;

  inputChange = event => this.setState({ [event.target.name]: event.target.value });

  renderErrors = errors => (
    <div>
      <br />
      <br />
      <Text variant="secondarySmallBody">{this.props.t("youMissedRules")}</Text>
      <br />
      {errors.map(key => {
        return (
          <Text key={key} variant="errorMessage">
            {this.props.t(key, { data: this.props.policy[key] })}
            <br />
          </Text>
        );
      })}
    </div>
  );

  render = () => {
    const { classes, t } = this.props;
    const { password, passwordRepeat, validation, errors } = this.state;
    let renderErrors = renderGeneralErrors(this.props.t, this.props.errors);

    return (
      <Grid container spacing={0}>
        {renderErrors(
          (error, errorText, index) => (
            <Text key={error.key} variant="errorMessage">
              {errorText}
            </Text>
          ),
          errorsHtml => (
            <div>{errorsHtml}</div>
          )
        )}

        <form className={classes.form}>
          <Grid item xs={12} className={classes.inputWrapper}>
            <TextField
              onChange={this.inputChange}
              name="password"
              type="password"
              label={t("password")}
              value={password}
              helperText={t(validation.password.message)}
              error={!validation.password.valid}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} className={classes.inputWrapper}>
            <TextField
              onChange={this.inputChange}
              name="passwordRepeat"
              type="password"
              label={t("reEnterPassword")}
              value={passwordRepeat}
              helperText={t(validation.passwordRepeat.message)}
              error={!validation.passwordRepeat.valid}
              fullWidth
              required
            />
          </Grid>

          <br />
          <br />

          <ConfirmButtons
            className={classes.buttons}
            confirmLabel={t("resetButton")}
            onConfirm={this.submitHandler}
            blocked={this.shouldBlock()}
            onSuccess={response => console.log(response)} // display success / navigate
            onFailure={errors => {
              if (errors !== null || errors != undefined) {
                const errorsResult = errors.formErrors
                  ? Object.keys(errors.formErrors)
                  : errors.apiErrors
                  ? Object.keys(apiErrors)
                  : [];
                this.setState({ errors: errorsResult });
              }
            }}
          />
        </form>
      </Grid>
    );
  };
}

export default withStyles(styleSheet, { name: "ResetPasswordForm" })(
  translate("login")(ResetPasswordForm)
);
