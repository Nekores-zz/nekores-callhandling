import React, { Component } from "react";
import PropTypes from "prop-types";
import { AvatarUCell, UserStatusCell, VirtualizedList, ConfirmDialog } from "components";
import { InviteMembers } from "components/Groups";
import { translate } from "react-i18next";

class EditGroupMembers extends Component {
  static propTypes = {
    members: PropTypes.array.isRequired,
    membersCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getAvailableUsersHandler: PropTypes.func.isRequired,
    removeGroupMember: PropTypes.func.isRequired,
    removeGroupMembers: PropTypes.func.isRequired,
    removeAllGroupMembersExcept: PropTypes.func.isRequired,
    handleAddGroupMembers: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  state = {
    dialog: null,
    confirmDialog: null
  };

  ///// INVITE MEMBERS DIALOG SETUP /////

  openInviteMembersDialog = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.getAvailableUsersHandler().then(response => {
      this.setState({
        dialog: (
          <InviteMembers
            availableUsers={response}
            onCancel={this.closeInviteMembersDialog}
            onConfirm={this.handleAddMembers}
          />
        )
      });
    });
  };

  closeInviteMembersDialog = () => this.setState({ dialog: null });

  handleAddMembers = newMembers => {
    this.props.handleAddGroupMembers(newMembers.map(member => member.toScala()));
    this.closeInviteMembersDialog();
  };

  InviteMembersDialog = () => this.state.dialog;

  ///// REMOVE MEMBERS DIALOG SETUP /////

  removeGroupMember = member => {
    this.props.removeGroupMember(member.toScala());
  };

  removeGroupMembers = members => {
    console.log("Remove members");
    console.log(members);
    this.props.removeGroupMembers(members.map(member => member.toScala()));
  };

  removeAllGroupMembersExcept = members => {
    console.log("removeAllGroupMembersExcept members");
    console.log(members);
    this.props.removeAllGroupMembersExcept(members.map(member => member.toScala()));
  };

  handleRemoveGroupMembers = clearSelection => (members, inverted) => {
    inverted ? this.removeAllGroupMembersExcept(members) : this.removeGroupMembers(members);
    this.closeConfirmRemoveMembersDialog();
    clearSelection();
  };

  closeConfirmRemoveMembersDialog = () => this.setState({ confirmDialog: null });

  openConfirmRemoveMembersDialog = (members, inverted, clearSelection) =>
    this.setState({ confirmDialog: { members, inverted, clearSelection } });

  ConfirmRemoveMembersDialog = () =>
    this.state.confirmDialog ? (
      <ConfirmDialog
        dialogMessage={this.props.t("countMembersWillBeRemoved", {
          count: this.state.confirmDialog.inverted
            ? this.props.membersCount - this.state.confirmDialog.members.length
            : this.state.confirmDialog.members.length
        })}
        confirmMessage={this.props.t("iUnderstandRemoveMembersMsg")}
        selectedItems={this.state.confirmDialog.members}
        inverted={this.state.confirmDialog.inverted}
        onCancel={this.closeConfirmRemoveMembersDialog}
        onConfirm={this.handleRemoveGroupMembers(this.state.confirmDialog.clearSelection)}
      />
    ) : null;

  ///// LIST SETUP /////

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "members",
      args: ["id", "firstName", "lastName", "email"],
      render: AvatarUCell,
      hidden: false
    },
    {
      display: "flex",
      heading: "status",
      args: ["status"],
      render: UserStatusCell,
      hidden: true
    },
    {
      display: "actions",
      args: [{ label: "removeMember", action: this.removeGroupMember, icon: "highlight_off" }],
      hidden: true
    }
  ];

  bulkActions = [
    {
      icon: "delete",
      onClick: this.openConfirmRemoveMembersDialog
    }
  ];

  render = () => {
    const {
      members,
      membersCount,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      t
    } = this.props;

    const hasMembers = members.length > 0;

    const InviteMembersDialog = this.InviteMembersDialog;
    const ConfirmRemoveMembersDialog = this.ConfirmRemoveMembersDialog;

    return (
      <VirtualizedList
        isEmpty={!hasMembers && !isLoading} // TODO: should be set from props (check on ListingPage.scala: def isListEmpty)
        emptyMessageKeys={{
          startCreatingTitle: "startAddMembers",
          startCreatingMsg: "startAddMembersMsg",
          noHitsTitle: "noHits",
          noHitsMsg: "noHitsMsg"
        }}
        data={members}
        dataCount={membersCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        bulkActions={this.bulkActions}
        handleAddClick={this.openInviteMembersDialog}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <InviteMembersDialog />

        <ConfirmRemoveMembersDialog />
      </VirtualizedList>
    );
  };
}

export default translate("groups")(EditGroupMembers);
