/**
 * Created by Noah on 07.25.2019.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/ResetPasswordFailed";
import LoginPagePattern from "pages/pagePatterns/LoginPagePattern";

class ResetPasswordLayout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired, // content

    classes: PropTypes.object.isRequired
  };

  render() {
    const { isLanding, accountName, children, t } = this.props;

    return (
      <LoginPagePattern isLanding={isLanding} accountName={accountName}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            {children}
          </Grid>
        </Grid>
      </LoginPagePattern>
    );
  }
}

export default withStyles(styleSheet, { name: "ResetPasswordLayout" })(
  translate("login")(ResetPasswordLayout)
);
