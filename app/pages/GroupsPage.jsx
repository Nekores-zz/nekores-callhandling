/**
 * by A. Prates, jan-2019
 */
import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage, Searchbar } from "components";
import {
  CreateGroup,
  CreateGroupSidemenu,
  EditGroupMembers,
  EditGroupRoles,
  EditGroupSettings,
  EditGroupSidemenu,
  ListGroups,
  ListGroupsSidemenu
} from "components/Groups";
import { convertToPath, getParsedPath } from "utils/helpers";
import { generateUid } from "utils/strings";
import { groups, protoGroup } from "config/groupsMockData";
import { effectiveRoles, permissionSets, roles } from "config/securityMockData";
import { users } from "config/usersMockData";
import { exampleFilters, exampleSortings } from "config/sidemenuMockData";
import { menuItems, quickSwitchUsers, userInfo } from "config/mockData";

class GroupsPage extends Component {
  static defaultProps = {
    groups,
    users,
    roles,
    effectiveRoles,
    permissionSets,
    menuItems,
    userInfo
  };

  getPossiblePaths = location =>
    location.action === "edit"
      ? {
          members: convertToPath({ ...location, option: "" }),
          roles: convertToPath({ ...location, option: "roles" }),
          settings: convertToPath({ ...location, option: "settings" }),
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
      actionFunc: undefined,

      groups: this.props.groups,
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
  getSelectedGroup = () => this.state.groups.find(g => g.id === this.state.possiblePaths.id);

  ///// SETUP PATHS AS FUNCTIONS /////

  handleBack = () => {
    const path = convertToPath({ base: "groups" });
    this.updateLocation(path, this.props.history.replace(path));
  };

  listGroups = () => {
    this.navigate(convertToPath({ base: "groups" }));
  };

  createGroup = () => {
    this.navigate(convertToPath({ base: "groups", action: "create" }));
  };

  editGroup = id => {
    this.navigate(convertToPath({ base: "groups", id, action: "edit" }));
  };

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

  loadMoreGroups = () => {
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

  removeGroups = (isAllDelete, groups) => {
    isAllDelete
      ? console.log("Bulk delete all, except: " + groups.length + " items!")
      : console.log("Bulk delete " + groups.length + " items!");
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  removeGroupMember = user => {
    const id = this.state.possiblePaths.id;
    const groups = [...this.state.groups];
    const gIndex = groups.findIndex(g => g.id === id);
    const oldMembersCopy = [...groups[gIndex].members];
    const updatedMembers = groups[gIndex].members.filter(m => m !== user.id);
    groups[gIndex].members = updatedMembers;
    groups[gIndex].membersCount = updatedMembers.length;
    this.setState({
      groups,

      displaySnackbar: true,
      snackbarMessageKey: "groupMemberRemoved",
      messageData: {
        user: user.firstName + " " + user.lastName,
        group: groups[gIndex].name
      },
      actionFunc: this.undoRemoveGroupMember(gIndex, oldMembersCopy)
    });
  };

  removeGroupMembers = users => {
    console.log("Bulk delete " + users.length + " items!");
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  removeAllGroupMembersExcept = users => {
    console.log("Bulk delete all, except: " + users.length + " items!");
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  removeGroupRoles = roles => {
    console.log("Bulk delete " + roles.length + " items!");
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  removeAllGroupRolesExcept = roles => {
    console.log("Bulk delete all, except: " + roles.length + " items!");
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  undoRemoveGroupMember = (gIndex, oldMembersCopy) => () => {
    const groups = [...this.state.groups];
    groups[gIndex].members = oldMembersCopy;
    groups[gIndex].membersCount = oldMembersCopy.length;
    this.setState({ groups });
  };

  handleAddGroupMembers = newMembers => {
    const id = this.state.possiblePaths.id;
    const groups = [...this.state.groups];
    const gIndex = groups.findIndex(g => g.id === id);
    const updatedMembers = [...groups[gIndex].members, ...newMembers];
    groups[gIndex].members = updatedMembers;
    groups[gIndex].membersCount = updatedMembers.length;
    this.setState({ groups });
  };

  removeGroupRole = role => {
    const id = this.state.possiblePaths.id;
    const groups = [...this.state.groups];
    const gIndex = groups.findIndex(g => g.id === id);
    const oldRolesCopy = [...groups[gIndex].roles];
    const updatedRoles = groups[gIndex].roles.filter(r => r !== role.id);
    groups[gIndex].roles = updatedRoles;
    groups[gIndex].rolesCount = updatedRoles.length;
    this.setState({
      groups,

      displaySnackbar: true,
      snackbarMessageKey: "groupRoleRemoved",
      messageData: {
        role: role.name,
        group: groups[gIndex].name
      },
      actionFunc: this.undoRemoveGroupRole(gIndex, oldRolesCopy)
    });
  };

  undoRemoveGroupRole = (gIndex, oldRolesCopy) => () => {
    const groups = [...this.state.groups];
    groups[gIndex].roles = oldRolesCopy;
    groups[gIndex].rolesCount = oldRolesCopy.length;
    this.setState({ groups });
  };

  addRolesToGroup = newRoles => {
    const id = this.state.possiblePaths.id;
    const groups = [...this.state.groups];
    const gIndex = groups.findIndex(g => g.id === id);
    const updatedRoles = [...groups[gIndex].roles, ...newRoles];
    groups[gIndex].roles = updatedRoles;
    groups[gIndex].rolesCount = updatedRoles.length;
    this.setState({ groups });
  };

  submitCreateGroupHandler = formData => {
    console.log("Submitting create group");

    this.setState({
      displaySnackbar: true,
      snackbarMessageKey: "newGroupCreated",
      messageData: { name: formData.name }
    });

    // PLEASE, REPLACE DUMMY FN, it's just for testing purpose!
    this.dummyCreateGroupFn(formData);
    // this.listGroups();

    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  // Yes, you can remove this function if not used ;)
  dummyCreateGroupFn = formData => {
    this.setState(
      {
        groups: [
          {
            ...protoGroup,
            id: generateUid(),
            name: formData.name,
            description: formData.description,
            members: [],
            membersCount: 0,
            roles: [],
            rolesCount: 0,
            isFavorite: true
          },
          ...this.state.groups
        ]
      },
      this.listGroups
    );
  };

  submitUpdateGroupHandler = formData => {
    console.log("Updating group");

    const id = this.state.possiblePaths.id;
    const groups = [...this.state.groups];
    const gIndex = groups.findIndex(g => g.id === id);
    groups[gIndex].name = formData.name;
    groups[gIndex].description = formData.description;

    this.setState({
      groups,

      displaySnackbar: true,
      snackbarMessageKey: "groupUpdated",
      messageData: { name: formData.name }
    });

    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  handleFavoriteClick = (entityId, isFavorite) => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  getAvailableUsersHandler = () => {
    return new Promise((resolve, reject) => {
      resolve(this.filterUnDefinedMembers(this.props.users));
    });
  };

  /*  getEffectiveRolesHandler = (roleIds) => {
    return new Promise((resolve, reject) => {
        resolve(this.props.effectiveRoles);
    });
    };

  getRolesHandler = () => {
    return new Promise((resolve, reject) => {
        resolve(this.props.roles);
    });
    };

  getPermissionSetsHandler = () => {
    return new Promise((resolve, reject) => {
      resolve(this.props.permissionSets);
    });
  };*/

  getEffectiveRoles = roleIds => {
    return this.props.effectiveRoles;
  };

  getCompositeRoles = roleId => {
    const role = this.props.roles.find(role => role.id == roleId);
    return role.children.map(childRoleId => this.props.roles.find(role => role.id === childRoleId));
  };

  getAssignableRoles = () => {
    return Object.values(this.props.roles);
  };

  getPermissionSets = () => {
    return Object.values(this.props.permissionSets);
  };

  filterUnDefinedMembers = members => {
    return members.filter(member => member != undefined);
  };

  deleteGroupHandler = () =>
    console.log(
      "Delete group: [id: " + this.getSelectedGroup().id + "] -> " + this.getSelectedGroup().name
    );

  dialogToggle = row => console.log("Calling dialogToggle on item: " + row.id);

  CreateGroup = () => (
    <CreateGroup submitHandler={this.submitCreateGroupHandler} handleBack={this.handleBack} />
  );

  CreateGroupSidemenu = () => <CreateGroupSidemenu handleBack={this.handleBack} />;

  EditGroupSidemenu = () => (
    <EditGroupSidemenu
      selectedGroup={this.getSelectedGroup()}
      possiblePaths={this.state.possiblePaths}
      navigate={this.navigate}
      handleBack={this.handleBack}
      currentPath={this.props.location.pathname}
    />
  );

  EditGroupMembers = () => (
    <EditGroupMembers
      members={this.filterUnDefinedMembers(this.getSelectedGroup().members)}
      membersCount={this.filterUnDefinedMembers(this.getSelectedGroup().members).length}
      getAvailableUsersHandler={this.getAvailableUsersHandler}
      removeGroupMember={this.removeGroupMember}
      removeGroupMembers={this.removeGroupMembers}
      removeAllGroupMembersExcept={this.removeAllGroupMembersExcept}
      handleAddGroupMembers={this.handleAddGroupMembers}
      isLoading={this.state.isLoading}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreGroups}
    />
  );

  EditGroupRoles = () => (
    <EditGroupRoles
      groupRoles={this.getSelectedGroup().roles}
      rolesCount={this.getSelectedGroup().roles.length}
      getEffectiveRoles={this.getEffectiveRoles}
      getCompositeRoles={this.getCompositeRoles}
      getAssignableRoles={this.getAssignableRoles}
      getPermissionSets={this.getPermissionSets}
      removeGroupRole={this.removeGroupRole}
      removeGroupRoles={this.removeGroupRoles}
      removeAllGroupRolesExcept={this.removeAllGroupRolesExcept}
      addRolesToGroup={this.addRolesToGroup}
      isLoading={this.state.isLoading}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreGroups}
    />
  );

  EditGroupSettings = () => (
    <EditGroupSettings
      selectedGroup={this.getSelectedGroup()}
      submitHandler={this.submitUpdateGroupHandler}
      handleBack={this.handleBack}
      deleteHandler={this.deleteGroupHandler}
    />
  );

  ListGroups = () => (
    <ListGroups
      isEmpty={!!this.state.groups.length}
      groups={this.state.groups}
      groupsCount={this.state.groups.length}
      isLoading={this.state.isLoading}
      createGroup={this.createGroup}
      editGroup={this.editGroup}
      dialogToggle={this.dialogToggle}
      onScrollPositionChange={this.storeScrollPosition}
      onScrollPositionSetter={this.handleScrollPositionSetter}
      loadMore={this.loadMoreGroups}
      handleFavoriteClick={this.handleFavoriteClick}
      currentUserId={""}
      removeGroups={this.removeGroups}
    />
  );

  ListGroupsSidemenu = () => (
    <ListGroupsSidemenu
      groupsCount={this.state.groups.length}
      filters={exampleFilters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      sorting={exampleSortings}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
    />
  );

  updateFilters = sFilters => {
    // TODO
  };

  updateSortings = sSortings => {
    // TODO
  };

  searchbar = () => (
    <Searchbar
      mode="filter"
      placeholder="searchGroups"
      handleSearch={this.handleSearch}
      handleSearchResult={this.handleSearchResult}
    />
  );

  navbar = toggleDrawer => (
    <MainNavbar
      name="Company Name"
      searchbar={this.searchbar}
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: this.props.userInfo, loading: false }}
      menuItems={{ data: this.props.menuItems, loading: false }}
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
        navbar={f => (
          <Switch>
            <Route path="/groups" exact component={() => this.navbar(f)} />
            <Route path="/groups/*" component={() => this.noSearchbarNavbar(f)} />
          </Switch>
        )}
        location={this.props.location.pathname}
        sidemenuContent={
          <Switch>
            <Route path="/groups" exact component={this.ListGroupsSidemenu} />
            <Route path="/groups/create" exact component={this.CreateGroupSidemenu} />
            <Route path="/groups/*/edit" component={this.EditGroupSidemenu} />
          </Switch>
        }
      >
        <Switch>
          <Route path="/groups" exact component={this.ListGroups} />
          <Route path="/groups/create" exact component={this.CreateGroup} />
          <Route path="/groups/*/edit" exact component={this.EditGroupMembers} />
          <Route path="/groups/*/edit/roles" exact component={this.EditGroupRoles} />
          <Route path="/groups/*/edit/settings" exact component={this.EditGroupSettings} />
        </Switch>
      </NavbarSideMenuPage>
    </Fragment>
  );
}

export default GroupsPage;
