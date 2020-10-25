/**
 * by A. Prates, feb-2018
 */
import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage } from "components";
import {
  ListNumbers,
  ListNumbersSidemenu,
  AllocateNumbers,
  AllocateNumbersSidemenu,
  PurchaseSelectNumbers,
  PurchaseNumbersSidemenu
} from "components/Numbers";
import { getParsedPath, convertToPath } from "utils/helpers";
import { services } from "config/servicesMockData";
import { numbersOnAccount as numbers } from "config/numbersMockData";
import { exampleFilters, exampleSortings } from "config/sidemenuMockData";
import { menuItems, userInfo, quickSwitchUsers, searchResults } from "config/mockData";

// generte a repetition of mock data
const mockNumbers = [].concat(...Array(10).fill(numbers)).map(row => ({ ...row }));

export default class AccountsPage extends Component {
  static defaultProps = {
    searchResults,
    numbers: mockNumbers.slice(0, 20),
    numbersActive: mockNumbers.filter(n => n.status === "Active").slice(0, 20),
    numbersAvailable: mockNumbers.filter(n => n.status === "Available").slice(0, 20),
    menuItems,
    userInfo
  };

  getPossiblePaths = location =>
    location.id === "purchase"
      ? {
          select: convertToPath({ base: "numbers", action: "purchase" }),
          block: convertToPath({ base: "numbers", action: "purchase", option: "block" }),
          id: undefined
        }
      : location.action === undefined
      ? {
          all: convertToPath({ base: "numbers" }),
          active: convertToPath({ base: "numbers", option: "active" }),
          available: convertToPath({ base: "numbers", option: "available" }),
          id: undefined
        }
      : {
          id: undefined
        };

  constructor(props) {
    super(props);

    const path = props.location.pathname;
    const { numbers, numbersActive, numbersAvailable } = props;

    this.state = {
      displaySnackbar: false,
      snackbarMessageKey: "",
      messageData: undefined,

      numbers,
      numbersActive,
      numbersAvailable,
      possiblePaths: this.getPossiblePaths(getParsedPath(path)),
      isLoading: false,
      hasMore: true
    };
  }

  updateLocation = (path, callback) => {
    const possiblePaths = this.getPossiblePaths(getParsedPath(path));
    this.setState({ possiblePaths, hasMore: true }, callback);
  };

  navigate = path => {
    this.updateLocation(path, () => this.props.history.push(path));
  };

  handleBack = () => {
    const path = convertToPath({ base: "numbers" });
    this.updateLocation(path, this.props.history.replace(path));
  };

  allocateNumbers = numbers => {
    this.setState({ numbersToAllocate: numbers });
    this.navigate(convertToPath({ base: "numbers", action: "allocate" }));
  };

  createServiceAndReAllocate = () =>
    this.navigate(convertToPath({ base: "services", action: "create" }));

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

  // just a dummy fake loader
  loadMoreNumbers = (stackName, max) => () => {
    if (!this.state.hasMore || this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      let numbers = this.state[stackName].concat(...this.props[stackName]);
      if (numbers.length > max) numbers = numbers.slice(0, max);
      const isLoading = false;
      const hasMore = numbers.length < max;
      this.setState({ [stackName]: numbers, isLoading, hasMore });
    }, 1000);
  };

  removeNumberFromToAllocateSelection = number => () =>
    this.setState({
      numbersToAllocate: this.state.numbersToAllocate
        ? this.state.numbersToAllocate.filter(n => n !== number)
        : []
    });

  closeSnackbar = () => this.setState({ displaySnackbar: false });

  dialogToggle = row => console.log("Calling dialogToggle on item: " + row.id);

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

  addNumbers = () => {};

  ListAllNumbers = () => (
    <ListNumbers
      numbers={this.state.numbers}
      numbersCount={300}
      allocateNumbers={this.allocateNumbers}
      isLoading={this.state.isLoading}
      addNumbers={this.addNumbers}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreNumbers("numbers", 300)}
    />
  );

  ListActiveNumbers = () => (
    <ListNumbers
      numbers={this.state.numbersActive}
      numbersCount={73}
      allocateNumbers={this.allocateNumbers}
      isLoading={this.state.isLoading}
      addNumbers={this.addNumbers}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreNumbers("numbersActive", 73)}
    />
  );

  ListAvailableNumbers = () => (
    <ListNumbers
      numbers={this.state.numbersAvailable}
      numbersCount={37}
      allocateNumbers={this.allocateNumbers}
      availableListMode
      isLoading={this.state.isLoading}
      addNumbers={this.addNumbers}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreNumbers("numbersAvailable", 37)}
    />
  );

  ListNumbersSidemenu = () => (
    <ListNumbersSidemenu
      numbersCount={300}
      activeNumbersCount={73}
      availableNumbersCount={37}
      filters={exampleFilters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      sorting={exampleSortings}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
      possiblePaths={this.state.possiblePaths}
      navigate={this.navigate}
      currentPath={this.props.location.pathname}
    />
  );

  AllocateNumbers = () => (
    <AllocateNumbers
      numbers={this.state.numbersToAllocate ? this.state.numbersToAllocate : [mockNumbers[3]]}
      searchableServices={{
        search: () => {}, // this will triger loading services list on a query
        items: services, // in real this should get updated by search func
        itemsCount: services.length, // this will come from elastic search
        loadMore: () => {}, // requests a new page from elastic
        isLoading: false // this must be provided from app diode
      }}
      handleBack={this.handleBack}
      handleReAllocate={this.handleBack}
      handleCreateServiceAndReAllocate={this.createServiceAndReAllocate}
      removeNumber={this.removeNumberFromToAllocateSelection}
    />
  );

  AllocateNumbersSidemenu = () => <AllocateNumbersSidemenu handleBack={this.handleBack} />;

  PurchaseNumbersSidemenu = () => (
    <PurchaseNumbersSidemenu
      possiblePaths={this.state.possiblePaths}
      navigate={this.navigate}
      currentPath={this.props.location.pathname}
    />
  );

  PurchaseSelectNumbers = () => (
    <PurchaseSelectNumbers
      numbers={[]}
      removeNumber={() => console.log("removeNumber")}
      checkout={() => console.log("checkout")}
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
    <Fragment>
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
            <Route path="/numbers/allocate" exact component={this.AllocateNumbersSidemenu} />
            <Route path="/numbers/purchase" component={this.PurchaseNumbersSidemenu} />
            <Route path="/numbers" component={this.ListNumbersSidemenu} />
          </Switch>
        }
      >
        <Switch>
          <Route path="/numbers" exact component={this.ListAllNumbers} />
          <Route path="/numbers/active" exact component={this.ListActiveNumbers} />
          <Route path="/numbers/available" exact component={this.ListAvailableNumbers} />
          <Route path="/numbers/allocate" exact component={this.AllocateNumbers} />
          <Route path="/numbers/purchase" exact component={this.PurchaseSelectNumbers} />
        </Switch>
      </NavbarSideMenuPage>
    </Fragment>
  );
}
