/**
 * by A. Prates, jan-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarSimpleCell,
  GroupRowDisplay,
  RowDisplayPanel,
  SimpleTextCell,
  TimeDateCell,
  VirtualizedList,
  ConfirmDialog
} from "components";
import { translate } from "react-i18next";

class ListGroups extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    groups: PropTypes.array.isRequired,
    recentUpdates: PropTypes.array,
    groupsCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createGroup: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired,
    dialogToggle: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    removeGroups: PropTypes.func.isRequired,
    handleFavoriteClick: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,

    t: PropTypes.func.isRequired
  };

  static defaultProps = { recentUpdates: [] };

  state = {
    openRow: null
  };

  ///// QUICKVIEW SETUP /////

  openQuickView = row => {
    this.props.dialogToggle(row);
    this.setState({ openRow: row });
  };

  closeQuickView = () => {
    this.props.dialogToggle(this.state.openRow);
    this.setState({ openRow: null });
  };

  QuickView = () =>
    this.state.openRow ? (
      <RowDisplayPanel
        rowData={this.state.openRow}
        getHeader={row => ({ color: row.id, name: row.name })}
        content={{ render: GroupRowDisplay }}
        onClose={this.closeQuickView}
        onEdit={this.handleEditRowContent}
        onStar={this.handleFavoriteClick}
        t={this.props.t}
      />
    ) : null;

  ///// LIST SETUP /////

  sortGroupFn = row => {
    const { t } = this.props;
    return row.isFavorite ? t("favorites") : t("other");
  };

  isFavorite = group => {
    return group.favoriteUsers && group.favoriteUsers.indexOf(this.props.currentUserId) != -1;
  };

  handleFavoriteClick = group => {
    this.props.handleFavoriteClick(group.toScala(), !this.isFavorite(group));
  };

  handleEditRowContent = row => this.props.editGroup(row.id);

  ///// REMOVE GROUP DIALOG SETUP /////
  removeGroups = (isAllDelete, groups) => {
    console.log("Remove groups");
    console.log(groups);
    this.props.removeGroups(isAllDelete, groups.map(group => group.toScala()));
  };

  handleRemoveGroups = clearSelection => (groups, inverted) => {
    inverted ? this.removeGroups(true, groups) : this.removeGroups(false, groups);
    this.closeConfirmRemoveGroupsDialog();
    clearSelection();
  };

  closeConfirmRemoveGroupsDialog = () => this.setState({ confirmDialog: null });

  openConfirmRemoveGroupsDialog = (groups, inverted, clearSelection) => {
    console.log(groups);
    console.log(inverted);
    console.log(clearSelection);
    this.setState({ confirmDialog: { groups, inverted, clearSelection } });
  };

  ConfirmRemoveGroupsDialog = () =>
    this.state.confirmDialog ? (
      <ConfirmDialog
        dialogMessage={this.props.t("countGroupsWillBeRemoved", {
          count: this.state.confirmDialog.inverted
            ? this.props.groupsCount - this.state.confirmDialog.groups.length
            : this.state.confirmDialog.groups.length
        })}
        confirmMessage={this.props.t("iUnderstandRemoveGroupsMsg")}
        selectedItems={this.state.confirmDialog.groups}
        inverted={this.state.confirmDialog.inverted}
        onCancel={this.closeConfirmRemoveGroupsDialog}
        onConfirm={this.handleRemoveGroups(this.state.confirmDialog.clearSelection)}
      />
    ) : null;

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "groups",
      args: ["id", "name"],
      render: AvatarSimpleCell,
      hidden: false
    },
    {
      display: "180 px",
      heading: "members",
      args: ["membersCount"],
      render: SimpleTextCell,
      hidden: true
    },
    {
      display: "180 px",
      heading: "roles",
      args: ["rolesCount"],
      render: SimpleTextCell,
      hidden: true
    },
    {
      display: "flex",
      heading: "createdAt",
      args: ["createdAt"],
      render: TimeDateCell,
      hidden: true
    },
    {
      display: "actions",
      args: [
        { label: "favorite", action: this.handleFavoriteClick, isFavorite: this.isFavorite },
        { label: "edit", action: this.handleEditRowContent, icon: "edit" }
      ],
      hidden: true
    }
  ];

  bulkActions = [
    /* {
      icon: "edit",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk edit all, except: " + items.length + " items!")
          : console.log("Bulk edit " + items.length + " items!");
      }
    },*/
    {
      icon: "delete",
      onClick: this.openConfirmRemoveGroupsDialog
    } /*,
    {
      icon: "more_horiz",
      bulkMenu: [
        {
          label: "otherAction1",
          icon: "settings",
          onClick: (items, inverted, clearSelection) => {
            inverted
              ? console.log("Bulk otherAction1 all, except: " + items.length + " items!")
              : console.log("Bulk otherAction1 on " + items.length + " items!");
          }
        },
        {
          label: "otherAction2",
          icon: "settings",
          onClick: (items, inverted, clearSelection) => {
            inverted
              ? console.log("Bulk otherAction2 all, except: " + items.length + " items!")
              : console.log("Bulk otherAction2 on " + items.length + " items!");
          }
        }
      ]
    }*/
  ];

  render = () => {
    const {
      isEmpty,
      groups,
      recentUpdates,
      groupsCount,
      createGroup,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      t
    } = this.props;

    const QuickView = this.QuickView;
    const ConfirmRemoveGroupsDialog = this.ConfirmRemoveGroupsDialog;

    return (
      <VirtualizedList
        isEmpty={isEmpty}
        emptyMessageKeys={{
          startCreatingTitle: "",
          startCreatingMsg: "",
          noHitsTitle: "",
          noHitsMsg: ""
        }}
        data={recentUpdates.concat(groups)}
        dataCount={groupsCount}
        schema={this.listSchema}
        getKeyFn={item => item.key}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={createGroup}
        sortGroupFn={this.sortGroupFn}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <QuickView />

        <ConfirmRemoveGroupsDialog />
      </VirtualizedList>
    );
  };
}

export default translate("groups")(ListGroups);
