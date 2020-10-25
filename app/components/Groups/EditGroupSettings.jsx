import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { ConfirmButtons, ConfirmDialog, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Groups/CreateGroup";

class EditGroupSettings extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    selectedGroup: PropTypes.object.isRequired,
    handleBack: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    name: this.props.selectedGroup.name,
    description: this.props.selectedGroup.description,
    errors: undefined,
    confirmDialog: false
  };

  handleChange = prop => event => this.setState({ [prop]: event.target.value });

  ///// CONFIRM DELETE GROUP DIALOG SETUP /////

  deleteUser = () => this.props.deleteUser().then(response => {});

  closeConfirmDeleteGroupDialog = () => this.setState({ confirmDialog: false });

  openConfirmDeleteGroupDialog = () => this.setState({ confirmDialog: true });

  ConfirmDeleteGroupDialog = () =>
    this.state.confirmDialog ? (
      <ConfirmDialog
        dialogMessage={this.props.t("thisGroupWillBeDeletedMsg", {
          name: this.props.selectedGroup.name
        })}
        confirmMessage={this.props.t("iUnderstandDeleteGroupMsg", {
          name: this.props.selectedGroup.name
        })}
        selectedItems={[]}
        inverted={false}
        onCancel={this.closeConfirmDeleteGroupDialog}
        onConfirm={this.props.deleteHandler}
      />
    ) : null;

  //////

  submitHandler = () => {
    this.props
      .submitHandler({
        name: this.state.name,
        description: this.state.description
      })
      .catch(errors => {
        this.setState({ errors });
      });
  };

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  render() {
    const { submitHandler, handleBack, classes, t } = this.props;
    const { name, description } = this.state;
    const ConfirmDeleteGroupDialog = this.ConfirmDeleteGroupDialog;

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
                onAltAction={this.openConfirmDeleteGroupDialog}
                altActionLabel={t("delGroup")}
              />
            </Paper>
          </div>
        </Grid>
        <ConfirmDeleteGroupDialog />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "EditGroupSettings" })(
  translate("groups")(EditGroupSettings)
);
