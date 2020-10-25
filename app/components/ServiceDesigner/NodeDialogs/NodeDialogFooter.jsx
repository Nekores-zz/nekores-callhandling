import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { withStyles, DialogActions } from "@material-ui/core";
import { ConfirmButtons, Box } from "components/LayoutElements";

const styleSheet = theme => ({
  parent: {
    padding: "12px 24px;",
    margin: 0,
    position: "relative"
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

const NodeDialogFooter = withStyles(styleSheet, { name: "NodeDialogFooter" })(
  translate(["common", "servicedesigner"])(
    class NodeDialogFooter extends PureComponent {
      static propTypes = {
        onSave: PropTypes.func,
        onClose: PropTypes.func
      };

      render() {
        const { eventActions, classes, t, disabled } = this.props;
        return (
          <DialogActions className={classes.parent}>
            {!!disabled && <Box classes={{ box: classes.disabled }} />}
            {!!eventActions && eventActions}
            <ConfirmButtons onConfirm={this.props.onSave} onCancel={this.props.onClose} />
          </DialogActions>
        );
      }
    }
  )
);

export default NodeDialogFooter;
