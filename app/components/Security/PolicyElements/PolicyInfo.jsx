import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Text } from "components";
import { translate } from "react-i18next";

class PolicyInfo extends PureComponent {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  style = "style='font-weight: bold'";

  renderHTML = __html => <span dangerouslySetInnerHTML={{__html}} />;

  PolicyDescription = f => ({ policy, t }) => this.renderHTML(t("policyDescription", {
    decision: t(policy.decision),
    allOrAny: f(policy) ? t("all") : t("any"),
    count:  policy.ids.length,
    type: t(policy.type, { count: policy.ids.length }),
    style: this.style
  }));

  UserPolicy = this.PolicyDescription(policy => policy.isRequiredAll);
  RolePolicy = this.PolicyDescription(policy => policy.applyStrategy);

  AggregatedPolicy = ({ policy, t }) => this.renderHTML(t("aggregatedPolicyDescription", {
    type: t("aggregate_plural"),
    count: policy.ids.length,
    policy: t('policy', { count: policy.ids.length }),
    strategy: t(policy.decisionStrategy + "ly"),
    style: this.style
  }));

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
