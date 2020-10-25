import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { withStyles } from "@material-ui/core";
import { ListAvatar } from "components";
import { withHover } from "components/Elements";
import { Checkbox, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";

const styleSheet = theme => ({
  accountRow: {
    position: "relative",
    cursor: "pointer",
    height: 70
  },

  checkbox: {
    width: 40,
    height: 40
  },

  accountName: {
    ...theme.typography.primaryBody
  },

  descriptionText: {
    ...theme.typography.secondarySmallBody
  },

  marginTopItem: {
    marginTop: 12
  },

  chip: {
    height: 25,
    fontWeight: "bold",
    fontSize: "12px",
    color: theme.colors.primary.darkGrey
  }
});
class AccountRowElement extends Component {
  render = () => {
    const { item, isItemSelected, viewMode, handleToggleItem, classes, hover } = this.props;
    let { isHover, ...hoverHandlers } = hover;

    return (
      <ListItem
        {...hoverHandlers}
        divider
        key={item.id}
        onClick={handleToggleItem(item)}
        className={classes.accountRow}
      >
        {(isItemSelected(item) && viewMode === "available") || isHover ? (
          <Checkbox checked={isItemSelected(item)} className={classes.checkbox} />
        ) : (
          <ListItemAvatar className={classes.checkbox}>
            <ListAvatar color={item.id} name={item.name} />
          </ListItemAvatar>
        )}
        <ListItemText
          primary={<Typography className={classes.accountName}>{item.name}</Typography>}
          secondary={item.email}
        />
      </ListItem>
    );
  };
}

export default withStyles(styleSheet, { name: "AccountRowElement" })(withHover(AccountRowElement));
