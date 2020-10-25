import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Login/QuestionsForm/QuestionsForm";
import Questions from "components/Login/ForgotPassword/QuestionsForm/Questions";
import { translate } from "react-i18next";

class QuestionsForm extends Component {
  render() {
    const {
      classes,
      questions,
      hidden,
      toggleQuestionsVisibility,
      onAnswersChange,
      t
    } = this.props;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <span
            onClick={toggleQuestionsVisibility}
            className={classes.questionsToggle}
          >
            {t("answerSecurityQuestions")}
          </span>
        </Grid>
        {!hidden && (
          <Questions
            updateQuestionAnswers={onAnswersChange}
            questions={questions}
          />
        )}
      </Grid>
    );
  }
}

QuestionsForm.defaultProps = {
  hidden: true,
  toggleQuestionsVisibility: function() {
    return false;
  }
};

export default withStyles(styleSheet, { name: "QuestionsForm" })(
  translate("login")(QuestionsForm)
);
