import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, Snackbar, Icon, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/LayoutElements/HubbubSnackbar";

class HubbubSnackbar extends Component {
  static propTypes = {
    messageKey: PropTypes.string,
    messageData: PropTypes.object,
    open: PropTypes.bool.isRequired,
    closeCallback: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number,
    actionFunc: PropTypes.func,
    actionLabel: PropTypes.string,
    closeOnClickAway: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  close = () => this.props.closeCallback();

  handleClose = (event, reason) => {
    const { closeOnClickAway } = this.props;
    //event.stopPropagation();
    if (reason === "clickaway") {
      if (closeOnClickAway === true) this.close();
      else return;
    }
    this.close();
  };

  handleAction = event => {
    const { actionFunc } = this.props;
    event.stopPropagation();
    actionFunc ? actionFunc() : null;
    this.close();
  };

  render() {
    const {
      messageKey,
      messageData,
      open,
      autoHideDuration,
      actionFunc,
      actionLabel,
      classes,
      t
    } = this.props;

    if (messageKey !== undefined) {
      let actions = [];
      actionFunc !== undefined
        ? actions.push(
            <Button
              key="action"
              color="secondary"
              className={classes.undo}
              size="small"
              onClick={this.handleAction}
            >
              {actionLabel ? actionLabel : t("undo")}
            </Button>
          )
        : null;
      actions.push(
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={this.handleClose}
        >
          <Icon>close</Icon>
        </IconButton>
      );

      return (
        <Snackbar
          className={classes.snackBar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={open}
          autoHideDuration={autoHideDuration === undefined ? 6000 : autoHideDuration}
          onClose={this.handleClose}
          message={
            <span className={classes.message}>
              {messageData !== undefined ? t(messageKey, messageData) : t(messageKey)}
            </span>
          }
          action={actions}
        />
      );
    } else return null;
  }
}

export default withStyles(styleSheet, { name: "HubbubSnackbar" })(
  translate("snackbar")(HubbubSnackbar)
);
