import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage } from "components";
import {
  ListUsers,
  ListUsersSidemenu,
  InviteUsers,
  InviteUsersSidemenu,
  ViewProfile,
  ViewProfileSidemenu,
  EditProfile,
  EditProfileRolesAndGroups,
  EditProfileSettings,
  EditProfileSidemenu
} from "components/Users";
import { searchResults, assignedUserGroups, assignedUserRoles } from "config/mockData";
import { users, activateUserSetters } from "config/usersMockData";
import { availableRoles, effectiveRoles, permissionSets, roles } from "config/securityMockData";
import { groups } from "config/groupsMockData";
import { userFilters as filters, exampleSortings as sorting } from "config/sidemenuMockData";
import { getParsedPath, convertToPath } from "utils/helpers";
import { menuItems, userInfo, quickSwitchUsers } from "config/mockData";

//It is fix of user edit sub-pages. In real, we are setting these things from scalajs
window.hubbub = {
  globals: {
    ManagePassword: {
      UpdatePassword: "updatePassword",
      Temporary: "temporary",
      ResetPassword: "resetPassword"
    }
  }
};

class UsersPage extends Component {
  static defaultProps = {
    users,
    assignedUserGroups,
    assignedUserRoles,
    availableRoles,
    effectiveRoles,
    permissionSets: Object.values(permissionSets),
    roles: Object.values(roles),
    groups,
    searchResults,
    menuItems,
    userInfo
  };

  getPossiblePaths = location =>
    location.action === "edit"
      ? {
          general: convertToPath({ ...location, option: "" }),
          roles: convertToPath({ ...location, option: "roles" }),
          settings: convertToPath({ ...location, option: "settings" }),
          view: convertToPath({ ...location, action: "view", option: "" }),
          id: location.id
        }
      : location.action === "view"
      ? { id: location.id }
      : {
          id: undefined
        };

  fileUploadMetadata = () => {
    return {
      fieldName: "csv",
      apiRequestContext: "",
      apiUrl: "",
      headers: []
    };
  };

  constructor(props) {
    super(props);

    const path = this.props.location.pathname;
    const possiblePaths = this.getPossiblePaths(getParsedPath(path));

    this.state = {
      displaySnackbar: false,
      snackbarMessageKey: "",
      messageData: undefined,
      actionFunc: undefined,

      userProfile: this.props.users.find(u => u.id === possiblePaths.id),
      possiblePaths,
      isLoading: false,
      hasMore: false
    };
  }

  updateLocation = (path, callback) => {
    const possiblePaths = this.getPossiblePaths(getParsedPath(path));
    const userProfile = this.props.users.find(u => u.id === possiblePaths.id);
    this.setState({ userProfile, possiblePaths }, callback);
  };

  navigate = path => {
    // console.log("navigate: " + path);
    this.updateLocation(path, () => this.props.history.push(path));
  };

  scrollPosition = 0;

  scrollPositionSetter = () => {};

  storeScrollPosition = scrollPosition => {
    this.scrollPosition = scrollPosition;
  };

  scrollListToTop = (window.UsersToTop = () => {
    this.scrollPositionSetter(0);
  });

  loadMoreUsers = () => {
    if (!this.state.hasMore || this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    // TODO load more
  };

  handleScrollPositionSetter = scrollPositionSetter => {
    this.scrollPositionSetter = scrollPositionSetter;
    scrollPositionSetter(this.scrollPosition);
  };

  handleBack = () => {
    const path = convertToPath({ base: "users" });
    this.updateLocation(path, this.props.history.replace(path));
  };

  editProfile = userId =>
    this.navigate(convertToPath({ base: "users", id: userId, action: "edit" }));

  viewProfile = userId =>
    this.navigate(convertToPath({ base: "users", id: userId, action: "view" }));

  inviteUser = () => this.navigate(convertToPath({ base: "users", action: "invite" }));

  submitEditProfileHandler = formName => {
    console.log("Submitting edit profile");
    return new Promise((resolve, reject) => {
      this.setState({
        displaySnackbar: true,
        snackbarMessageKey: "profileUpdated"
      });
      resolve({});
    });
  };

  getEffectiveRoles = roleIds => {
    return this.props.effectiveRoles;
  };

  getCompositeRoles = roleId => {
    const role = this.props.availableRoles.find(role => role.id == roleId);
    const roles = role.children.map(childRoleId =>
      this.props.availableRoles.find(role => role.id === childRoleId)
    );
    return roles;
  };

  getAssignableRoles = () => {
    return this.props.availableRoles;
  };

  getPermissionSets = () => {
    return this.props.permissionSets;
  };

  getGroupsHandler = () => {
    return new Promise((resolve, reject) => {
      resolve(this.props.groups);
    });
  };

  submitHandler = (option, formName, users, groupIds, roleIds) => {
    this.setState({
      displaySnackbar: true,
      snackbarMessageKey: "newInvitedUser"
    });
    this.navigate(convertToPath({ base: "users" }));
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  markPrimaryEmail = email => {
    this.setState({
      displaySnackbar: true,
      snackbarMessageKey: "newInvitedUser"
    });
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  closeSnackbar = () => this.setState({ displaySnackbar: false });

  fetchUserRoles = userId => {
    console.log("Calling fetchUserRoles");
    return new Promise((resolve, reject) => {
      resolve(this.props.assignedUserRoles);
    });
  };

  fetchUserGroups = userId => {
    console.log("Calling fetchUserGroups");
    return new Promise((resolve, reject) => {
      resolve(this.props.assignedUserGroups);
    });
  };

  dialogToggle = row => console.log("Calling dialogToggle on item: " + row.id);

  handleFavoriteClick = (user, isFavorite) => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  addEmail = email => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  resetPasswordRequestForUser = userId => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  updatePassword = (password, passwordRepeat) => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  updateEmail = (oldEmail, newEmail) => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  removeEmail = email => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  deleteUser = () => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };
  manageEmail = {
    addEmail: this.addEmail,
    updateEmail: this.updateEmail,
    removeEmail: this.removeEmail,
    markPrimaryEmail: this.markPrimaryEmail
  };

  managePassword = {
    resetPasswordRequestForUser: this.resetPasswordRequestForUser,
    updatePassword: this.updatePassword
  };

  resendInvite = (userId, email) => {
    return new Promise((resolve, reject) => {
      this.setState({
        displaySnackbar: true,
        snackbarMessageKey: "resendInviteSent",
        messageData: { email: email }
      });
      resolve();
    });
  };

  addRoles = rolesId => {
    console.log(rolesId);
    return new Promise((resolve, reject) => {
      this.setState({
        displaySnackbar: true,
        snackbarMessageKey: "RolesAdded"
      });
      resolve();
    });
  };

  removeRole = roleId => {
    return new Promise((resolve, reject) => {
      this.setState({
        displaySnackbar: true,
        snackbarMessageKey: "RoleRemovedFromUser"
      });
      resolve();
    });
  };

  addGroups = groupsId => {
    return new Promise((resolve, reject) => {
      this.setState({
        displaySnackbar: true,
        snackbarMessageKey: "GroupsAdded"
      });
      resolve();
    });
  };

  removeGroup = groupId => {
    return new Promise((resolve, reject) => {
      this.setState({
        displaySnackbar: true,
        snackbarMessageKey: "GroupRemovedFromUser"
      });
      resolve();
    });
  };

  ListUsers = () => (
    <ListUsers
      isEmpty={!!this.props.users.length}
      users={this.props.users}
      usersCount={this.props.users.length}
      currentUser={users[0].id}
      isLoading={this.state.isLoading}
      inviteUser={this.inviteUser}
      editProfile={this.editProfile}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      handleFavoriteClick={this.handleFavoriteClick}
      fetchUserRoles={this.fetchUserRoles}
      fetchUserGroups={this.fetchUserGroups}
      loadMore={this.loadMoreUsers}
    />
  );

  InviteUsers = props => (
    <InviteUsers
      {...props}
      {...this.props}
      errors={{ users: { 0: { email: "No!" } } }}
      getEffectiveRoles={this.getEffectiveRoles}
      getCompositeRoles={this.getCompositeRoles}
      getAssignableRoles={this.getAssignableRoles}
      getPermissionSets={this.getPermissionSets}
      getGroupsHandler={this.getGroupsHandler}
      submitHandler={this.submitHandler}
      handleBack={this.handleBack}
      fileUploadMetadata={this.fileUploadMetadata}
    />
  );

  ViewProfile = props => (
    <ViewProfile {...props} {...this.props} userProfile={this.state.userProfile} />
  );

  ViewProfileSidemenu = props => (
    <ViewProfileSidemenu
      {...props}
      {...this.props}
      userProfile={this.state.userProfile}
      handleBack={this.handleBack}
      editProfile={this.editProfile}
    />
  );

  dummyUpdateField = userProfile => this.setState({ userProfile });

  EditProfile = () => (
    <EditProfile
      userProfile={activateUserSetters(this.state.userProfile)}
      errors={{ firstName: "It's not your name!" }}
      handleBack={this.handleBack}
      submitHandler={this.submitEditProfileHandler}
      updateField={this.dummyUpdateField}
      onFilesChange={files => {}}
    />
  );

  EditProfileRolesAndGroups = props => (
    <EditProfileRolesAndGroups
      {...props}
      {...this.props}
      getEffectiveRoles={this.getEffectiveRoles}
      getAssignableRoles={this.getAssignableRoles}
      getPermissionSets={this.getPermissionSets}
      getCompositeRoles={this.getCompositeRoles}
      getGroupsHandler={this.getGroupsHandler}
      addRoles={this.addRoles}
      removeRole={this.removeRole}
      addGroups={this.addGroups}
      removeGroup={this.removeGroup}
      roles={this.props.assignedUserRoles}
      groups={this.props.assignedUserGroups}
    />
  );

  handlePasswordOptions = typeOfOption => this.setState({ typeOfOption });

  userEmailsData = () => {
    return {
      loading: false,
      error: undefined,
      data: {
        id: this.state.userProfile.id,
        userEmails: this.state.userProfile.userEmails
      }
    };
  };

  EditProfileSettings = () => (
    <EditProfileSettings
      userProfile={this.state.userProfile}
      isActive={this.state.userProfile.status === "Active"}
      userEmailsData={this.userEmailsData()}
      typeOfOption={this.state.typeOfOption}
      handlePasswordOptions={this.handlePasswordOptions}
      errors={{ password: "Error!", email: "Error!" }}
      managePassword={this.managePassword}
      resendInvite={this.resendInvite}
      manageEmail={this.manageEmail}
      deleteUser={this.deleteUser}
    />
  );

  EditProfileSidemenu = () => (
    <EditProfileSidemenu
      userProfile={this.state.userProfile}
      possiblePaths={this.state.possiblePaths}
      handleBack={this.handleBack}
      currentPath={this.props.location.pathname}
      navigate={this.navigate}
    />
  );

  ListUsersSidemenu = props => (
    <ListUsersSidemenu
      usersCount={100}
      filters={filters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      sorting={sorting}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
    />
  );

  InviteUsersSidemenu = props => (
    <InviteUsersSidemenu {...props} {...this.props} handleBack={this.handleBack} />
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

  navbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      placeholder="searchUsers"
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
            <Route path="/users" exact component={this.ListUsersSidemenu} />
            <Route path="/users/invite" exact component={this.InviteUsersSidemenu} />
            <Route path="/users/*/view" exact component={this.ViewProfileSidemenu} />
            <Route path="/users/*/edit" component={this.EditProfileSidemenu} />
            <Route path="/users/roles" component={this.EditProfileSidemenu} />
            <Route path="/users/settings" component={this.EditProfileSidemenu} />
          </Switch>
        }
      >
        <Switch>
          <Route path="/users" exact component={this.ListUsers} />
          <Route path="/users/invite" exact component={this.InviteUsers} />
          <Route path="/users/*/view" exact component={this.ViewProfile} />
          <Route path="/users/*/edit" exact component={this.EditProfile} />
          <Route path="/users/*/edit/roles" exact component={this.EditProfileRolesAndGroups} />
          <Route path="/users/*/edit/settings" exact component={this.EditProfileSettings} />
        </Switch>
      </NavbarSideMenuPage>
    </>
  );
}

export default UsersPage;
