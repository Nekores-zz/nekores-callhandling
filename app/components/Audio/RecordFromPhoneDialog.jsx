import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withWidth } from "@material-ui/core";
import { Row, Column } from "components/LayoutElements";
import { NumberField } from "components/LayoutElements";
import { Text, HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Audio/RecordFromPhoneDialog";

class RecordFromPhoneDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    open: PropTypes.bool,
    phoneNumber: PropTypes.string,
    pinCode: PropTypes.string,

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    days: 14
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSave = () => {
    this.props.onSave(this.state);
  };

  handleDaysChange = days => {
    this.setState({ days });
  };

  // Dialog Header
  dialogHeader = t => (
    <HubbubDialogHeader
      icon="mic"
      onClose={this.handleClose}
      headerVariation="grey"
      headerTitle={t("recordFromPhone")}
    />
  );

  // Dialog Content
  dialogContent = (phoneNumber, pinCode, days, classes, t) => (
    <div className={classes.dialogContent}>
      <Column padding>
        <Row padding>
          <Text className={classes.normalText}>1. {t("ableDaysToRecord")}</Text>
        </Row>
        <Row padding>
          <NumberField
            required
            onChange={this.handleDaysChange}
            className={classes.daysNumberField}
            value={days}
            label={t("days")}
          />
        </Row>
        <Row padding>
          <Text className={classes.normalText}>
            2. {t("phoneCall")} <Text className={classes.boldText}> {phoneNumber}</Text>
          </Text>
        </Row>
        <Row padding>
          <Text className={classes.normalText}>
            3. {t("pinAsked")} <Text className={classes.boldText}> {pinCode}</Text>
          </Text>
        </Row>
      </Column>
    </div>
  );

  // Dialog Footer
  dialogFooter = (days, t) => (
    <HubbubDialogFooter
      blocked={!days}
      confirmLabel={t("saveForLater")}
      onConfirm={this.handleSave}
    />
  );

  render = () => {
    const { open, phoneNumber, pinCode, classes, t } = this.props;
    const { days } = this.state;

    return (
      <HubbubDialog
        open={open}
        onClose={this.handleClose}
        dialogClass={{ paper: classes.dialogPaper }}
        dialogHeader={this.dialogHeader(t)}
        dialogContent={this.dialogContent(phoneNumber, pinCode, days, classes, t)}
        dialogFooter={this.dialogFooter(days, t)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "RecordFromPhoneDialog" })(
    translate(["audio", "common"])(RecordFromPhoneDialog)
  )
);
