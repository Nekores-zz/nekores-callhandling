import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/SubmitButton";

class SubmitButton extends Component {
  render() {
    const { red, children, classes, submitHandler, wideButton, boxShadowNone, ...props } = this.props;

    return (
      <Button
        variant="contained"
        className={wideButton && classes.wideButton}
        classes={{
          root: red ? classes.submitButtonRed : classes.submitButton,
          disabled: red ? classes.submitButtonDisabledRed : classes.submitButtonDisabled
        }}
        onClick={submitHandler}
        {...props}
      >
        {children}
      </Button>
    );
  }
}

export default withStyles(styleSheet, { name: "SubmitButton" })(SubmitButton);
