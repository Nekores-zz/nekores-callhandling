import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { withStyles, DialogContent } from "@material-ui/core";
import { Box } from "components/LayoutElements";

const styleSheet = theme => ({
  parent: {
    padding: 0,
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  contentWrapper: {
    padding: "12px 24px",
    position: "relative",
    overflowY: "auto",
    height: "-webkit-fill-available",
    maxHeight: "100%",
  },
  disabled: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: "10000",
    backgroundColor: "rgba(255, 255, 255, .5)"
  }
});

const NodeDialogContent = withStyles(styleSheet, { name: "NodeDialogContent" })(
  translate(["servicedesigner", "common"])(
    class NodeDialogContent extends PureComponent {
      render() {
        const { content, disabled, classes, t } = this.props;
        return (
          <DialogContent className={classes.parent}>
            {!!disabled && <Box classes={{ box: classes.disabled }} />}
            {content && content}
          </DialogContent>
        );
      }
    }
  )
);

export default NodeDialogContent;
