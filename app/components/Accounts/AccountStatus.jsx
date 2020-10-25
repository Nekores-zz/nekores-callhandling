import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Icon, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/AccountStatus";

class AccountStatus extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  statusMark = {
    active: "fiber_manual_record", // "●",
    suspended: "block", // "⊘",
    incomplete: "assignment_late",
    archived: "archived" // "×"
  };

  statusText = {
    active: this.props.t("accountActive"),
    suspended: this.props.t("accountSuspended"),
    incomplete: this.props.t("accountIncomplete"),
    archived: this.props.t("accountArchived")
  };

  render() {
    const { status, classes } = this.props;

    return (
      <span className={clsx(classes.status, classes[status])}>
        <Icon className={classes.icon}>{this.statusMark[status]}</Icon>
        {this.statusText[status]}
      </span>
    );
  }
}

export default withStyles(styleSheet, { name: "AccountStatus" })(
  translate("accounts")(AccountStatus)
);
