import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { HubbubSnackbar, MainNavbar, NavbarSideMenuPage, Searchbar } from "components";
import {
  CreatePermissionSetSidemenu,
  EditPermissionSet,
  EditPermissionSetSidemenu,
  EditPolicy,
  EditUserPolicy,
  EditRolePolicy,
  EditAggregatedPolicy,
  EditRole,
  EditPermission,
  EditSidemenu,
  ListPermissions,
  ListPermissionSets,
  SecuritySidemenu,
  ListPolicies,
  ListRoles
} from "components/Security";
import { PermissionSet, Policy, Role, Permission, search } from "models";
import { searchResults } from "config/mockData";
import {
  accounts,
  account1Children,
  account11Children,
  account2Children,
  account21Children,
  actions,
  actionTypes,
  permissions,
  permissionSets,
  policies,
  resources,
  roles,
  types,
  services,
  permissionSetUIPermissions
} from "config/securityMockData";
import { exampleFilters as filters, exampleSortings as sorting } from "config/sidemenuMockData";
import { users } from "config/usersMockData";
import { arrays, objects } from "utils";
import { menuItems, userInfo, quickSwitchUsers } from "config/mockData";
import PropTypes from "prop-types";

class SecurityPage extends Component {
  state = {
    displaySnackbar: false,
    snackbarMessageKey: "",
    messageData: undefined,
    isLoading: false,
    hasMore: true,
    permissions: Object.values(permissions),
  };

  params = {
    getArea: () => this.props.location.pathname.split('/').find(_ => _),
    getPermissionSetArea: () => arrays.last(this.props.location.pathname.split('/').filter(_ => _)),
    getPermissionSetId: () => this.props.match.params.permissionSetId,
    getPermissionId: () => this.props.match.params.permissionId,
    getPolicyId: () => this.props.match.params.policyId,
    getRoleId: () => this.props.match.params.roleId,
  };

  navigate = {
    permissionSets: {
      list: () => this.props.history.push(`/permission-sets`),
      create: () => this.props.history.push(`/permission-sets/create`),
      edit: (permissionSetId) => this.props.history.push(`/permission-sets/${permissionSetId}/edit`),
      permissions: (permissionSetId) => this.props.history.push(`/permission-sets/${permissionSetId}/edit/permissions`),
      policies: (permissionSetId) => this.props.history.push(`/permission-sets/${permissionSetId}/edit/policies`),
      roles: (permissionSetId) => this.props.history.push(`/permission-sets/${permissionSetId}/edit/roles`),
    },
    permissions: {
      list: () => this.props.history.push(`/permissions`),
      create: () => this.props.history.push(`/permissions/create`),
      edit: (permissionId) => this.props.history.push(`/permissions/${permissionId}/edit`),
    },
    policies: {
      list: () => this.props.history.push(`/policies`),
      create: (type) => this.props.history.push(`/policies/create/${type}`),
      edit: (policyId) => this.props.history.push(`/policies/${policyId}/edit`),
    },
    roles: {
      list: () => this.props.history.push(`/roles`),
      create: () => this.props.history.push(`/roles/create`),
      edit: (roleId) => this.props.history.push(`/roles/${roleId}/edit`),
    },
    back: () => this.props.history.goBack(),
  };

  get permission() {
    return permissions['1'];
  }

  get permissionSet() {
    return permissionSets['3'];
  }

  get role() {
    return roles['1'];
  }

  get policy() {
    return policies['1'];
  }

  loadAccounts = (accountId) => new Promise(
    (resolve) =>
      setTimeout(() => {
        switch (accountId) {
          case "1": resolve(account1Children);
          case "11": resolve(account11Children);
          case "2": resolve(account2Children);
          case "21": resolve(account21Children);
          case undefined: resolve(accounts);
          default: resolve({children: [], accounts: {}})
        }
      }, 100)
  );
  loadResources = () => new Promise(
      (resolve) =>
          setTimeout(() => {
            resolve(resources);
          }, 100)
  );

  loadTypes = () => types;

  generatePermissions = (length) =>
    Array.from({ length }).map((_, i) => {
      let n = this.state.permissions.length + i;
      return {
        ...Permission.create(),
        id: `${n}`,
        name: `Permission ${n}`,
      };
    });

  loadMorePermissions = () => {
    let { hasMore, isLoading } = this.state;
    if (hasMore && !isLoading) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        let permissions = [
          ...this.state.permissions,
          ...this.generatePermissions(5),
        ];
        let hasMore = permissions.length < 30;
        let isLoading = false;
        this.setState({ permissions, isLoading, hasMore });
      }, 1000);
    }
  };

  scroll = {
    position: 0,

    positionSetter: () => {

    },

    storePosition: (scrollPosition) => {
      this.scroll.position = scrollPosition;
    },

    toTop: (window.PermissionSetsToTop = () => {
      this.scroll.positionSetter(0);
    }),

    handlePositionSetter: (positionSetter) => {
      this.scroll.positionSetter = positionSetter;
      positionSetter(this.scroll.position);
    },
  };

  closeSnackbar = () => {
    this.setState({ displaySnackbar: false });
  };

  SecuritySidemenu = () => (
    <SecuritySidemenu
      permissionSetsCount={objects.count(permissionSets)}
      rolesCount={objects.count(roles)}
      policiesCount={objects.count(policies)}
      permissionsCount={31}
      area={this.params.getArea()}
      navigate={this.navigate}
      filters={filters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      sorting={sorting}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
    />
  );

  ListAllPermissionSets = () => (
    <ListPermissionSets
      isEmpty={!!objects.count(permissionSets)}
      permissionSets={objects.values(permissionSets)}
      permissionSetsCount={objects.count(permissionSets)}
      onChange={log('ListPermissionSets onChange')}
      isLoading={false}
      hasMore={false}
      loadMore={log('ListPermissionSets loadMore')}
      onSave={log('ListPermissionSets save')}
      navigate={this.navigate}
      getUIPermissions = {_ => permissionSetUIPermissions}
      createPermissionSetPermission={true}
      onScrollPositionChange={this.scroll.storePosition}
      onScrollPositionSetter={this.scroll.handlePositionSetter}
      onEnable={() => console.log("toggle enabled!")}
    />
  );

  CreatePermissionSet = () => (
    <EditPermissionSet
      permissionSet={PermissionSet.create()}
      loadAccounts={this.loadAccounts}
      actionTypes={actionTypes}
      onSubmit={log('EditPermissionSet submit')}
      onCancel={this.navigate.back}
      onDelete={log('EditPermissionSet delete')}
      getUIPermissions = {_ => permissionSetUIPermissions}
      createSharablePermission={true}
    />
  );

  CreatePermissionSetSidemenu = () => (
    <CreatePermissionSetSidemenu handleBack={this.navigate.back}/>
  );

  EditPermissionSetSidemenu = () => (
    <EditPermissionSetSidemenu
      permissionSetId = {this.permissionSet.id}
      permissionSetName={this.permissionSet.name}
      rolesCount={objects.count(roles)}
      policiesCount={objects.count(policies)}
      permissionsCount={objects.count(permissions)}
      area={this.params.getPermissionSetArea()}
      navigate={this.navigate}
      filters={filters}
      handleFilters={_ => this.setState({})}
      isFiltersOpen={false}
      sorting={sorting}
      handleSorting={_ => this.setState({})}
      isSortingOpen={false}
    />
  );

  EditPermissionSetSettings = () => (
    <EditPermissionSet
      permissionSet={this.permissionSet}
      loadAccounts={this.loadAccounts}
      actionTypes={actionTypes}
      onSubmit={log('EditPermissionSet submit')}
      onCancel={this.navigate.back}
      onDelete={log('EditPermissionSet delete')}
      getUIPermissions = {_ => permissionSetUIPermissions}
      createSharablePermission={false}
    />
  );

  EditPermissionSetRoles = () => (
    <ListRoles
      isEmpty={!!objects.count(roles)}
      permissionSetId={this.permissionSet.id}
      roles={roles}
      rolesCount={objects.count(roles)}
      permissionSets={permissionSets}
      isLoading={false}
      hasMore={false}
      loadMore={log('loadMore ListRoles')}
      navigate={this.navigate}
      onScrollPositionChange={this.scroll.storePosition}
      onScrollPositionSetter={this.scroll.handlePositionSetter}
      getEditRolePermission={() => true}
      createRolePermission={true}
    />
  );

  EditPermissionSetPolicies = () => (
    <ListPolicies
      isEmpty={!!objects.count(policies)}
      permissionSetId={this.permissionSet.id}
      policies={policies}
      policiesCount={objects.count(policies)}
      isLoading={false}
      hasMore={false}
      loadMore={log('loadMore ListPolicies')}
      navigate={this.navigate}
      onScrollPositionChange={this.scroll.storePosition}
      onScrollPositionSetter={this.scroll.handlePositionSetter}
      createPolicyPermission={true}
      getEditPolicyPermission={() => true}
    />
  );

  EditPermissionSetPermissions = () => {
    let { permissions, isLoading, hasMore } = this.state;
    return (
      <ListPermissions
        permissionSetId={this.permissionSet.id}
        permissions={objects.values(permissions)}
        permissionsCount={objects.count(permissions)}
        loadMore={log('loadMore EditPermissionSetPermissions')}
        isLoading={isLoading}
        hasMore={hasMore}
        navigate={this.navigate}
        onScrollPositionChange={this.scroll.storePosition}
        onScrollPositionSetter={this.scroll.handlePositionSetter}
        createPermissionPermission = {true}
        getEditPermissionPermission = {() => true}
      />
    );
  };

  ListAllRoles = () => (
    <ListRoles
      isEmpty={!!objects.count(roles)}
      roles={roles}
      rolesCount={objects.count(roles)}
      isLoading={false}
      hasMore={false}
      loadMore={log('loadMore ListRoles')}
      navigate={this.navigate}
      onScrollPositionChange={this.scroll.storePosition}
      onScrollPositionSetter={this.scroll.handlePositionSetter}
      getEditRolePermission={() => true}
      createRolePermission={false}
    />
  );

  CreateRoleSidemenu = () => (
    <EditSidemenu
      titleKey={"createARole"}
      backLabelOptionKey={"roles"}
      handleBack={this.navigate.back}
    />
  );

  CreateRole = () => (
    <EditRole
      role={Role.create(this.permissionSet.id)}
      roles={roles}
      permissionSets={permissionSets}
      onSubmit={log('submit EditRole')}
      onCancel={this.navigate.back}
    />
  );

  EditRoleSidemenu = () => (
    <EditSidemenu
      title={this.role.name}
      backLabelOptionKey={"roles"}
      handleBack={this.navigate.back}
    />
  );

  EditRole = () => (
    <EditRole
      role={this.role}
      roles={roles}
      permissionSets={permissionSets}
      onSubmit={log('submit EditRole')}
      onCancel={this.navigate.back}
      onDelete={log('delete EditRole')}
    />
  );

  ListAllPolicies = () => (
    <ListPolicies
      isEmpty={!!objects.count(policies)}
      policies={policies}
      policiesCount={objects.count(policies)}
      isLoading={false}
      hasMore={false}
      loadMore={log('loadMore ListPolicies')}
      navigate={this.navigate}
      onScrollPositionChange={this.scroll.storePosition}
      onScrollPositionSetter={this.scroll.handlePositionSetter}
      getEditPolicyPermission={()=> true}
      createPolicyPermission={false}
    />
  );

  CreateUserPolicy = () => (
    <EditUserPolicy
      policy={Policy.create(Policy.types.user)}
      users={users}
      onSubmit={log('submit EditREditUserPolicy')}
      onCancel={this.navigate.back}
    />
  );

  CreateRolePolicy = () => (
    <EditRolePolicy
      policy={Policy.create(Policy.types.role)}
      roles={roles}
      permissionSets={permissionSets}
      onSubmit={log('submit EditRolePolicy')}
      onCancel={this.navigate.back}
    />
  );

  CreateAggregatedPolicy = () => (
    <EditAggregatedPolicy
      policy={Policy.create(Policy.types.aggregated)}
      policies={policies}
      onSubmit={log('submit EditAggregatedPolicy')}
      onCancel={this.navigate.back}
    />
  );

  CreatePolicySidemenu = () => (
    <EditSidemenu
      titleKey={"createAPolicy"}
      backLabelOptionKey={"policies"}
      handleBack={this.navigate.back}
    />
  );

  EditPolicySidemenu = () => (
    <EditSidemenu
      title={this.policy.name}
      backLabelOptionKey={"policies"}
      handleBack={this.navigate.back}
    />
  );

  EditPolicy = () => (
    <EditPolicy
      policy={this.policy}
      users={users}
      roles={roles}
      permissionSets={permissionSets}
      policies={policies}
      onSubmit={log('submit EditPolicy')}
      onCancel={this.navigate.back}
      onDelete={log('delete EditPolicy')}
    />
  );

  ListAllPermissions = () => (
    <ListPermissions
      permissions={this.state.permissions}
      permissionsCount={31}
      loadMore={this.loadMorePermissions}
      isLoading={this.state.isLoading}
      navigate={this.navigate}
      onScrollPositionChange={this.scroll.storePosition}
      onScrollPositionSetter={this.scroll.handlePositionSetter}
      createPermissionPermission = {false}
      getEditPermissionPermission = {() => true}
    />
  );

  CreatePermissionSidemenu = () => (
    <EditSidemenu
      titleKey={"createAPermission"}
      backLabelOptionKey={"permissions"}
      handleBack={this.navigate.back}
    />
  );

  CreatePermission = () => (
    <EditPermission
      permission={Permission.create()}
      loadAccounts={this.loadAccounts}
      loadResources ={this.loadResources}
      policies={policies}
      services={services}
      loadTypes ={this.loadTypes}
      onSubmit={log('CreatePermission submit')}
      onCancel={this.navigate.back}
      enableOnChildAccountsPermission={true}
    />
  );

  EditPermissionSidemenu = () => {
    let { match } = this.props;
    let { permissionSetId, permissionId } = match.params;
    return (
      <EditSidemenu
        title={permissions['1'].name}
        backLabelOptionKey={"permissions"}
        handleBack={this.navigate.back}
      />
    );
  };

  EditPermission = () => {
    let { match } = this.props;
    let { permissionId } = match.params;
    return (
      <EditPermission
        permission={permissions['1']}
        loadAccounts={this.loadAccounts}
        loadResources = {this.loadResources}
       // actions={actions}
        policies={policies}
        services={services}
        loadTypes={this.loadTypes}
        onSubmit={log('EditPermission submit')}
        onCancel={this.navigate.back}
        onDelete={log('EditPermission delete')}
        enableOnChildAccountsPermission={true}
      />
    );
  };

  handleSearch = (string) => Promise.resolve(
    searchResults.filter((r) => search(string, [r.text]))
  );

  handleSearchResult = (url) => {

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


  searchbar = () => (
    <Searchbar
      mode="filter"
      placeholder="searchPermissionSets"
      handleSearch={this.handleSearch}
      handleSearchResult={this.handleSearchResult}
    />
  );

  navbar = (toggleDrawer) => (
    <MainNavbar
      name="Company Name"
      searchbar={this.searchbar}
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  noSearchbarNavbar = (toggleDrawer) => (
    <MainNavbar
      name="Company Name"
      handleMainMenuClick={toggleDrawer}
      userInfo={{ data: userInfo, loading: false }}
      menuItems={{ data: menuItems, loading: false }}
      quickSwitchUsers={quickSwitchUsers}
    />
  );

  renderNavbar = (toggleDrawer) => (
    <Switch>
      <Route path="/permission-sets" exact component={() => this.navbar(toggleDrawer)} />
      <Route path="*" component={() => this.noSearchbarNavbar(toggleDrawer)} />
    </Switch>
  );

  renderPageContent() {
    return (
      <Switch>
        <Route path="/permission-sets" exact component={this.ListAllPermissionSets} />
        <Route path="/permission-sets/create" exact component={this.CreatePermissionSet} />
        <Route path="/permission-sets/:permissionSetId/edit" exact component={this.EditPermissionSetSettings} />
        <Route path="/permission-sets/:permissionSetId/edit/roles" exact component={this.EditPermissionSetRoles}/>
        <Route path="/permission-sets/:permissionSetId/edit/policies" exact component={this.EditPermissionSetPolicies}/>
        <Route path="/permission-sets/:permissionSetId/edit/permissions" exact component={this.EditPermissionSetPermissions}/>

        <Route path="/roles" exact component={this.ListAllRoles} />
        <Route path="/roles/create" exact component={this.CreateRole} />
        <Route path="/roles/:roleId/edit" exact component={this.EditRole} />

        <Route path="/policies" exact component={this.ListAllPolicies} />
        <Route path="/policies/create/user" exact component={this.CreateUserPolicy} />
        <Route path="/policies/create/role" exact component={this.CreateRolePolicy} />
        <Route path="/policies/create/aggregated" exact component={this.CreateAggregatedPolicy} />
        <Route path="/policies/:policyId/edit" exact component={this.EditPolicy} />

        <Route path="/permissions" exact component={this.ListAllPermissions} />
        <Route path="/permissions/create" exact component={this.CreatePermission} />
        <Route path="/permissions/:permissionId/edit" exact component={this.EditPermission} />
      </Switch>
    );
  }

  renderSidemenu() {
    return (
      <Switch>
        <Route path="/permission-sets" exact component={this.SecuritySidemenu} />
        <Route path="/permission-sets/create" exact component={this.CreatePermissionSetSidemenu}/>
        <Route path="/permission-sets/:permissionSetId/edit" component={this.EditPermissionSetSidemenu} />

        <Route path="/roles" exact component={this.SecuritySidemenu} />
        <Route path="/roles/create" component={this.CreateRoleSidemenu} />
        <Route path="/roles/:roleId/edit" exact component={this.EditRoleSidemenu} />

        <Route path="/policies" exact component={this.SecuritySidemenu} />
        <Route path="/policies/create" component={this.CreatePolicySidemenu} />
        <Route path="/policies/:policyId/edit" exact component={this.EditPolicySidemenu} />

        <Route path="/permissions" exact component={this.SecuritySidemenu} />
        <Route path="/permissions/create" exact component={this.CreatePermissionSidemenu} />
        <Route path="/permissions/:permissionId/edit" exact component={this.EditPermissionSidemenu} />
      </Switch>
    );
  }

  render() {
    let { location } = this.props;
    let { displaySnackbar, snackbarMessageKey, messageData, actionFunc } = this.state;
    return (
      <NavbarSideMenuPage
        navbar={this.renderNavbar}
        location={location.pathname}
        sidemenuContent={this.renderSidemenu()}
      >
        {this.renderPageContent()}

        <HubbubSnackbar
          open={displaySnackbar}
          closeCallback={this.closeSnackbar}
          messageKey={snackbarMessageKey}
          closeOnClickAway={true}
          messageData={messageData}
          actionFunc={actionFunc}
        />
      </NavbarSideMenuPage>
    );
  }
}

export default SecurityPage;

function log(msg) {
  return (...args) => console.log(msg, ...args);
}
