/**
 * by antonioprates, jun-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Icon, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";

import { decapitalize } from "utils/strings";
import { styleSheet } from "jss/Services/ServiceElements/ServiceVersionStatus";

class ServiceVersionStatus extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { status, classes, t } = this.props;

    return status === "Invalid" ? (
      <Typography className={classes.versionStatusCellNV}>
        <Icon className={classes.versionStatusIconNV}>fiber_manual_record</Icon>
        {t(decapitalize(status))}
      </Typography>
    ) : status === "DefaultLive" || status === "LiveNow" ? (
      <Typography className={classes.versionStatusCellDL}>
        <Icon className={classes.versionStatusIconDL}>fiber_manual_record</Icon>
        {t(decapitalize(status))}
      </Typography>
    ) : status === "ActiveException" ? (
      <Typography className={classes.versionStatusCellAE}>
        <Icon className={classes.versionStatusIconAE}>flag</Icon>
        {t(decapitalize(status))}
      </Typography>
    ) : (
      <Typography className={classes.versionStatusCellG}>
        <Icon className={classes.versionStatusIconG}>fiber_manual_record</Icon>
        {t(decapitalize(status))}
      </Typography>
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceVersionStatus" })(
  translate("services")(ServiceVersionStatus)
);
