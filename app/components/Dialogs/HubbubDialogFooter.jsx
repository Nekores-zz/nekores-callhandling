/**
 * by Sajid U. - SEPT 2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { DialogActions, withWidth, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { ConfirmButtons } from "components";
import { styleSheet } from "jss/components/Dialogs/HubbubDialogFooter";

class HubbubDialogFooter extends Component {
  static propTypes = {
    blocked: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      onConfirm,
      onSuccess,
      onFailure,
      blocked,
      onClose,
      confirmLabel,
      cancelLabel,
      classes,
      t
    } = this.props;

    return (
      <DialogActions className={classes.parent}>
        <ConfirmButtons
          onFailure={onFailure}
          className={classes.buttons}
          confirmLabel={confirmLabel ? confirmLabel : t("confirm")}
          cancelLabel={cancelLabel ? cancelLabel : t("cancel")}
          onConfirm={onConfirm}
          onSuccess={onSuccess}
          onFailure={onFailure}
          onCancel={onClose}
          blocked={blocked}
        />
      </DialogActions>
    );
  }
}

export default withStyles(styleSheet, { name: "HubbubDialogFooter" })(
  withWidth()(translate("common")(HubbubDialogFooter))
);
