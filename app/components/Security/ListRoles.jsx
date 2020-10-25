import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  AvatarSimpleCell,
  RoleInfoCell,
  RoleRowDisplay,
  RowDisplayPanel,
  VirtualizedList
} from "components";
import { Role, securitySection } from "models";
import { objects } from "utils";

class ListRoles extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    permissionSetId: PropTypes.string,
    roles: PropTypes.objectOf(Role.propType).isRequired,
    rolesCount: PropTypes.number.isRequired,
    loadMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    onScrollPositionChange: PropTypes.func,
    onScrollPositionSetter: PropTypes.func,
    navigate: securitySection.propTypes.navigate.isRequired,
    getEditRolePermission: PropTypes.func.isRequired,
    createRolePermission:PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    roles: this.props.roles,
    openRow: null
  };

  ///// QUICK-VIEW SETUP /////

  openQuickView = row => this.setState({ openRow: row });

  closeQuickView = () => this.setState({ openRow: null });

  QuickView = () => {
    let editRolePermission = this.state.openRow ? this.props.getEditRolePermission(this.state.openRow) : null;
    return this.state.openRow ? (
        <RowDisplayPanel
            rowData={this.state.openRow}
            getHeader={row => ({color: row.id, name: row.name})}
            content={{
              render: RoleRowDisplay
              /*props: {
                roles: this.props.roles
              }*/
            }}
            onClose={this.closeQuickView}
            onEdit={editRolePermission ? this.handleEditRole : null}
           // onStar={this.handleFavoriteClick}
            t={this.props.t}
        />
    ) : null;
  };

  ///// LIST SETUP /////

  /*sortGroupFn = row => {
    const { t } = this.props;
    return row.isFavorite ? t("favorites") : t("other");
  };

  isFavorite = row => row.isFavorite;

  handleFavoriteClick = row => {};*/

  handleEditRole = role => this.props.navigate.roles.edit(role.id, role.setId);

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
      args: [
       // { label: "favorite", action: this.handleFavoriteClick, isFavorite: this.isFavorite },
        { label: "edit", action: this.handleEditRole, icon: "edit" }
      ],
      hidden: true
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
    },
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
    }
  ];

  render = () => {
    const {
      isEmpty,
      permissionSetId,
      rolesCount,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      navigate,
      roles,
      getEditRolePermission,
      createRolePermission,
      t
    } = this.props;

    const QuickView = this.QuickView;

    return (
      <VirtualizedList
        // TODO: inject is empty prop, look at ListServices implementation
        isEmpty={isEmpty}
        emptyMessageKeys={{
          startCreatingTitle: permissionSetId? "startAddRole":"noRolesAvailable",
          startCreatingMsg: permissionSetId? "startAddRoleMsg":"addRoleFromPermissionSetMsg",
          noHitsTitle: "noRoleHits",
          noHitsMsg: "noRoleHitsMsg"
        }}
        data={objects.values(roles)}
        dataCount={rolesCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={getEditRolePermission}
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={permissionSetId && createRolePermission? () => navigate.roles.create(permissionSetId) : undefined}
       // sortGroupFn={this.sortGroupFn}
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

export default translate("security")(ListRoles);
