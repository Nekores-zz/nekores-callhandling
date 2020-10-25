import React, { PureComponent } from "react";
import clsx from "clsx";
import { ListItem, ListItemIcon, List, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/Sidemenu/SidemenuTab";

class SidemenuTab extends PureComponent {
  render() {
    const {
      icon,
      onClick,
      isActive,
      children,
      classes,
      className
    } = this.props;

    return (
      <div className={classes.buttonWrapper}>
        <List className={classes.buttonWrapper}>
        <ListItem
          button={!isActive}
          className={clsx(
            classes.button,
            { [classes.buttonActive]: isActive },
            className
          )}
          onClick={isActive ? undefined : onClick}
        >
          <ListItemIcon
            className={clsx(classes.icon, {
              [classes.iconActive]: isActive
            })}
          >
            {icon}
          </ListItemIcon>
          {children}
        </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "SidemenuTab" })(SidemenuTab);
