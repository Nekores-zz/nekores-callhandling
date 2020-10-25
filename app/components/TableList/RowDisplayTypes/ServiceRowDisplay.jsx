/**
 * by A. Prates, aug-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class ServiceRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { rowData, classes, t } = this.props;
    const service = rowData;

    return (
      <div className={classes.contentWrapper}>
        <Typography className={classes.contentText}>{service.description}</Typography>
        <br />
        <br />

        <Typography variant="caption">{t("lastOpened")}</Typography>
        <Typography className={classes.contentText}>
          {service.updatedBy.updatedAt && service.updatedBy.firstName +
            " " +
            service.updatedBy.lastName +
            " " +
            t("on") +
            " " +
            t("simpleDate", {
              date: ScalaDate.tsToDate(service.updatedBy.updatedAt)
            })}
        </Typography>
        <br />
        <br />

        <Typography variant="caption">{t("status")}</Typography>
        <Typography className={classes.contentText}>
          {service.status} {t("from")} {service.statusFrom}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceRowDisplay" })(
  translate("services")(ServiceRowDisplay)
);
