import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { TextField as MUITextField, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/TextField";

class TextField extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    endAdornment: PropTypes.any,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.any.isRequired,
    errorHelper: PropTypes.bool,
    type: PropTypes.string
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
      type,
      ...props
    } = this.props;

    return (
      <MUITextField
        value={value}
        onChange={onChange}
        type={type}
        label={label}
        InputProps={{
          endAdornment,
          classes: {
            input: classes.input,
            error: classes.inputError,
            underline: classes.underline
          },
          inputProps: { readOnly: !!readOnly },
        }}
        InputLabelProps={{
          FormLabelClasses: { asterisk: classes.asterisk, root: classes.label },
          error: false,
          focused: false
        }}
        FormHelperTextProps={{ classes: { error: classes.errorMessage }, error: errorHelper, }}
        className={clsx(className, { [classes.fullWidth]: fullWidth })}
        {...props}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "TextField" })(TextField);
