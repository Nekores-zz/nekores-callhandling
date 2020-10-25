/**
 * Created by Andrzej on 05.02.2018.
 * updaded by A. Prates on jul-2018
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Grid, withStyles } from "@material-ui/core";
import { ConfirmButtons, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/LoginCommons/LoginForm";

class LoginForm extends Component {
  static propTypes = {
    submitUrl: PropTypes.string,
    error: PropTypes.string,
    username: PropTypes.string,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    username: this.props.username || "",
    password: "",
    error: this.props.error,
    rememberPassword: this.props.rememberPassword
  };

  toggleRememberPassword = () => this.setState({ rememberPassword: !this.state.rememberPassword });

  // submitHandler = event => event.preventDefault();

  submitHandler = () => {};

  shouldBlock = () => !this.state.username || !this.state.password;

  loginInputChange = event =>
    this.setState({
      [event.target.name]: event.target.value,
      error: null
    });

  redirectOnForgetPasswordPage = () => {
    const location = window.location;
    const domain = location.pathname.split("/").filter(f => f !== "");
    if (domain.length !== 0) {
      return location.protocol + "//" + domain[0] + ":30863/profiles/forgot_password";
    } else "#";
  };

  render = () => {
    const { classes, submitUrl, t } = this.props;
    const { username, password, rememberPassword } = this.state;

    return (
      <Grid container spacing={0}>
        <form action={submitUrl} method="POST" className={classes.form}>
          <Grid item xs={12} className={classes.inputWrapper}>
            <TextField
              onChange={this.loginInputChange}
              name="username"
              label={t("emailOrUsername")}
              value={username}
              helperText={t(this.state.error) || ""}
              error={!!this.state.error}
              autoComplete="username"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} className={classes.inputWrapper}>
            <TextField
              onChange={this.loginInputChange}
              name="password"
              type="password"
              label={t("password")}
              value={password}
              autoComplete="current-password"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} className={classes.rememberPassword}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberPassword}
                  onChange={this.toggleRememberPassword}
                  value="rememberPassword"
                  color="secondary"
                />
              }
              name="remember"
              label={t("rememberPassword")}
            />
          </Grid>

          <Grid item xs={12} className={classes.formFooter}>
            <div>
              <div>
                <a href={this.redirectOnForgetPasswordPage()} className={classes.summaryLink}>
                  {t("forgotPassword?")}
                </a>
              </div>

              <ConfirmButtons
                className={classes.buttons}
                confirmLabel={t("next")}
                onConfirm={this.submitHandler}
                blocked={this.shouldBlock()}
                isSubmit // forces a classic form submit action
              />
            </div>
          </Grid>
        </form>
      </Grid>
    );
  };
}

export default withStyles(styleSheet, { name: "LoginForm" })(translate("login")(LoginForm));
