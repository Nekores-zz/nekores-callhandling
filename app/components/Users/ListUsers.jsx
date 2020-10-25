import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarUCell,
  RowDisplayPanel,
  UserRowDisplay,
  UserStatusCell,
  TimeDateCell,
  VirtualizedList
} from "components";
import { translate } from "react-i18next";

class ListUsers extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    recentUpdates: PropTypes.array,
    usersCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    currentUser: PropTypes.string.isRequired,
    inviteUser: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired,
    dialogToggle: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    handleFavoriteClick: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  static defaultProps = { recentUpdates: [] };

  state = {
    openRow: null
  };

  handleMenuClick = row => console.log("Calling menu action on item: " + row.id);

  isFavorite = user => {
    return user.favoriteUsers && user.favoriteUsers.indexOf(this.props.currentUser) != -1;
  };

  ///// QUICK-VIEW SETUP /////

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
        rowData={{
          userProfile: this.state.openRow,
          isFavorite: this.isFavorite(this.state.openRow),
          fetchUserRoles: this.props.fetchUserRoles,
          fetchUserGroups: this.props.fetchUserGroups
        }}
        menu={this.menu}
        getHeader={row => ({
          color: row.userProfile.id,
          name: row.userProfile.firstName + " " + row.userProfile.lastName
        })}
        content={{ render: UserRowDisplay }}
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

  handleFavoriteClick = user => {
    const userProfile = user.userProfile || user;
    this.props.handleFavoriteClick(userProfile.toScala(), !this.isFavorite(userProfile));
  };

  handleEditRowContent = row =>
    row.userProfile !== undefined
      ? this.props.editProfile(row.userProfile.id)
      : this.props.editProfile(row.id);

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "user",
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
      display: "flex",
      heading: "invitedAt",
      args: ["invitedAt"],
      render: TimeDateCell,
      hidden: true
    },
    {
      display: "spacer",
      hidden: true
    },
    {
      display: "actions",
      args: [
        { label: "favorite", action: this.handleFavoriteClick, isFavorite: this.isFavorite },
        { label: "edit", action: this.handleEditRowContent, icon: "edit" },
        { label: "menu" }
      ],
      hidden: true
    }
  ];

  listMenu = [
    {
      label: "managePermissions",
      icon: "how_to_reg",
      onClick: this.handleMenuClick
    },
    {
      label: "block",
      icon: "block",
      onClick: this.handleMenuClick
    }
  ];

  bulkActions = [
    {
      icon: "edit",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk edit all, except: " + items.length + " items!")
          : console.log("Bulk edit " + items.length + " items!");
      }
    },
    {
      icon: "delete",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk delete all, except: " + items.length + " items!")
          : console.log("Bulk delete " + items.length + " items!");
      }
    }
  ];

  render = () => {
    const {
      isEmpty,
      users,
      recentUpdates,
      usersCount,
      inviteUser,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,

      t
    } = this.props;

    const QuickView = this.QuickView;

    return (
      <VirtualizedList
        isEmpty={isEmpty}
        emptyMessageKeys={{
          startCreatingTitle: "startAddUsers",
          startCreatingMsg: "startAddUsersMsg",
          noHitsTitle: "noUserHits",
          noHitsMsg: "noUserHitsMsg"
        }}
        data={recentUpdates.concat(users)} // TODO: take recentUpdates as separate prop for rendering in separate section
        dataCount={usersCount}
        schema={this.listSchema}
        getKeyFn={item => item.key}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        getRowMenu={row => this.listMenu} // TODO: implement permission check
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={inviteUser}
        sortGroupFn={this.sortGroupFn}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <QuickView />
      </VirtualizedList>
    );
  };
}

export default translate("users")(ListUsers);
