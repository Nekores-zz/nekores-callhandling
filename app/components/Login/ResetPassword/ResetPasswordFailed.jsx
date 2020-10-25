/**
 * Created by Noah on 07.25.2019.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
import { SubmitButton, Text } from "components";
import LoginLinks from "../LoginCommons/LoginLinks/LoginLinks";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/ResetPasswordFailed";
import { poweredBy, links } from "utils/links";
import { renderGeneralErrors } from "utils/errors";

class ResetPasswordFailed extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,

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
    const { poweredBy, links, classes, submitHandler, t } = this.props;
    let renderErrors = renderGeneralErrors(this.props.t, this.props.errors);

    console.log(this.props.errors);
    return (
      <Grid item md={4} lg={4} xl={4} sm={8} xs={9} className={classes.loginComponent}>
        <Paper elevation={2} className={classes.paper}>
          <Grid item lg={12} className={classes.inputWrapper}>
            {renderErrors(
              (error, errorText, index) => (
                <Typography key={error.key} variant="h3" className={classes.expiredTitle}>
                  {errorText}
                </Typography>
              ),
              errorsHtml => (
                <div>{errorsHtml}</div>
              )
            )}

            <Typography variant="h6" className={classes.subTitle}>
              {t("requestInvitation")}
            </Typography>
          </Grid>
          <Grid item className={classes.submitWrapper}>
            <SubmitButton className={classes.requestButtons} onClick={submitHandler}>
              {t("requestInvitationBtn")}
            </SubmitButton>
          </Grid>
        </Paper>
        <LoginLinks poweredBy={poweredBy} links={links} />
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "ResetPasswordFailed" })(
  translate("login")(ResetPasswordFailed)
);
