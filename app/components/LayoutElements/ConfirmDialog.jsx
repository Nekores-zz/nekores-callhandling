/**
 * by A. Prates, mar-2019
 * Modified by Sajid U. / Sept-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormGroup, FormControlLabel, Checkbox, withWidth, withStyles } from "@material-ui/core";
import { Text } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/LayoutElements/ConfirmDialog";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";

class ConfirmDialog extends Component {
  static propTypes = {
    dialogMessage: PropTypes.string,
    confirmMessage: PropTypes.string,
    item: PropTypes.object, // should be undefined, if confirming bulk action
    selectedItems: PropTypes.array, // does not have to be defined, if item prop is defined (single mode)
    inverted: PropTypes.bool, // should  be defined, if selectedItems is defined
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onFailure: PropTypes.func,
    variation: PropTypes.string,
    maxWidth: PropTypes.string,
    headerTitle: PropTypes.string,
    width: PropTypes.string,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    confirmed: false
  };

  toggleCheckbox = name => () => {
    this.setState({ [name]: !this.state[name] });
  };

  // Dialog Header
  dialogHeader = (onCancel, variation, headerTitle) => (
    <HubbubDialogHeader
      headerVariation={variation ? variation : "red"}
      icon="warning"
      headerTitle={headerTitle ? headerTitle : "warning"}
      onClose={onCancel}
    />
  );

  // Dialog Content
  dialogContent = (classes, dialogMessage, blocked, confirmMessage, item) => (
    <div className={classes.dialogContent}>
      <br />
      <br />
      {this.props.primaryMessage && (
        <>
          <Text variant="secondaryBody" className={classes.bodyText}>
            {this.props.primaryMessage}
          </Text>
          <br />
          <br />
        </>
      )}
      <Text variant="primaryBody">{dialogMessage}</Text>
      <br />
      <br />

      {this.props.selectedItems ? (
        <>
          <br />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={!blocked} onChange={this.toggleCheckbox("confirmed")} />}
              label={confirmMessage}
            />
          </FormGroup>
        </>
      ) : null}
    </div>
  );

  // Dialog Footer
  dialogFooter = (
    blocked,
    isBulkAction,
    onCancel,
    onConfirm,
    onFailure,
    confirmLabel,
    cancelLabel,
    selectedItems,
    inverted,
    item,
    t
  ) => (
    <HubbubDialogFooter
      onConfirm={() => (isBulkAction ? onConfirm(selectedItems, inverted) : onConfirm(item))}
      onClose={onCancel}
      onFailure={onFailure}
      confirmLabel={confirmLabel ? confirmLabel : t("confirm")}
      cancelLabel={cancelLabel ? cancelLabel : t("cancel")}
      blocked={selectedItems ? blocked : null}
    />
  );

  render() {
    const {
      dialogMessage,
      confirmMessage,
      item,
      maxWidth,
      selectedItems,
      inverted,
      onCancel,
      onConfirm,
      onFailure,
      classes,
      variation,
      headerTitle,
      confirmLabel,
      cancelLabel,
      open,
      t
    } = this.props;

    const blocked = !this.state.confirmed;

    const isBulkAction =
      item !== undefined ? false : selectedItems !== undefined && inverted !== undefined;

    // if no item or selecetdItems is defined display error on console
    // if (!item && !isBulkAction)
    //   console.log(
    //     "[ ConfirmDialog ]: Expects an item Object OR an selectedItems Array to be defined!"
    //   );

    return (
      <HubbubDialog
        open={open != undefined ? open : true}
        dialogClass={{ paper: classes.dialogPaper }}
        maxWidth={maxWidth ? maxWidth : "sm"}
        onClose={onCancel}
        dialogHeader={this.dialogHeader(onCancel, variation, headerTitle)}
        dialogContent={this.dialogContent(classes, dialogMessage, blocked, confirmMessage, item)}
        dialogFooter={this.dialogFooter(
          blocked,
          isBulkAction,
          onCancel,
          onConfirm,
          onFailure,
          confirmLabel,
          cancelLabel,
          selectedItems,
          inverted,
          item,
          t
        )}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "ConfirmDialog" })(
  withWidth()(translate("common")(ConfirmDialog))
);
