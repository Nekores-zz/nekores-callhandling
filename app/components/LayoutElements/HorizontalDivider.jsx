/**
 * Created by Andrzej on 04.02.2018.
 */
import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/HorizontalDivider";

export default withStyles(styleSheet, { name: "HorizontalDivider" })(props => (
  <Grid container spacing={0} className={props.className}>
    <div className={props.classes.container}>
      <Typography
        type="display1"
        component="span"
        className={props.classes.text}
      >
        {props.text}
      </Typography>
    </div>
  </Grid>
));
