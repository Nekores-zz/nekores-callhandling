import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Checkbox,
  Chip,
  Grid,
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
import { styleSheet } from "jss/Security/RowElements/RoleRow";

class GroupListRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    isItemSelected: PropTypes.func.isRequired,
    handleToggleItem: PropTypes.func.isRequired,
    openItemItemsDialog: PropTypes.func,
    viewMode: PropTypes.string.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    open: false
  };

  render() {
    const { item, handleToggleItem, openItemItemsDialog, classes, t } = this.props;

    const isItemSelected = this.props.isItemSelected(item);

    return (
      <ListItem
        divider
        key={item.id}
        onClick={this.handleToggleDropdown}
        className={classes.GroupListRow}
      >
        {isItemSelected ? (
          <div className={classes.checkboxDiv}>
            <Checkbox
              onClick={() => {
                handleToggleItem(item);
              }}
              checked={true}
              className={classes.checkbox}
            />
          </div>
        ) : (
          <div
            onClick={() => {
              handleToggleItem(item);
            }}
            className={classes.avatarDiv}
          >
            <ListItemAvatar className={classes.avatar}>
              <ListAvatar color={item.id} name={item.name} />
            </ListItemAvatar>
          </div>
        )}

        <ListItemText
          primary={
            <Fragment>
              <Typography className={classes.roleName}>{item.name}</Typography>
            </Fragment>
          }
        />

        <ListItemSecondaryAction className={classes.listActions}>
          <IconButton
            className={classes.marginTopItem}
            onClick={() => {
              handleToggleItem(item);
            }}
          >
            {!isItemSelected ? <Icon>add_circle_outline</Icon> : <Icon>highlight_off</Icon>}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styleSheet, { name: "GroupListRow" })(
  translate("security")(GroupListRow)
);
