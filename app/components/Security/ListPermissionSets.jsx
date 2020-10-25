/**
 * updated by A. Prates, dec-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  AvatarSimpleCell,
  PermissionSetDisabledCell,
  PermissionSetRowDisplay,
  PermissionSetStatusCell,
  RowDisplayPanel,
  VirtualizedList
} from "components";
import EditPermissionSetStatusDialog from "./EditPermissionSetStatusDialog";
import { CreatePolicyDialog } from "components/Security";
import { Divider, Switch } from "components/Elements";
import { PermissionSet, securitySection } from "models";

class ListPermissionSets extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    permissionSets: PropTypes.arrayOf(PermissionSet.propType).isRequired,
    permissionSetsCount: PropTypes.number.isRequired,
    loadMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func,
    onScrollPositionSetter: PropTypes.func,
    onEnable: PropTypes.func,
    navigate: securitySection.propTypes.navigate.isRequired,
    getUIPermissions: PropTypes.func.isRequired,
    createPermissionSetPermission: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    dialog: null,
    openRow: null,
    enabledStatusCache: {}
  };

  onEnable = row => event => {
    event.stopPropagation();
    const { enabledStatusCache } = this.state;
    enabledStatusCache["status_" + row.id] =
      enabledStatusCache["status_" + row.id] === undefined
        ? !row.isEnabled
        : !enabledStatusCache["status_" + row.id];
    this.setState({ enabledStatusCache }, () => this.props.onEnable(row.id, !row.isEnabled));
  };

  getEnabled = row =>
    this.state.enabledStatusCache["status_" + row.id] === undefined
      ? row.isEnabled
      : this.state.enabledStatusCache["status_" + row.id];

  handleEdit = permissionSet => {
    this.props.navigate.permissionSets.edit(permissionSet.id);
  };

  handleCreateRole = row => {
    this.props.navigate.roles.create(row.id);
  };

  handleCreatePermission = row => {
    this.props.navigate.permissions.create(row.id);
  };

  handleCreatePolicy = row => {
    this.showCreatePolicyDialog().then(type => {
      if (type) {
        this.props.navigate.policies.create(type, row.id);
      }
    });
  };

  ///// EDIT STATUS DIALOG SETUP /////

  openEditStatusDialog = permissionSet => {
    new Promise((resolve, reject) => {
      resolve = status => {
        //let updatedPermissionSet = PermissionSet.setStatus(permissionSet, status);
        //this.props.onChange(updatedPermissionSet);
        this.props.onChange(status, permissionSet.id);
        this.setState({ dialog: null });
      };
      let dialog = (
        <EditPermissionSetStatusDialog
          onSave={resolve}
          onClose={reject}
          permissionSet={permissionSet}
        />
      );
      this.setState({ dialog });
    }).then(
      status => {
        this.setState({ dialog: null });
      },
      error => {
        this.setState({ dialog: null });
      }
    );
  };

  EditStatusDialog = () => this.state.dialog;

  ///// QUICK-VIEW SETUP /////

  openQuickView = row => {
    this.setState({ openRow: row });
  };

  closeQuickView = () => this.setState({ openRow: null });

  QuickView = () => {
    let permissions = this.state.openRow ? this.props.getUIPermissions(this.state.openRow) : null;
    return this.state.openRow && permissions.describe ? (
      <RowDisplayPanel
        rowData={this.state.openRow}
        getHeader={row => ({ color: row.id, name: row.name })}
        content={{ render: PermissionSetRowDisplay }}
        menu={this.getRowMenu(this.state.openRow, true)}
        onClose={this.closeQuickView}
        onEdit={permissions.edit || permissions.share ? this.handleEdit : null}
        t={this.props.t}
      />
    ) : null;
  };

  showCreatePolicyDialog = () => {
    return new Promise((resolve, reject) => {
      this.setState({
        dialog: <CreatePolicyDialog onClose={resolve} />
      });
    }).then(type => {
      this.setState({ dialog: null });
      return type;
    });
  };

  CreatePolicyDialog = () => this.state.dialog;

  ///// LIST SETUP /////

  sortGroupFn = row => {
    const { t } = this.props;
    return row.isOwn ? t("mySets") : t("setsShared");
  };

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "permissionSets",
      args: ["id", "name"],
      render: AvatarSimpleCell,
      hidden: false
    },
    {
      display: "flex",
      heading: "status",
      args: ["status"],
      render: PermissionSetStatusCell,
      hidden: true
    },
    {
      display: "flex",
      args: ["isEnabled", "isOwn"],
      render: PermissionSetDisabledCell,
      hidden: true
    },
    {
      display: "actions",
      args: [{ label: "menu" }],
      hidden: true
    }
  ];

  menuItems = {
    edit: {
      label: "edit",
      icon: "edit",
      onClick: this.handleEdit
    },
    changeSetStatus: {
      label: "changeSetStatus",
      icon: "receipt",
      onClick: this.openEditStatusDialog
    },
    createRole: {
      label: "createRole",
      icon: "assignment_ind",
      onClick: this.handleCreateRole
    },
    createPolicy: {
      label: "createPolicy",
      icon: "library_books",
      onClick: this.handleCreatePolicy
    },
    createPermission: {
      label: "createPermission",
      icon: "list",
      onClick: this.handleCreatePermission
    },
    divider: {
      renderFn: (i, row, onClickFn) => <Divider key={i} />
    },
    enableOnAll: {
      renderFn: (i, row, onClickFn) =>
        row && (
          <MenuItem key={i}>
            <ListItemIcon>
              <Switch
                checked={this.getEnabled(row)}
                onChange={this.onEnable(row)}
                color="secondary"
              />
            </ListItemIcon>
            <ListItemText primary={this.props.t("enableOnAllAccounts")} />
          </MenuItem>
        )
    }
  };

  getRowMenu = (row, forQuickView) => {
    const menu = [];
    const permissions = this.props.getUIPermissions(row);

    if (!forQuickView && (permissions.edit || permissions.share)) menu.push(this.menuItems.edit);

    if (permissions.changeSetStatus) menu.push(this.menuItems.changeSetStatus);

    if (permissions.createRole) menu.push(this.menuItems.createRole);

    if (permissions.createPolicy) menu.push(this.menuItems.createPolicy);

    if (permissions.createPermission) menu.push(this.menuItems.createPermission);

    if (permissions.enableOnAccounts) {
      menu.push(this.menuItems.divider);
      menu.push(this.menuItems.enableOnAll);
    }

    return menu;
  };

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
      permissionSets,
      permissionSetsCount,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      navigate,
      createPermissionSetPermission,
      t
    } = this.props;

    const EditStatusDialog = this.EditStatusDialog;
    const QuickView = this.QuickView;

    return (
      <VirtualizedList
        isEmpty={isEmpty}
        emptyMessageKeys={{
          startCreatingTitle: "startAddPermissionSets",
          startCreatingMsg: "startAddPermissionSetsMsg",
          noHitsTitle: "noPermissionSetsHits",
          noHitsMsg: "noPermissionSetsHitsMsg"
        }}
        data={permissionSets}
        dataCount={permissionSetsCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={_ => true}
        getRowMenu={this.getRowMenu}
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={createPermissionSetPermission ? navigate.permissionSets.create : null}
        sortGroupFn={this.sortGroupFn}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <EditStatusDialog />
        <QuickView />
      </VirtualizedList>
    );
  };
}

export default translate("security")(ListPermissionSets);
