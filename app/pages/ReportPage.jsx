/**
 * by , Sajid U. / OCT-2019
 */

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage, Searchbar } from "components";
import {
  ListReportSidemenu,
  ListReport,
  RunReportSidemenu,
  RunReport,
  UploadReport
} from "components/Report";
import { getParsedPath, convertToPath } from "utils/helpers";
import { reportsFilters, exampleSortings } from "config/sidemenuMockData";
import { menuItems, userInfo, quickSwitchUsers } from "config/mockData";
import {
  reports,
  numbers,
  services,
  timePeriods,
  tags,
  emptyReport,
  reportExample
} from "config/reportMockData";
import { CollapseRowTableData } from "config/CollapseRowTableData";

class ListReportPage extends Component {
  static defaultProps = {
    reports,
    numbers,
    reportExample,
    services,
    timePeriods,
    tags,
    emptyReport
  };

  getPossiblePaths = location =>
    location.action === "run"
      ? {
          id: location.id
        }
      : {
          listServices: convertToPath({ base: "report" }),

         id: undefined
        };

  constructor(props) {
    super(props);

    const path = this.props.location.pathname;

    this.state = {
      displaySnackbar: false,
      snackbarMessageKey: "",
      messageData: undefined,
      reports: this.props.reports, // [] use empty array for testing empty list options

      possiblePaths: this.getPossiblePaths(getParsedPath(path)),
      isLoading: false,
      hasMore: false,

      sFilters: [],
      sSortings: []
    };
  }

  updateLocation = (path, callback) => {
    const possiblePaths = this.getPossiblePaths(getParsedPath(path));
    this.setState({ possiblePaths }, callback);
  };

  navigate = path => this.updateLocation(path, () => this.props.history.push(path));

  getSelectedReport = () => this.state.reports.find(r => r.id === this.state.possiblePaths.id);

  listReports = () => this.navigate(convertToPath({ base: "report" }));

  addReport = () => this.navigate(convertToPath({ base: "report", action: "upload" }));

  handleFavoriteClick = (user, isFavorite) => {
    return new Promise((resolve, reject) => {
      resolve({}); 
    });
  };

  handleBack = () => {
    const path = convertToPath({ base: "report" });
    this.updateLocation(path, this.props.history.replace(path));
  }; 

  closeSnackbar = () => this.setState({ displaySnackbar: false });

  loadMoreReport = () => {
    if (!this.state.hasMore || this.state.isLoading) return;
    this.setState({ isLoading: true });
    // TODO load more 
  };

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

  scrollPosition = 0;

  doNothing = () => {}; // only mocking placeholder for function type

  scrollPositionSetter = this.doNothing;

  storeScrollPosition = this.doNothing;

  scrollListToTop = this.doNothing;

  handleScrollPositionSetter = this.doNothing;

  handleSearchResult = this.doNothing;

  searchbar = () => (
    <Searchbar
      mode="filter"
      placeholder="searchReports"
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

  navbarNoSearch = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      searchbar={null}
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  getReportData = () => {
    console.log("Calling getReportData : Reports");
    return new Promise((resolve, reject) => {
      resolve(this.props.emptyReport);
    });
  };

  dialogToggle = row => console.log(`Calling dialogToggle on item: ${row.id}`);
  // Run Report
  manageReport = id => {
    this.navigate(convertToPath({ base: "report", id, action: "run" }));
  };

  // CREATE REPORT TOGGLE
  // report = () => {
  //   this.navigate(convertToPath({ base: "report", action: "run" }));
  // };

  ///// LIST REPORTS /////

  ListReportSidemenu = () => (
    <ListReportSidemenu
      reportsCount={this.state.reports.length}
      filters={reportsFilters}
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

  ListReport = () => (
    <ListReport
      isEmpty={!this.state.sFilters.length && !this.state.reports.length}
      reports={this.state.reports}
      reportsCount={this.state.reports.length}
      // createReport={()=> alert("Create Report")}
      manageReport={this.manageReport}
      isLoading={this.state.isLoading}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreReport}
      handleFavoriteClick={this.handleFavoriteClick}
    />
  );

  ///// REPORT /////

  RunReportSidemenu = () => (
    <RunReportSidemenu reportName={this.getSelectedReport().name} handleBack={this.handleBack} />
  );

  RunReport = () => (
    <RunReport
      reports={reports}
      services={services}
      getReportData={this.getReportData}
      selectedReport={this.getSelectedReport()}
      numbers={numbers}
      timePeriods={timePeriods}
      collapseRowTableData={CollapseRowTableData}
      // services={this.props.services}
      timePeriods={timePeriods}
      tags={tags}
    />
  );

  ///// UPLOAD REPORT /////

  UploadReportSidemenu = () => (
    <RunReportSidemenu reportName={"Blob upload"} handleBack={this.handleBack} />
  );

  UploadReport = () => <UploadReport fileUploadMetadata={this.doNothing} />;

  render = () => (
    <>
      <HubbubSnackbar
        open={this.state.displaySnackbar}
        closeCallback={this.closeSnackbar}
        messageKey={this.snackbarMessageKey}
        closeOnClickAway={true}
        messageData={this.state.messageData}
        actionFunc={this.state.actionFunc}
      />
      <NavbarSideMenuPage
        navbar={f => (
          <Switch>
            <Route path="/report" exact component={() => this.navbar(f)} />
            <Route path="/report/*/run" exact component={() => this.navbarNoSearch(f)} />
            <Route path="/report/upload" exact component={() => this.navbarNoSearch(f)} />
          </Switch>
        )}
        location={this.props.location.pathname}
        sidemenuContent={
          <Switch>
            <Route path="/report" exact component={this.ListReportSidemenu} />
            <Route path="/report/*/run" exact component={this.RunReportSidemenu} />
            <Route path="/report/upload" exact component={this.UploadReportSidemenu} />
          </Switch>
        }
      >
        <Switch>
          <Route path="/report" exact component={this.ListReport} />
          <Route path="/report/*/run" exact component={this.RunReport} />
          <Route path="/report/upload" exact component={this.UploadReport} />
        </Switch>
      </NavbarSideMenuPage>
    </>
  );
}

export default ListReportPage;
