import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  withStyles,
  Avatar,
  DialogContent,
  DialogActions,
  Backdrop,
  Grid
} from "@material-ui/core";
import { PrimaryTextLink, IconButton, Icon } from "components/Elements";
import {
  ConfirmButtons,
  Row,
  Column,
  Box,
  Stretch,
  Text,
  TextField
} from "components/LayoutElements";
import clsx from "clsx";

const styleSheet = theme => ({
  parent: {
    position: "relative",
    boxShadow: "none",
    padding: 0,
    backgroundColor: theme.colors.primary.backgroundGrey
  },

  avatarStyle: {
    backgroundColor: "red",
    color: "white",
    width: "70px",
    height: "100%",
    overflow: "hidden",
    position: "absolute"
  },

  avatar: {
    fontSize: "30px",
    width: "70px",
    height: "120px",
    color: "white",
    backgroundColor: "red"
  },

  headerIcon: {
    fill: "white",
    textAnchor: "middle",
    dominantBaseline: "middle",
    fontWeight: "bold",
    width: 48,
    height: 48
  },

  containerStyle: {
    width: "100%",
    padding: "24px 24px 24px 90px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "46px"
    }
  },

  columnStyle: {
    display: "inline-flex",
    alignItems: "center"
  },

  closeEditButton: {
    margin: -12
  },

  nodeType: {},

  nodeName: {
    maxWidth: "calc(100% - 96px)"
  },

  showDescription: {
    padding: 0,
    height: "auto",
    textTransform: "none",
    fontSize: "small"
  },

  nodeDescription: {
    overflowWrap: "break-word",
    width: "100%"
  },

  menuStyle: {
    position: "absolute",
    right: 24,
    top: 40,
    [theme.breakpoints.down("sm")]: {
      top: 0,
      right: 0,
      position: "absolute",
      borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
      width: "100%",
      display: "block",
      textAlign: "right"
    }
  }
});

const NodeDialogHeader = withStyles(styleSheet, { name: "NodeDialogHeader" })(
  translate(["servicedesigner", "common"])(
    class NodeDialogHeader extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired,
        onClose: PropTypes.func.isRequired,
        onEdit: PropTypes.func,
        onCloseEdit: PropTypes.func,
        onSaveEdit: PropTypes.func
      };

      state = {
        showDescription: false,
        name: this.props.node.name || "",
        description: this.props.node.description || "",
        isEdit: false
      };

      handleGoEdit = () => {
        this.props.onEdit();
        this.setState({ isEdit: true });
      };

      handleSaveEdit = () => {
        this.props.onSaveEdit({
          id: this.props.node.id,
          name: this.state.name,
          description: this.state.description
        });
        this.setState({ isEdit: false });
      };

      handleCloseEdit = () => {
        this.props.onCloseEdit();
        this.setState({ isEdit: false });
      };

      handleClose = () => {
        this.props.onClose();
      };

      handleNameChange = event => {
        this.setState({ name: event.target.value });
      };

      handleDescriptionChange = event => {
        this.setState({ description: event.target.value });
      };

      handleToggleDescription = () => {
        this.setState({ showDescription: !this.state.showDescription });
      };

      render() {
        const { node, nodeType, t, classes } = this.props;
        const { isEdit, name, description, showDescription } = this.state;
        // const nodeType = serviceDesigner.serviceDocument.nodeTypes[node.nodeType];

        const HeaderIcon = nodeType.icon;
        const avatarColor = nodeType.color;

        return (
          <DialogTitle className={classes.parent}>
            <Grid container direction="row">
              <Grid item className={classes.avatarStyle}>
                <svg x={0} y={0} width={70} height={"100%"}>
                  <g transform={`translate(0 0)`}>
                    <rect
                      x={0}
                      y={0}
                      width={"100%"}
                      height={"100%"}
                      style={{ fill: avatarColor }}
                    />
                    <HeaderIcon
                      x={10}
                      y={35}
                      width={50}
                      height={50}
                      className={classes.headerIcon}
                    />
                  </g>
                </svg>
              </Grid>
              <Grid item className={classes.containerStyle}>
                {isEdit ? (
                  <Column>
                    <Row>
                      <Stretch />
                      <IconButton
                        className={classes.closeEditButton}
                        onClick={this.handleCloseEdit}
                      >
                        <Icon>close</Icon>
                      </IconButton>
                    </Row>
                    <Row paddingBottom>
                      <TextField
                        onChange={this.handleNameChange}
                        label={t("nodeName")}
                        value={name}
                        error={false}
                        fullWidth
                      />
                    </Row>
                    <Row paddingBottom>
                      <TextField
                        onChange={this.handleDescriptionChange}
                        label={t("nodeDescription")}
                        value={description}
                        error={false}
                        fullWidth
                        multiline
                        rowsMax={5}
                      />
                    </Row>
                    <Row>
                      <ConfirmButtons
                        onConfirm={this.handleSaveEdit}
                        onCancel={this.handleCloseEdit}
                        // onSuccess={() => this.setState({ errors: null })}
                        // onFailure={errors => this.setState({ errors })}
                      />
                    </Row>
                  </Column>
                ) : (
                  // <div justify="space-between" alignItems="center">
                  <div>
                    <div>
                      <Column>
                        <Row>
                          <Text className={classes.nodeType}>{nodeType.name} node</Text>
                        </Row>
                        <Row>
                          <Text variant="h3" className={classes.nodeName}>
                            {node.name ? node.name : "Node name"}
                          </Text>
                        </Row>
                        <Row>
                          {!showDescription && !node.description ? (
                            <PrimaryTextLink
                              className={classes.showDescription}
                              onClick={this.handleGoEdit}
                            >
                              {t("addDescription")}
                            </PrimaryTextLink>
                          ) : (
                            <PrimaryTextLink
                              className={classes.showDescription}
                              onClick={this.handleToggleDescription}
                            >
                              {t(showDescription ? "hideDescription" : "showDescription")}
                            </PrimaryTextLink>
                          )}
                        </Row>
                        {showDescription && (
                          <Row>
                            <Text className={classes.nodeDescription}>{node.description}</Text>
                          </Row>
                        )}
                      </Column>
                    </div>
                    <div className={clsx(classes.columnStyle, classes.menuStyle)}>
                      <IconButton onClick={this.handleGoEdit}>
                        <Icon>edit</Icon>
                      </IconButton>
                      <IconButton onClick={this.handleClose}>
                        <Icon>close</Icon>
                      </IconButton>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </DialogTitle>
        );
      }
    }
  )
);

export default NodeDialogHeader;
