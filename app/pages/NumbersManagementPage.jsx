import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage } from "components";
import {
  AddNumbers,
  AddNumbersSidemenu,
  ListNumbers,
  ListNumbersSidemenu,
  EditNumber,
  EditNumberSidemenu
} from "components/NumbersManagement";
import { convertToPath } from "utils/helpers";
import {
  numbersManagementList as numbers,
  numbersList,
  protoBands,
  networks,
  statusOptions,
  emptyNumberRange,
  emptyNumberConfiguration,
  allocation
} from "config/numbersMockData";
import { accounts } from "config/accountsMockData";
import { services } from "config/servicesMockData";
import { numbersFilters as filters, exampleSortings as sorting } from "config/sidemenuMockData";
import {
  menuItems,
  userInfo,
  quickSwitchUsers,
  searchResults
} from "config/mockData";
import { bands, bandTypes } from "utils/bands";

class NumbersManagementPage extends Component {
  static defaultProps = {
    searchResults,
    accounts,
    allocation,
    numbers,
    numbersList,
    bands,
    networks,
    services,
    statusOptions,
    menuItems,
    userInfo,
    bandTypes,
    protoBands,
    emptyNumberConfiguration,
    emptyNumberRange,
    
  };

  state = {
    displaySnackbar: false,
    snackbarMessageKey: "",
    isLoading: false
  };

  closeSnackbar = () => this.setState({ displaySnackbar: false });

  handleSearch = value => {
    return new Promise((resolve, reject) => {
      resolve(
        this.props.searchResults.filter(item =>
          item.text
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        )
      );
    });
  };

  handleSearchResult = url => {};

  scrollPosition = 0;

  scrollPositionSetter = () => {};

  storeScrollPosition = scrollPosition => {
    this.scrollPosition = scrollPosition;
  };

  scrollListToTop = (window.UsersToTop = () => {
    this.scrollPositionSetter(0);
  });

  handleScrollPositionSetter = scrollPositionSetter => {
    this.scrollPositionSetter = scrollPositionSetter;
    scrollPositionSetter(this.scrollPosition);
  };

  dialogToggle = row => console.log("Calling dialogToggle on item: " + row.id);

  loadMoreNumbers = () => {
    if (!this.state.hasMore || this.state.isLoading) return;
    this.setState({ isLoading: true });
    // TODO load more
  };

  handleBack = () => this.props.history.replace(convertToPath({ base: "numbers-management" }));

  navigate = path => this.props.history.push(path);

  handleMoveNumber = (number, band) =>
    this.setState({
      displaySnackbar: true,
      snackbarMessageKey: "numberMoved",
      messageData: {
        number: number,
        band: band.name
      },
      actionFunc: () => {}
    });

  handleEditNumber = numberData => {

    console.log(numberData);

    this.navigate(convertToPath({ base: "numbers-management" }));
  };

  addNumbers = () => this.navigate(convertToPath({ base: "numbers-management", action: "add" }));

  editNumber = number => {
    this.navigate(convertToPath({ base: "numbers-management", id: number.id, action: "edit" }));
  };

  firstValidateNumbers = (numberRange, numConf) => {
      console.log("Number Range Object:\t", numberRange);
      console.log("Number Config Object:\t", numConf);
      return {};
  };

  validateNumberConfig = numConf => {
      console.log("Final saving of Number Config...");
      console.log("Number Config Object:\t", numConf);
      return {};
  };

  handleSaveNumber = (numConfig) => {
    return new Promise((resolve, reject) => {
        console.log("Number Configuration:\t", JSON.stringify(numConfig));
        resolve(true);
    });
  };

  handleCheckNumbers = numConfig => new Promise((resolve, reject) => {
      console.log("Checking for existing numbers\t", JSON.stringify(numConfig));
      resolve(["+441235678901", "+441235678902"]);
  });

  allocation = optionNumber => users => {
      return this.props.allocation(optionNumber)(users);
  }

  AddNumbers = () => (
    <AddNumbers
      getNumbersConfiguration={this.props.emptyNumberConfiguration}
      getNumberRange={this.props.emptyNumberRange}
      networks={this.props.networks}
      bands={this.props.protoBands}
      saveNumbers={this.handleSaveNumber}
      checkExistingNumbers={this.handleCheckNumbers}
      allocation={this.allocation}
      searchableAccounts={{
        search: () => {}, // this will trigger loading accounts list on a query
        items: accounts, // in real this should get updated by searchAccounts func
        itemsCount: accounts.length, // this will come from elastic search
        loadMore: () => {}, // requests a new page from elastic
        isLoading: false // this must be provided from app diode
      }}
      searchableServices={{
        search: () => {}, // this will trigger loading services list on a query
        items: services, // in real this should get updated by searchServices func
        itemsCount: services.length, // this will come from elastic search
        loadMore: () => {}, // requests a new page from elastic
        isLoading: false // this must be provided from app diode
      }}
      statusOptions={this.props.statusOptions}
      firstValidateNumberConfig={this.firstValidateNumbers}
      finalValidateNumberConfig={this.validateNumberConfig}
      showSnackbarError={() => {}}
      handleMoveNumber={this.handleMoveNumber}
    />
  );

  AddNumbersSidemenu = () => <AddNumbersSidemenu handleBack={this.handleBack} />;

  EditNumber = ({ match }) => (
    <EditNumber
      bands={this.props.protoBands}
      searchableAccounts={{
        search: () => {}, // this will triger loading accounts list on a query
        items: accounts, // in real this should get updated by searchAccounts func
        itemsCount: accounts.length, // this will come from elastic search
        loadMore: () => {}, // requests a new page from elastic
        isLoading: false // this must be provided from app diode
      }}
      searchableServices={{
        search: () => {}, // this will triger loading services list on a query
        items: services, // in real this should get updated by searchServices func
        itemsCount: services.length, // this will come from elastic search
        loadMore: () => {}, // requests a new page from elastic
        isLoading: false // this must be provided from app diode
      }}
      statusOptions={this.props.statusOptions}
      allocation={this.allocation}
      number={this.props.numbersList.find(item => item.id === match.params.id)}
      saveNumbers={this.handleEditNumber}
    />
  );

  EditNumberSidemenu = ({ match }) =>
    <EditNumberSidemenu
      handleBack={this.handleBack}
      number={this.props.numbersList.find(item => item.id === match.params.id).number}
    />;


  ListNumbers = () => (
    <ListNumbers
      numbers={this.props.numbers}
      numbersCount={this.props.numbers.length}
      bands={this.props.bands}
      isLoading={this.state.isLoading}
      addNumbers={this.addNumbers}
      editNumber={this.editNumber}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreNumbers}
    />
  );

  ListNumbersSidemenu = () => (
    <ListNumbersSidemenu
      numbersCount={this.props.numbers.length}
      filters={filters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      sorting={sorting}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
    />
  );

  navbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      placeholder="searchNumbers"
      handleSearch={this.handleSearch}
      handleSearchResult={this.handleSearchResult}
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
        navbar={this.navbar}
        location={this.props.location.pathname}
        sidemenuContent={
          <Switch>
            <Route path="/numbers-management" exact component={this.ListNumbersSidemenu} />
            <Route path="/numbers-management/add" component={this.AddNumbersSidemenu} />
            <Route path="/numbers-management/:id/edit" component={this.EditNumberSidemenu} />
          </Switch>
        }
      >
        <Switch>
          <Route path="/numbers-management" exact component={this.ListNumbers} />
          <Route path="/numbers-management/add" component={this.AddNumbers} />
          <Route path="/numbers-management/:id/edit" component={this.EditNumber} />
        </Switch>
      </NavbarSideMenuPage>
    </>
  );
}

export default NumbersManagementPage;
