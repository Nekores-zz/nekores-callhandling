// PolicyInfo deprecated version of 9-dec-2018, if not used can be deleted

import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Text, TooltipTarget } from "components";
import { translate } from "react-i18next";

class PolicyInfo extends PureComponent {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  UserPolicy = ({ policy }) => {
    let { t } = this.props;
    return (
      <Fragment>
        <Text variant="bold">{t(policy.decision)}</Text> {t("when")}
        <Text variant="bold">
          {" "}
          {t(policy.isRequiredAll ? "all" : "any")}
        </Text>{" "}
        {t("ofThe")}
        <TooltipTarget onClick={this.props.onShowDetails}>
          {policy.ids.length} {t("users")}
        </TooltipTarget>{" "}
        {t("match")}
      </Fragment>
    );
  };

  RolePolicy = ({ policy }) => {
    let { t } = this.props;
    return (
      <Fragment>
        <Text variant="bold">{t(policy.decision)}</Text> {t("when")}
        <Text variant="bold">
          {" "}
          {t(policy.isRequiredAll ? "all" : "any")}
        </Text>{" "}
        {t("ofThe")}
        <TooltipTarget onClick={this.props.onShowDetails}>
          {policy.ids.length} {t("roles")}
        </TooltipTarget>{" "}
        {t("match")}
      </Fragment>
    );
  };

  AggregatedPolicy = ({ policy }) => {
    let { t } = this.props;
    return (
      <Fragment>
        <Text variant="bold">{t("aggregate")}</Text>
        <TooltipTarget onClick={this.props.onShowDetails}>
          {policy.ids.length} {t("policies")}
        </TooltipTarget>
        <Text variant="bold">{t(policy.decisionStrategy)}</Text>
      </Fragment>
    );
  };

  types = {
    user: this.UserPolicy,
    role: this.RolePolicy,
    aggregated: this.AggregatedPolicy
  };

  render() {
    const { policy } = this.props;
    const Info = this.types[policy.type];
    return <Info {...this.props} />;
  }
}

export default translate("security")(PolicyInfo);
