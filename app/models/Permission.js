import PropTypes from "prop-types";
import { SelectedIds } from './Ids';
import { Account, AccountSelection, AccountsSelections, AccountsExclusions } from "./Accounts";
import { ResourcesSelections } from './Resources';
import { objects } from 'utils';

const enableTyps = {
  all: 0, 
  excludingOwn: 1, 
  selectedAccounts: 2,
};

const decisionStrategies = {
  unanimously: 'unanimously',
  affirmatively: 'affirmatively',
};

const propType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  //isFavorite: PropTypes.bool.isRequired,
  services: SelectedIds.propType.isRequired,
  excludedServices: SelectedIds.propType,
  types: PropTypes.arrayOf(PropTypes.string),
  excludedTypes: PropTypes.arrayOf(PropTypes.number),
  enableOnChildAccounts: PropTypes.bool,
  enableTyp: PropTypes.oneOf(objects.values(enableTyps)),
  accounts: AccountsSelections.propType,
  excludedAccounts: AccountsSelections.propType,
  resources: ResourcesSelections.propType,
  childAccountResources:  AccountsSelections.propType,
  actions: SelectedIds.propType,
  excludedActions: SelectedIds.propType,
  policies: SelectedIds.propType,
  decisionStrategy: PropTypes.oneOf(objects.values(decisionStrategies)),
});

const create = () => ({
  name: "",
  description: "",
 // isFavorite: false,
  services: [],
  excludedServices: [],
  types: [],
  excludedTypes: [],
  enableOnChildAccounts: false,
  enableTyp: enableTyps.all,
  accounts: undefined,
  excludedAccounts: undefined,
  resources: undefined,
  childAccountResources: undefined,
  actions: undefined,
  excludedActions: undefined,
  policies: [],
  decisionStrategy: decisionStrategies.unanimously,
});

const setName = (permission, name) => 
  ({ ...permission, name });

const setDescription = (permission, description) => 
  ({ ...permission, description });

/*const setFavorite = (permission, isFavorite) =>
  ({ ...permission, isFavorite });*/

const setServices = (permission, services) => 
  ({ ...permission, services });

const setExcludedServices = (permission, excludedServices) => 
  ({ ...permission, excludedServices });

const setTypes = (permission, types) => 
  ({ ...permission, types });

const setExcludedTypes = (permission, excludedTypes) => 
  ({ ...permission, excludedTypes });

const toggleOnChildAccounts = (permission, enableOnChildAccounts) => 
  ({ ...permission, enableOnChildAccounts });

const setEnableTyp = (permission, enableTyp) => 
  enableTyp !== permission.enabledTyp ? { 
    ...permission, 
    ...({
      [enableTyps.all]: {
        accounts: AccountsSelections.create(false),
      }, 
      [enableTyps.excludingOwn]: {
        accounts: AccountsSelections.create(false),
      }, 
      [enableTyps.selectedAccounts]: {
        accounts: AccountsSelections.create(true),
        exclusions: AccountsExclusions.create(false),
      }
    } [enableTyp]),
    enableTyp,
  } : enableTyp;

const setAccounts = (permission, accounts) => 
  ({ ...permission, accounts });

const setChildAccountResources = (permission, childAccountResources) =>
    ({ ...permission, childAccountResources });

const updateAccount = (permission, account, setter, ...args) => 
  setAccounts(
    permission, 
    AccountsSelections.update(permission.accounts, account, setter, ...args),
  );

const setExcludedAccounts = (permission, excludedAccounts) => 
  ({ ...permission, excludedAccounts });

const setResources = (permission, resources) => 
  ({ ...permission, resources });

const setActions = (permission, actions) => 
  ({ ...permission, actions });

const setExcludedActions = (permission, excludedActions) => 
  ({ ...permission, excludedActions });

const setPolicies = (permission, policies) => 
  ({ ...permission, policies });

const setDecisionStrategy = (permission, decisionStrategy) => 
  ({ ...permission, decisionStrategy });

export const Permission = {
  enableTyps, decisionStrategies, propType, create, setName, setDescription, /*setFavorite,*/
  setServices, setExcludedServices, setTypes, setExcludedTypes, toggleOnChildAccounts, setEnableTyp,
  setAccounts, setChildAccountResources, updateAccount, setExcludedAccounts, setResources, setActions, setExcludedActions, setPolicies, setDecisionStrategy,
};
