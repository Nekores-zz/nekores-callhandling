import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Paper, withStyles } from "@material-ui/core";
import { ConfirmButtons, GroupSelector, Select, Text, TextField } from "components";
import { RoleRow } from "components/Security";
import {PermissionSet, Policy, Role} from "models";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/EditRolePolicy";

class EditRolePolicy extends Component {
  static propTypes = {
    policy:PropTypes.object.isRequired,
    roles: PropTypes.objectOf(Role.propType).isRequired,
    permissionSets: PropTypes.objectOf(PermissionSet.propType).isRequired,
    getEffectiveRoles: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    t: PropTypes.func.isRequired
  };

  state = {
    policy: this.props.policy,
    effectiveRoles: [],
    anyOrAll: this.props.policy.applyStrategy === "Unanimous",
    errors: undefined
  };

  componentDidMount() {
    let {policy} = this.props;
          policy.ids.length === 0 ? this.setState({effectiveRoles: []}) :
                      this.props.getEffectiveRoles(policy.ids).then(response => {
                          this.setState({effectiveRoles: this.filterEffectiveRoles(policy.ids,response)})})
       }

  static defaultProps = {
    getEffectiveRoles: (roles) => roles,
  };

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  handleChange = (setter, ...args0) => (...args1) => {
    const policy = setter(this.state.policy, ...args0, ...args1);
    this.setState({ policy });
  };

  handleChangeEvent = (setter, ...args) => event => {
    event.stopPropagation();
    this.handleChange(setter, ...args)(event.target.value);
  };

  isFormValid = () => {
    return true;
  };

  isRoleSelected = role => {
    return this.state.policy.ids.indexOf(role.id) !== -1;
  };

  toggleRole = role => {
    const updatedRoles = this.isRoleSelected(role)
      ? this.state.policy.ids.filter(roleId => roleId !== role.id)
      : [...this.state.policy.ids, role.id];

    updatedRoles.length === 0 ? this.setState({effectiveRoles: [], policy:  { ...this.state.policy, ids: updatedRoles }}) :
                  this.props.getEffectiveRoles(updatedRoles).then(response => {
                      this.setState({effectiveRoles: this.filterEffectiveRoles(updatedRoles,response), policy:  { ...this.state.policy, ids: updatedRoles }})})

  };

  handleToggleRole = role => event => {
    event.stopPropagation();
    this.toggleRole(role);
  };

  handleClearAll = event => {
    // event.stopPropagation();
    this.setState({
      policy: { ...this.state.policy, ids: [] },
      effectiveRoles: []
    });
  };

  trimName = name => {
    const nameWords = name.split(" ");
    return nameWords[1] + " " + nameWords[2];
  };

  getRoleRoles = role => role.children.map(id => this.props.roles[id]);

  filterEffectiveRoles = (selectedRoleIds, fetchedRoles) => {
      let selectedRoles = selectedRoleIds.map(r => this.props.roles[r])
      let effectiveRoles = [...selectedRoles, ...fetchedRoles]
         //remove duplicate
     return [...new Map(effectiveRoles.map(r => [r.id, r])).values()]
      };

  handleToggleAnyOrAll = event => {
    this.setState({
      anyOrAll: !this.state.anyOrAll,
      policy: {
        ...this.state.policy,
        applyStrategy: this.state.anyOrAll ? "AtLeastOne" : "Unanimous"
      }
    });
  };

  render() {
    const {
      onSubmit,
      onCancel,
      onDelete,
      roles,
      permissionSets,
      classes,
      t
    } = this.props;
    const { policy, effectiveRoles, anyOrAll } = this.state;

    return (
      <div className={classes.pageContent}>
        <Paper className={classes.paper} elevation={4}>
          <TextField
            onChange={this.handleChangeEvent(Policy.setName)}
            value={policy.name}
            required
            fullWidth
            name="name"
            label={t("policyName")}
            className={classes.marginBottomMedium}
            error={this.isFieldInvalid("name")}
            helperText={t(this.getFieldErrorMessage("name"))}
          />

          <TextField
            onChange={this.handleChangeEvent(Policy.setDescription)}
            value={policy.description}
            multiline
            fullWidth
            name="description"
            label={t("description")}
            className={classes.marginBottomLarge}
          />

          <Text
            variant="sectionHeaders"
            block
            className={clsx(classes.marginBottomSmall, classes.marginTopSmall)}
          >
            {t("roles")}
          </Text>

          <GroupSelector
            availableItemsHeading={t("availableRoles")}
            availableItems={Object.values(roles)}
            availableItemsSets={Object.values(permissionSets)}
            searchBy={["name", "description", "permissionSetName"]}
            seclectedItemsHeading={t("selectedRoles")}
            isItemSelected={this.isRoleSelected}
            effectiveItemsHeading={t("effectiveRoles")}
            effectiveItems={effectiveRoles}
            handleToggleItem={this.handleToggleRole}
            itemItemsHeading={t("roleRoles")}
            getItemItems={this.getRoleRoles}
            handleClearAll={this.handleClearAll}
            isRequiredAll={anyOrAll}
            handleToggleAnyOrAll={this.handleToggleAnyOrAll}
            RowElement={RoleRow}
          />

          <Select
            value={this.state.policy.decision}
            onChange={this.handleChange(Policy.setDecision)}
            options={Object.values(Policy.decisions)}
            renderOption={decisionOption => (decisionOption ? t(decisionOption) : "")}
            label={t("decision")}
            className={clsx(classes.select, classes.marginTopMedium)}
          />

          <ConfirmButtons
            className={classes.buttons}
            blocked={!this.isFormValid()}
            onConfirm={() => onSubmit(this.state.policy)}
            onCancel={onCancel}
            altActionLabel={!!this.state.policy.id ? t("delPolicy") : undefined}
            onAltAction={
              !!this.state.policy.id ? onDelete(this.state.policy.id) : undefined
            }
            onFailure={errors => this.setState({ errors })}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "EditRolePolicy" })(
  translate("security")(EditRolePolicy)
);
