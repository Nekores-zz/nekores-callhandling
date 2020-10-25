import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import { ListAvatar } from "components";
import { styleSheet } from "jss/Security/RowElements/UserRow";

class UserRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    isItemSelected: PropTypes.func.isRequired,
    handleToggleItem: PropTypes.func.isRequired,
    //openItemItemsDialog: PropTypes.func.isRequired,
    viewMode: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    isSelectedList: false
  };

  render() {
    const {
      item,
      handleToggleItem,
      viewMode, // expected: "available" | "selected" | "compact"
      classes
    } = this.props;

    const isItemSelected = this.props.isItemSelected(item);

    return (
      <ListItem divider key={item.id} onClick={handleToggleItem(item)} className={classes.userRow}>
        {isItemSelected && viewMode === "available" ? (
          <Checkbox checked={true} className={classes.checkbox} />
        ) : (
          <ListItemAvatar className={classes.checkbox}>
            <ListAvatar color={item.id} name={item.firstName + " " + item.lastName} />
          </ListItemAvatar>
        )}

        <ListItemText
          primary={
            <Typography className={classes.userName}>
              {item.firstName + " " + item.lastName}
            </Typography>
          }
          secondary={item.email}
        />

        {viewMode === "compact" ? null : (
          <ListItemSecondaryAction className={classes.listActions}>
            {!isItemSelected ? (
              <IconButton onClick={handleToggleItem(item)}>
                <Icon>add_circle_outline</Icon>
              </IconButton>
            ) : viewMode === "selected" ? (
              <IconButton onClick={handleToggleItem(item)}>
                <Icon>highlight_off</Icon>
              </IconButton>
            ) : null}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default withStyles(styleSheet, { name: "UserRow" })(UserRow);
