/**
 * by A. Prates, mar-2019
 */
import React, { PureComponent } from "react";
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

class BulkMenu extends PureComponent {
  static propTypes = {
    selection: PropTypes.array.isRequired,
    inverted: PropTypes.bool.isRequired,
    clearSelection: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    bulkMenu: PropTypes.shape({
      menu: PropTypes.array,
      anchorElement: PropTypes.object
    }),
    t: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired
  };

  handleSelectMenuOption = optionFn => event => {
    event.stopPropagation();
    const { selection, inverted } = this.props;
    optionFn(selection, inverted, this.props.clearSelection);
    this.props.onClose();
  };

  render() {
    const { onClose, t, classes } = this.props;
    const { menu, anchorElement } = this.props.bulkMenu;

    return (
      <Menu open={true} anchorEl={anchorElement} onClose={onClose}>
        <MenuList>
          {menu.map((menuOption, i) => (
            <MenuItem key={i} onClick={this.handleSelectMenuOption(menuOption.onClick)}>
              <ListItemIcon>
                <Icon>{menuOption.icon}</Icon>
              </ListItemIcon>
              <ListItemText className={classes.menuItemLabel} primary={t(menuOption.label)} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }
}

export default withStyles(styleSheet, { name: "BulkMenu" })(BulkMenu);
