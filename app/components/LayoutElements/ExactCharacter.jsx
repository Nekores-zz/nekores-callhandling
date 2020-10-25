import React, { Component } from "react";
import { FormControl, FormLabel, TextField, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/ExactCharacter";

class ExactCharacter extends Component {
  state = {
    showInputs: false,
    value: Array(this.props.charsNumber).fill("")
  };

  inputOnChange = event => {
    const { value } = this.state;
    const updatedChar = event.target.value !== "" ? event.target.value[0] : "";
    const index = parseInt(event.target.getAttribute("data-index"), 10);
    const updatedValue = value.map((char, i) => (i === index ? updatedChar : char));

    this.setState({ value: updatedValue }, () => {
      const inputNodes = this.node.getElementsByTagName("input");
      if (updatedChar !== "" && inputNodes && inputNodes[index + 1]) {
        inputNodes[index + 1].focus();
      } else if (updatedChar === "" && inputNodes && inputNodes[index - 1]) {
        inputNodes[index - 1].focus();
        inputNodes[index - 1].setSelectionRange(0, 1);
      }
    });
  };

  focusOnFirstInput = () => {
    const inputNodes = this.node.getElementsByTagName("input");
    if (inputNodes && inputNodes.length) {
      inputNodes[0].focus();
    }
  };

  handleClick = () => {
    const { showInputs } = this.state;
    if (!showInputs) {
      document.addEventListener("click", this.handleOutsideClick, false);
      this.setState({ showInputs: true }, this.focusOnFirstInput);
    }
  };

  handleOutsideClick = event => {
    if (this.node && !this.node.contains(event.target)) {
      this.setState({
        showInputs: false
      });
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
  };

  render() {
    const { classes, label, className, required, error } = this.props;
    const { value, showInputs } = this.state;

    return (
      <div
        className={`${classes.wrapper} ${className}`}
        ref={node => {
          this.node = node;
        }}
      >
        <FormControl fullWidth>
          <FormLabel
            error={error}
            focused={showInputs}
            classes={{
              root: classes.label,
              focused: classes.labelFocused,
              error: classes.labelError
            }}
            style={{ width: "100%", display: "inline-block" }}
            onClick={this.handleClick}
            htmlFor="name-simple"
            required={required}
          >
            {label}
          </FormLabel>
          {showInputs && (
            <div className={classes.inputsWrapper}>
              {value.map((char, index) => {
                return (
                  <TextField
                    key={index}
                    inputProps={{
                      maxLength: 1,
                      "data-index": index
                    }}
                    InputProps={{
                      classes: {
                        input: classes.input,
                        error: classes.inputError,
                        underline: classes.underline
                      }
                    }}
                    value={char}
                    onChange={this.inputOnChange}
                    type="password"
                    placeholder="X"
                    classes={{
                      root: classes.inputWrapper
                    }}
                  />
                );
              })}
            </div>
          )}
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ExactCharacter" })(ExactCharacter);
