/**
 * by A. Prates, jan-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Grid,
  Hidden,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  withStyles
} from "@material-ui/core";
import { PrimaryTextButton, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Users/UserElements/EmailItem";

class EmailItem extends Component {
  static propTypes = {
    emailData: PropTypes.object.isRequired,
    resendInvite: PropTypes.func.isRequired,
    cancelOrFinishAddEmail: PropTypes.func,
    manageEmail: PropTypes.shape({
      addEmail: PropTypes.func.isRequired,
      updateEmail: PropTypes.func.isRequired,
      removeEmail: PropTypes.func.isRequired,
      markPrimaryEmail: PropTypes.func.isRequired
    }),
    mode: PropTypes.string,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    mode: this.props.mode === "add" ? "add" : "view",
    emailContent: ""
  };

  renderEmailActivatedOn = email => {
    const { classes, t } = this.props;

    return email.isActivated ? (
      <Fragment>
        <span className={classes.activated}>● Activated on: </span>
        {t("date", {
          date: ScalaDate.tsToDate(email.createdAt)
        })}
      </Fragment>
    ) : (
      "The last invite sent has now expired"
    );
  };

  renderInviteSentOn = email => {
    const date = this.props.t("date", {
      date: ScalaDate.tsToDate(email.createdAt)
    });
    return "Invite sent on: " + date;
  };

  handleEditMode = event => {
    const { emailData } = this.props;
    this.setState({ mode: "edit", emailContent: emailData.email });
  };

  cancelEditMode = event => this.setState({ mode: "view" });

  saveFromEditMode = event => {
    this.props.manageEmail
      .updateEmail(this.props.emailData.email, this.state.emailContent)
      .then(response => {
        this.setState({ response: response, mode: "view" });
      })
      .catch(response => {
        this.setState({ response });
      });
  };

  handleResendInvite = email => event => {
    if (this.props.resendInvite !== undefined) {
      this.props
        .resendInvite(email)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  cancelOrFinishAddEmail = event => {
    this.props.cancelOrFinishAddEmail();
  };

  handleMarkPrimaryEmail = email => {
    this.props.manageEmail
      .markPrimaryEmail(email)
      .then(response => {
        this.setState({ response });
      })
      .catch(response => {
        this.setState({ response });
      });
  };

  saveFromAddMode = event => {
    this.props.manageEmail
      .addEmail(this.state.emailContent)
      .then(response => {
        this.setState({ response: response }, () => this.cancelOrFinishAddEmail(event));
      })
      .catch(response => {
        this.setState({ response: response });
      });
  };

  removeEmail = email => event => {
    this.props.manageEmail
      .removeEmail(email)
      .then(response => {
        this.setState({ response: response });
      })
      .catch(response => {
        this.setState({ response: response });
      });
  };

  handleChange = event => {
    this.setState({ emailContent: event.target.value });
  };

  getFieldErrorMessage = fieldName =>
    (this.state.response &&
      this.state.response.formErrors &&
      this.state.response.formErrors[fieldName]) ||
    (this.state.response &&
      this.state.response.apiErrors &&
      this.state.response.apiErrors[fieldName]);

  isFieldInvalid = fieldName => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  renderActionsForNonVerifiedEmail = emailData => {
    const { classes, t } = this.props;
    return (
      <Grid container justify="flex-end" spacing={16}>
        <Grid item>
          <PrimaryTextButton
            className={classes.listButton}
            onClick={this.handleEditMode}
            denseRight
          >
            {t("changeEmail")}
          </PrimaryTextButton>
        </Grid>

        <Grid item>
          <PrimaryTextButton
            className={classes.listButton}
            onClick={this.handleResendInvite(emailData.email)}
            denseRight
          >
            {t("reSendInvite")}
          </PrimaryTextButton>
        </Grid>
      </Grid>
    );
  };

  renderActionsForVerifiedEmail = emailData => {
    const { classes, t } = this.props;

    return (
      <Grid container justify="flex-end" spacing={16}>
        <Grid item>
          <PrimaryTextButton
            className={classes.listButton}
            onClick={() => this.handleMarkPrimaryEmail(emailData.email)}
            denseRight
          >
            {t("makePrimary")}
          </PrimaryTextButton>
        </Grid>

        <Grid item>
          <PrimaryTextButton
            className={classes.listButton}
            onClick={this.removeEmail(emailData.email)}
            denseRight
          >
            {t("remove")}
          </PrimaryTextButton>
        </Grid>

        {/* Original design for remove button was the below code:
        <Grid item>
          <IconButton onClick={() => {}}>
            <Icon>clear</Icon>
          </IconButton>
        </Grid> */}
      </Grid>
    );
  };

  renderAddEmail = emailContent => {
    const { classes, t } = this.props;
    return (
      <TextField
        className={classes.textField}
        value={emailContent}
        onChange={this.handleChange}
        label={t("email")}
        name={"email"}
        error={this.isFieldInvalid("email")}
        helperText={t(this.getFieldErrorMessage("email"))}
      />
    );
  };

  renderActionsForAddEmail = () => {
    const { classes, t } = this.props;
    return (
      <Grid container justify="flex-end" spacing={16}>
        <Grid item>
          <PrimaryTextButton
            className={classes.listButton}
            onClick={this.saveFromAddMode}
            denseRight
          >
            {t("add")}
          </PrimaryTextButton>
        </Grid>

        <Grid item>
          <PrimaryTextButton
            className={classes.listButton}
            onClick={this.cancelOrFinishAddEmail}
            denseRight
          >
            {t("cancel")}
          </PrimaryTextButton>
        </Grid>
      </Grid>
    );
  };

  renderEditEmail = emailContent => {
    const { classes, t } = this.props;
    return (
      <TextField
        className={classes.textField}
        value={emailContent}
        onChange={this.handleChange}
        label={t("email")}
        name={"email"}
        error={this.isFieldInvalid("email")}
        helperText={t(this.getFieldErrorMessage("email"))}
      />
    );
  };

  renderActionsForEditEmail = () => {
    const { classes, t } = this.props;
    return (
      <Grid container justify="flex-end" spacing={16}>
        <Grid item>
          <PrimaryTextButton
            className={classes.listButton}
            onClick={this.saveFromEditMode}
            denseRight
          >
            {t("save")}
          </PrimaryTextButton>
        </Grid>

        <Grid item>
          <PrimaryTextButton
            className={classes.listButton}
            onClick={this.cancelEditMode}
            denseRight
          >
            {t("cancel")}
          </PrimaryTextButton>
        </Grid>
      </Grid>
    );
  };

  renderActions = (emailData, mode) => {
    /* TODO This should be render based on user's permission */
    if (mode === "view") {
      if (
        (emailData.isPrimary && emailData.isActivated === false) ||
        (emailData.isActivated === false && emailData.isPrimary === false)
      )
        return this.renderActionsForNonVerifiedEmail(emailData);
      else if (emailData.isActivated && emailData.isPrimary === false)
        return this.renderActionsForVerifiedEmail(emailData);
    } else if (mode === "edit") {
      return this.renderActionsForEditEmail();
    } else if (mode === "add") {
      return this.renderActionsForAddEmail();
    }
    return null;
  };

  render() {
    const { emailData, classes, t } = this.props;
    const { mode, emailContent } = this.state;

    return (
      <Fragment>
        <Divider />
        <ListItem className={classes.listItem}>
          {mode === "view" ? (
            <ListItemText
              primary={emailData.isPrimary ? emailData.email + " " + "(Primary)" : emailData.email}
              secondary={
                emailData.isActivated
                  ? this.renderEmailActivatedOn(emailData)
                  : this.renderInviteSentOn(emailData)
              }
            />
          ) : mode === "edit" ? (
            this.renderEditEmail(emailContent)
          ) : mode === "add" ? (
            this.renderAddEmail(emailContent)
          ) : null}
          <Hidden xsDown>
            <ListItemSecondaryAction>{this.renderActions(emailData, mode)}</ListItemSecondaryAction>
          </Hidden>
        </ListItem>
        <Hidden smUp>
          <ListItem>{this.renderActions(emailData, mode)}</ListItem>
        </Hidden>
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "EmailItem" })(translate("users")(EmailItem));
