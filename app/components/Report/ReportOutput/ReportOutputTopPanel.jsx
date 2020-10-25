import React, { Component } from "react";
import { Paper, Typography, Grid, withStyles, Chip, Icon } from "@material-ui/core";
import { Text } from "components/LayoutElements";
import { translate } from "react-i18next";

import { styleSheet } from "jss/Report/ReportOutput/ReportOutputTopPanel";

class ReportOutputTopPanel extends Component {
  render() {
    const { data, classes, t } = this.props;
    return (
      <div className={classes.reportSummary}>
        <Grid container>
          <Grid item md={4}>
            <div>
              <Text variant="caption" block>
                {t("service")}
              </Text>
              <Text variant="primaryBody" block>
                {data.service}
              </Text>
            </div>
          </Grid>
          <Grid item md={4}>
            <div>
              <Text variant="caption" block>
                {t("days")}
              </Text>
              <Text variant="primaryBody" block>
                {data.days}
              </Text>
            </div>
          </Grid>
          <Grid item md={4}>
            <div>
              <Text variant="caption" block>
                {t("outOfHours")}
              </Text>
              <Text variant="primaryBody" block>
                {data.outOfHours}
              </Text>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container justify="space-between" alignItems="center">
          <Grid item md={4}>
            <div>
              <Text variant="caption" block>
                {t("number")}
              </Text>
              <Text variant="primaryBody" block>
                {data.number}
              </Text>
            </div>
          </Grid>
          <Grid item md={4}>
            <div>
              <Text variant="caption" block>
                {t("from")}
              </Text>
              <Text variant="primaryBody" block>
                {data.from}
              </Text>
            </div>
          </Grid>
          <Grid item md={4}>
            <div>
              <Text variant="caption" block>
                {t("sortBy")}
              </Text>
              <Text variant="primaryBody" block>
                {data.sortBy}
              </Text>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styleSheet, { name: "ReportOutputTopPanel" })(
  translate("report")(ReportOutputTopPanel)
);
