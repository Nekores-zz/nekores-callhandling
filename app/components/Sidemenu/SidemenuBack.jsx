import React, { Component } from "react";
import { withStyles, Icon, Button, Grid } from "@material-ui/core";
import { styleSheet } from "jss/components/Sidemenu/SidemenuBack";

class SidemenuBack extends Component {
  render() {
    const { classes, onClick } = this.props;

    return (
      <Grid item>
        <Button
          onClick={onClick}
          color="inherit"
          className={classes.backButton}
        >
          <Icon>keyboard_backspace</Icon>
          {this.props.back}
        </Button>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "SidemenuBack" })(SidemenuBack);
