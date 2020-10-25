/**
 * by antonioprates, jun-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Chip, Grid, Typography, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";

import { ServiceVersionStatus } from "components/Services/ServiceElements";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class VersionRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { rowData: version, classes, t } = this.props;

    return (
      <Fragment>
        <div className={classes.contentWrapper}>
          <Typography variant="caption">{t("tags")}</Typography>
          <Grid
            container
            direction="row"
            spacing={8}
            className={clsx(classes.marginTopLess, classes.marginBottomLess)}
          >
            {version.tags.map((tag, index) => (
              <Grid item key={index}>
                <Chip label={tag} className={classes.pill} />
              </Grid>
            ))}
          </Grid>
          <br />
          <br />

          <Typography variant="caption">{t("lastOpened")}</Typography>
          <Typography className={classes.contentText}>
            {version.updatedBy.firstName +
            " " +
            version.updatedBy.lastName +
            " " +
            t("on") +
            " " +
            t("simpleDate", {
              date: ScalaDate.tsToDate(version.updatedBy.updatedAt)
            })}
          </Typography>
          <br />
          <br />

          <Typography variant="caption">{t("status")}</Typography>
          <ServiceVersionStatus status={version.status} />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "VersionRowDisplay" })(
  translate("services")(VersionRowDisplay)
);
