import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Text } from "components";
import { Permission } from "models";
import { translate } from "react-i18next";

class PermissionsInfo extends PureComponent {
  static propTypes = {
    permission: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  style = "style='font-weight: bold'";
  renderHTML = __html => <span dangerouslySetInnerHTML={{__html}} />;

  wrongDataType = (expectedType, data) => {
    console.log("Wrong data type: " + expectedType + " expected for " + data);
    return null;
  };

  Resources = () => {
    const { t } = this.props;
    const { resources, childAccountResources, types } = this.props.permission;
    const isEnabled = !!resources || !!childAccountResources;

    return types && types.constructor === Array ? (
      <Text variant="bold">
        {isEnabled ? (resources ? resources.length: childAccountResources.length) : t("allLC")}{" "}
        {resources? t('resource', {count: resources.length}): (childAccountResources ? t('resource', {count: childAccountResources.length}): t('resource_plural'))}
      </Text>
    ) : (
      this.wrongDataType("array", types)
    );
  };

  Types = () => {
    const { t } = this.props;
    const { types, typeName } = this.props.permission;
    let selectedTypeName = typeName ? typeName : types[0];

    return types && types.length?  this.renderHTML(t("namedType", {count: types.length, name: selectedTypeName, style: this.style})):
        <Text variant="bold">{t("allLC") + " " + t("type_plural")}</Text>;
  };

  Actions = () => {
    const { actions } = this.props.permission;
    const { t } = this.props;
    const isEnabled = !!actions;

    return (
      <Fragment>
        {" "}
        <Text variant="bold">
          {isEnabled? actions.length : t("allLC")}{" "}
          {isEnabled? t("action", {count: actions.length}): t("action_plural")}
        </Text>
      </Fragment>
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
            <Text variant="bold">{this.props.t("ownAccount")}</Text> {this.props.t("and")}{" "}
            <Text variant="bold">{this.props.t("allChildAccounts")}</Text>
          </Fragment>
        )}
        {excludedAccounts ? (
          <Fragment>
            ,{" "}
            <Text variant="bold">
              {this.props.t("excludingCount", {
                count: excludedAccounts.length
              })}
            </Text>
          </Fragment>
        ) : null}
      </Fragment>
    );
  };

  Policies = () => {
    const { policies } = this.props.permission;
    return (
        <Text variant="bold">
          {this.props.t("countPolicies", { count: policies.length })}
        </Text>
    );
  };

  Service = () => {
    const { services } = this.props.permission;
    const { t } = this.props;

    return services && services.constructor === Array ? (
      <Fragment>
        <Text variant="bold">
          {services.map((service, index, services) => {
            return (service +
                (services.length - 1 === index ? "" : services.length > 2? ", ": " ") +
                (services.length - 2 === index? "and " : ""));
          })}
        </Text>
        {" "}{services? t("serviceLC", {count: services.length}): t("serviceLC_plural")}
      </Fragment>
    ) : (
      this.wrongDataType("array", services)
    );
  };

  DecisionStrategy = () => {
    return <Text variant="bold">{this.props.permission.decisionStrategy}</Text>;
  };

  render() {
    const { t } = this.props;
    const { resources, types } = this.props.permission;

    return (
      <Fragment>
        {t("evaluate")} <this.DecisionStrategy /> <this.Policies /> {t("on")} <this.Resources />{" "}
        {t("of")} <this.Types /> {t("in")} <this.Service />{" "}
        {t("for")} <this.Actions /> {t("in")} <this.Accounts />
      </Fragment>
    );
  }
}

export default translate("security")(PermissionsInfo);
