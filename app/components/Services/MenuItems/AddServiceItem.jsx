/**
 * by A. Prates, feb-2018
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { MenuItem, Typography, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Services/MenuItem/ServiceItem";

class AddServiceItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { item, handleSelect, classes } = this.props;

    return (
      <MenuItem
        className={classes.menuItem}
        onClick={handleSelect(item)}
        divider
      >
        <div className={classes.label}>
          <Typography className={classes.primaryBody}>
            {item.label}
          </Typography>
        </div>
      </MenuItem>
    );
  }
}

export default withStyles(styleSheet, { name: "AddServiceItem" })(AddServiceItem);
