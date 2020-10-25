import React, { Component } from "react";
import PropTypes from "prop-types";
import { ClickAwayListener, IconButton, Popper, withStyles } from "@material-ui/core";
import UserAvatar from "components/Login/UsersList/UserAvatar";
import UsersMenuContent from "./UsersMenuContent";
import { styleSheet } from "jss/MainNavbar/UsersMenu";
import { Pending } from "components";

class UsersMenu extends Component {
  static propTypes = {
    openPopper: PropTypes.string.isRequired,
    togglePopper: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
  };

  toggleNode = null;

  clickAwayCoolOff = null;

  state = {
    arrowRef: null
  };

  handleClick = event => {
    event.stopPropagation();
    if (this.props.openPopper !== "UsersMenuClosing") {
      this.toggleNode = event.currentTarget;
      this.props.togglePopper("UsersMenu");
    } else {
      this.handleClickAwayCoolOff();
    }
  };

  handleClose = event => {
    event.stopPropagation();
    this.clickAwayCoolOff = setTimeout(this.handleClickAwayCoolOff, 200);
    this.props.togglePopper("UsersMenuClosing");
  };

  handleClickAwayCoolOff = () => {
    if (this.props.openPopper === "UsersMenuClosing") {
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
    const { openPopper, quickSwitchUsers, userInfo, classes } = this.props;
    const open = openPopper === "UsersMenu";

    return (
      <Pending
        content={userInfo}
        operationMode="diode"
        onResponse={userInfo => {
          userInfo.name = userInfo.firstName + " " + userInfo.lastName; //Create full name using firstName and lastName
          return (
            <div>
              <IconButton
                classes={{ root: `${classes.iconButton} ${open ? "opened" : ""}` }}
                onClick={this.handleClick}
                onKeyDown={this.handleOnKeyPress}
              >
                <UserAvatar className={classes.usersMenuAvatar} name={userInfo.name} />
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
                  <UsersMenuContent
                    dispatcher={this.props.dispatcher}
                    userInfo={userInfo}
                    quickSwitchUsers={quickSwitchUsers}
                  />
                </ClickAwayListener>
              </Popper>
            </div>
          );
        }}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "UserMenu" })(UsersMenu);
