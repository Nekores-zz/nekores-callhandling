/**
 * Created by Noah on 07.28.2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { ConfirmButtons, Text, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/LoginCommons/ResetPasswordForm";

class ResetPasswordForced extends Component {
  static propTypes = {
    submitUrl: PropTypes.string,
    errors: PropTypes.array,

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
    errors: this.props.errors
  };

  checkValidation = event => {
    const updatedValidation = this.getValidation();
    this.setState({ validation: updatedValidation });
    if (!this.isFormValid(updatedValidation)) {
      event.preventDefault();
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
      {errors.map(error => {
        return (
          <Text key={error.key} variant="errorMessage">
            {this.props.t(error.key, {data: error.data.count})}
            <br />
          </Text>
        );
      })}
    </div>
  );

  render = () => {
    const { classes, submitUrl, t } = this.props;
    const { password, passwordRepeat, validation, errors } = this.state;

    return (
      <Grid container spacing={0}>
        {errors ? this.renderErrors(errors) : null}

        <form
          id="reset_form"
          action={submitUrl}
          method="POST"
          className={classes.form}
          onSubmit={this.checkValidation}
        >
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
            isSubmit={true}
            className={classes.buttons}
            confirmLabel={t("resetButton")}
            onConfirm={() => {}}
            blocked={this.shouldBlock()}
          />
        </form>
      </Grid>
    );
  };
}

export default withStyles(styleSheet, { name: "ResetPasswordForced" })(
  translate("login")(ResetPasswordForced)
);
