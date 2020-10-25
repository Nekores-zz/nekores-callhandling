/**
 *
 * by A. Prates, jan-2019
 * Modified by: Sajid U. / Sept-2019
 *
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withWidth, withStyles } from "@material-ui/core";
import { GroupSelector } from "components";
import { UserRow } from "components/Security/RowElements";
import { translate } from "react-i18next";
import { HubbubDialog, HubbubDialogFooter, HubbubDialogHeader } from "components";
import { styleSheet } from "jss/Groups/GroupDialogs/InviteMember";

class InviteMembers extends PureComponent {
  static propTypes = {
    availableUsers: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    members: []
  };

  isMember = user => this.state.members.findIndex(member => member.id === user.id) !== -1;

  handleToggleMember = user => () =>
    this.setState({
      members: this.isMember(user)
        ? this.state.members.filter(m => m.id !== user.id)
        : [...this.state.members, user]
    });

  handleClearAll = () => this.setState({ members: [] });
  // Dialog Header
  dialogHeader = (onCancel, t) => (
    <HubbubDialogHeader
      icon={false}
      headerVariation="grey"
      onClose={onCancel}
      headerTitle={t("inviteMembers")}
    />
  );

  // Dialog Content
  dialogContent = (availableUsers, UserRow, classes, t) => (
    <div>
      <GroupSelector
        availableItemsHeading={t("availableUsers")}
        availableItems={availableUsers}
        seclectedItemsHeading={t("selectedUsers")}
        searchBy={["firstName", "lastName", "email"]}
        isItemSelected={this.isMember}
        handleToggleItem={this.handleToggleMember}
        handleClearAll={this.handleClearAll}
        RowElement={UserRow}
        stretchingLayout
      />
    </div>
  );

  // Dialog Footer
  dialogFooter = (onConfirm, members, blocked, onCancel, fullScreen, t) => (
    <HubbubDialogFooter
      onConfirm={() => onConfirm([...members])}
      blocked={blocked}
      onClose={onCancel}
      confirmLabel={!fullScreen || blocked ? t("add") : t("addCount", { count: members.length })}
    />
  );

  render() {
    const { availableUsers, onCancel, onConfirm, width, classes, t } = this.props;
    const { members } = this.state;
    const fullScreen = width === "sm" || width === "xs";
    const blocked = members.length === 0;
    console.log(classes);
    return (
      <HubbubDialog
        open={true}
        maxWidth="md"
        dilaogClass={classes.dialogPaper}
        classDialogContent={classes.dialogContent}
        // - Dialog Header
        dialogHeader={this.dialogHeader(onCancel, t)}
        // - Dialog Content
        dialogContent={this.dialogContent(availableUsers, UserRow, classes, t)}
        // - Dialog Footer
        dialogFooter={this.dialogFooter(onConfirm, members, blocked, onCancel, fullScreen, t)}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "InviteMembers" })(
  withWidth()(translate("groups")(InviteMembers))
);
