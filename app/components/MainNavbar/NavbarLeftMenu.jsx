import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  withStyles
} from "@material-ui/core";
import { DropDownToggle, Logo, Pending } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/MainNavbar/NavbarLeftMenu";

class NavbarLeftMenu extends Component {
  static propTypes = {
    menuItems: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    open: false
  };

  toggleNode = null;

  handleClose = () => this.setState({ open: false });

  handleClick = () => this.setState({ open: !this.state.open });

  render() {
    const { name, classes, t } = this.props;
    const { open } = this.state;

    return (
      <div
        className={classes.leftMenuWrapper}
        onClick={this.handleClick}
        ref={node => (this.toggleNode = node)}
      >
        <Logo name={name} inline />

        <DropDownToggle
          name={name}
          className={classes.dropdownToggle}
          aria-owns={open ? "menu-list" : null}
          aria-haspopup="true"
          opened={open}
        />

        <Popover
          marginThreshold={0}
          open={open}
          anchorEl={this.toggleNode}
          anchorReference={"anchorEl"}
          onClose={this.handleClose}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom"
          }}
          classes={{
            paper: classes.popover
          }}
        >
          <Paper classes={{ root: classes.menuListPaper }}>
            <MenuList className={classes.menuList} role="menu">
              <Pending
                content={this.props.menuItems}
                onFail={error => console.log(error)}
                operationMode="diode"
                onResponse={menuItems => {
                  return (
                    menuItems &&
                    menuItems.map((item, index) => {
                      return (
                        <MenuItem key={index} onClick={item.onClick}>
                          <ListItemIcon>
                            <Icon>{item.icon}</Icon>
                          </ListItemIcon>
                          {menuItems.length > 1 && index === 0 ? (
                            <ListItemText primary={item.text} />
                          ) : (
                            <ListItemText primary={t(item.text)} />
                          )}
                        </MenuItem>
                      );
                    })
                  );
                }}
              />
            </MenuList>
          </Paper>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "NavbarLeftMenu" })(
  translate("common")(NavbarLeftMenu)
);
