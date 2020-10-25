import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Icon, Paper, withStyles } from "@material-ui/core";
import {
  ConfirmButtons,
  GroupSelector,
  Select,
  Text,
  TextField,
  Tooltip,
  TooltipContent
} from "components";
import { UserRow } from "components/Security";
import { Policy } from "models";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/EditUserPolicy";

class EditUserPolicy extends Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    t: PropTypes.func.isRequired
  };

  state = {
    policy: this.props.policy,
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

  isUserSelected = user => {
    return this.state.policy.ids.indexOf(user.id) !== -1;
  };

  toggleItem = child => {
    const users = this.isUserSelected(child)
      ? this.state.policy.ids.filter(userId => userId !== child.id)
      : [...this.state.policy.ids, child.id];
    const policy = { ...this.state.policy };
    policy.ids = users;
    this.setState({ policy });
  };

  handleToggleUser = item => event => {
    event.stopPropagation();
    this.toggleItem(item);
  };

  handleClearAll = event => {
    event.stopPropagation();
    const policy = { ...this.state.policy };
    policy.ids = [];
    this.setState({ policy });
  };

  render() {
    const { onSubmit, onCancel, onDelete, users, classes, t } = this.props;
    const { policy } = this.state;

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
            {t("users")}
          </Text>

          <GroupSelector
            availableItemsHeading={t("availableUsers")}
            availableItems={users}
            searchBy={["firstName", "lastName", "email"]}
            seclectedItemsHeading={t("selectedUsers")}
            isItemSelected={this.isUserSelected}
            handleToggleItem={this.handleToggleUser}
            handleClearAll={this.handleClearAll}
            RowElement={UserRow}
          />

          <Grid container direction="row" alignItems="center" className={classes.marginBottomSmall}>
            <Grid item>
              <Select
                value={this.state.policy.decision}
                onChange={this.handleChange(Policy.setDecision)}
                options={Object.values(Policy.decisions)}
                renderValue={decision => (decision ? t(decision) : "")}
                label={t("decision")}
                className={clsx(classes.select, classes.marginTopMedium)}
              />
            </Grid>
            <Grid item className={clsx(classes.marginTopLarge, classes.marginLeft)}>
              <Text>
                <Tooltip
                  content={<TooltipContent title={t("decision")} text={t("decisionTooltip")} />}
                >
                  <Icon color="inherit">info</Icon>
                </Tooltip>
              </Text>
            </Grid>
          </Grid>

          <ConfirmButtons
            className={classes.buttons}
            blocked={!this.isFormValid()}
            onConfirm={() => onSubmit(this.state.policy)}
            onCancel={onCancel}
            altActionLabel={!!this.state.policy.id ? t("delPolicy") : undefined}
            onAltAction={
              !!this.state.policy.id ? onDelete : undefined
            }
            onFailure={errors => this.setState({ errors })}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "EditUserPolicy" })(
  translate("security")(EditUserPolicy)
);
