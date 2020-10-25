/**
 * by Sajid U. , mar-2019
 */
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage } from "components";
import { CallCareSidemenu, CallCareUpload, SharingSettings } from "components/CallCare";
import { getParsedPath, convertToPath } from "utils/helpers";
import { exampleFilters, exampleSortings } from "config/sidemenuMockData";
import { menuItems, userInfo, quickSwitchUsers } from "config/mockData";
import { accounts, actionTypes } from "config/securityMockData";

export default class CallCarePage extends Component {
  static defaultProps = {
    exampleFilters,
    exampleSortings,
    menuItems,
    userInfo
  };

  ///// SETUP PATH NAVIGATION /////

  getPossiblePaths = location =>
    location.action === "???"
      ? {
          id: location.id
        }
      : {
          branches: convertToPath({ base: "call-care" }),
          openingHours: convertToPath({ base: "call-care", action: "hours" }),
          states: convertToPath({ base: "call-care", action: "states" }),
          exceptions: convertToPath({ base: "call-care", action: "exceptions" }),
          sharingSettings: convertToPath({ base: "call-care", action: "sharing" }),
          id: undefined
        };

  constructor(props) {
    super(props);

    const path = this.props.location.pathname;

    this.state = {
      displaySnackbar: false,
      snackbarMessageKey: "",
      messageData: undefined,

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

  handleBack = () => {
    const path = convertToPath({ base: "call-care" });
    this.updateLocation(path, this.props.history.replace(path));
  };

  handleHome = () => this.navigate(convertToPath({}));

  createX = () => this.navigate(convertToPath({ base: "call-care", action: "create" }));

  ///// HELPER FUNCTIONS /////

  scrollPosition = 0;

  scrollPositionSetter = scrollPosition => {};

  storeScrollPosition = scrollPosition => (this.scrollPosition = scrollPosition);

  scrollListToTop = () => this.scrollPositionSetter(0);

  handleScrollPositionSetter = scrollPositionSetter => {
    this.scrollPositionSetter = scrollPositionSetter;
    scrollPositionSetter(this.scrollPosition);
  };

  closeSnackbar = () => this.setState({ displaySnackbar: false });

  dialogToggle = () => console.log("Calling dialogToggle");

  fileUploadMetadata = () => {
    return {
      fieldName: "csv",
      apiRequestContext: "",
      apiUrl: "",
      headers: []
    };
  };

  loadAccounts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(accounts);
      }, 100);
    });
  };

  ///// SETUP CALL CARE PAGES /////

  CallCareSidemenu = () => (
    <CallCareSidemenu
      handleHome={this.handleHome}
      possiblePaths={this.state.possiblePaths}
      navigate={this.navigate}
      currentPath={this.props.location.pathname}
      filters={exampleFilters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      sorting={exampleSortings}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
    />
  );

  CallCareBranches = () => (
    <CallCareUpload
      possiblePaths={this.state.possiblePaths}
      currentPath={this.props.location.pathname}
      onFilesChange={files => {}}
      fileTypes={".csv"}
      fileUploadMetadata={this.fileUploadMetadata}
      fileDownloadSuccessfulUploadMetadata ={ () => "sasas"}
      fileDownloadFailedUploadMetadata={()=> {}}
    />
  );

  CallCareOpeningHours = () => (
    <CallCareUpload
      possiblePaths={this.state.possiblePaths}
      currentPath={this.props.location.pathname}
      onFilesChange={files => {}}
      fileTypes={".csv"}
      fileUploadMetadata={this.fileUploadMetadata}
    />
  );

  CallCareStates = () => (
    <CallCareUpload
      possiblePaths={this.state.possiblePaths}
      currentPath={this.props.location.pathname}
      onFilesChange={files => {}}
      fileTypes={".csv"}
      fileUploadMetadata={this.fileUploadMetadata}
    />
  );

  CallCareExceptions = () => (
    <CallCareUpload
      possiblePaths={this.state.possiblePaths}
      currentPath={this.props.location.pathname}
      onFilesChange={files => {}}
      fileTypes={".csv"}
      fileUploadMetadata={this.fileUploadMetadata}
    />
  );

  SharingSettings = () => <SharingSettings accounts={accounts} actionTypes={actionTypes} />;

  ///// SETUP SEARCH /////

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

  navbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      placeholder="search"
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
            <Route path="/call-care" component={this.CallCareSidemenu} />
          </Switch>
        }
      >
        <Switch>
          <Route path="/call-care" exact component={this.CallCareBranches} />
          <Route path="/call-care/hours" exact component={this.CallCareOpeningHours} />
          <Route path="/call-care/states" exact component={this.CallCareStates} />
          <Route path="/call-care/exceptions" exact component={this.CallCareExceptions} />
          <Route path="/call-care/sharing" exact component={this.SharingSettings} />
        </Switch>
      </NavbarSideMenuPage>
    </>
  );
}
