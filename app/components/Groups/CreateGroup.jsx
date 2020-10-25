import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { ConfirmButtons, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Groups/CreateGroup";

class CreateGroup extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    name: "",
    description: "",
    errors: undefined
  };

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  handleChange = prop => event => this.setState({ [prop]: event.target.value });

  render() {
    const { submitHandler, handleBack, classes, t } = this.props;
    const { name, description } = this.state;

    return (
      <div className={classes.pageContent}>
        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <Paper elevation={4} className={classes.paper}>
              <TextField
                value={name}
                onChange={this.handleChange("name")}
                className={classes.textField}
                label={t("groupName")}
                error={this.isFieldInvalid("name")}
                helperText={t(this.getFieldErrorMessage("name"))}
                required
              />
              <br />
              <br />

              <TextField
                value={description}
                onChange={this.handleChange("description")}
                className={classes.textField}
                label={t("description")}
                multiline
                required
              />
              <br />
              <br />

              <ConfirmButtons
                className={classes.buttons}
                onConfirm={() =>
                  submitHandler({
                    name: name,
                    description: description
                  })
                }
                onFailure={errors => this.setState({ errors })}
                onCancel={handleBack}
              />
            </Paper>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "CreateGroup" })(translate("groups")(CreateGroup));
