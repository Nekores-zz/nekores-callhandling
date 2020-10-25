/**
 * by A. Prates, mar-2019
 * Modified by: Sajid U. / Sept-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Divider, List, withWidth, withStyles } from "@material-ui/core";
import { Text } from "components";
import { DialogNumberRow } from "components/Numbers";
import { translate } from "react-i18next";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";
import { styleSheet } from "jss/Numbers/NumbersDialogs/ReleaseNumbers";

class ReAssignNumbers extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    service: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,

    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  // Dialog Header
  dialogHeader = (onCancel, t) => (
    <HubbubDialogHeader
      icon="warning"
      headerVariation="red"
      headerTitle={t("areYouSure")}
      onClose={onCancel}
    />
  );

  // Dialog Content
  dialogContent = (classes, service, numbers, t) => (
    <>
      <br />
      <Text variant="secondaryBody" className={classes.bodyText}>
        {t("tryingToReAssignMsg", { service })}
      </Text>
      <br />
      <br />
      <br />

      <Divider />
      <List classes={{ root: classes.list }}>
        {numbers
          .filter(n => n.status === "Active")
          .map((number, index) => (
            <DialogNumberRow key={index} number={number} />
          ))}
      </List>
    </>
  );

  //Dialog Footer
  dialogFooter = (onConfirm, onCancel, t) => (
    <HubbubDialogFooter
      confirmLabel={t("reAssignNumbers")}
      onConfirmRed
      onConfirm={onConfirm}
      onClose={onCancel}
    />
  );

  render() {
    const { numbers, service, onCancel, onConfirm, classes, t } = this.props;

    return (
      <HubbubDialog
        open={true} //- Dialog Triger
        maxWidth="md"
        dialogHeader={this.dialogHeader(onCancel, t)} //- Dialog Header
        dialogContent={this.dialogContent(classes, service, numbers, t)} //-  Dialog Content
        dialogFooter={this.dialogFooter(onConfirm, onCancel, t)} //- DialogFooter
      />
    );
  }
}

export default withStyles(styleSheet, { name: "ReAssignNumbers" })(
  withWidth()(translate("numbers")(ReAssignNumbers))
);
