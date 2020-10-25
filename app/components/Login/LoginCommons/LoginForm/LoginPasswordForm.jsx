/**
 * Created by Andrzej on 05.02.2018.
 * updaded by A. Prates on jul-2018
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  withStyles
} from "@material-ui/core";
import { TextField } from "components";
import { styleSheet } from "jss/Login/LoginCommons/LoginPasswordForm";

class LoginPasswordForm extends Component {
  state = {
    password: "",
    inputsDirty: [],
    rememberPassword: true,
    error: this.props.error
  };

  submitHandler = event => {
    event.preventDefault();
    console.log("Form submit", this.props.username, this.state.password);
  };

  isFieldEmpty = name => {
    return this.state[name] ? this.state[name].length === 0 : true;
  };

  toggleRememberPassword = () => {
    this.setState({ rememberPassword: !this.state.rememberPassword });
  };

  isFieldDirty = name => {
    return this.state.inputsDirty.indexOf(name) !== -1;
  };

  isFieldInvalid = name => {
    return this.isFieldEmpty(name) && this.isFieldDirty(name);
  };

  setFieldDirty = inputName => {
    let value = this.state[inputName];
    let inputsDirtyTmp = [...this.state.inputsDirty];

    let index = inputsDirtyTmp.indexOf(inputName);

    if (index === -1 && value.length === 0) {
      inputsDirtyTmp.push(inputName);
    }

    this.setState({
      inputsDirty: inputsDirtyTmp
    });
  };

  isFormValid = () => {
    // Simple validation
    // @todo more specified validation in future
    return this.state.password;
  };

  loginInputChange = event => {
    let inputName = event.target.name;
    let value = event.target.value;

    this.setState(
      {
        [inputName]: value,
        error: undefined
      },
      event => this.setFieldDirty(inputName)
    );
  };

  render() {
    const { classes, className } = this.props;
    const { password } = this.state;

    return (
      <Grid container spacing={0} className={className}>
        <Divider classes={{ root: classes.divider }} />
        <form
          action={this.props.submitUrl}
          method="POST"
          className={classes.form}
        >
          <input type="hidden" name="username" value={this.props.username} />
          <Grid item xs={12} className={classes.inputWrapper}>
            <TextField
              onChange={this.loginInputChange}
              name="password"
              fullWidth
              type="password"
              label="Password"
              value={password}
              helperText={
                this.isFieldInvalid("password")
                  ? "Please complete this field"
                  : this.state.error || ""
              }
              error={this.isFieldInvalid("password") || !!this.state.error}
              required
              autoComplete="current-password"
            />
          </Grid>

          <Grid item xs={12} className={classes.rememberPassword}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.rememberPassword}
                  value="1"
                  onChange={this.toggleRememberPassword}
                  color="secondary"
                  name="remember"
                />
              }
              label="Remember Me"
            />
          </Grid>
          <Grid item xs={12} className={classes.formFooter}>
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <a href="#" className={classes.summaryLink}>
                  Forgot your password?
                </a>
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.nextButton}
                  disabled={!this.isFormValid()}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "LoginPasswordForm" })(
  LoginPasswordForm
);
