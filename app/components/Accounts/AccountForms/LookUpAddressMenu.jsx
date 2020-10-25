import React, { PureComponent } from "react";
import { Menu, MenuItem, Icon, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Accounts/CreateAccount";

class LookUpAddressMenu extends PureComponent {
  render() {
    const { anchorEl, open, addresses, handleClose, handleSelect, classes } = this.props;

    return (
      <Menu
        classes={{
          paper: classes.paper
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {addresses.map((item, index) => {
          return (
            <MenuItem key={index} onClick={handleSelect(item)}>
              <Icon className={classes.locationOn}>location_on</Icon>
              <div className={classes.ellipsisAddress}>{item.address}</div>
            </MenuItem>
          );
        })}
      </Menu>
    );
  }
}

export default withStyles(styleSheet, { name: "LookUpAddressMenu" })(LookUpAddressMenu);
