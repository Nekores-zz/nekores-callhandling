/**
 * by Sajid U. OCT-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Chip, Grid, Typography, withStyles, Icon } from "@material-ui/core";
import { IconButton } from "components/Elements";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class ReportRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  // Thumbnail Handle > /Reports/Report/*
  handleReportThumbnail = optionFn => () => {
    event.stopPropagation();
    optionFn(this.props.rowData);
  };

  render() {
    const { rowData, classes, t, thumbnailReportRun } = this.props;
    return (
      <div className={classes.contentWrapper}>
        <Typography variant="caption">{t(rowData.fieldDescription)}</Typography>
        <Typography className={classes.contentText}>{rowData.description}</Typography>
        <br />
        <br />

        <Typography variant="caption">{t("tags")}</Typography>
        <Grid
          container
          direction="row"
          spacing={8}
          className={clsx(classes.marginTopLess, classes.marginBottomLess)}
        >
          {rowData.tags.map((tag, index) => (
            <Grid item key={index}>
              <Chip label={tag} className={classes.pill} />
            </Grid>
          ))}
        </Grid>
        <br />
        <Typography variant="caption">{t("sampleReport")}</Typography>
        <Icon
          onClick={this.handleReportThumbnail(thumbnailReportRun)}
          className={classes.thumbnailIcon}
        >
          insert_drive_file
        </Icon>
      </div> 
    );
  }
}

export default withStyles(styleSheet, { name: "ReportRowDisplay" })(
  translate("report")(ReportRowDisplay)
);
