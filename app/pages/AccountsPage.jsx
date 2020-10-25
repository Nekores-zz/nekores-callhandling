/**
 * by A. Prates, out-2018
 */
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage, Searchbar } from "components";
import {
  AdministerAccount,
  AdministerAccountSidemenu,
  CreateAccount,
  CreateAccountSidemenu,
  ListAccounts,
  ListAccountsSidemenu
} from "components/Accounts";
import { getParsedPath, convertToPath } from "utils/helpers";
import {
  searchResults,
  addresses,
  accTypes,
  defaultPricingPlan,
  accountPanelTitles,
  plans
} from "config/mockData";
import { countries } from "config/countriesMockData";
import {
  accounts,
  activeAccountStatusOptions,
  initialConfig,
  initialAccountDetails,
  initialAccountHolder,
  initialCostCenter,
  accountTypes,
  accountUsers,
  initialUser,
  initialPasswordPolicy,
  passwordPolicyRules,
  getMinimalAccInfo,
  regexOption
} from "config/accountsMockData";
import { accountFilters, accountSortings } from "config/sidemenuMockData";
import { menuItems, userInfo, quickSwitchUsers } from "config/mockData";
import { validatePasswordPolicy } from "../config/accountsMockData";

export default class AccountsPage extends Component {
  static defaultProps = {
    searchResults,
    countries,
    addresses,
    accountUsers,
    initialUser,
    accTypes,
    defaultPricingPlan,
    accountPanelTitles,
    plans,
    accounts,
    activeAccountStatusOptions,
    accountFilters,
    accountSortings,
    initialConfig,
    initialAccountDetails,
    initialAccountHolder,
    initialCostCenter,
    accountTypes,
    initialPasswordPolicy,
    getMinimalAccInfo,
    passwordPolicyRules,
    menuItems,
    userInfo
  };

  getPossiblePaths = location =>
    location.action === "administer"
      ? {
          // activityFeed: convertToPath({ ...location, option: "" }),
          AccountConfiguration: convertToPath({ ...location, option: "configuration" }),
          CompanyDetails: convertToPath({ ...location, option: "company-details" }),
          AccountHolder: convertToPath({ ...location, option: "account-holder" }),
          // pricingPlan: convertToPath({ ...location, option: "pricing-plan" }),
          CostCenter: convertToPath({ ...location, option: "cost-centers" }),
          // users: convertToPath({ ...location, option: "users" }),
          PasswordPolicy: convertToPath({ ...location, option: "password-policy" }),
          goToAccount: convertToPath({ ...location, action: "", option: "" }),
          id: location.id
        }
      : {
          id: undefined
        };

  constructor(props) {
    super(props);

    const path = this.props.location.pathname;

    this.state = {
      displaySnackbar: false,
      snackbarMessageKey: "",
      messageData: undefined,

      accountUsers: this.props.accountUsers,
      accounts: this.props.accounts,
      possiblePaths: this.getPossiblePaths(getParsedPath(path)),
      isLoading: false,
      hasMore: false
    };
  }

  updateLocation = (path, callback) => {
    const possiblePaths = this.getPossiblePaths(getParsedPath(path));
    this.setState({ possiblePaths }, callback);
  };

  navigate = path => {
    this.updateLocation(path, () => this.props.history.push(path));
  };

  // TODO: use slug system, not id
  getSelectedAccount = () => this.state.accounts.find(a => a.id === this.state.possiblePaths.id);

  ///// SETUP PATHS AS FUNCTIONS /////

  handleBack = () => {
    const path = convertToPath({ base: "accounts" });
    this.updateLocation(path, this.props.history.replace(path));
  };

  administerAccount = account => {
    console.log("administerAccount", account);
    this.navigate(
      convertToPath({
        base: "accounts",
        id: account.id,
        action: "administer",
        option: "configuration"
      })
    );
  };

  scrollPosition = 0;

  scrollPositionSetter = () => {};

  storeScrollPosition = scrollPosition => (this.scrollPosition = scrollPosition);

  scrollListToTop = (window.UsersToTop = () => {
    this.scrollPositionSetter(0);
  });

  handleScrollPositionSetter = scrollPositionSetter => {
    this.scrollPositionSetter = scrollPositionSetter;
    scrollPositionSetter(this.scrollPosition);
  };

  createAccount = minimalAccInfo => {
    console.log(minimalAccInfo);
    return new Promise((resolve, reject) => {
      resolve(this.navigate(convertToPath({ base: "accounts", action: "create" })));
    });
  };

  submitCreateAccountHandler = formName => {
    console.log("Submitting create account");
    this.setState({
      displaySnackbar: true,
      snackbarMessageKey: "newAccountCreated"
    });
    this.navigate(convertToPath({ base: "accounts" }));
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  closeSnackbar = () => this.setState({ displaySnackbar: false });

  dialogToggle = () => console.log("Calling dialogToggle");

  handleAccountConfiguration = content => {
    return new Promise((resolve, reject) => {
      console.log(content);
      resolve({});
    });
  };

  handleCompanyDetails = content => {
    return new Promise((resolve, reject) => {
      console.log(content);
      resolve({});
    });
  };

  handleAccountHolder = content => {
    console.log(content);
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  handleCostCenters = content => {
    console.log(content);
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  handleUsers = content => {
    console.log(content);
    return new Promise((resolve, reject) => {
      this.setState({ accountUsers });
      resolve({});
    });
  };

  handlePasswordPolicy = content => {
    console.log(content);
    return new Promise((resolve, reject) => {
      const validator = validatePasswordPolicy();
      const formErrors = validator.validate(content);
      if (formErrors === null || Object.entries(formErrors).length <= 0) {
        resolve({});
      } else {
        reject({
          formErrors: {
            ...formErrors
          }
        });
      }
    });
  };

  validateInviteUser = (inviteUser, invitedUsers) => {
    // console.log(inviteUser);
    // console.log(invitedUsers);
    return new Promise((resolve, reject) => {
      resolve({ inviteUser });
    });
  };

  activateAccount = () => {
    return new Promise((resolve, reject) => {
      this.setState({ accountUsers });
      resolve({});
    });
  };

  checkDomainAvailability = domainCode => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  getAccountForms = () => {
    console.log("Calling getAccountForms");
    return new Promise((resolve, reject) => {
      resolve({
        AccountConfiguration: false,
        CompanyDetails: true,
        AccountHolder: true,
        PricingPlan: false,
        CostCenter: false,
        Users: false,
        PasswordPolicy: false
      });
    });
  };

  getConfigData = () => {
    console.log("Calling getConfigData");
    return new Promise((resolve, reject) => {
      resolve(this.props.initialConfig());
    });
  };

  getAccountDetailsData = () => {
    console.log("Calling getAccountDetailsData");
    return new Promise((resolve, reject) => {
      resolve(this.props.initialAccountDetails());
    });
  };

  getAccountHolderData = () => {
    console.log("Calling getAccountHolderData");
    return new Promise((resolve, reject) => {
      resolve(this.props.initialAccountHolder());
    });
  };

  getCostCenterData = () => {
    console.log("Calling getCostCenterData");
    return new Promise((resolve, reject) => {
      resolve(this.props.initialCostCenter());
    });
  };

  getUsersData = () => {
    console.log("Calling getUsersData");
    return new Promise((resolve, reject) => {
      resolve(this.props.accountUsers);
    });
  };

  getPasswordPolicyData = () => {
    console.log("Calling getPasswordPolicyData");
    return new Promise((resolve, reject) => {
      resolve(this.props.initialPasswordPolicy());
    });
  };

  getCountries = () => {
    console.log("Calling getCountries");
    return new Promise((resolve, reject) => {
      resolve(this.props.countries);
    });
  };

  getAddresses = (searchQuery, countryCode) => {
    console.log("Calling getAddresses");
    return new Promise((resolve, reject) => {
      resolve(this.props.addresses);
    });
  };

  getFullAddress = (searchId, countryCode) => {};

  CreateAccount = () => (
    <CreateAccount
      accountId={"something"}
      getAccountForms={this.getAccountForms}
      getConfigData={this.getConfigData}
      getAccountDetailsData={this.getAccountDetailsData}
      getAccountHolderData={this.getAccountHolderData}
      getCostCenterData={this.getCostCenterData}
      getUsersData={this.getUsersData}
      getEmptyUser={initialUser}
      getPasswordPolicyData={this.getPasswordPolicyData}
      getEmptyRegexOption={() => regexOption()}
      checkDomainAvailability={this.checkDomainAvailability}
      submitHandler={this.submitCreateAccountHandler}
      defaultPricingPlan={defaultPricingPlan}
      plans={plans}
      accountPanelTitles={accountPanelTitles}
      accTypes={accountTypes}
      getAddresses={this.getAddresses}
      getCountries={this.getCountries}
      getFullAddress={this.getFullAddress}
      handleAccountConfiguration={this.handleAccountConfiguration}
      handleCompanyDetails={this.handleCompanyDetails}
      handleAccountHolder={this.handleAccountHolder}
      handleCostCenters={this.handleCostCenters}
      handleUsers={this.handleUsers}
      handlePasswordPolicy={this.handlePasswordPolicy}
      validateInviteUser={this.validateInviteUser}
      activateAccount={this.activateAccount}
      passwordPolicyRules={this.props.passwordPolicyRules}
    />
  );

  CreateAccountSidemenu = () => <CreateAccountSidemenu handleBack={this.handleBack} />;

  ListAccounts = () => (
    <ListAccounts
      isEmpty={false}
      accounts={this.props.accounts}
      accountsCount={this.props.accounts.length}
      isLoading={false}
      createAccount={this.createAccount}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={() => {}}
      administerAccount={this.administerAccount}
      editIncompleteAccount={account => console.log("[ api call ]: edit incomplete account")}
      suspendAccount={account => console.log("[ api call ]: suspend single account")}
      suspendAccounts={(isAllDelete, accounts) => console.log("[ api call ]: bulk suspend")}
      closeAccount={account => console.log("[ api call ]: close single account")}
      closeAccounts={(isAllDelete, accounts) => console.log("[ api call ]: bulk close")}
      getMinimalAccInfo={getMinimalAccInfo}
      accTypes={accountTypes}
      checkDomainAvailability={this.checkDomainAvailability}
      handleGoToAccount={() => {}}
      handleFavoriteClick={() => {}}
    />
  );

  ListAccountsSidemenu = () => (
    <ListAccountsSidemenu
      accountsCount={this.props.accounts.length}
      filters={accountFilters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      sorting={accountSortings}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
    />
  );

  AdministerAccount = () => (
    <AdministerAccount
      account={this.getSelectedAccount()}
      possiblePaths={this.state.possiblePaths}
      currentPath={this.props.location.pathname}
      getConfigData={this.getConfigData}
      getAccountDetailsData={this.getAccountDetailsData}
      getAccountHolderData={this.getAccountHolderData}
      getCostCenterData={this.getCostCenterData}
      getUsersData={this.getUsersData}
      getPasswordPolicyData={this.getPasswordPolicyData}
      getEmptyRegexOption={() => regexOption()}
      accTypes={accountTypes}
      getAddresses={this.getAddresses}
      getCountries={this.getCountries}
      getFullAddress={this.getFullAddress}
      checkDomainAvailability={this.checkDomainAvailability}
      getEmptyUser={initialUser}
      validateInviteUser={this.validateInviteUser}
      activeAccountStatusOptions={activeAccountStatusOptions}
      handleAccountConfiguration={this.handleAccountConfiguration}
      handleCompanyDetails={this.handleCompanyDetails}
      handleAccountHolder={this.handleAccountHolder}
      handleCostCenters={this.handleCostCenters}
      handleUsers={this.handleUsers}
      handlePasswordPolicy={this.handlePasswordPolicy}
      passwordPolicyRules={this.props.passwordPolicyRules}
    />
  );

  AdministerAccountSidemenu = () => (
    <AdministerAccountSidemenu
      accountName={this.getSelectedAccount().name}
      possiblePaths={this.state.possiblePaths}
      navigate={this.navigate}
      handleBack={this.handleBack}
      currentPath={this.props.location.pathname}
    />
  );

  handleSearch = value => {
    return new Promise((resolve, reject) => {
      resolve(
        searchResults.filter(item =>
          item.text
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        )
      );
    });
  };

  handleSearchResult = url => {};

  searchbar = () => (
    <Searchbar
      mode="filter"
      placeholder="searchAccounts"
      handleSearch={this.handleSearch}
      handleSearchResult={this.handleSearchResult}
    />
  );

  navbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      searchbar={this.searchbar}
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  noSearchbarNavbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  render = () => (
    <>
      <HubbubSnackbar
        open={this.state.displaySnackbar}
        closeCallback={this.closeSnackbar}
        messageKey={this.state.snackbarMessageKey}
        closeOnClickAway={true}
        messageData={this.state.messageData}
        actionFunc={this.state.actionFunc}
      />
      <NavbarSideMenuPage
        navbar={f => (
          <Switch>
            <Route path="/accounts" exact component={() => this.navbar(f)} />
            <Route path="/accounts/*" component={() => this.noSearchbarNavbar(f)} />
          </Switch>
        )}
        location={this.props.location.pathname}
        sidemenuContent={
          <Switch>
            <Route path="/accounts" exact component={this.ListAccountsSidemenu} />
            <Route path="/accounts/create" exact component={this.CreateAccountSidemenu} />
            <Route path="/accounts/*/administer" component={this.AdministerAccountSidemenu} />
          </Switch>
        }
      >
        <Switch>
          <Route path="/accounts" exact component={this.ListAccounts} />
          <Route path="/accounts/create" exact component={this.CreateAccount} />
          <Route path="/accounts/*/administer" component={this.AdministerAccount} />
        </Switch>
      </NavbarSideMenuPage>
    </>
  );
}
