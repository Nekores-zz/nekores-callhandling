import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  AvatarSimpleCell,
  PolicyRowDisplay,
  RolePoliciesCell,
  RowDisplayPanel,
  VirtualizedList
} from "components";
import { CreatePolicyDialog } from "components/Security";
import { Policy, securitySection } from "models";

class ListPolicies extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    permissionSetId: PropTypes.string,
    policies: PropTypes.arrayOf(Policy.propType).isRequired,
    policiesCount: PropTypes.number.isRequired,
    loadMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    onScrollPositionChange: PropTypes.func,
    onScrollPositionSetter: PropTypes.func,
    navigate: securitySection.propTypes.navigate.isRequired,
    getEditPolicyPermission: PropTypes.func.isRequired,
    createPolicyPermission:PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    policies: this.props.policies,
    dialog: null,
    openRow: null
  };

  ///// CREATE POLICY DIALOG SETUP /////

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

  ///// QUICK-VIEW SETUP /////

  openQuickView = row => this.setState({ openRow: row });

  closeQuickView = () => this.setState({ openRow: null });

  QuickView = () => {
    if (this.state.openRow === null) return null;
    let editPolicyPermission = this.state.openRow ? this.props.getEditPolicyPermission(this.state.openRow) : null;
    const row = { ...this.state.openRow };

    return (
      <RowDisplayPanel
        rowData={row}
        getHeader={row => ({ color: row.id, name: row.name })}
        content={{ render: PolicyRowDisplay }}
        onClose={this.closeQuickView}
        onEdit={editPolicyPermission ? this.handleEdit : null}
      //  onStar={this.handleFavoriteClick}
        t={this.props.t}
      />
    );
  };

  ///// CREATE BUTTON SETUP /////

  handleCreateButtonClick = event => {
    event.stopPropagation();
    this.showCreatePolicyDialog().then(type => {
      if (type) {
        this.props.navigate.policies.create(type, this.props.permissionSetId);
      }
    });
  };

  ///// LIST SETUP /////

 /* sortGroupFn = row => {
    const { t } = this.props;
    return row.isFavorite ? t("favorites") : t("other");
  };

  isFavorite = row => row.isFavorite;

  handleFavoriteClick = row => {};*/

  handleEdit = policy => this.props.navigate.policies.edit(policy.id, policy.type, policy.setId);

  getActionPermission = (policy, action) => {
    const permissions = this.props.getUIPermissions(policy);
    return permissions.edit
  };

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "policies",
      args: ["id", "name"],
      render: AvatarSimpleCell,
      hidden: false
    },
    {
      display: "flex",
      heading: "",
      args: [],
      render: RolePoliciesCell,
      hidden: true
    },
    {
      display: "actions",
      args: [
      //  { label: "favorite", action: this.handleFavoriteClick, isFavorite: this.isFavorite },
        { label: "edit", action: this.handleEdit, icon: "edit" }
      ],
      hidden: true
    }
  ];

  menu = [
    {
      label: "manage",
      icon: "settings",
      onClick: this.handleEdit
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
      policiesCount,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      policies,
      permissionSetId,
      createPolicyPermission,
      t
    } = this.props;

    const CreatePolicyDialog = this.CreatePolicyDialog;
    const QuickView = this.QuickView;

    return (
      <VirtualizedList
        isEmpty={isEmpty}
        emptyMessageKeys={{
          startCreatingTitle: permissionSetId?"startAddPolicies":"noPoliciesAvailable",
          startCreatingMsg: permissionSetId?"startAddPoliciesMsg":"addPoliciesFromPermissionSetMsg",
          noHitsTitle: "noPoliciesHits",
          noHitsMsg: "noPoliciesHitsMsg"
        }}
        data={policies}
        dataCount={policiesCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        getActionPermission={this.props.getEditPolicyPermission}
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={permissionSetId && createPolicyPermission? this.handleCreateButtonClick : undefined}
       // sortGroupFn={this.sortGroupFn}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <CreatePolicyDialog />

        <QuickView />
      </VirtualizedList>
    );
  };
}

export default translate("security")(ListPolicies);
