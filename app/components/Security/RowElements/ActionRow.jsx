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
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/RowElements/ActionRow";

class ActionRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    isItemSelected: PropTypes.func.isRequired,
    handleToggleItem: PropTypes.func.isRequired,
    viewMode: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      item,
      handleToggleItem,
      viewMode, // expected: "available" | "selected" | "compact"
      classes,
      t
    } = this.props;

    const isItemSelected = this.props.isItemSelected(item);

    return (
      <ListItem
        divider
        key={item.id}
        onClick={handleToggleItem(item)}
        className={classes.actionRow}
      >
        {isItemSelected && viewMode === "available" ? (
          <div className={classes.checkboxDiv}>
            <Checkbox checked={true} className={classes.checkbox} />
          </div>
        ) : (
          <div className={classes.avatarDiv}>
            <ListItemAvatar className={classes.avatar}>
              <ListAvatar color={item.id} name={item.name} />
            </ListItemAvatar>
          </div>
        )}

        <ListItemText
          primary={<Typography className={classes.actionName}>{item.name}</Typography>}
        />

        {viewMode === "compact" ? null : (
          <ListItemSecondaryAction className={classes.listActions}>
            {!isItemSelected ? (
              <IconButton className={classes.marginTopItem} onClick={handleToggleItem(item)}>
                <Icon>add_circle_outline</Icon>
              </IconButton>
            ) : viewMode === "selected" ? (
              <IconButton className={classes.marginTopItem} onClick={handleToggleItem(item)}>
                <Icon>highlight_off</Icon>
              </IconButton>
            ) : null}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default withStyles(styleSheet, { name: "ActionRow" })(translate("security")(ActionRow));
