/**
 * Created by Noah on 07.25.2019.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
import LoginLinks from "../LoginCommons/LoginLinks/LoginLinks";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/PreLoadComponent";
import { Icon } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { poweredBy, links } from "utils/links";

class EmailVerifySuccess extends Component {
  static propTypes = {
    email: PropTypes.string,

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
    const { poweredBy, links, email, classes, t } = this.props;

    return (
      <Grid item md={4} lg={4} xl={4} sm={8} xs={9} className={classes.loginComponent}>
        <Paper elevation={2} className={classes.paper}>
          <Grid item lg={12} className={classes.inputWrapper}>
            <Icon className={classes.checkIcon}>check_circle</Icon>
            <Typography variant="h3" className={classes.successTitle}>
              {t("emailVerifySuccessPart1")}
              <br />
              <strong className={classes.emailAddress}>({email})</strong>
              <br />
              {t("emailVerifySuccessPart2")}
              {/* {t("emailVerifySuccess", { email: email })} */}
            </Typography>
          </Grid>
        </Paper>
        <LoginLinks poweredBy={poweredBy} links={links} />
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "EmailVerifySuccess" })(
  translate("login")(EmailVerifySuccess)
);
