/**
 * Created by Andrzej on 02.02.2018.
 * reviewed by Antonio on jul-2018
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { HorizontalDivider } from "components";
import SocialNetworks from "../LoginCommons/Buttons/SocialNetworks";
import LoginForm from "../LoginCommons/LoginForm/LoginForm";
import LoginLinks from "../LoginCommons/LoginLinks/LoginLinks";
import LoginHeader from "../LoginCommons/LoginHeader/LoginHeader";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/LoginSimple";

class LoginSimple extends Component {
  static propTypes = {
    submitUrl: PropTypes.string,
    error: PropTypes.string,
    username: PropTypes.string,
    //submitHandler: PropTypes.func.isRequired,

    poweredBy: PropTypes.objectOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      submitUrl,
      error,
      username,
      rememberPassword,
      poweredBy,
      links,
      classes,
      t
    } = this.props;

    return (
      <Grid item md={12} lg={12} xl={12} className={classes.loginComponent}>
        <Paper elevation={2} className={classes.paper}>
          <LoginHeader classes={{ container: classes.titleWrapper }} text={t("login")} />

          <SocialNetworks />

          <HorizontalDivider className={classes.divider} text={t("or")} />

          <LoginForm
            submitUrl={submitUrl}
            error={error}
            username={username}
            rememberPassword={rememberPassword}
          />
        </Paper>

        <LoginLinks poweredBy={poweredBy} links={links} />
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "LoginSimple" })(translate("common")(LoginSimple));
