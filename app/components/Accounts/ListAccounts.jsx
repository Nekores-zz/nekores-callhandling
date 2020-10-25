 /*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], out-2018 - dec-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AvatarTwoLinesCell,
  TwoLinesCell,
  AccountStatusCell,
  AccountRowDisplay,
  RowDisplayPanel,
  VirtualizedList,
  ConfirmDialog
} from "components";
import { PreCreateAccountDialog } from "components/Accounts";
import { translate } from "react-i18next";

class ListAccounts extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    accounts: PropTypes.array.isRequired,
    accountsCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createAccount: PropTypes.func.isRequired,
    getMinimalAccInfo: PropTypes.func.isRequired,
    accTypes: PropTypes.array.isRequired,
    checkDomainAvailability: PropTypes.func.isRequired,
    editIncompleteAccount: PropTypes.func.isRequired,
    dialogToggle: PropTypes.func.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    administerAccount: PropTypes.func.isRequired,
    suspendAccount: PropTypes.func.isRequired,
    suspendAccounts: PropTypes.func.isRequired,
    closeAccount: PropTypes.func.isRequired,
    closeAccounts: PropTypes.func.isRequired,
    handleGoToAccount: PropTypes.func.isRequired,
    handleFavoriteClick: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  state = {
    accounts: this.props.accounts,
    openRow: null,
    dialog: null
  };

  handleMenuClick = row => console.log("menu action on object: " + row.id);

  ///// BASE CONFIRM DIALOG SETUP /////

  closeDialog = () => this.setState({ dialog: null });

  ///// SUSPEND ACCOUNT (SINGLE) DIALOG SETUP /////
  handleSuspendSingleAccount = account => {
    console.log("Suspend account");
    console.log(account);
    this.props.suspendAccount(account.toScala());
    this.closeDialog();
  };

  openConfirmSuspendAccountDialog = account =>
    this.setState({
      dialog: (
        <ConfirmDialog
          dialogMessage={this.props.t("suspendAccountWarning")}
          confirmMessage={this.props.t("confirmSuspendAccountMsg", {
            name: account.name
          })}
          item={account}
          onCancel={this.closeDialog}
          onConfirm={this.handleSuspendSingleAccount}
        />
      )
    });

  ///// SUSPEND ACCOUNTS (BULK) DIALOG SETUP /////
  handleSuspendAccounts = clearSelection => (accounts, isSelectionInverted) => {
    console.log("Suspend accounts (bulk)");
    console.log(accounts);
    this.props.suspendAccounts(isSelectionInverted, accounts.map(account => account.toScala()));
    this.closeDialog();
    clearSelection();
  };

  openConfirmSuspendAccountsDialog = (accounts, inverted, clearSelection) =>
    this.setState({
      dialog: (
        <ConfirmDialog
          dialogMessage={this.props.t("suspendAccountWarning")}
          confirmMessage={this.props.t("countConfirmSuspendAccountsMsg", {
            count: inverted
              ? this.props.accountsCount - this.state.confirmBulkSuspendDialog.accounts.length
              : accounts.length
          })}
          selectedItems={accounts}
          inverted={inverted}
          onCancel={this.closeDialog}
          onConfirm={this.handleSuspendAccounts(clearSelection)}
        />
      )
    });

  ///// CLOSE ACCOUNT (SINGLE) DIALOG SETUP /////
  handleCloseSingleAccount = account => {
    console.log("Close account");
    console.log(account);
    this.props.closeAccount(account.toScala());
    this.closeDialog();
  };

  openConfirmCloseAccountDialog = account =>
    this.setState({
      dialog: (
        <ConfirmDialog
          dialogMessage={this.props.t("closeAccountWarning")}
          confirmMessage={this.props.t("confirmCloseAccountMsg", {
            name: account.name
          })}
          item={account}
          onCancel={this.closeDialog}
          onConfirm={this.handleCloseSingleAccount}
        />
      )
    });

  ///// CLOSE ACCOUNTS (BULK) DIALOG SETUP /////
  handleCloseAccounts = clearSelection => (accounts, isSelectionInverted) => {
    console.log("Close accounts (bulk)");
    console.log(accounts);
    this.props.closeAccounts(isSelectionInverted, accounts.map(account => account.toScala()));
    this.closeDialog();
    clearSelection();
  };

  openConfirmCloseAccountsDialog = (accounts, inverted, clearSelection) =>
    this.setState({
      dialog: (
        <ConfirmDialog
          dialogMessage={this.props.t("closeAccountWarning")}
          confirmMessage={this.props.t("countConfirmCloseAccountsMsg", {
            count: inverted ? this.props.accountsCount - accounts.length : accounts.length
          })}
          selectedItems={accounts}
          inverted={inverted}
          onCancel={this.closeDialog}
          onConfirm={this.handleCloseAccounts(clearSelection)}
        />
      )
    });

  /////

  handleEditRowContent = row => this.props.editIncompleteAccount(row.toScala());
  handleGoToAccount = row => this.props.handleGoToAccount(row.toScala());

  ///// QUICK-VIEW SETUP /////

  openQuickView = row => {
    this.props.dialogToggle();
    this.setState({ openRow: row });
  };

  closeQuickView = () => {
    this.props.dialogToggle();
    this.setState({ openRow: null });
  };

  QuickView = () =>
    this.state.openRow ? (
      <RowDisplayPanel
        rowData={this.state.openRow}
        getHeader={row => ({ color: row.id, name: row.name })}
        isFavorite={this.isFavorite}
        content={{ render: AccountRowDisplay }}
        menu={this.menu}
        onClose={this.closeQuickView}
        onEdit={this.handleEditRowContent}
        onStar={this.handleFavoriteClick}
        t={this.props.t}
      />
    ) : null;

  ///// CREATE BUTTON SETUP /////

  handleCreateButtonClick = () => {
    this.props.dialogToggle();

    this.setState({
      dialog: (
        <PreCreateAccountDialog
          minimalAccInfo={this.props.getMinimalAccInfo()}
          accTypes={this.props.accTypes}
          checkDomainAvailability={this.props.checkDomainAvailability}
          onCreate={this.props.createAccount}
          onClose={() => {
            this.setState({ dialog: null }, this.props.dialogToggle);
          }}
        />
      )
    });
  };

  ///// LIST SETUP /////

  sortGroupFn = row => (row.isFavorite ? this.props.t("favorites") : this.props.t("other"));

  isFavorite = account =>
    account.favoriteUsers && account.favoriteUsers.indexOf(this.props.currentUser) !== -1;

  handleFavoriteClick = account =>
    this.props.handleFavoriteClick(account.toScala(), !this.isFavorite(account));

  suspendAccount = account => this.props.suspendAccount(account.toScala());

  closeAccount = account => this.props.closeAccount(account.toScala());

  listSchema = [
    {
      display: "hoverBar"
    },
    {
      display: "flex",
      heading: "account",
      args: ["id", "name", "domainCode", "accountType"],
      render: AvatarTwoLinesCell,
      hidden: false
    },
    {
      display: "200px",
      heading: "lastUpdated",
      args: ["lastUpdatedUser", "lastUpdatedDate"],
      render: TwoLinesCell,
      hidden: true
    },
    {
      display: "180px",
      heading: "status",
      args: ["status"],
      render: AccountStatusCell,
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

  menu = [
    {
      label: "administer",
      icon: "settings",
      onClick: account => this.props.administerAccount(account.toScala())
    },
    {
      label: "goToAccount",
      icon: "arrow_right_alt",
      onClick: this.handleGoToAccount
    },
    {
      label: "suspendAccount",
      icon: "block",
      onClick: this.openConfirmSuspendAccountDialog
    },
    {
      label: "closeAccount",
      icon: "clear",
      onClick: this.openConfirmCloseAccountDialog
    }
  ];

  bulkActions = [
    {
      label: "administer",
      icon: "settings",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk administer all, except: " + items.length + " items!")
          : console.log("Bulk administer " + items.length + " items!");
      }
    },
    {
      label: "goToAccount",
      icon: "arrow_right_alt",
      onClick: (items, inverted, clearSelection) => {
        inverted
          ? console.log("Bulk goToAccount all, except: " + items.length + " items!")
          : console.log("Bulk goToAccount " + items.length + " items!");
      }
    },
    {
      icon: "more_horiz",
      bulkMenu: [
        {
          label: "suspendAccount",
          icon: "block",
          onClick: this.openConfirmSuspendAccountsDialog
        },
        {
          label: "closeAccount",
          icon: "clear",
          onClick: this.openConfirmCloseAccountsDialog
        }
      ]
    }
  ];

  render = () => {
    const {
      isEmpty,
      accountsCount,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      accounts,
      t
    } = this.props;

    const Dialog = () => this.state.dialog;
    const QuickView = this.QuickView;

    return (
      <VirtualizedList
        isEmpty={isEmpty}
        data={accounts}
        dataCount={accountsCount}
        schema={this.listSchema}
        getKeyFn={item => item.key}
        getActionPermission={(row, action) => true} // TODO: implement permission check
        getRowMenu={row => this.menu} // TODO: implement permission check
        bulkActions={this.bulkActions}
        handleRowClick={this.openQuickView}
        handleAddClick={this.handleCreateButtonClick}
        sortGroupFn={this.sortGroupFn}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        <Dialog />
        <QuickView />
      </VirtualizedList>
    );
  };
}

export default translate("accounts")(ListAccounts);
