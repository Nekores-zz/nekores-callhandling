/**
 * Created by Noah on 07.25.2019.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Divider, Grid, Paper, Link, withStyles, Typography } from "@material-ui/core";
import { ConfirmButtons, Text, TextField, Box, Collapse, HorizontalDivider } from "components";
import { IconButton, Icon } from "components/Elements";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/ResetPasswordInit";
import ResetPasswordInitLogin from "./ResetPasswordInitLogin";
import LoginLinks from "../LoginCommons/LoginLinks/LoginLinks";
import { poweredBy, links } from "utils/links";
import { renderGeneralErrors } from "utils/errors";

class ResetPasswordInit extends Component {
  static propTypes = {
    isVerified: PropTypes.bool,
    isWelcomeBlock: PropTypes.bool,
    submitHandler: PropTypes.func.isRequired,
    policy: PropTypes.object.isRequired,

    poweredBy: PropTypes.objectOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    poweredBy,
    links
  };

  state = {
    createPassword: "",
    confirmPassword: "",
    validation: {
      createPassword: { valid: true, message: "" },
      confirmPassword: { valid: true, message: "" }
    },
    errors: null,
    expandedErrors: false
  };

  submitHandler = () => {
    // Check validation
    const updatedValidation = this.getValidation();
    this.setState({ validation: updatedValidation });

    if (!this.isFormValid(updatedValidation)) {
      return new Promise((resolve, reject) => {
        reject(null);
      });
    }

    return this.props.submitHandler(this.state.createPassword, this.state.confirmPassword);
  };

  shouldBlock = () => !this.state.createPassword || !this.state.confirmPassword;

  passwordsEqual = () => this.state.createPassword === this.state.confirmPassword;

  validate = fieldName => {
    if (!this.passwordsEqual()) return { valid: false, message: "passwordsNotEqual" };
    return { valid: true, message: "" };
  };

  getValidation = () => ({
    createPassword: this.validate("createPassword"),
    confirmPassword: this.validate("confirmPassword")
  });

  isFormValid = validation => validation.createPassword.valid || validation.confirmPassword.valid;

  loginInputChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  // renderErrors = errors => (
  //   <div>
  //     <br />
  //     <Text variant="secondarySmallBody">{this.props.t("youMissedRules")}</Text>
  //     <br />
  //     {errors.map(key => {
  //       return (
  //         <Text key={key} variant="errorMessage">
  //           {this.props.t(key, { data: this.props.policy[key] })}
  //         </Text>
  //       );
  //     })}
  //     <br />
  //     <Icon onClick={this.clearErrors} className={this.props.classes.clearButton}>
  //       refresh
  //     </Icon>
  //   </div>
  // );

  clearErrors = () => this.setState({ errors: null });

  toggleExpandErrors = () => {
    this.setState({ expandedErrors: !this.state.expandedErrors });
  };

  render = () => {
    const { isVerified, isWelcomeBlock, poweredBy, links, classes, policy, t } = this.props;
    const { createPassword, confirmPassword, validation, expandedErrors, errors } = this.state;
    let renderErrors = renderGeneralErrors(t, errors); //For general error, see error.js

    return (
      <Grid item xs={10} sm={6} md={7} lg={7} className={classes.loginComponent}>
        <Paper elevation={2} className={classes.paper} spacing={0}>
          {isWelcomeBlock && !expandedErrors && (
            <Grid item xs={12} sm={12} md={6} lg={6} className={classes.welcomePage}>
              <Grid item lg={12} className={classes.welcomeInputWrapper}>
                <Typography variant="h3" className={classes.welcomeTitle}>
                  {t("welcomeTitle")}
                </Typography>

                <Typography variant="h6" className={classes.subTitle}>
                  {t("welcomeSubTitle")}
                </Typography>

                <Typography className={classes.welcomeText}>
                  {t("welcomeTextBefore")}

                  <Link className={classes.welcomeTextRequest} underline="none">
                    {t("welcomeTextRequest")}
                  </Link>

                  {t("welcomeTextAfter")}
                </Typography>
              </Grid>
            </Grid>
          )}
          {expandedErrors && (
            <Grid item xs={12} sm={12} md={6} lg={6} className={classes.errorPanel}>
              {renderErrors(
                (error, errorText, index) => (
                  <Box key={error.key} paddingTop>
                    <Icon className={classes.errorIcon}>error</Icon>
                    <Text variant="errorMessage" className={classes.errorMessage}>
                      {t(error.key, { data: policy[error.key] })}
                    </Text>
                  </Box>
                ),
                errorsHtml => (
                  <Box paddingDouble classes={{ box: classes.errorBody }}>
                    <div>{errorsHtml}</div>
                  </Box>
                )
              )}
            </Grid>
          )}
          {isVerified && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container direction="column" className={classes.createPasswordPage}>
                <Grid item>
                  <Grid container>
                    <div className={classes.form} spacing={16}>
                      <Grid item xs={12} className={classes.formInputWrapper}>
                        <Grid item xs={12} className={classes.formInputWrapper}>
                          <TextField
                            onChange={this.loginInputChange}
                            name="createPassword"
                            type="password"
                            label={t("createPassword")}
                            value={createPassword}
                            helperText={t(validation.createPassword.message)}
                            error={!validation.createPassword.valid}
                            fullWidth
                            required
                          />
                        </Grid>

                        <Grid item xs={12} className={classes.formInputWrapper}>
                          <TextField
                            onChange={this.loginInputChange}
                            name="confirmPassword"
                            type="password"
                            label={t("confirmPassword")}
                            value={confirmPassword}
                            helperText={t(validation.confirmPassword.message)}
                            error={!validation.confirmPassword.valid}
                            fullWidth
                            required
                          />
                        </Grid>
                        {renderErrors(
                          (error, errorText, index) => (
                            <Box
                              key={error.key}
                              paddingTop
                              // classes={{box:classes.errorShortRow}}
                            >
                              <Text variant="errorMessage" className={classes.errorShortMessage}>
                                {t(error.key, { data: policy[error.key] })}
                              </Text>
                            </Box>
                          ),
                          errorsHtml => (
                            <Grid
                              item
                              xs={12}
                              className={clsx(classes.formInputWrapper, classes.errorWrapper)}
                            >
                              <Grid container direction="row">
                                <Grid item lg={12} xs={12}>
                                  <Text
                                    variant="secondarySmallBody"
                                    className={classes.errorHeaderTitle}
                                  >
                                    {this.props.t("youMissedRules")}
                                  </Text>
                                </Grid>
                              </Grid>
                              <br />
                              {!expandedErrors && (
                                <div className={classes.errorShortBody}>{errorsHtml}</div>
                              )}
                              <div>
                                <Text
                                  onClick={this.toggleExpandErrors}
                                  className={classes.expandButton}
                                >
                                  {expandedErrors ? t("less") : t("more")}
                                </Text>
                              </div>
                            </Grid>
                          )
                        )}
                        <ConfirmButtons
                          subClassName={classes.confirmButton}
                          confirmLabel={t("resetButton")}
                          onConfirm={this.submitHandler}
                          blocked={this.shouldBlock()}
                          onSuccess={response => console.log(response)} // display success / navigate
                          onFailure={errors =>
                            this.setState({ errors: errors, expandedErrors: false })
                          }
                        />
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
        <LoginLinks poweredBy={poweredBy} links={links} />
      </Grid>
    );
  };
}

export default withStyles(styleSheet, { name: "ResetPasswordInit" })(
  translate("login")(ResetPasswordInit)
);
