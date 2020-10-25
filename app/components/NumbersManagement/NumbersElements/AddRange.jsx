import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  withStyles
} from "@material-ui/core";
import { TextField } from "components";
import { InputNumbers } from "components/NumbersManagement";
import { translate } from "react-i18next";
import { styleSheet } from "jss/NumbersManagement/NumbersElements/AddRange";

class AddRange extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    getNumberRange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
      isCheckedExcludedNumbers: false,
      numberRange: undefined
  };

  handleChange = setter => event => {
      const newNumRange  = setter(event.target.value);
      this.setState({ numberRange: newNumRange });
  };

  handleClick = () => {
    this.setState({
      excludeNumbers: !this.state.excludeNumbers
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onChange(event);
  };

  toggleCheckbox = name => event => {
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    const { 
        onChange,
        classes, t } = this.props;
    const {
        isCheckedExcludedNumbers,
        to,
        from,
        excludedNumbers
    } = this.state;

    return (
      <div>
        <TextField
          value={from}
          name={"from"}
          onChange={this.handleChange}
          className={classes.textField}
          label={t("from")}
        />
        <TextField
          value={to}
          name={"to"}
          onChange={this.handleChange}
          className={classes.textField}
          label={t("to")}
        />

        <div className={classes.checkBoxes}>
          <FormGroup className={classes.formGroup}>
            <FormControlLabel
              classes={{
                label: classes.checkboxLabel
              }}
              control={
                <Checkbox
                  checked={isCheckedExcludedNumbers}
                  classes={{
                    checked: classes.checkboxChecked
                  }}
                  onChange={this.toggleCheckbox("isCheckedExcludedNumbers")}
                />
              }
              label={t("excludeNumbers")}
            />
          </FormGroup>
        </div>

        {isCheckedExcludedNumbers && (
          <InputNumbers
            name={"excludedNumbers"}
            value={excludedNumbers}
            label={t("excludeNumbers")}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AddRange" })(
  translate("numbers")(AddRange)
);
