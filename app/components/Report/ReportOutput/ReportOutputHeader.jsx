/**
 * by Sajid U. / OCT-2019
 */
 
import React, { Component } from "react";
import { Grid, Chip, Icon, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { Text } from "components/LayoutElements";
import { IconButton } from "components/Elements";
import { styleSheet } from "jss/Report/ReportOutput/ReportOutputHeader";

class ReportOutputHeader extends Component {
  render() {
    const { data, classes, t } = this.props;
    return (
      <div className={classes.headSection}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Text variant="modalHeader" className={classes.sectionTitle}>
              {t(data.name)}
            </Text>
            {data.tags.map((tag, index) => (
              <Chip key={index} label={tag} className={classes.pill} />
            ))}
          </Grid>
          <Grid item>
            <IconButton>
              <Icon className={classes.headerIcon}>cloud_download</Icon>
            </IconButton>
            <IconButton>
              <Icon className={classes.headerIcon}>print</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ReportOutputHeader" })(
  translate("report")(ReportOutputHeader)
);
