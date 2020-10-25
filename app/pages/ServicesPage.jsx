/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - sep-2019
 */

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage, Searchbar } from "components";
import {
  CreateService,
  CreateServiceSidemenu,
  ListServices,
  ListServicesSidemenu,
  ManageServiceSettings,
  ManageServiceSidemenu,
  ManageServiceVersions,
  ManageServiceAssignedNumbers,
  ListTemplates
} from "components/Services";
import { getParsedPath, convertToPath } from "utils/helpers";
import { searchResults, serviceTemplates } from "config/mockData";
import {
  getEmptyService,
  services,
  serviceExample,
  numbers,
  versions,
  schedule,
  getEmptyServiceScheduling
} from "config/servicesMockData";
import { servicesFilters as filters, exampleSortings as sorting } from "config/sidemenuMockData";
import { menuItems, userInfo, quickSwitchUsers, serviceNumbers } from "config/mockData";
import { getMockSearchable } from "config/mockSearchable";

class ListServicesPage extends Component {
  getPossiblePaths = location =>
    location.action === "manage"
      ? {
          serviceVersions: convertToPath({ ...location, option: "versions" }),
          serviceNumbers: convertToPath({ ...location, option: "numbers" }),
          serviceSettings: convertToPath({ ...location, option: "" }),
          id: location.id
        }
      : {
          listServices: convertToPath({ base: "services" }),
          listTemplates: convertToPath({
            base: "services",
            action: "templates"
          }),
          id: undefined
        };

  constructor(props) {
    super(props);

    const path = this.props.location.pathname;

    this.state = {
      displaySnackbar: false,
      snackbarMessageKey: "",
      messageData: undefined,

      services, // [] use empty array for testing empty list options
      possiblePaths: this.getPossiblePaths(getParsedPath(path)),
      isLoading: false,
      hasMore: false,

      sFilters: [],
      sSortings: [],

      searchableVersions: getMockSearchable(versions, () =>
        this.setState({ searchableVersions: this.state.searchableVersions })
      ),

      searchableSchedule: getMockSearchable(
        schedule,
        () => this.setState({ searchableSchedule: this.state.searchableSchedule }),
        true
      ),

      searchableLastOpenedBy: getMockSearchable(
        [
          { id: "sdfasd", name: "Jack Smith" },
          { id: "abcdef", name: "John Doe" },
          { id: "zxywpq", name: "Sophie Stone" },
          { id: "sdfasd", name: "Jack Smith" },
          { id: "abcdef", name: "John Doe" },
          { id: "zxywpq", name: "Sophie Stone" },
          { id: "sdfasd", name: "Jack Smith" },
          { id: "abcdef", name: "John Doe" },
          { id: "zxywpq", name: "Sophie Stone" },
          { id: "sdfasd", name: "Jack Smith" },
          { id: "sdfasd", name: "Jack Smith" },
          { id: "abcdef", name: "John Doe" },
          { id: "zxywpq", name: "Sophie Stone" },
          { id: "sdfasd", name: "Jack Smith" },
          { id: "abcdef", name: "John Doe" },
          { id: "zxywpq", name: "Sophie Stone" },
          { id: "sdfasd", name: "Jack Smith" },
          { id: "abcdef", name: "John Doe" },
          { id: "zxywpq", name: "Sophie Stone" },
          { id: "sdfasd", name: "Jack Smith" }
        ],
        () => this.setState({ searchableLastOpenedBy: this.state.searchableLastOpenedBy })
      )
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
    const path = convertToPath({ base: "services" });
    this.updateLocation(path, this.props.history.replace(path));
  };

  getSelectedService = () => this.state.services.find(s => s.id === this.state.possiblePaths.id);

  listServices = () => {
    this.navigate(convertToPath({ base: "services" }));
  };

  createService = () => {
    this.navigate(convertToPath({ base: "services", action: "create" }));
  };

  manageService = id => {
    this.navigate(convertToPath({ base: "services", id, action: "manage" }));
  };

  archiveServices = serviceIds =>
    console.log("Calling archiveService for services with id: " + serviceIds);

  archiveAllServicesExcept = serviceIds =>
    console.log("Calling archiveAllServicesExcept for services with id: " + serviceIds);

  closeSnackbar = () => this.setState({ displaySnackbar: false });

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

  buyMoreHandler = () => console.log("Buy More Works!");

  confirmSelectionHandler = () => console.log("Confirm Selection Works!");

  getManageServiceData = () => {
    console.log("Calling getServicesData");
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve({
            service: serviceExample, // a protocol, imagine it's just projection converted to protocol
            serviceVersionNumber: serviceExample.defaultPublishedVersionNumber
          }),
        1000
      );
    });
  };

  getServiceSchedule = () => {
    console.log("Calling getServiceSchedule");
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(schedule), 1000);
    });
  };

  loadMoreServices = () => {
    if (!this.state.hasMore || this.state.isLoading) return;
    this.setState({ isLoading: true });
    // TODO load more
  };

  loadMoreTemplates = () => {
    // follow loadMoreServices pattern
  };

  loadMoreVersions = () => {
    // follow loadMoreServices pattern
  };

  getServiceData = () => {
    console.log("Calling getServiceData");
    return new Promise((resolve, reject) => {
      resolve(getEmptyService());
    });
  };

  handleService = content => {
    return new Promise((resolve, reject) => {
      console.log(content);
      resolve({});
    });
  };

  getSearchable = fieldName => {
    switch (fieldName) {
      case "lastOpenedBy":
        return this.state.searchableLastOpenedBy;

      default:
        console.log("unexpected fieldName");
        break;
    }
  };

  getTags = fieldName => {
    console.log("Calling getTags for tags filter");
    return new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(["Tag one", "Tag two", "Tag three", "Tag four", "Tag five", "Tag six"]),
        1000
      );
    });
  };

  getEditableScheduling = item => {
    const schedulingToEdit = getEmptyServiceScheduling()
      .setId(item.id)
      .setServiceVersionId(item.serviceVersionId)
      .setStartTime(item.startTime)
      .setEndTime(item.endTime);

    return { schedulingToEdit, schedulingVersionNumber: item.serviceVersionNumber };
  };

  ///// LIST SERVICES AND TEMPLATES SETUP /////

  ListServicesSidemenu = () => (
    <ListServicesSidemenu
      servicesCount={this.state.services.length}
      // templatesCount={serviceTemplates.length}
      filters={filters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      getSearchable={this.getSearchable}
      sorting={sorting}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
      possiblePaths={this.state.possiblePaths}
      navigate={this.navigate}
      currentPath={this.props.location.pathname}
    />
  );

  ListServices = () => (
    <ListServices
      isEmpty={!this.state.sFilters.length && !this.state.services.length}
      services={this.state.services}
      servicesCount={this.state.services.length}
      createService={this.createService}
      manageService={this.manageService}
      archiveServices={this.archiveServices}
      archiveAllServicesExcept={this.archiveAllServicesExcept}
      isLoading={this.state.isLoading}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreServices}
    />
  );

  ListTemplates = () => (
    <ListTemplates
      template={serviceTemplates}
      // createTemplate={this.createTemplate}
      // editTemplate={this.editTemplate}
      isLoading={this.state.isLoading}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreTemplates}
    />
  );

  ///// CREATE A SERVICE SETUP /////

  CreateService = () => (
    <CreateService
      getServiceData={this.getServiceData}
      handleService={this.handleService}
      serviceTemplates={serviceTemplates}
      versions={versions}
      numbers={numbers}
    />
  );

  CreateServiceSidemenu = () => <CreateServiceSidemenu handleBack={this.handleBack} />;

  ///// MANAGE A SERVICE SETUP /////

  ManageServiceSidemenu = () => (
    <ManageServiceSidemenu
      serviceName={this.getSelectedService().name}
      versionsCount={versions.length}
      numbersCount={numbers.length}
      handleBack={this.handleBack}
      possiblePaths={this.state.possiblePaths}
      navigate={this.navigate}
      currentPath={this.props.location.pathname}
      filters={filters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      getTags={this.getTags}
      getSearchable={this.getSearchable}
      sorting={sorting}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
    />
  );

  ManageServiceVersions = () => (
    <ManageServiceVersions
      isEmpty={false}
      versions={versions}
      versionsCount={versions.length}
      addVersion={() => {}}
      editVersion={() => {}}
      archiveVersion={() => {}}
      isLoading={this.state.isLoading}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreVersions}
    />
  );

  ManageServiceSettings = () => (
    <ManageServiceSettings
      getServiceData={this.getManageServiceData}
      handleUpdateService={service => console.log("handleUpdateService: ", service)}
      searchableVersions={this.state.searchableVersions}
      searchableSchedule={this.state.searchableSchedule}
      getEditableScheduling={this.getEditableScheduling}
      addScheduling={scheduling => console.log("createScheduling: ", scheduling)}
      editScheduling={id => console.log("updateScheduling -> id: ", id)}
      deleteScheduling={id => console.log("deleteScheduling -> id: ", id)}
      getEmptyScheduling={getEmptyServiceScheduling}
    />
  );

  searchbar = () => (
    <Searchbar
      mode="filter"
      placeholder="searchServices"
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

  ManageServiceAssignedNumbers = () => (
    <ManageServiceAssignedNumbers
      serviceNumbers={serviceNumbers}
      serviceNumbersCount={serviceNumbers.length}
      buyMoreHandler={this.buyMoreHandler}
      ConfirmSelectionHandler={this.confirmSelectionHandler}
      isLoading={this.state.isLoading}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreVersions}
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
            <Route path="/services" exact component={() => this.navbar(f)} />
            <Route path="/services/templates" exact component={() => this.navbar(f)} />
            <Route path="/services/*" component={() => this.noSearchbarNavbar(f)} />
          </Switch>
        )}
        location={this.props.location.pathname}
        sidemenuContent={
          <Switch>
            <Route path="/services" exact component={this.ListServicesSidemenu} />
            <Route path="/services/templates" exact component={this.ListServicesSidemenu} />
            <Route path="/services/create" exact component={this.CreateServiceSidemenu} />
            <Route path="/services/*/manage" component={this.ManageServiceSidemenu} />
          </Switch>
        }
      >
        <Switch>
          <Route path="/services" exact component={this.ListServices} />
          <Route path="/services/templates" exact component={this.ListTemplates} />
          <Route path="/services/create" exact component={this.CreateService} />
          <Route path="/services/*/manage/versions" exact component={this.ManageServiceVersions} />
          <Route
            path="/services/*/manage/numbers"
            exact
            component={this.ManageServiceAssignedNumbers}
          />
          <Route path="/services/*/manage" exact component={this.ManageServiceSettings} />
        </Switch>
      </NavbarSideMenuPage>
    </>
  );
}

export default ListServicesPage;
