/**
 * Created by Andrzej on 02.02.2018.
 * updated by A. Prates, jun-2019
 * updated by Noah, july-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, withStyles } from "@material-ui/core";
import ResetPasswordHeader from "./ResetPasswordCommons/ResetPasswordHeader";
import LoginLinks from "../LoginCommons/LoginLinks/LoginLinks";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordForced from "./ResetPasswordForced";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/ResetPasswordForm";
import { poweredBy, links } from "utils/links";

class ResetPassword extends Component {
  static propTypes = {
    isVerified: PropTypes.bool,
    isResetForced: PropTypes.bool,
    isCreateMode: PropTypes.bool.isRequired,
    welcomeMessage: PropTypes.string,
    submitHandler: PropTypes.func,
    submitUrl: PropTypes.string,
    policy: PropTypes.object,

    poweredBy: PropTypes.objectOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    poweredBy,
    links
  };

  render() {
    const {
      isResetForced,
      isVerified,
      isCreateMode,
      welcomeMessage,
      submitHandler,
      submitUrl,
      poweredBy,
      links,
      policy,
      classes,
      t
    } = this.props;

    return (
      <Grid item md={4} lg={4} xl={4} className={classes.loginComponent}>
        <Paper elevation={2} className={classes.paper}>
          <ResetPasswordHeader
            classes={{ container: classes.titleWrapper }}
            text={isCreateMode ? t("defineYourPassword") : t("resetYourPassword")}
            subtitle={t("createNewPasswordMsg")}
            welcomeMessage={welcomeMessage}
          />

          {isVerified ? (
            !isResetForced ? (
              <ResetPasswordForm submitHandler={submitHandler} policy={policy} />
            ) : (
              // if you want to test the errors, please add `errors={["name"]}` as props
              <ResetPasswordForced submitUrl={submitUrl} errors={this.props.errors} />
            )
          ) : null}
        </Paper>
        <LoginLinks poweredBy={poweredBy} links={links} />
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "ResetPassword" })(translate("login")(ResetPassword));
