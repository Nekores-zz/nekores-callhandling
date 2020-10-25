/**
 * by A. Prates, mar-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Icon,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import { styleSheet } from "jss/Numbers/NumbersDialogs/ReleaseNumberRow";

class DialogNumberRow extends Component {
  static propTypes = {
    number: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { number, classes } = this.props;

    return (
      <ListItem divider className={classes.numberRow}>
        <ListItemIcon className={classes.warningIcon}>
          <Icon>warning</Icon>
        </ListItemIcon>

        <ListItemText
          primary={<Typography className={classes.number}>{number.number}</Typography>}
        />

        <ListItemSecondaryAction className={classes.service}>
          <Icon className={classes.flashIcon}>flash_on</Icon> {number.serviceName}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styleSheet, { name: "DialogNumberRow" })(DialogNumberRow);
