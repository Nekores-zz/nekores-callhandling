import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/StretchingGridItem";

class StretchingGridItem extends Component {
  render() {
    const { classes, className, ...props } = this.props;
    return <Grid item className={`${className} ${classes.flex}`} {...props} />;
  }
}

export default withStyles(styleSheet, { name: "StretchingGridItem" })(
  StretchingGridItem
);
