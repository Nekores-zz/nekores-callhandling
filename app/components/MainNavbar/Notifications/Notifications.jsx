import React, { Component } from "react";
import PropTypes from "prop-types";
import { Badge, ClickAwayListener, IconButton, Popper, Icon, withStyles } from "@material-ui/core";
import NotificationsContent from "./NotificationsContent";
import { styleSheet } from "jss/MainNavbar/Notification";

class Notifications extends Component {
  static propTypes = {
    openPopper: PropTypes.string.isRequired,
    togglePopper: PropTypes.func.isRequired
  };

  toggleNode = null;

  clickAwayCoolOff = null;

  state = {
    arrowRef: null
  };

  handleClick = event => {
    event.stopPropagation();
    if (this.props.openPopper !== "NotificationsClosing") {
      this.toggleNode = event.currentTarget;
      this.props.togglePopper("Notifications");
    } else {
      this.handleClickAwayCoolOff();
    }
  };

  handleClose = event => {
    event.stopPropagation();
    this.clickAwayCoolOff = setTimeout(this.handleClickAwayCoolOff, 200);
    this.props.togglePopper("NotificationsClosing");
  };

  handleClickAwayCoolOff = () => {
    if (this.props.openPopper === "NotificationsClosing") {
      this.props.togglePopper("");
    }
    if (this.clickAwayCoolOff !== null) clearTimeout(this.clickAwayCoolOff);
    this.clickAwayCoolOff = null;
  };

  componentWillUnmount = () => {
    if (this.clickAwayCoolOff !== null) clearTimeout(this.clickAwayCoolOff);
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  handleOnKeyPress = event => {
    const ESC_KEY = 27;
    if (event.keyCode === ESC_KEY) this.handleClose(event);
  };

  render() {
    const { openPopper, classes, backgroundRed } = this.props;
    const open = openPopper === "Notifications";

    return (
      <div>
        <IconButton
          classes={{ root: `${classes.iconButton} ${open ? "opened" : ""}` }}
          onClick={this.handleClick}
          onKeyDown={this.handleOnKeyPress}
        >
          <Badge
            classes={{
              badge: `${classes.badge} ${backgroundRed ? "red" : ""}`
            }}
            badgeContent={3}
          >
            <Icon className={classes.notificationIcon}>notifications</Icon>
          </Badge>
        </IconButton>
        <Popper
          open={open}
          anchorEl={this.toggleNode}
          placement={"bottom"}
          classes={classes.popper}
          modifiers={{
            arrow: {
              enabled: true,
              element: this.state.arrowRef
            }
          }}
        >
          <div className={classes.arrow} ref={this.handleArrowRef} />
          <ClickAwayListener onClickAway={this.handleClose}>
            <NotificationsContent />
          </ClickAwayListener>
        </Popper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "Notifications" })(Notifications);
