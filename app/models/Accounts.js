import PropTypes from "prop-types";
import { SelectedIds } from './Ids';
import { search } from './Search';
import { functions, objects } from 'utils';

export const accountTypes = {
    normal: 'normal',
    group: 'group',
    reseller: 'reseller',
};

export const Account = {
    types: accountTypes,

    propType: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(objects.values(accountTypes)).isRequired,
        children: PropTypes.arrayOf(PropTypes.string),
    }),

    search: (string) => (account) =>
        search(string, [account.name]),
};

export const Accounts = {
    propType: PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.string).isRequired,
        accounts: PropTypes.objectOf(Account.propType).isRequired,
    }),

    getAccount: (accounts, id) =>
        accounts.accounts[id],

    getAccounts: (accounts, account) =>
        (account || accounts).children.map((id) => accounts.accounts[id]),
};

export const AccountSelection = {
    propType: PropTypes.shape({
        id: PropTypes.string.isRequired,
        includeChildren: PropTypes.shape({
            includesAccount: PropTypes.bool.isRequired,
            normal: PropTypes.bool.isRequired,
            group: PropTypes.bool.isRequired,
            reseller: PropTypes.bool.isRequired,
        }),
    }),

    create: (account) => ({
        id: account.id,
    }),

    toggle: (accountSelection, includesAccount, includesChildren) => {
        return {
            ...accountSelection,
            includeChildren: includesChildren ? {
                includesAccount: includesAccount,
                normal: false,
                group: false,
                reseller: false,
            } : undefined,
        };
    },

    getSubAccountTypes: (accountSelection) =>
        objects.values(accountTypes).filter(
            (accountType) => accountSelection.includeChildren[accountType]
        ),

    setSubAccountTypes: (accountSelection, subAccountTypes) => ({
        ...accountSelection,
        includeChildren: {
            ...accountSelection.includeChildren,
            normal: false,
            group: false,
            reseller: false,
            ...objects.fromArray(subAccountTypes, functions.id, functions.constant(true)),
        },
    }),

    setActionTypes: (accountSelection, actionTypes) =>
        ({ ...accountSelection, actionTypes }),

    setResources: (accountSelection, resources) =>
        ({ ...accountSelection, resources }),

    setChildAccountResources: (accountSelection, childAccountResources) =>
      ({ ...accountSelection, childAccountResources }),

    setActions: (accountSelection, actions, excludedActions) =>
        ({ ...accountSelection, actions, excludedActions }),

    isAccountSelected: (accountSelection) =>
        accountSelection && (
            !accountSelection.includeChildren || accountSelection.includeChildren.includesAccount
        ),

    areChildrenSelected: (accountSelection) =>
        accountSelection && accountSelection.includeChildren,
};

export const AccountsSelections = {
    propType: PropTypes.arrayOf(AccountSelection.propType),

    create: (isEnabled) =>
        isEnabled ? [] : undefined,

    find: (accountsSelections, account) =>
        accountsSelections.find(
            (accountsSelections) => accountsSelections.id === account.id,
        ),

    update: (accountsSelections, account, setter, ...args) =>
        accountsSelections.map(
            (accountSelection) => accountSelection.id === account.id ?
                setter(accountSelection, ...args) : accountSelection
        ),

    toggle: (accountsSelections, account, includesAccount, includesChildren) => {
        if (includesAccount || includesChildren) {
            let accountSelection = AccountsSelections.find(accountsSelections, account);
            return AccountsSelections.update(
                accountSelection ? accountsSelections : [AccountSelection.create(account), ...accountsSelections],
                account,
                AccountSelection.toggle,
                !!includesAccount,
                includesChildren,
            );
        } else {
            return accountsSelections.filter(
                (accountsSelections) => accountsSelections.id !== account.id
            );
        }
    }
};

export const AccountsExclusions = {
    propType: PropTypes.shape({
        accounts: AccountsSelections.propType.isRequired,
        children: PropTypes.shape({
          normal: PropTypes.bool,
          group: PropTypes.bool,
          reseller: PropTypes.bool,
        }).isRequired,
    }),

    create: (isEnabled) =>
        isEnabled ? {
            accounts: AccountsSelections.create(true),
            children: {
                normal: false,
                group: false,
                reseller: false,
            },
        } : undefined,

    setAccounts: (exclusions, accounts) =>
        ({ ...exclusions, accounts, }),

    toggleAccountType: (exclusions, accountType, shouldSelect) => ({
        ...exclusions,
        children: {
            ...exclusions.children,
            [accountType]: shouldSelect,
        },
    }),
};
