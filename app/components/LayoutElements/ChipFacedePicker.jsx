/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jan-2019 - oct-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Chip, Icon, InputAdornment, withStyles } from "@material-ui/core";
import { Holder, TextField } from "components";
import { styleSheet } from "jss/LayoutElements/ChipFacedePicker";

class ChipFacedePicker extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    textValue: PropTypes.string.isRequired, // displayed when empty
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    icon: PropTypes.string,
    selectedItems: PropTypes.array,
    chipSecondaryColor: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  adornment = (
    <InputAdornment position="end">
      <Icon className={this.props.classes.inputAdornmentIcon}>
        {this.props.icon ? this.props.icon : "edit"}
      </Icon>
    </InputAdornment>
  );

  render = () => {
    const {
      label,
      textValue,
      onClick,
      onDelete,
      selectedItems,
      chipSecondaryColor,
      className,
      classes
    } = this.props;

    return (
      <>
        {!selectedItems || !selectedItems.length ? (
          <TextField
            onClick={onClick}
            label={label}
            value={textValue}
            className={clsx(classes.emptyField, className)}
            endAdornment={this.adornment}
            classes={{ label: classes.label, input: classes.input }}
            readOnly
          />
        ) : (
          <Holder onClick={onClick} label={label} className={className} adornment={this.adornment}>
            {selectedItems &&
              selectedItems.map((item, index) => (
                <Chip
                  key={index}
                  label={item.getName ? item.getName : item.name}
                  onDelete={onDelete ? onDelete(item) : undefined}
                  classes={{ root: classes.chip }}
                  color={chipSecondaryColor ? "secondary" : undefined}
                />
              ))}
          </Holder>
        )}
      </>
    );
  };
}

export default withStyles(styleSheet, { name: "ChipFacedePicker" })(ChipFacedePicker);
