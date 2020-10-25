// PermissionsInfo deprecated version of 9-dec-2018, if not used can be deleted

import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Tooltip, TooltipContent, TooltipTarget } from "components";
import { Permission } from "models";
import { styleSheet } from "jss/Security/PermissionsInfo";
import { translate } from "react-i18next";

class PermissionsInfo extends PureComponent {
  static propTypes = {
    permission: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  wrongDataType = (expectedType, data) => {
    console.log("Wrong data type: " + expectedType + " expected for " + data);
    return null;
  };

  Resources = () => {
    const { resources, types } = this.props.permission;
    const isEnabled = !!resources;
    
    return types && types.constructor === Array ? (
      <this.Bold>
        {isEnabled ? resources.length : this.props.t("all")}{" "}
        {types.map((type, index, types) => {
          return (
            this.props.t("typeNameP", { type: type.name }) +
            (types.length - 1 === index ? "" : ", ")
          );
        })}
      </this.Bold>
    ) : (
      this.wrongDataType("array", types)
    );
  };

  Actions = () => {
    const { actions } = this.props.permission;
    const isEnabled = !!actions;
    return (
      <Tooltip
        content={
          <TooltipContent
            text={actions.map(action => action.name).join(",\n")}
          />
        }
      >
        <TooltipTarget>
          {isEnabled ? actions.length : this.props.t("all")}{" "}
          {this.props.t("actionsLC")}
        </TooltipTarget>
      </Tooltip>
    );
  };

  Accounts = () => {
    const { accounts, excludedAccounts } = this.props.permission;
    return (
      <Fragment>
        {!this.props.permission.enableOnChildAccounts ? (
          <Fragment>
            <Text variant="bold">{this.props.t("ownAccount")}</Text>
          </Fragment>
        ) : this.props.permission.enableType === 0 ? (
          <Fragment>
            {this.props.t("ownAccount")} <Text variant="bold">{this.props.t("childAccounts")}</Text>
          </Fragment>
        ) : this.props.permission.enableType === 1 ? (
          <Fragment>
            <Text variant="bold">{this.props.t("ownAccount")}</Text> {this.props.t("and")}{" "}
            <Text variant="bold">
              {this.props.t("countChildAcc", {
                count: selectedAccounts.length
              })}
            </Text>
          </Fragment>
        ) : (
          <Fragment>
            <this.Bold>{this.props.t("ownAccount")}</this.Bold>{" "}
            {this.props.t("and")}{" "}
            <this.Bold>{this.props.t("allChildAccounts")}</this.Bold>
          </Fragment>
        )}
        {Permission.isEnabledExcludingAccounts(this.props.permission) ? (
          <Fragment>
            ,{" "}
            <this.Bold>
              {this.props.t("excludingCount", {
                count: excludedAccounts.length
              })}
            </this.Bold>
          </Fragment>
        ) : null}
      </Fragment>
    );
  };

  Policies = () => {
    const { policies } = this.props.permission;
    return (
      <Tooltip
        content={
          <TooltipContent
            text={policies.map(policy => policy.name).join(",\n")}
          />
        }
      >
        <TooltipTarget>
          {this.props.t("countPolicies", { count: policies.length })}
        </TooltipTarget>
      </Tooltip>
    );
  };

  Service = () => {
    const { services } = this.props.permission;

    return services && services.constructor === Array ? (
      <this.Bold>
        {services.map((service, index, services) => {
          return (
            this.props.t("nameService", { service: service.name }) +
            (services.length - 1 === index ? "" : ", ")
          );
        })}
      </this.Bold>
    ) : (
      this.wrongDataType("array", services)
    );
  };

  DecisionStrategy = () => {
    return <this.Bold>{this.props.permission.decisionStrategy}</this.Bold>;
  };

  Bold = ({ children }) => (
    <span className={this.props.classes.bold}> {children} </span>
  );

  render() {
    const { permission, classes, t } = this.props;
    return (
      <Fragment>
        {t("evaluate")} <this.DecisionStrategy /> <this.Policies /> {t("on")}{" "}
        <this.Resources /> {t("in")} <this.Service /> {t("for")}
        <this.Actions /> {t("on")} <this.Accounts />.
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "PermissionsInfo" })(
  translate("security")(PermissionsInfo)
);
