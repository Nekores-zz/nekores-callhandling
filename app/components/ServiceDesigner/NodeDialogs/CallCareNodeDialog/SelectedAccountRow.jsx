import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { withStyles } from "@material-ui/core";
import { ListAvatar } from "components";
import { withHover, PrimaryTextLink } from "components/Elements";
import { Box, Row, Column, Stretch } from "components/LayoutElements";
import { Checkbox, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";

const styleSheet = theme => ({
  accountRow: {
    position: "relative",
    cursor: "pointer",
    height: 70,
    border: "1px solid #aaa",
    padding: 16,
    marginBottom: 16
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
  },

  removeLink: {
    padding: 0,
    position: "absolute",
    right: 0,
    top: "calc(50% - 19px)"
  }
});
class SelectedAccountRow extends Component {
  render = () => {
    const { item, onRemove, classes, t } = this.props;

    return (
      <ListItem key={item.id} className={classes.accountRow}>
        <ListItemAvatar className={classes.checkbox}>
          <ListAvatar color={item.id} name={item.name} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography className={classes.accountName}>{item.name}</Typography>}
        />
        <Stretch />
        <ListItemText
          primary={
            <PrimaryTextLink className={classes.removeLink} onClick={onRemove}>
              {t("remove")}
            </PrimaryTextLink>
          }
        />
      </ListItem>
    );
  };
}

export default withStyles(styleSheet, { name: "SelectedAccountRow" })(
  translate(["servicedesigner", "common"])(SelectedAccountRow)
);
