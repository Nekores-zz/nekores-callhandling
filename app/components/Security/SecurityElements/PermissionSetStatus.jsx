import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { translate } from "react-i18next";

import { PermissionSet } from "models";
import { styleSheet } from "jss/Security/SecurityElements/PermissionSetStatus";

class PermissionSetStatus extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,
    className: PropTypes.string,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  statusMark = {
    [PermissionSet.statuses.active]: "●",
    [PermissionSet.statuses.available]: "✓",
    [PermissionSet.statuses.disabled]: "●"
  };

  render() {
    const { status, classes, className, t } = this.props;

    return (
      <span className={clsx(classes.status, classes[status], className)}>
        {this.statusMark[status] + " " + t(status)}
      </span>
    );
  }
}

export default withStyles(styleSheet, { name: "PermissionSetStatus" })(
  translate("security")(PermissionSetStatus)
);
