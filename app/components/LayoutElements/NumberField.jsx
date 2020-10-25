import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { TextField as MUITextField, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/NumberField";

class NumberField extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    label: PropTypes.string,
    endAdornment: PropTypes.any,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.any.isRequired,
    errorHelper: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    maxLength: PropTypes.number
  };

  handleChange = event => {
    let value = event.target.value.replace(/(\D|^[0])/g, "");
    let maxLength = this.props.maxLength
      ? this.props.maxLength
      : this.props.max
      ? this.props.max.toString().length
      : undefined;
    let originalValue = Number.parseInt(maxLength ? value.substring(0, maxLength) : value) || 0;
    console.log(originalValue);
    if (
      this.props.min !== undefined <= originalValue ||
      this.props.max !== undefined >= originalValue
    ) {
      this.props.onChange(originalValue);
    } else if (originalValue === 0) {
      this.props.onChange(originalValue);
    } else {
      this.props.onChange(originalValue);
    }
  };

  render() {
    let {
      value,
      onChange,
      label,
      readOnly,
      className,
      classes,
      endAdornment,
      fullWidth,
      errorHelper,
      min,
      max,
      ...props
    } = this.props;

    return (
      <MUITextField
        value={value || ""}
        onChange={this.handleChange}
        label={label}
        /// todo : detect browsers
        // pattern="\d*"
        InputProps={{
          endAdornment,
          classes: {
            input: classes.input,
            error: classes.inputError,
            underline: classes.underline
          },
          inputProps: { readOnly: !!readOnly }
        }}
        InputLabelProps={{
          FormLabelClasses: { asterisk: classes.asterisk, root: classes.label },
          error: false,
          focused: false
        }}
        FormHelperTextProps={{ classes: { error: classes.errorMessage }, error: errorHelper }}
        className={clsx(className, { [classes.fullWidth]: fullWidth })}
        {...props}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "NumberField" })(NumberField);
