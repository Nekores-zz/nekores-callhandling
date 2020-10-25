/**
 * by A. Prates, may-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Chip, Grid, Typography, withStyles } from "@material-ui/core";
import { AudioStatus } from "components/Audio";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class AudioSetRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { rowData, classes, t } = this.props;

    console.log(rowData);
    
    return (
      <div className={classes.contentWrapper}>

        <Typography variant="caption">{t(rowData.fieldDescription)}</Typography>
        <Typography className={classes.contentText}>{rowData.description}</Typography>
        <br />
        <br />

        <Typography variant="caption">{t(rowData.fieldTags)}</Typography>
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
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AudioSetRowDisplay" })(
  translate("audio")(AudioSetRowDisplay)
);
