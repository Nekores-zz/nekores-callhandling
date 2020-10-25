/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], oct-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Grid, Checkbox, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/CellTypes/SimpleMenuCell";

class CellAvatarWrapper extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isHover: PropTypes.bool.isRequired,
    isSelectionMode: PropTypes.bool.isRequired,
    isMobileLayout: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func,
    children: PropTypes.any.isRequired,

    classes: PropTypes.object.isRequired
  };

  render = () => {
    const {
      rowData,
      isSelected,
      isHover,
      isSelectionMode,
      isMobileLayout,
      handleToggle,
      children,

      classes
    } = this.props;

    return (
      <Grid
        item
        onClick={
          (isSelectionMode && isMobileLayout) || !handleToggle
            ? () => {}
            : event => {
                event.stopPropagation();
                handleToggle(rowData);
              }
        }
      >
        {!!handleToggle &&
        (isSelected || (isHover && !isMobileLayout) || (isSelectionMode && isMobileLayout)) ? (
          <Checkbox checked={!!isSelected} disableRipple className={classes.icon} />
        ) : (
          children
        )}
      </Grid>
    );
  };
}

export default withStyles(styleSheet, { name: "CellAvatarWrapper" })(CellAvatarWrapper);
