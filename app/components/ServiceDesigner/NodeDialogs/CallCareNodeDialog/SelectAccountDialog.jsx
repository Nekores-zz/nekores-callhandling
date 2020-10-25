import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withWidth } from "@material-ui/core";
import {
  Text,
  HubbubDialog,
  HubbubDialogHeader,
  HubbubDialogFooter,
  AvatarSimpleCell,
  StretchingGridItem
} from "components";
import { Row, Column } from "components/LayoutElements";
import { translate } from "react-i18next";
import { AvailableItemsList } from "components/GroupSelector";
import AccountRowElement from "./AccountRowElement";

const styleSheet = theme => ({
  dialogPaper: {
    minWidth: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },

  accountModeRadio: {
    padding: 0,
    height: "32px",
    width: "100%"
  },

  selectAccount: {
    marginLeft: 36
  },

  configureStates: {
    padding: 0
  }
});

class SelectAccountDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    members: []
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSave = () => {
    this.props.onSave(this.state.members);
  };

  // Dialog Header
  dialogHeader = t => (
    <HubbubDialogHeader
      icon="keyboard_backspace"
      onIconHandle={this.handleClose}
      onClose={this.handleClose}
      headerVariation="grey"
      headerTitle={t("selectAccounts")}
    />
  );

  isMember = account => this.state.members.findIndex(member => member.id === account.id) !== -1;

  handleToggleMember = account => () =>
    this.setState({
      members: this.isMember(account)
        ? this.state.members.filter(m => m.id !== account.id)
        : [...this.state.members, account]
    });

  // Dialog Content
  dialogContent = (accounts, classes, t, RowElement) => (
    <Column className={classes.dialogContent}>
      <Row paddingTop>
        <Text>{t("selectAccountUseForCallCareLookup")}</Text>
      </Row>
      <Row paddingTopDouble>
        <StretchingGridItem>
          <AvailableItemsList
            availableItemsHeading={t("accounts")}
            availableItems={accounts}
            searchBy={["name"]}
            isItemSelected={this.isMember}
            handleToggleItem={this.handleToggleMember}
            RowElement={RowElement}
            openItemItemsDialog={() => {}}
          />
        </StretchingGridItem>
      </Row>
    </Column>
  );

  // Dialog Footer
  dialogFooter = t => (
    <HubbubDialogFooter
      confirmLabel={t("confirm")}
      onClose={this.handleClose}
      onConfirm={this.handleSave}
    />
  );

  // Main Render
  render = () => {
    const { classes, getChildAccounts, t } = this.props;

    return (
      <HubbubDialog
        open={true}
        maxWidth="md"
        dialogClass={{ paper: classes.dialogPaper }}
        dialogHeader={this.dialogHeader(t)}
        dialogContent={this.dialogContent(getChildAccounts(), classes, t, AccountRowElement)}
        dialogFooter={this.dialogFooter(t)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "SelectAccountDialog" })(
    translate(["servicedesigner", "security", "common"])(SelectAccountDialog)
  )
);
