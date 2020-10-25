import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Grid, Icon, Link, Divider, withStyles, withWidth } from "@material-ui/core";
import { Text, PrimaryTextButton } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/CallCare/CallCareUpload";

import { CallcareErrors } from "models/Callcare";

class UploadProcessing extends Component {
  static propTypes = {
    rowsProcessed: PropTypes.number,
    errors: PropTypes.array,

    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  isMobile = () => {
    return this.props.width === "xs";
  };

  showErrors = () => {
    console.log("Show Error Modal");
  };

  render() {
    const { rowsProcessed, errors, classes, className, t } = this.props;

    return (
      <div className={classes.outer + " " + className}>
        <div className={classes.container}>
          {this.isMobile() && (
            <div>
              <Divider />
              <br />
              <br />
            </div>
          )}
          <Text className={classes.title}>{t("processingState")}</Text>
          <br />
          {this.isMobile() && (
            <div>
              <br />
            </div>
          )}
          <Text className={classes.success}>
            <Icon className={classes.icon}>check_circle</Icon>
            {t("rowsProcessed", { rowCount: rowsProcessed })}
          </Text>
          {this.isMobile() && (
            <div>
              <br />
            </div>
          )}
          <Text className={classes.fail}>
            <Icon className={classes.icon}>error</Icon>
            <Link onClick={this.props.onShowErrorDialog} className={classes.showErrors}>
              {t("errorsDetected", { errorCount: CallcareErrors.getErrorsCount(errors) })}
            </Link>
          </Text>
          {this.isMobile() && (
            <div>
              <br />
              <br />
            </div>
          )}
          <PrimaryTextButton onClick={this.downloadErrors}>{t("downloadErrors")}</PrimaryTextButton>
          {this.isMobile() && (
            <div>
              <br />
              <Divider />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet, { name: "UploadProcessing" })(translate("callcare")(UploadProcessing))
);
