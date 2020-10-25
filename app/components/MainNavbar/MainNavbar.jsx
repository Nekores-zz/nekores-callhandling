import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, IconButton, Toolbar, Icon, withStyles } from "@material-ui/core";
import { StretchingGridItem } from "components";
import NavbarLeftMenu from "./NavbarLeftMenu";
import AppMenu from "./AppMenu/AppMenu";
import Notifications from "./Notifications/Notifications";
import UsersMenu from "./UsersMenu/UsersMenu";
import { styleSheet } from "jss/MainNavbar/MainNavbar";

class MainNavbar extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    handleMainMenuClick: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired, // diode object
    menuItems: PropTypes.object.isRequired, // diode object
    quickSwitchUsers: PropTypes.array.isRequired,

    searchbar: PropTypes.func, // should be a instance of components/Searchbar or undefined none
    dispatcher: PropTypes.object, // used for logout (might need some review)

    classes: PropTypes.object.isRequired
  };

  state = {
    openPopper: ""
  };

  togglePopper = name => this.setState({ openPopper: name === this.state.openPopper ? "" : name });

  render = () => {
    const {
      name,
      handleMainMenuClick,
      userInfo,
      menuItems,
      quickSwitchUsers,
      defaultSearchText,
      searchbar,
      dispatcher,
      classes
    } = this.props;

    return (
      <AppBar classes={{ root: classes.appBar }}>
        <Toolbar classes={{ root: classes.toolbar, gutters: classes.toolbarGutters }}>
          <IconButton color="inherit" onClick={handleMainMenuClick}>
            <Icon>menu</Icon>
          </IconButton>

          <NavbarLeftMenu
            name={name}
            menuItems={menuItems}
            openPopper={this.state.openPopper}
            togglePopper={this.togglePopper}
          />

          {searchbar ? searchbar() : <StretchingGridItem />}

          <AppMenu openPopper={this.state.openPopper} togglePopper={this.togglePopper} />

          {/* TODO: implement popper for this icon and replace/update here */}
          <IconButton color="inherit" onClick={() => alert("Hub!")}>
            <Icon>device_hub</Icon>
          </IconButton>

          <Notifications
            openPopper={this.state.openPopper}
            togglePopper={this.togglePopper}
            backgroundRed
          />

          <UsersMenu
            dispatcher={dispatcher}
            openPopper={this.state.openPopper}
            togglePopper={this.togglePopper}
            userInfo={userInfo}
            quickSwitchUsers={quickSwitchUsers}
            defaultSearchText={defaultSearchText}
          />
        </Toolbar>
      </AppBar>
    );
  };
}

export default withStyles(styleSheet, { name: "MainNavbar" })(MainNavbar);
