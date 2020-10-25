import React, { Component } from "react";
import PropTypes from "prop-types";
import { AvatarSimpleCell, RoleInfoCell, VirtualizedList, ConfirmDialog } from "components";
import { AddRoles } from "./GroupDialogs";
import { translate } from "react-i18next";

class EditGroupRoles extends Component {
  static propTypes = {
    groupRoles: PropTypes.array.isRequired,
    rolesCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getAssignableRoles: PropTypes.func.isRequired,
    getEffectiveRoles: PropTypes.func.isRequired,
    getPermissionSets: PropTypes.func.isRequired,
    getCompositeRoles: PropTypes.func.isRequired,
    removeGroupRole: PropTypes.func.isRequired,
    removeGroupRoles: PropTypes.func.isRequired,
    removeAllGroupRolesExcept: PropTypes.func.isRequired,
    addRolesToGroup: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  state = {
    dialog: null
  };

  ///// ADD ROLES DIALOG SETUP /////

  openAddRolesDialog = () =>
    this.setState({
      dialog: (
        <AddRoles
          getEffectiveRoles={this.props.getEffectiveRoles}
          getAssignableRoles={this.props.getAssignableRoles}
          getPermissionSets={this.props.getPermissionSets}
          getCompositeRoles={this.props.getCompositeRoles}
          onCancel={this.closeAddRolesDialog}
          onConfirm={this.handleAddRoles}
        />
      )
    });

  closeAddRolesDialog = () => this.setState({ dialog: null });

  handleAddRoles = newRoles => {
    this.props.addRolesToGroup(newRoles.map(role => role.toScala()));
    this.closeAddRolesDialog();
  };

  ///// REMOVE ROLES DIALOG SETUP /////

  removeGroupRole = role => this.props.removeGroupRole(role.toScala());

  removeGroupRoles = roles => {
    console.log("Remove roles");
    console.log(roles);
    this.props.removeGroupRoles(roles.map(role => role.toScala()));
  };

  removeAllGroupRolesExcept = roles => {
    console.log("removeAllGroupRolesExcept members");
    console.log(roles);
    this.props.removeAllGroupRolesExcept(roles.map(role => role.toScala()));
  };

  handleRemoveGroupRoles = clearSelection => (roles, inverted) => {
    inverted ? this.removeAllGroupRolesExcept(roles) : this.removeGroupRoles(roles);
    this.closeConfirmRemoveMembersDialog();
    clearSelection();
  };

  closeConfirmRemoveRolesDialog = () => this.setState({ confirmDialog: null });

  openConfirmRemoveRolesDialog = (roles, inverted, clearSelection) =>
    this.setState({ confirmDialog: { roles, inverted, clearSelection } });

  ConfirmRemoveRolesDialog = () =>
    this.state.confirmDialog ? (
      <ConfirmDialog
        dialogMessage={this.props.t("countRolesWillBeRemoved", {
          count: this.state.confirmDialog.inverted
            ? this.props.rolesCount - this.state.confirmDialog.roles.length
            : this.state.confirmDialog.roles.length
        })}
        confirmMessage={this.props.t("iUnderstandRemoveMembersMsg")}
        selectedItems={this.state.confirmDialog.roles}
        inverted={this.state.confirmDialog.inverted}
        onCancel={this.closeConfirmRemoveRolesDialog}
        onConfirm={this.handleRemoveGroupRoles(this.state.confirmDialog.clearSelection)}
      />
    ) : null;

  AddRolesDialog = () => this.state.dialog;

  ///// LIST SETUP /////

  sortGroupFn = row => {
    const { t } = this.props;
    return row.isFavorite ? t("favorites") : t("other");
  };

  /*  getGroupRoles = () => {
    const { roles, availableRoles } = this.props;
    let groupRoles = roles.map(id => availableRoles.find(r => r.id === id));
    groupRoles = [
      ...groupRoles.filter(item => item.isFavorite),
      ...groupRoles.filter(item => !item.isFavorite)
    ];
    return groupRoles;
  };*/

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "roles",
      args: ["id", "name"],
      render: AvatarSimpleCell,
      hidden: false
    },
    {
      display: "flex",
      heading: "",
      render: RoleInfoCell,
      hidden: true
    },
    {
      display: "actions",
      args: [{ label: "removeRole", action: this.removeGroupRole, icon: "highlight_off" }],
      hidden: true
    }
  ];

  bulkActions = [
    {
      icon: "delete",
      onClick: this.openConfirmRemoveRolesDialog
    }
  ];

  render = () => {
    const {
      groupRoles,
      rolesCount,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      t
    } = this.props;

    const hasRoles = groupRoles.length > 0;

    const AddRolesDialog = this.AddRolesDialog;
    const ConfirmRemoveRolesDialog = this.ConfirmRemoveRolesDialog;

    return (
      <VirtualizedList
        isEmpty={!hasRoles && !isLoading} // TODO: should be set from props (check on ListingPage.scala: def isListEmpty)
        emptyMessageKeys={{
          startCreatingTitle: "startAddRoles",
          startCreatingMsg: "startAddRolesMsg",
          noHitsTitle: "noHits",
          noHitsMsg: "noHitsMsg"
        }}
        data={groupRoles}
        dataCount={rolesCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        bulkActions={this.bulkActions}
        handleAddClick={this.openAddRolesDialog}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <AddRolesDialog />

        <ConfirmRemoveRolesDialog />
      </VirtualizedList>
    );
  };
}

export default translate("groups")(EditGroupRoles);
