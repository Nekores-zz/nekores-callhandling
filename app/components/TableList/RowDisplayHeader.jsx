/**
 * by A. Prates, aug-2018
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";
import { ListAvatar } from "components";

class RowDisplayHeader extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    getHeader: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { rowData, classes } = this.props;
    const header = this.props.getHeader(rowData);

    return (
      <Grid container alignItems="center" spacing={24}>
        <Grid item>
          <ListAvatar color={header.color} name={header.name} />
        </Grid>
        <Grid item>
          <Typography className={classes.text}>{header.name}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "RowDisplayHeader" })(RowDisplayHeader);
