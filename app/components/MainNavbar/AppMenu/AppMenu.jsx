import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ClickAwayListener,
  Icon,
  IconButton,
  Popper,
  withStyles
} from "@material-ui/core";
import AppList from "./AppList";
import { styleSheet } from "jss/MainNavbar/AppMenu";

class AppMenu extends Component {
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
    if (this.props.openPopper !== "AppMenuClosing") {
      this.toggleNode = event.currentTarget;
      this.props.togglePopper("AppMenu");
    } else {
      this.handleClickAwayCoolOff();
    }
  };

  handleClose = event => {
    event.stopPropagation();
    this.clickAwayCoolOff = setTimeout(this.handleClickAwayCoolOff, 200);
    this.props.togglePopper("AppMenuClosing");
  };

  handleClickAwayCoolOff = () => {
    if (this.props.openPopper === "AppMenuClosing") {
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
    const { openPopper, classes } = this.props;
    const open = openPopper === "AppMenu";

    return (
      <div>
        <IconButton
          classes={{
            root: `${classes.iconButtonWrapper} ${open ? "opened" : ""}`
          }}
          onClick={this.handleClick}
          onKeyDown={this.handleOnKeyPress}
        >
          <Icon className={classes.iconButton}>apps</Icon>
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
            <AppList opened={open} handleOnKeyPress={this.handleOnKeyPress} />
          </ClickAwayListener>
        </Popper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AppMenu" })(AppMenu);
