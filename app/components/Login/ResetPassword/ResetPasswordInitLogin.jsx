/**
 * Created by Noah on 07.25.2019.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Typography, withStyles } from "@material-ui/core";
import { ConfirmButtons, SubmitButton } from "components";
import LoginLinks from "../LoginCommons/LoginLinks/LoginLinks";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/ResetPasswordInitLogin";
import GoogleIcon from "Icons/Google";
import FacebookIcon from "Icons/Facebook";

class ResetPasswordInitLogin extends Component {
  render() {
    const { classes, t } = this.props;

    return (
      <Grid
        container
        className={classes.buttonsContainer}
        justify="space-between"
        alignItems="stretch"
        direction="column"
      >
        <Grid item>
          <Button variant="contained" className={`${classes.googleButton} ${classes.button}`}>
            <GoogleIcon className={classes.icon} />
            <Typography className={`${classes.loginGoogle} ${classes.text}`}>
              {t("loginWithGoogle")}
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" className={`${classes.salesforceButton} ${classes.button}`}>
            <FacebookIcon className={classes.icon} />
            <Typography className={`${classes.loginSalesforce} ${classes.text}`}>
              {t("loginWithSF")}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "ResetPasswordInitLogin" })(
  translate("login")(ResetPasswordInitLogin)
);
