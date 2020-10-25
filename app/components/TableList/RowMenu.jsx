/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], aug-2018 - sep-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Icon,
  withStyles
} from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/RowMenu";

class RowMenu extends Component {
  static propTypes = {
    menu: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    rowMenu: PropTypes.object.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  handleSelectMenuOption = optionFn => event => {
    event.stopPropagation();
    optionFn(this.props.rowMenu.row);
    this.props.onClose();
  };

  renderItem = (key, item) => (
    <MenuItem key={key} onClick={this.handleSelectMenuOption(item.onClick)}>
      <ListItemIcon>
        <Icon>{item.icon}</Icon>
      </ListItemIcon>
      <ListItemText
        className={this.props.classes.menuItemLabel}
        primary={this.props.t(item.label)}
      />
    </MenuItem>
  );

  render = () => {
    const { menu, onClose, t } = this.props;
    const { isOpen, anchorElement, row } = this.props.rowMenu;

    return (
      <Menu open={isOpen} anchorEl={anchorElement} onClose={onClose}>
        <MenuList>
          {menu.length ? (
            menu.map((item, i) =>
              // menu item can also be rendered with alternative function provided
              // taking key and row data object as argument; if applicable use
              // material-ui MenuItem as container, as other items also use it.
              // see above 'renderItem' as reference.
              item.renderFn
                ? item.renderFn(i, row, this.handleSelectMenuOption)
                : this.renderItem(i, item)
            )
          ) : (
            <MenuItem>
              <ListItemText
                className={this.props.classes.menuItemLabel}
                primary={t("noActionsAvailable")}
              />
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    );
  };
}

export default withStyles(styleSheet, { name: "RowMenu" })(RowMenu);
