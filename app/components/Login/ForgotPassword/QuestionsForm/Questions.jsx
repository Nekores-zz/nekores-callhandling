import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { TextField, ExactCharacter } from "components";
import isEmpty from "validator/lib/isEmpty";
import { isValidAndDirty } from "utils/inputs";
import { styleSheet } from "jss/Login/QuestionsForm/Questions";

class Questions extends Component {
  constructor(props) {
    super(props);

    // Initialize values of question form
    let newState = {};

    this.props.questions.forEach(item => {
      if (item.type === "exactCharacter") {
        newState[item.name] = Array(item.charsNumber).fill("");
      } else {
        newState[item.name] = "";
      }
    });

    this.state = {
      ...newState,
      inputsDirty: []
    };
  }

  updateQuestionAnswers = () => {
    this.props.updateQuestionAnswers(this.state);
  };

  isDirty = questionName => {
    return this.state.inputsDirty.indexOf(questionName) !== -1;
  };

  isValid = questionName => {
    return isValidAndDirty(isEmpty(this.state[questionName]), this.isDirty(questionName));
  };

  updateInputDirtyArray = name => {
    let inputsDirty = [];
    if (this.state.inputsDirty.indexOf(name) > -1) {
      inputsDirty = [...this.state.inputsDirty];
    } else {
      inputsDirty = [...this.state.inputsDirty, name];
    }

    return inputsDirty;
  };

  textInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(
      {
        [name]: value
        //inputsDirty: this.updateInputDirtyArray(name)
      }
      //this.updateQuestionAnswers
    );
  };

  exactCharacterChange = (name, value) => {
    console.log("exactCharacterChange name: " + name);
    console.log("exactCharacterChange value: " + value);

    // this.props.updateQuestionAnswers({
    //   [name]: value
    // });

    if (this.state[name] !== value) {
      this.setState(
        {
          [name]: value
          //inputsDirty: this.updateInputDirtyArray(name)
        }
        //this.updateQuestionAnswers
      );
    }
  };

  render() {
    const { classes, questions } = this.props;

    return (
      <Grid container spacing={0} className={classes.wrapper}>
        {questions.map((item, index) => {
          switch (item.type) {
            case "text":
              return (
                <TextField
                  key={index}
                  className={classes.questionWrapper}
                  name={item.name}
                  placeholder={item.text}
                  label={item.text}
                  value={this.state[item.name]}
                  onChange={this.textInputChange}
                  error={this.isValid(item.name)}
                  helperText={this.isValid(item.name) ? "This field is required" : ""}
                  type="password"
                  fullWidth
                  required
                />
              );
            case "exactCharacter":
              return (
                <ExactCharacter
                  key={index}
                  className={classes.questionWrapper}
                  onChange={this.exactCharacterChange}
                  name={item.name}
                  label={item.text}
                  charsNumber={item.charsNumber}
                  required
                />
              );
          }
        })}
      </Grid>
    );
  }
}

Questions.defaultProps = {
  updateQuestionAnswers: function() {
    return false;
  }
};

export default withStyles(styleSheet, { name: "Questions" })(Questions);
