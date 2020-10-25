import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { translate } from "react-i18next";
import { Text } from "components";

class ResetPasswordWelcomePage extends Component {
  renderErrors = errors => (
    <div>
      {Object.keys(errors).map(key => {
        console.log(key);
        return (
          <Text key={key} variant="errorMessage">
            {this.props.t(errors[key])}
            <br />
          </Text>
        );
      })}
    </div>
  );

  render = () => {
    const { errors } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <span> {this.props.t("verifyingTokenMessage")}</span>
          {errors && this.renderErrors(errors)}
        </Grid>
      </Grid>
    );
  };
}

export default translate("login")(ResetPasswordWelcomePage);
