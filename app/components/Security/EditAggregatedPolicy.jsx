import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Icon, Paper, withStyles } from "@material-ui/core";
import {
  ConfirmButtons,
  GroupSelector,
  Select,
  StretchingGridItem,
  Text,
  TextField,
  Tooltip,
  TooltipContent
} from "components";
import { PolicyRow } from "./RowElements";
import { Policy } from "models";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/EditAggregatedPolicy";

class EditAggregatedPolicy extends Component {
  static propTypes = {
    policies: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    t: PropTypes.func.isRequired
  };

  state = {
    policy: this.props.policy,
    anyOrAll: this.props.policy.applyStrategy === "Unanimous",
    errors: undefined
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

  isPolicySelected = policy => {
    return this.state.policy.ids.indexOf(policy.id) !== -1;
  };

  toggleItem = child => {
    const policies = this.isPolicySelected(child)
      ? this.state.policy.ids.filter(policyId => policyId !== child.id)
      : [...this.state.policy.ids, child.id];
    const policy = { ...this.state.policy, ids: policies };
    this.setState({ policy });
  };

  handleTogglePolicy = policy => event => {
    //event.stopPropagation();
    this.toggleItem(policy);
  };

  handleClearAll = event => {
    const policy = { ...this.state.policy, ids: [] };
    this.setState({ policy });
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
    const { onSubmit, onCancel, onDelete, classes, t } = this.props;
    const { policy, anyOrAll } = this.state;

    const availablePolicies = Object.values(this.props.policies);

    // TEMPORARY FIX: convert name to expected format
    for (let i in availablePolicies) {
      availablePolicies[i].getName = availablePolicies[i].name;
    }

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
            className={classes.marginBottomMedium}
          />

          <Text
            variant="sectionHeaders"
            block
            className={clsx(classes.marginBottomSmall, classes.marginTopSmall)}
          >
            Policy
          </Text>

          <GroupSelector
            availableItemsHeading={t("availablePolicies")}
            availableItems={availablePolicies}
            searchBy={["name", "description"]}
            seclectedItemsHeading={t("selectedPolicies")}
            isItemSelected={this.isPolicySelected}
            handleToggleItem={this.handleTogglePolicy}
            handleClearAll={this.handleClearAll}
            isRequiredAll={anyOrAll}
            handleToggleAnyOrAll={this.handleToggleAnyOrAll}
            RowElement={PolicyRow}
          />

          <Grid container justify="flex-start" alignItems="flex-end" spacing={16}>
            <Grid item>
              <Select
                value={this.state.policy.decision}
                onChange={this.handleChange(Policy.setDecision)}
                options={Object.values(Policy.decisions)}
                renderOption={decisionOptions => (decisionOptions ? t(decisionOptions) : "")}
                label={t("decision")}
                className={clsx(classes.marginTopMedium, classes.select)}
              />
            </Grid>
            <Grid item>
              <Tooltip content={<TooltipContent title={"Tooltip"} text={"Tooltip Content"} />}>
                <Icon className={classes.icon}>info</Icon>
              </Tooltip>
            </Grid>

            <StretchingGridItem />

            <Grid item>
              <Select
                value={this.state.policy.decisionStrategy}
                onChange={this.handleChange(Policy.setDecisionStrategy)}
                options={Object.values(Policy.decisionStrategies)}
                renderOption={decisionStrategy => (decisionStrategy ? t(decisionStrategy) : "")}
                label={t("decisionStrategy")}
                className={clsx(classes.marginTopMedium, classes.select)}
              />
            </Grid>
            <Grid item>
              <Tooltip content={<TooltipContent title={"Tooltip"} text={"Tooltip Content"} />}>
                <Icon className={classes.icon}>info</Icon>
              </Tooltip>
            </Grid>
            <StretchingGridItem />
          </Grid>

          <ConfirmButtons
            className={classes.buttons}
            blocked={!this.isFormValid()}
            onConfirm={() => onSubmit(this.state.policy)}
            onCancel={onCancel}
            altActionLabel={!!this.state.policy.id ? t("delPolicy") : undefined}
            onAltAction={onDelete}
            onFailure={errors => this.setState({ errors })}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "EditAggregatedPolicy" })(
  translate("security")(EditAggregatedPolicy)
);
