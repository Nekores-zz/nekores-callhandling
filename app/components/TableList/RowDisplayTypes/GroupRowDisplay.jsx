/**
 * by A. Prates, jan-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class GroupRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { rowData, classes, t } = this.props;

    return (
      <div className={classes.contentWrapper}>
        <Typography variant="caption">{t("description")}</Typography>
        <Typography className={classes.contentText}>
          {rowData.description}
        </Typography>
        <br />
        <br />

        <Typography variant="caption">{t("members")}</Typography>
        <Typography className={classes.contentText}>
          {rowData.membersCount}
        </Typography>
        <br />
        <br />

        <Typography variant="caption">{t("roles")}</Typography>
        <Typography className={classes.contentText}>
          {rowData.rolesCount}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "GroupRowDisplay" })(
  translate("groups")(GroupRowDisplay)
);
