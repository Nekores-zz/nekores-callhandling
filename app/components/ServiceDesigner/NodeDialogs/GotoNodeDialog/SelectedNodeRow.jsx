import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { withStyles, TextField } from "@material-ui/core";
import { ListAvatar } from "components";
import { withHover, PrimaryTextLink } from "components/Elements";
import { Box, Row, Column, Stretch, ConfirmButtons, Text } from "components/LayoutElements";
import { ListItem, ListItemAvatar, ListItemText, Typography, Avatar } from "@material-ui/core";

const styleSheet = theme => ({
  nodeRow: {
    position: "relative",
    cursor: "pointer",
    height: 70,
    border: "1px solid #aaa",
    padding: 16,
    marginBottom: 16
  },

  avatarWrapper: {
    flex: 0
  },

  avatar: {
    width: 40,
    height: 40
  },

  nodeNameWrapper: {
    alignItems: "start"
  },

  nodeName: {
    ...theme.typography.primaryBody
  },

  showDescription: {
    padding: 0,
    height: "auto",
    textTransform: "none",
    fontSize: "small"
  },

  descriptionEdit: {
    marginLeft: 48
  },

  descriptionText: {
    ...theme.typography.secondarySmallBody,
    marginLeft: 48
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

  removeLinkWrapper: {
    flex: 0
  }
});
class SelectedNodeRow extends Component {
  state = {
    description: this.props.item && this.props.item.description ? this.props.item.description : "",
    editDescription: false,
    showDescription: false
  };

  handleGoEditDescription = () => {
    this.setState({ editDescription: true, showDescription: true });
  };

  handleChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  handleSaveEdit = () => {
    this.props.onAddDescription(this.state.description);
    this.setState({ editDescription: false, showDescription: false });
  };

  handleCloseEdit = () => {
    this.setState({ editDescription: false, showDescription: false });
  };

  handleToggleDescription = () => {
    this.setState({
      showDescription: !this.state.showDescription,
      editDescription: this.state.showDescription && this.state.editDescription
    });
  };

  render = () => {
    const { item, onRemove, classes, t } = this.props;
    const { description, showDescription, editDescription } = this.state;

    return (
      <Row key={item.id} className={classes.nodeRow} padding borderHalf>
        <Column>
          <Row>
            <Column classes={{ box: classes.avatarWrapper }}>
              <Avatar className={classes.avatar}>{item.name[0]}</Avatar>
            </Column>
            <Column classes={{ box: classes.nodeNameWrapper }} paddingLeftHalf>
              <Typography className={classes.nodeName}>{item.name}</Typography>
              {!editDescription && !description ? (
                <PrimaryTextLink
                  className={classes.showDescription}
                  onClick={this.handleGoEditDescription}
                >
                  {t("addNodeDescription")}
                </PrimaryTextLink>
              ) : (
                <PrimaryTextLink
                  className={classes.showDescription}
                  onClick={this.handleToggleDescription}
                >
                  {t(showDescription ? "hideNodeDescription" : "showNodeDescription")}
                </PrimaryTextLink>
              )}
            </Column>
            <Stretch />
            <Column classes={{ box: classes.removeLinkWrapper }}>
              <PrimaryTextLink onClick={onRemove}>{t("remove")}</PrimaryTextLink>
            </Column>
          </Row>
          {editDescription ? (
            <Row paddingTop>
              <Column>
                <Row>
                  <TextField
                    label={t("description")}
                    value={description}
                    onChange={this.handleChangeDescription}
                    className={classes.descriptionEdit}
                    fullWidth
                    multiline
                  />
                </Row>
                <Row paddingTop>
                  <ConfirmButtons onConfirm={this.handleSaveEdit} onCancel={this.handleCloseEdit} />
                </Row>
              </Column>
            </Row>
          ) : showDescription ? (
            <Row paddingTop>
              <Text className={classes.descriptionText}>{description}</Text>
            </Row>
          ) : null}
        </Column>
        {/* <ListItemAvatar className={classes.avatar}>
          <ListAvatar color={item.id} name={item.name} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography className={classes.nodeName}>{item.name}</Typography>}
        />
        <Stretch />
        <ListItemText
          primary={
            <PrimaryTextLink className={classes.removeLink} onClick={onRemove}>
              {t("remove")}
            </PrimaryTextLink>
          }
        /> */}
      </Row>
    );
  };
}

export default withStyles(styleSheet, { name: "SelectedNodeRow" })(
  translate(["servicedesigner", "common"])(SelectedNodeRow)
);
