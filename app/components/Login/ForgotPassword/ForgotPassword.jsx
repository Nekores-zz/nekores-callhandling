/**
 * Created by Andrzej on 02.02.2018.
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { ConfirmButtons, HorizontalDivider, TextField, Text } from "components";
import LoginHeader from "../LoginCommons/LoginHeader/LoginHeader";
import LoginLinks from "../LoginCommons/LoginLinks/LoginLinks";
// import QuestionsForm from "../ForgotPassword/QuestionsForm/QuestionsForm";
// import { forgotPasswordQuestions } from "config/mockData";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/ForgotPassword";

class ForgotPassword extends Component {
  static propTypes = {
    welcomeMessage: PropTypes.string,
    submitHandler: PropTypes.func.isRequired,

    poweredBy: PropTypes.objectOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    email: "",
    errors: null
  };

  // toggleQuestionsVisibility = () => this.setState({ questionActive: !this.state.questionActive });

  // updateQuestionAnswers = answers => {
  //   console.log("updateQuestionAnswers: " + JSON.stringify(answers));
  //   this.setState({ questionAnswers: answers });
  // };

  // isQuestionFormValid = () => {
  //   const { questionAnswers } = this.state;
  //   let valid = true;

  //   let validate = function(item) {
  //     if (typeof item === "string" && item.length === 0) {
  //       return false;
  //     }

  //     if (Array.isArray(item) && item.join("").length !== item.length) {
  //       return false;
  //     }

  //     return true;
  //   };

  //   if (Object.keys(questionAnswers).length > 0) {
  //     const { inputsDirty, ...questions } = questionAnswers;
  //     Object.values(questions).forEach(item => {
  //       valid = valid && validate(item);
  //     });
  //   }

  //   return valid;
  // };

  // isEmailValid = email => {
  //   if (email.length > 0) {
  //     return email.length > 0 && isEmail(email);
  //   }
  //   return false;
  // };

  // isValid = () => {
  //   if (this.state.questionActive) {
  //     return this.isQuestionFormValid();
  //   } else {
  //     return this.isEmailValid(this.state.email);
  //   }
  // };

  submitHandler = () => this.props.submitHandler(this.state.email);

  shouldBlock = () => !this.state.email;

  inputChange = event => this.setState({ [event.target.name]: event.target.value });

  getFieldErrorMessage = fieldName => {
    let fieldError =
      (this.state.errors &&
        this.state.errors.formErrors &&
        this.state.errors.formErrors[fieldName]) ||
      (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

    return fieldError;
  };

  isFieldInvalid = fieldName => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  renderErrors = error => (
    <div>
      <Text variant="errorMessage">
        {this.props.t(error)}
        <br />
      </Text>
    </div>
  );

  render = () => {
    const { welcomeMessage, poweredBy, links, classes, t } = this.props;
    const { email } = this.state;
    const otherError = this.getFieldErrorMessage("domainCode");
    return (
      <Grid item md={12} lg={12} xl={12} className={classes.loginComponent}>
        <Paper elevation={2} className={classes.paper}>
          <LoginHeader
            classes={{ container: classes.titleWrapper }}
            text={t("forgotPassword?")}
            subtitle={t("emailMeReset")}
            welcomeMessage={welcomeMessage}
          />
          {otherError ? this.renderErrors(otherError) : null}
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <br />

              <TextField
                onChange={this.inputChange}
                name="email"
                type="email"
                label={t("email")}
                value={email}
                helperText={t(this.getFieldErrorMessage("email"))}
                error={this.isFieldInvalid("email")}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          {/* <HorizontalDivider className={classes.divider} text={t("or")} />
          <QuestionsForm
            hidden={!questionActive}
            onAnswersChange={this.updateQuestionAnswers}
            toggleQuestionsVisibility={this.toggleQuestionsVisibility}
            questions={forgotPasswordQuestions}
          /> */}

          <br />
          <br />

          <ConfirmButtons
            className={classes.buttons}
            confirmLabel={t("next")}
            onConfirm={this.submitHandler}
            blocked={this.shouldBlock()}
            onSuccess={response => this.setState({ email: "" })} // display success / navigate
            onFailure={errors => this.setState({ errors })}
          />
        </Paper>
        <LoginLinks poweredBy={poweredBy} links={links} />
      </Grid>
    );
  };
}

export default withStyles(styleSheet, { name: "ForgotPassword" })(
  translate("login")(ForgotPassword)
);
