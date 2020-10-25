import PropTypes from "prop-types";
import { objects } from 'utils';
import { Account, AccountSelection, AccountsSelections, AccountsExclusions } from "./Accounts";

const typs = {
  none: 0,
  allSubAccounts: 1,
  selectedAccounts: 2,
};

const propType = PropTypes.shape({
  typ: PropTypes.oneOf(objects.values(typs)).isRequired,
  accounts: AccountsSelections,
  exclusions: AccountsExclusions,
});

const create = () => ({
  typ: typs.none,
  accounts: AccountsSelections.create(false),
  exclusions: AccountsExclusions.create(false),
});
  
const setTyp = (sharing, typ) => 
  sharing.typ === typ ? 
  sharing : {
    ...sharing,
    typ,
    ...({
      [typs.none]: {
        accounts: AccountsSelections.create(false),
        exclusions: AccountsExclusions.create(false),
      }, 
      [typs.allSubAccounts]: {
        accounts: AccountsSelections.create(false),
      }, 
      [typs.selectedAccounts]: {
        accounts: AccountsSelections.create(true),
      }
    } [typ]),
  };

const setAccounts = (sharing, accounts) => 
  ({ ...sharing, accounts });

const setExclusions = (sharing, exclusions) => 
  ({ ...sharing, exclusions });

export const Sharing = {
  typs, propType, create, setTyp, setAccounts, setExclusions, 
};
