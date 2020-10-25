import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { ChipInput } from "components";
import { styleSheet } from "jss/NumbersManagement/NumbersElements/InputNumbers";

class InputNumbers extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  changeValue = newValue =>
    this.props.onChange({
      target: {
        name: this.props.name,
        value: newValue
      }
    });

  addChip = chip => {
      if(!!Number(chip))
          this.changeValue([...this.props.value, Number(chip)]);
  };

  delChip = chip => this.changeValue(this.props.value.filter(v => v !== Number(chip)));

  render() {
    const { value, label, classes } = this.props;

    return (
      <div className={classes.include}>
        <ChipInput
          value={value}
          onAdd={this.addChip}
          onDelete={this.delChip}
          className={classes.includeChipInput}
          label={label}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "InputNumbers" })(InputNumbers);
