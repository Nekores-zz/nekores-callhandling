import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditUserPolicy, EditRolePolicy, EditAggregatedPolicy } from "components/Security";

export default class EditPolicy extends Component {
  static propTypes = {
    policy: PropTypes.object.isRequired
  };

  render() {
    let EditPolicyComponent = {
      user: EditUserPolicy,
      role: EditRolePolicy,
      aggregated: EditAggregatedPolicy
    } [this.props.policy.type];

    return <EditPolicyComponent {...this.props} />;
  }
}
