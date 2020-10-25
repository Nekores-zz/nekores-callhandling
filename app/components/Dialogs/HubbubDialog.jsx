/**
 * by Sajid U. - SEPT 2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Dialog, DialogContent, withWidth, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/Dialogs/HubbubDialog";

class HubbubDialog extends Component {
  static propTypes = {
    dialogContent: PropTypes.any.isRequired, // Is required
    dialogHeader: PropTypes.any,
    dialogFooter: PropTypes.any,
    width: PropTypes.string,
    FullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    className: PropTypes.any,
    dialogClass: PropTypes.any,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      fullWidth,
      maxWidth,
      open,
      width,
      dialogHeader,
      dialogFooter,
      dialogContent,
      dialogClass,
      onClose,
      classDialogContent,
      classes
    } = this.props;

    const fullScreen = width === "sm" || width === "xs";
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        classes={dialogClass ? dialogClass : { paper: classes.dialogPaper }}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        {dialogHeader}

        <DialogContent className={classDialogContent ? classDialogContent : classes.dialogContent}>
          {dialogContent}
        </DialogContent>

        {dialogFooter}
      </Dialog>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet, { name: "HubbubDialog" })(translate("common")(HubbubDialog))
);
