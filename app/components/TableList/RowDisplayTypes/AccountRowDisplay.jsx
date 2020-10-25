/**
 * by A. Prates, oct-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { AccountStatus } from "components/Accounts";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class AccountRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { rowData, classes, t } = this.props;

    return (
      <div className={classes.contentWrapper}>
        <Typography variant="caption">{t("accountDomain")}</Typography>
        <Typography className={classes.contentText}>{rowData.domainCode}</Typography>
        <br />
        <br />

        <Typography variant="caption">{t("lastUpdated")}</Typography>
        <Typography className={classes.contentText}>
          {rowData.lastUpdatedUser + ", " + rowData.lastUpdatedDate}
        </Typography>
        <br />
        <br />

        <Typography variant="caption">{t("status")}</Typography>
        <AccountStatus status={rowData.status.toLowerCase()} />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AccountRowDisplay" })(
  translate("accounts")(AccountRowDisplay)
);
