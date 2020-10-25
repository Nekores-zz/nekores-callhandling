import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Columns/Columns";

class TwoColumnPage extends Component {
  render() {
    const { leftColumnComponent, rightColumnComponent, classes } = this.props;

    return (
      <Grid item xs={12}>
        <Grid container spacing={0} className={classes.twoColumnContainer}>
          <Grid className={classes.left} item xs={12} sm={12} md={12} lg={6}>
            {leftColumnComponent}
          </Grid>
          <Grid className={classes.right} item xs={12} sm={12} md={12} lg={6}>
            {rightColumnComponent}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "TwoColumnPage" })(TwoColumnPage);
