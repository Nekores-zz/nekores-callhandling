import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
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
import { styleSheet } from "jss/Security/RowElements/PolicyRow";

class PolicyRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    isItemSelected: PropTypes.func.isRequired,
    handleToggleItem: PropTypes.func.isRequired,
    openItemItemsDialog: PropTypes.func.isRequired,
    viewMode: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    open: false
  };

  handleToggleDropdown = () => this.setState({ open: !this.state.open });

  render() {
    const { open } = this.state;
    const {
      item,
      handleToggleItem,
      viewMode, // expected: "available" | "selected" | "compact"
      classes
    } = this.props;

    const isItemSelected = this.props.isItemSelected(item);

    return (
      <ListItem
        divider
        key={item.getId}
        onClick={this.handleToggleDropdown}
        className={classes.policyRow}
      >
        {isItemSelected && viewMode === "available" ? (
          <div className={classes.checkboxDiv}>
            <Checkbox
              onClick={handleToggleItem(item)}
              checked={true}
              className={classes.checkbox}
            />
          </div>
        ) : (
          <div onClick={handleToggleItem(item)} className={classes.avatarDiv}>
            <ListItemAvatar className={classes.avatar}>
              <ListAvatar color={item.id} name={item.name} />
            </ListItemAvatar>
          </div>
        )}

        <ListItemText
          primary={
            <Fragment>
              <Typography className={classes.policyName}>{item.name}</Typography>

              <Typography
                noWrap={!open}
                className={clsx(
                  classes.descriptionText,
                  open ? classes.marginTopItem : classes.marginTopItemClosed
                )}
              >
                {item.description}
              </Typography>
            </Fragment>
          }
        />

        <ListItemSecondaryAction className={classes.listActions}>
          <IconButton className={classes.marginTopItem} onClick={this.handleToggleDropdown}>
            {open ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
          </IconButton>
          {!isItemSelected && viewMode === "available" ? (
            <IconButton className={classes.marginTopItem} onClick={handleToggleItem(item)}>
              <Icon>add_circle_outline</Icon>
            </IconButton>
          ) : viewMode === "selected" ? (
            <IconButton className={classes.marginTopItem} onClick={handleToggleItem(item)}>
              <Icon>highlight_off</Icon>
            </IconButton>
          ) : null}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styleSheet, { name: "PolicyRow" })(PolicyRow);
