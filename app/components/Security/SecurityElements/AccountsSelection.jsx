import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withWidth, withStyles, Grid } from "@material-ui/core";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";
import {
  withHover,
  IconButton,
  Icon,
  Row,
  Column,
  Stretch,
  FormControlLabel,
  SecondaryText,
  List,
  ListHeader,
  ListItem,
  ListCheckbox,
  ListHeaderSearch,
  ListItemText,
  ListAvatar,
  ListItemAvatar,
  ListItemSecondaryAction, Field, FieldText
} from "components/Elements";
import { AccountsSelections, AccountSelection, Account, Accounts } from "models";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/EditSelectedAccountsDialog";
import { withPromiseProps } from "utils/promise.js";

export const EditSelectedAccountsDialog = withStyles(styleSheet, {
  name: "EditSelectedAccountsDialog"
})(
  translate("security")(
    class EditSelectedAccountsDialog extends Component {
      static propTypes = {
        accountsSelections: AccountsSelections.propType.isRequired,
        accounts: Accounts.propType.isRequired,
        parentAccount:Account.propType,
        loadAccounts: PropTypes.func,
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        t: PropTypes.func.isRequired
      };

      state = {
        accountsSelections: this.props.accountsSelections,
        isSearchActive: false,
        searchString: "",
        parentAccount: this.props.parentAccount,
        accounts: this.props.accounts
      };

      handleParentAccountChange = parentAccount => event => {
        {
          parentAccount
            ? this.props.loadAccounts(parentAccount.id).then(subAccounts => {
                this.setState({
                  parentAccount: {
                    id: parentAccount.id,
                    name: parentAccount.name,
                    children: subAccounts.children
                  },
                  accounts: {
                    children: this.state.accounts.children,
                    accounts: { ...this.state.accounts.accounts, ...subAccounts.accounts }
                  }
                });
              })
            : this.setState({ parentAccount: null });
        }

        event.stopPropagation();
        event.preventDefault();
      };

      handleChange = (setter, ...args0) => (...args1) => {
        let accountsSelections = setter(this.state.accountsSelections, ...args0, ...args1);
        this.setState({ accountsSelections });
      };

      handleToggleSearch = isSearchActive => {
        this.setState({ isSearchActive });
      };

      handleSearchChange = searchString => {
        this.setState({ searchString });
      };

      handleSave = () => {
        let { onSave } = this.props;
        let { accountsSelections, accounts } = this.state;
        return onSave({ accountsSelections: accountsSelections, accounts: accounts });
      };

      isMobileLayout = () => {
        return this.props.width === "xs";
      };

      AvailableRow = withHover(({ account, hover }) => {
        let { isHover, ...hoverHandlers } = hover;
        let { onOpen, onToggle, classes, t } = this.props;
        let { accountsSelections } = this.state;

        let accountSelection = accountsSelections ? AccountsSelections.find(accountsSelections, account) : undefined;
        let isAccountSelected = AccountSelection.isAccountSelected(accountSelection);
        let areChildrenSelected = AccountSelection.areChildrenSelected(accountSelection);
        return (
          <ListItem
            {...hoverHandlers}
            borderTop
            button
            onClick={this.handleChange(
              AccountsSelections.toggle,
              account,
              !isAccountSelected,
              areChildrenSelected
            )}
          >
            <ListItemAvatar>
              {isHover || !!accountSelection ? (
                <ListCheckbox checked={!!isAccountSelected} />
              ) : (
                <ListAvatar color={account.id} name={account.name} />
              )}
            </ListItemAvatar>
            <ListItemText primary={account.name} />
            {isHover || !!accountSelection ? (
              <FormControlLabel
                control={
                  <ListCheckbox
                    checked={!!areChildrenSelected}
                    onChange={this.handleChange(
                      AccountsSelections.toggle,
                      account,
                      isAccountSelected,
                      !areChildrenSelected
                    )}
                  />
                }
                label={t("selectAllChildAccounts")}
              />
            ) : null}
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleParentAccountChange(account)}>
                <Icon>keyboard_arrow_right</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });

      renderAvailableList = () => {
        let { t, accountsSelections } = this.props;
        let { parentAccount, isSearchActive, searchString, accounts } = this.state;
        return (
          <Column fill noOverflow alignChildrenStretch border>
            <ListHeader color="secondary">
              {parentAccount && parentAccount !==this.props.parentAccount? (
                <Stretch>
                  <ListHeader.Button
                    nav
                    onClick={this.handleParentAccountChange(
                      accounts.accounts[accounts.accounts[parentAccount.id].parentId]
                    )}
                  >
                    <Icon>keyboard_backspace</Icon>
                    {parentAccount.name}
                  </ListHeader.Button>
                </Stretch>
              ) : !isSearchActive && !searchString ? (
                <Stretch onClick={() => this.handleToggleSearch(true)}>{t("accounts")}</Stretch>
              ) : null}
              <ListHeaderSearch
                isActive={isSearchActive}
                onToggle={this.handleToggleSearch}
                searchString={searchString}
                onChange={this.handleSearchChange}
              />
            </ListHeader>
            <List className={this.props.classes.column1}>
              {Accounts.getAccounts(accounts, parentAccount)
                .filter(Account.search(searchString))
                .map((account, i) => (
                  <this.AvailableRow key={account.id} account={account} />
                ))}
            </List>
          </Column>
        );
      };

      renderSelectedRow = accountSelection => {
        let { t } = this.props;
        let { accounts } = this.state;
        let account = Accounts.getAccount(accounts, accountSelection.id);
        let isAccountSelected = AccountSelection.isAccountSelected(accountSelection);
        let areChildrenSelected = AccountSelection.areChildrenSelected(accountSelection);
        return (
          <ListItem key={account.id} borderTop>
            <ListItemAvatar>
              <ListAvatar color={account.id} name={account.name} />
            </ListItemAvatar>
            <ListItemText
              primary={account.name}
              secondary={
                areChildrenSelected
                  ? t(isAccountSelected ? "withAllChildAccounts" : "allChildAccounts")
                  : ""
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={this.handleChange(AccountsSelections.toggle, account, false, false)}
              >
                <Icon>clear</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      };

      renderSelectedList = () => {
        let { t } = this.props;
        let { accountsSelections } = this.state;
        return (
          <Column noOverflow fill alignChildrenStretch border>
            <ListHeader color="secondary">{t("yourSelectedAccounts")}</ListHeader>
            {/* <Stretch /> */}
            <List className={this.props.classes.column1}>
              {accountsSelections ? accountsSelections.map(this.renderSelectedRow):null}
              {!(accountsSelections && accountsSelections.length) ? (
                <Row padding justifyChildrenCenter>
                  <SecondaryText>{t("noAccountsHasBeenSelectedYet")}</SecondaryText>
                </Row>
              ) : null}
            </List>
          </Column>
        );
      };

      dialogHeader = (onClose, t) => (
        <HubbubDialogHeader
          icon={false}
          headerVariation="grey"
          onClose={onClose}
          headerTitle={t("selectAccounts")}
        />
      );

      dialogContent = () => (
        <>
          <Grid stretch noOverflow alignChildrenStretch>
            {
              this.renderAvailableList()
            }
          </Grid>
          <Grid
            stretch
            noOverflow
            alignChildrenStretch
            paddingTop
            className={this.props.classes.mobileView}
          >
            <br />
            {this.renderSelectedList()}
          </Grid>
        </>
      );

      dialogFooter = onClose => (
        <HubbubDialogFooter onClose={onClose} onConfirm={this.handleSave} />
      );

      render() {
        let { onClose, isOpen, classes, t } = this.props;
        return (
          <HubbubDialog
            open={isOpen}
            dialogClass={{ paper: classes.dialogPaper }}
            classDialogContent={classes.dialogContent}
            maxWidth="md"
            onClose={onClose}
            dialogHeader={this.dialogHeader(onClose, t)}
            dialogContent={this.dialogContent()}
            dialogFooter={this.dialogFooter(onClose)}
          />
        );
      }
    }
  )
);

export const AccountsSelection = translate("security")(
  class AccountsSelection extends Component {
    static propTypes = {
      accountsSelections: AccountsSelections.propType.isRequired,
      onChange: PropTypes.func.isRequired,
      loadAccounts: PropTypes.func,
      accounts: Accounts.propType,
      parentAccount:Account.propType,
      renderRow: PropTypes.func,
      isExclusion: PropTypes.bool,
      isForChildAccountResource: PropTypes.bool,
      t: PropTypes.func.isRequired
    };

    state = {
      dialog: null,
      parentAccount:undefined,
      accounts: this.props.accounts
    };

    componentDidMount() {
      let {parentAccount} = this.props;
      parentAccount
          ? this.props.loadAccounts(parentAccount.id).then(subAccounts => {
            this.setState({
              parentAccount: {
                id: parentAccount.id,
                name: parentAccount.name,
                children: subAccounts.children
              },
              accounts: {
                children: this.props.accounts.children,
                accounts: { ...this.props.accounts.accounts, ...subAccounts.accounts }
              }
            });
          })
          : this.setState({ parentAccount: undefined, accounts:this.props.accounts });
    }

    handleEditSelectedAccounts = event => {
      event.stopPropagation();
      this.editSelectedAccountsDialog().then(
        accountsSelectionsAndTotalAccounts => {
          this.setState({ dialog: null, accounts: accountsSelectionsAndTotalAccounts.accounts });
          this.props.onChange(
            accountsSelectionsAndTotalAccounts.accountsSelections,
            accountsSelectionsAndTotalAccounts.accounts
          );
        },
        () => {
          this.setState({ dialog: null });
        }
      );
    };

    editSelectedAccountsDialog = () =>
      new Promise((resolve, reject) => {
        let { accountsSelections, loadAccounts } = this.props;
        let {accounts, parentAccount} = this.state;
        let dialog = (
          <EditSelectedAccountsDialog
            isOpen={true}
            onSave={resolve}
            onClose={reject}
            accounts={accounts}
            parentAccount = {parentAccount}
            loadAccounts={loadAccounts}
            accountsSelections={accountsSelections}
          />
        );
        this.setState({ dialog });
      });

    renderHeader = () => {
      let { accountsSelections, onChange, isExclusion, t } = this.props;
      return (
        <ListHeader color={isExclusion ? "main" : "secondary"}>
          <SecondaryText textWhite>
            {t(isExclusion ? "yourExcludedAccs" : "yourSelectedAccs")}
          </SecondaryText>
          <Stretch />
          <ListHeader.Button border onClick={this.handleEditSelectedAccounts}>
            {t("selectAccounts")}
          </ListHeader.Button>
        </ListHeader>
      );
    };

    renderSubAccountTypes = accountSelection => {
      let { t } = this.props;
      if (AccountSelection.areChildrenSelected(accountSelection)) {
        let isAccountSelected = AccountSelection.isAccountSelected(accountSelection);
        let accountTypes =
          AccountSelection.getSubAccountTypes(accountSelection)
            .map(accountType => t(accountType))
            .join(", ") || t("all");
        return t(isAccountSelected ? "withSubAccounts" : "subAccounts", { accountTypes });
      }
    };

    renderRow = accountSelection => {
      let { accountsSelections, onRemove, renderRow, t } = this.props;
      let { accounts } = this.state;
      let account = Accounts.getAccount(accounts, accountSelection.id);
      return (
        <ListItem borderTop key={account.id}>
          <ListItemAvatar>
            <ListAvatar color={account.id} name={account.name} />
          </ListItemAvatar>
          <ListItemText
            primary={account.name}
            secondary={this.renderSubAccountTypes(accountSelection)}
          />
          {renderRow && renderRow(accountSelection)}
          <ListItemSecondaryAction>
            <IconButton
              onClick={event =>
                onRemove(AccountsSelections.toggle(accountsSelections, account, false, false))
              }
            >
              <Icon>clear</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    };

    renderEmpty = () => {
      let { t } = this.props;
      return (
        <Row padding justifyChildrenCenter>
          <SecondaryText>{t("noAccsBeenSelected")}</SecondaryText>
        </Row>
      );
    };

    render() {
      let { accountsSelections, isForChildAccountResource, label, t } = this.props;
      return (
          isForChildAccountResource?
        <Field label={label || ""} onClick={this.handleEditSelectedAccounts}>
        {!accountsSelections ? (
          <FieldText>{t("allSelected")}</FieldText>
            ) : !accountsSelections.length ? (
          <FieldText>{t("allSelected")}</FieldText>
           ) : (
          <FieldText>{t("countSelected", { count: accountsSelections.length })}</FieldText>
          )}
          {this.state.dialog}
        </Field> :
        <List border>
                {this.renderHeader()}
                {accountsSelections ? accountsSelections.map(this.renderRow) : null}
                {!(accountsSelections && accountsSelections.length) ? this.renderEmpty() : null}
                {this.state.dialog}
              </List>
      );
    }
  }
);
