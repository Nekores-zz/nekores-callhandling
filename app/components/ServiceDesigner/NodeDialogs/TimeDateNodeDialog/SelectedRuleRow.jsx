import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { withStyles } from "@material-ui/core";
import { ListAvatar } from "components";
import { withHover, PrimaryTextLink, IconButton, Icon } from "components/Elements";
import { Box, Row, Column, Stretch } from "components/LayoutElements";
import { Checkbox, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";

const styleSheet = theme => ({
  ruleRow: {
    position: "relative",
    cursor: "pointer",
    height: 70,
    border: "1px solid #aaa",
    padding: 16
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
class SelectedRuleRow extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
  }

  handleRemoveRow = () => {
    this.props.onRemove();
  };

  handleEditRow = () => {
    this.props.onEdit();
  };

  handleMore = () => {};

  render = () => {
    const { item, classes, t } = this.props;

    return (
      <ListItem key={item.id} className={classes.ruleRow}>
        <ListItemAvatar className={classes.checkbox}>
          <ListAvatar color={item.id} name={item.name} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography className={classes.accountName}>{item.name}</Typography>}
        />
        <Stretch />
        {/* <ListItemText
          primary={
            <PrimaryTextLink className={classes.removeLink} onClick={onRemove}>
              {t("remove")}
            </PrimaryTextLink>
          }
        /> */}
        <IconButton onClick={this.handleEditRow}>
          <Icon>edit</Icon>
        </IconButton>
        <IconButton onClick={this.handleRemoveRow}>
          <Icon>delete</Icon>
        </IconButton>
        <IconButton onClick={this.handleMore}>
          <Icon>more_horiz</Icon>
        </IconButton>
      </ListItem>
    );
  };
}

export default withStyles(styleSheet, { name: "SelectedRuleRow" })(
  translate(["servicedesigner", "common"])(SelectedRuleRow)
);
