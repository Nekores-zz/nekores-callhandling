/**
 * by A. Prates, may-2018
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import MUIChipInput from "material-ui-chip-input";
import { styleSheet } from "jss/LayoutElements/ChipInput";

class ChipInput extends PureComponent {
  static propTypes = {
    value: PropTypes.array,
    label: PropTypes.string,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    name: PropTypes.string,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.any.isRequired
  };

  render() {
    const { value, label, onAdd, onDelete, name, className, fullWidth, classes } = this.props;

    return (
      <MUIChipInput
        value={value}
        onAdd={onAdd}
        onDelete={onDelete}
        className={clsx(className, { [classes.fullWidth]: fullWidth })}
        name={name}
        label={label}
        newChipKeyCodes={[13, 186, 188]}
        classes={{
          input: classes.input,
          label: classes.label,
          error: classes.inputError,
          underline: classes.underline
        }}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "ChipInput" })(ChipInput);
