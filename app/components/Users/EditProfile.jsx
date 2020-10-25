import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Avatar, Grid, Paper, Typography, withStyles } from "@material-ui/core";
import { TextField, PrimaryTextButton, SelectFile, ChipInput, ConfirmButtons } from "components";
import * as formFields from "./api/user";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Users/EditProfile";

class EditProfile extends Component {
  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    handleBack: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
    updateField: PropTypes.func.isRequired,
    onFilesChange: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.EDIT_USER_FORM
  };

  state = {
    noPhoto: this.props.userProfile.avatar === ""
  };

  navigate = url => () => {
    this.props.history.push(url);
  };

  handleCancel = () => {
    this.props.handleBack();
  };

  handleSave = () => {
    this.props
      .submitHandler(this.props.formName, {
        ...this.props.userProfile
      })
      .then(response => {
        console.log("Success Response");
        console.log(response);
        this.setState({ response });
      })
      .catch(response => {
        console.log("Failed Response");
        console.log(response);
        this.setState({ response });
      });
  };

  handleAddSkill = skill => {
    this.props.updateSkills(true, skill); //true mean adding skills
  };

  handleDeleteSkill = skill => {
    this.props.updateSkills(false, skill); //false mean removing skills
  };

  getFieldErrorMessage = fieldName => {
    const user =
      (this.state.response && this.state.response.formErrors && this.state.response.formErrors) ||
      (this.state.response && this.state.response.apiErrors && this.state.response.apiErrors);
    return user && user[fieldName];
  };

  isFieldInvalid = fieldName => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  updateField = data => {
    this.props.updateField(data.toScala());
  };

  handleFilesChange = files => {
    this.props.onFilesChange(files);
  };

  render() {
    const { userProfile: user, classes, t } = this.props;

    return (
      <div className={classes.pageContent}>
        <Paper className={classes.paper} elevation={4}>
          <Grid
            container
            direction="row"
            justify="space-between"
            spacing={40}
            className={classes.grid}
          >
            <Grid item className={classes.leftSidePanel}>
              <Typography className={classes.sectionHeader}>{t("generalDetails")}</Typography>
              <br />
              <br />

              <Typography className={classes.userFieldCaption}>{t("userId")}</Typography>
              <Typography className={clsx(classes.userFieldText, classes.marginBottomSmall)}>
                {user.id}
              </Typography>

              <TextField
                onChange={event => this.updateField(user.setFirstName(event.target.value))}
                value={user.firstName}
                name={user.fieldFirstName}
                label={t(user.fieldFirstName)}
                className={classes.marginBottom}
                error={this.isFieldInvalid(user.fieldFirstName)}
                helperText={this.getFieldErrorMessage(user.fieldFirstName)}
                fullWidth
                required
              />

              <TextField
                onChange={event => this.updateField(user.setLastName(event.target.value))}
                value={user.lastName}
                name={user.fieldLastName}
                label={t(user.fieldLastName)}
                className={classes.marginBottom}
                error={this.isFieldInvalid(user.fieldLastName)}
                helperText={this.getFieldErrorMessage(user.fieldLastName)}
                fullWidth
                required
              />

              <TextField
                onChange={event => this.updateField(user.setTelephone(event.target.value))}
                value={user.telephone}
                name={user.fieldTelephone}
                label={t(user.fieldTelephone)}
                className={classes.marginBottom}
                error={this.isFieldInvalid(user.fieldTelephone)}
                helperText={t(this.getFieldErrorMessage(user.fieldTelephone))}
                fullWidth
              />

              <TextField
                onChange={event => this.updateField(user.setMobile(event.target.value))}
                value={user.mobile}
                name={user.fieldMobile}
                label={t(user.fieldMobile)}
                className={classes.marginBottomLarge}
                error={this.isFieldInvalid(user.fieldMobile)}
                helperText={this.getFieldErrorMessage(user.fieldMobile)}
                fullWidth
              />

              <TextField
                onChange={event => this.updateField(user.setJobTitle(event.target.value))}
                value={user.jobTitle}
                fullWidth
                name={user.fieldJobTitle}
                label={t(user.fieldJobTitle)}
                className={classes.marginBottom}
                error={this.isFieldInvalid(user.fieldJobTitle)}
                helperText={this.getFieldErrorMessage(user.fieldJobTitle)}
              />

              <Typography className={classes.userFieldCaption}>{t(user.fieldSkills)}</Typography>
              <ChipInput
                value={user.skills}
                className={classes.chipInput}
                onAdd={this.handleAddSkill}
                onDelete={this.handleDeleteSkill}
                fullWidth
              />
            </Grid>

            <Grid item className={classes.rightSidePanel}>
              {this.state.noPhoto ? (
                <Fragment>
                  <Typography className={classes.sectionHeader}>{t("profilePicture")}</Typography>
                  <br />
                  <br />
                  <SelectFile
                    onFilesChange={this.handleFilesChange}
                    dndLabel={t("pictureDndLabel")}
                    className={classes.marginBottomMedium}
                    mode={"vertical"}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <Grid container justify="center">
                    <Avatar src={user.avatar} classes={{ root: classes.avatar }} />
                    <Grid container justify="center">
                      <PrimaryTextButton onClick={event => this.setState({ noPhoto: true })}>
                        <br />
                        {t("deletePhoto")}
                      </PrimaryTextButton>
                    </Grid>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Grid>

          <ConfirmButtons
            className={classes.buttons}
            onConfirm={this.handleSave}
            onCancel={this.handleCancel}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "EditProfile" })(translate("users")(EditProfile));
