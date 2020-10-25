/**
 * by A. Prates, aug-2018
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class NumbersRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { rowData, classes, t } = this.props;

    return (
      <Fragment>
        <div className={classes.contentWrapper}>
          <Typography variant="caption">{t(rowData.fieldNetwork)}</Typography>
          <Typography className={classes.contentText}>
            {rowData.network}
          </Typography>
          <br />
          <br />

          <Typography variant="caption">{t(rowData.fieldBandType)}</Typography>
          <Typography className={classes.contentText}>{rowData.bandType}</Typography>
          <br />
          <br />

          
          <Typography variant="caption">{t(rowData.fieldUpdatedBy)}</Typography>
          <Typography className={classes.contentText}>
            {(rowData.updatedBy.firstName) + ' ' + (rowData.updatedBy.lastName)}
          </Typography>
          <br />
          <br />

          <Typography variant="caption">{t(rowData.fieldAccount)}</Typography>
          <Typography className={classes.contentText}>
            {rowData.account}
          </Typography>
          <br />
          <br />

          <Typography variant="caption">{t(rowData.fieldService)}</Typography>
          <Typography className={classes.contentText}>
            {rowData.service}
          </Typography>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "NumbersRowDisplay" })(
  translate("numbers")(NumbersRowDisplay)
);
