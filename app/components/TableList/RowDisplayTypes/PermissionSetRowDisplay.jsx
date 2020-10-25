/**
 * by A. Prates, dec-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { PermissionSetStatus } from "components/Security";
import { PermissionSet } from "models";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class PermissionSetRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  statusText = {
    [PermissionSet.statuses.active]: this.props.t("permissionSetActiveStatus"),
    [PermissionSet.statuses.available]: this.props.t("permissionSetDisabledStatus"),
    [PermissionSet.statuses.disabled]: this.props.t("permissionSetAvailableStatus")
  };

  render() {
    const { classes, t } = this.props;

    const permissionSet = this.props.rowData;

    return (
      <div className={classes.contentWrapper}>
        <Typography className={classes.contentText}>{permissionSet.description}</Typography>
        <br />
        <br />
        <Typography variant="caption">{t("status")}</Typography>
        <Typography className={classes.contentText}>
          <PermissionSetStatus status={permissionSet.status} />
          {" - " + this.statusText[permissionSet.status]}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "PermissionSetRowDisplay" })(
  translate("security")(PermissionSetRowDisplay)
);
