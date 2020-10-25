import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Page, PrimaryButton, PrimaryTextLink, SecondaryTextLink, ThirdTextLink, IconButton, Icon, Text, Paper, SectionHeader,
  Row, Column, Stretch, Box, Padding, Checkbox, Radio, Switch, FormControlLabel, RadioGroup,
  Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListHeader, ListFooter, ListItem, ListCheckbox, ListHeaderSearch, ListItemText, ListAvatar, ListItemAvatar, ListItemSecondaryAction,
  Field, FieldChip, FieldText, TextField, Select, Multiselect,
} from "components/Elements";
import {
  Errors, AccountsExclusions, AccountsSelections, Permission, AccountSelection,
  ResourcesItems, Policy, Service, Action, Account, Accounts, Type, ActionType,
} from "models";
import { AccountsSelection } from "./SecurityElements/AccountsSelection";
import { EditResources } from "./SecurityElements/EditResources";
import { EditPolicies } from "./SecurityElements/EditPolicies";
import { EditActions } from "./SecurityElements/EditActions";
import { withPromiseProps } from 'utils/promise.js';

class EditPermission extends Component {
  static propTypes = {
    permission: Permission.propType.isRequired,
    loadAccounts: PropTypes.func.isRequired,
    loadResources: PropTypes.func.isRequired,
    policies: PropTypes.objectOf(Policy.propType).isRequired,
    services: PropTypes.objectOf(Service.propType).isRequired,
    loadTypes: PropTypes.func.isRequired,
    errors: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    enableOnChildAccountsPermission:PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    permission: this.props.permission,
    types: this.props.permission.services.length > 0 ? this.props.loadTypes(this.props.permission.services) : {},
    errors: undefined,
    accounts: this.props.accounts
  };

  getFieldErrorMessage = (fieldName) => {
    return (
        this.state.errors && this.state.errors.formErrors && this.state.errors.formErrors[fieldName]
    ) || (
        this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]
    );
  };

  isFieldInvalid = (fieldName) => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  handleChange = (setter, ...args0) => (...args1) => {
    let permission = setter(this.state.permission, ...args0, ...args1);
    this.setState({ permission });
  };

  handleChangeEventTargetValue = (setter, ...args0) => (event) => {
    let value = event.target.value;
    this.handleChange(setter, ...args0) (value);
  };

  handleServiceChange = (setter, ...args0) => (...args1) => {
    const permission = setter(this.state.permission, ...args0, ...args1);
    const types = args1[0].length > 0 ? this.props.loadTypes(args1[0]) : {};
    this.setState({ permission: {...permission, types:[], excludedTypes:[]}, types: types });
  };

  handleTypeChange = (setter, ...args0) => (...args1) => {
    const permission = setter(this.state.permission, ...args0, ...args1);
    permission.accounts && permission.accounts.forEach(account => {account.resources = undefined; account.childAccountResources = undefined});
    this.setState({ permission: {...permission, resources:undefined, childAccountResources:undefined} });
  };

  accountSelectionHandler = (accountSelections, accounts) => {
        this.setState({accounts:accounts});
        this.handleChange(Permission.setAccounts)(accountSelections)
    };
  childAccountResourceSelectionHandler = (accountSelections, accounts) => {
    this.setState({accounts:accounts});
    this.handleChange(Permission.setChildAccountResources)(accountSelections)
  };
  childAccountResourceSelectionOfChildAccountHandler = (accountSelection) =>(accountSelections, accounts) => {
    this.setState({accounts:accounts});
    this.handleChange(
        Permission.updateAccount,
        accountSelection,
        AccountSelection.setChildAccountResources,
    )(accountSelections)
  };
  handleAccountExclusion = (accountSelections, accounts) => {
        this.setState({accounts:accounts});
        this.handleChange(Permission.setExcludedAccounts)(accountSelections)
    };

  handleSubmit = () => {
    event.preventDefault();
    event.stopPropagation();
    let { onSubmit } = this.props;
    let { permission } = this.state;

    return onSubmit(permission).catch(
        (errors) => this.setState({ errors })
    );
  };

  renderServices() {
    let { resources, services, t } = this.props;
    let { permission } = this.state;
    return (
        <Row padding>
          <Multiselect
              required
              name="services"
              options={Object.keys(services)}
              value={permission.services}
              renderOption={(id) => services[id].name}
              label={t("services")}
              onChange={this.handleServiceChange(Permission.setServices)}
          />
        </Row>
    );
  }

  renderExcludedServices() {
    let { resources, services, t } = this.props;
    let { permission } = this.state;
    return permission.services.length === 0 ? (
        <Row padding>
          <Multiselect
              required
              name="excludeServices"
              options={Object.keys(services)}
              value={permission.excludedServices}
              renderOption={(id) => services[id].name}
              label={t("excludeServices")}
              onChange={this.handleChange(Permission.setExcludedServices)}
          />
        </Row>
    ) : null;
  }

  renderTypes() {
    let { t } = this.props;
    let { permission, types } = this.state;
    return permission.services.length === 1 ? (
        <Row padding>
          <Multiselect
              name="types"
              options={Object.values(types).map(t => t.id)}
              value={permission.types}
              renderOption={(id) => types[id].name + (types[id].isShareable ? " ⚑" : '')}
              label={t("types")}
              onChange={this.handleTypeChange(Permission.setTypes)}
          />
        </Row>
    ) : null;
  }

  renderExcludedTypes() {
    let { resources, t } = this.props;
    let { permission, types } = this.state;
    return (
        permission.services.length > 1 ||
        (permission.services.length === 1 && permission.types.length === 0)
    ) ? (
        <Row padding>
          <Multiselect
              name="excludedTypes"
              options={Object.values(types).map(t => t.id)}
              value={permission.excludedTypes}
              renderOption={(id) => types[id].name + (types[id].isShareable ? " ⚑" : '')}
              renderValue={ty => ty.name + (ty.isShareable ? " ⚑" : '')}
              label={t("excludeTypes")}
              onChange={this.handleChange(Permission.setExcludedTypes)}
          />
        </Row>
    ) : null;
  }

  renderAccountRow = (accountSelection) => {
    let { loadResources, loadAccounts, t, } = this.props;
    let { permission, types, accounts } = this.state;
    return (
        <Fragment>
          {(permission.types.length === 1
              && permission.services.length === 1
              && !!!(hubbub.globals.types && hubbub.globals.types.account === permission.types[0])
              && !accountSelection.includeChildren
          ) ? (
              this.isChildAccountType(permission.types[0]) ?
               <Stretch paddingRightDouble>
               <AccountsSelection
                      accountsSelections={accountSelection.childAccountResources ? accountSelection.childAccountResources : []}
                      accounts={accounts}
                      parentAccount={accounts.accounts[accountSelection.id]}
                      loadAccounts={loadAccounts}
                      label={t("resources")}
                      onChange={this.childAccountResourceSelectionOfChildAccountHandler(accountSelection)}
                      isForChildAccountResource={true}
               />
               </Stretch>:
              <Stretch paddingRightDouble>
                <EditResources
                    loadResources = {loadResources}
                    accountId={accountSelection.id}
                    selectedResources={accountSelection.resources}
                    selectedTypes={permission.types}
                    types={types}
                    label={t("resources")}
                    onChange={this.handleChange(
                        Permission.updateAccount,
                        accountSelection,
                        AccountSelection.setResources,
                    )}
                />
              </Stretch>
          ) : null}
          {(
            permission.services.length === 1 && permission.types.length === 1
          ) ? (
            <Stretch paddingRightDouble>
              <EditActions
                label={t('actions')}
                selectedActions={accountSelection.actions}
                excludedActions={accountSelection.excludedActions}
                actions={types[permission.types[0]].actions}
                onChange={({ selectedActions, excludedActions }) => this.setState({
                  permission: Permission.updateAccount(
                    this.state.permission,
                    accountSelection,
                    AccountSelection.setActions,
                    selectedActions, 
                    excludedActions,
                  )
                })}
              />
            </Stretch>
          ) : null}
          {accountSelection.includeChildren ? (
              <Stretch paddingRightDouble>
                <Multiselect
                    options={objects.values(Account.types)}
                    value={AccountSelection.getSubAccountTypes(accountSelection)}
                    renderOption={t}
                    label={t("includeSubAccountTypes")}
                    onChange={this.handleChange(
                        Permission.updateAccount,
                        accountSelection,
                        AccountSelection.setSubAccountTypes,
                    )}
                />
              </Stretch>
          ) : null}
        </Fragment>
    );
  };

  renderExcludedAccounts() {
    let { loadAccounts, t } = this.props;
    let { permission, accounts } = this.state;
    return (
        <Fragment>
          <Row padding>
            <FormControlLabel
                control={
                  <Switch
                      checked={!!permission.excludedAccounts}
                      onChange={this.handleChange(
                          Permission.setExcludedAccounts,
                          AccountsSelections.create(!permission.excludedAccounts),
                      )}
                  />
                }
                label={t("excludeAccounts")}
            />
          </Row>
          {permission.excludedAccounts ? (
              <Column padding alignChildrenStretch>
                <AccountsSelection
                    accountsSelections={permission.excludedAccounts}
                    accounts={accounts}
                    loadAccounts={loadAccounts}
                    isExclusion
                    onChange={this.handleAccountExclusion}
                    onRemove={this.handleChange(Permission.setExcludedAccounts)}
                />
              </Column>
          ) : null}
        </Fragment>
    )
  }

  renderAccounts() {
    let { loadAccounts, t } = this.props;
    let { permission } = this.state;
    return (
        <Fragment>
          <SectionHeader padding>
            {t("accounts")}
          </SectionHeader>
          <Row padding>
            <FormControlLabel
                control={
                  <Switch
                      checked={permission.enableOnChildAccounts}
                      onChange={this.handleChange(
                          Permission.toggleOnChildAccounts,
                          !permission.enableOnChildAccounts,
                      )}
                  />
                }
                label={t("enOnChildAccs")}
            />
          </Row>
          {permission.enableOnChildAccounts ? (
              <Fragment>
                <Row padding>
                  <RadioGroup>
                    <FormControlLabel
                        control={
                          <Radio
                              checked={permission.enableTyp === Permission.enableTyps.all}
                              color="secondary" padding
                              onChange={this.handleChange(Permission.setEnableTyp, Permission.enableTyps.all)}
                          />
                        }
                        label={t("all")}
                    />
                    <FormControlLabel
                        control={
                          <Radio
                              checked={permission.enableTyp === Permission.enableTyps.excludingOwn}
                              color="secondary" padding
                              onChange={this.handleChange(Permission.setEnableTyp, Permission.enableTyps.excludingOwn)}
                          />
                        }
                        label={t("allExcludingOwn")}
                    />
                    <FormControlLabel
                        control={
                          <Radio
                              checked={permission.enableTyp === Permission.enableTyps.selectedAccounts}
                              color="secondary" padding
                              onChange={this.handleChange(Permission.setEnableTyp, Permission.enableTyps.selectedAccounts)}
                          />
                        }
                        label={t("selectAccounts")}
                    />
                  </RadioGroup>
                </Row>
                {permission.enableTyp === Permission.enableTyps.selectedAccounts ? (
                    <Column padding alignChildrenStretch>
                      <AccountsSelection
                          accountsSelections={permission.accounts}
                          accounts={this.state.accounts}
                          loadAccounts={loadAccounts}
                          renderRow={this.renderAccountRow}
                          onRemove={this.handleChange(Permission.setAccounts)}
                          onChange={this.accountSelectionHandler}
                      />
                    </Column>
                ) : null}
                {this.renderExcludedAccounts()}
              </Fragment>
          ) : null}
        </Fragment>
    );
  }

  isChildAccountType = (selectedType) => {
    return !!(hubbub.globals.types && hubbub.globals.types.childAccount === selectedType);
  };

  renderResources() {
    let { loadResources, loadAccounts, t } = this.props;
    let { permission, types} = this.state;

    return (permission.services.length === 1
        && permission.types.length === 1
        && !!!(hubbub.globals.types && hubbub.globals.types.account === permission.types[0])
        && !permission.enableOnChildAccounts
    ) ? (
        <Fragment>
          <SectionHeader padding>
            {t("resources")}
          </SectionHeader>
          { this.isChildAccountType(permission.types[0]) ?
              <Row padding>
              <AccountsSelection
                  accountsSelections={permission.childAccountResources ? permission.childAccountResources: []}
                  accounts={this.state.accounts}
                  loadAccounts={loadAccounts}
                  onChange={this.childAccountResourceSelectionHandler}
                  isForChildAccountResource={true}
              />
              </Row>:
            <Row padding>
              <EditResources
                    selectedResources={permission.resources}
                    loadResources = {loadResources}
                    selectedTypes={permission.types}
                    types={types}
                    onChange={this.handleChange(Permission.setResources)}
              />
            </Row>
          }
        </Fragment>
    ) : null;
  }

  renderActions() {
    let { resources, t } = this.props;
    let { permission, types} = this.state;
    return (
        permission.services.length === 1 && permission.types.length === 1 &&
        !(permission.enableOnChildAccounts && permission.enableTyp === 2)
    ) ? (
        <Fragment>
          <SectionHeader padding>
            {t("actions")}
          </SectionHeader>
          <Row padding>
            <EditActions
                selectedActions={permission.actions}
                excludedActions={permission.excludedActions}
                actions={types[permission.types[0]].actions}
                onChange={this.handleChange((permission, { selectedActions, excludedActions }) => ({
                  ...permission,
                  actions: selectedActions,
                  excludedActions: excludedActions,
                }))}
            />
          </Row>
        </Fragment>
    ) : null;
  }

  renderPolicies() {
    let { resources, policies, t } = this.props;
    let { permission } = this.state;
    return (
        <Fragment>
          <SectionHeader padding>
            {t("policies")}
          </SectionHeader>
          <Row padding>
            <EditPolicies
                selectedPolicies={permission.policies}
                policies={policies}
                onChange={this.handleChange(Permission.setPolicies)}
            />
          </Row>
        </Fragment>
    );
  }

  renderDecisionStrategies() {
    let { resources, t } = this.props;
    let { permission } = this.state;
    return (
        <Row padding>
          <Select
              value={permission.decisionStrategy}
              options={Object.values(Permission.decisionStrategies)}
              renderOption={(decisionStrategy) => t(decisionStrategy || "")}
              required
              name="decisionStrategy"
              label={t("decisionStrategy")}
              displayEmpty={false}
              onChange={this.handleChange(Permission.setDecisionStrategy)}
          />
        </Row>
    );
  }

  render() {
    let { onCancel, onDelete, enableOnChildAccountsPermission, policies, t } = this.props;
    let { permission, errors } = this.state;
    return (
        <Page.Content>
          <Page.Paper>
            <Column padding fill alignChildrenStretch>
              <Row padding>
                <TextField
                    value={permission.name}
                    required
                    fullWidth
                    name="name"
                    label={t("permissionName")}
                    error={this.isFieldInvalid("name")}
                    helperText={t(this.getFieldErrorMessage("name"))}
                    onChange={this.handleChangeEventTargetValue(Permission.setName)}
                />
              </Row>

              <Row padding>
                <TextField
                    value={permission.description}
                    multiline
                    fullWidth
                    name="description"
                    label={t("description")}
                    onChange={this.handleChangeEventTargetValue(Permission.setDescription)}
                />
              </Row>

              <SectionHeader padding>
                {t("permissionType")}
              </SectionHeader>

              {this.renderServices()}
              {this.renderExcludedServices()}
              {this.renderTypes()}
              {this.renderExcludedTypes()}
              {enableOnChildAccountsPermission? this.renderAccounts():null}
              {this.renderResources()}
              {this.renderActions()}
              {this.renderPolicies()}
              {this.renderDecisionStrategies()}

              <Row padding>
                {!permission.id ? null : (
                    <PrimaryTextLink onClick={onDelete}>
                      {t("delPermission")}
                    </PrimaryTextLink>
                )}
                <Stretch/>
                <SecondaryTextLink onClick={onCancel}>
                  {t('cancel')}
                </SecondaryTextLink>
                <PrimaryButton onClick={this.handleSubmit}>
                  {t('save')}
                </PrimaryButton>
              </Row>
            </Column>
          </Page.Paper>
        </Page.Content>
    );
  }
}

/*export default translate("security") (EditPermission);*/
export default translate("security") (
    withPromiseProps(
        (props) => {
            return {
                accounts: props.loadAccounts()
            };
        },
        EditPermission,
    )
);

