/**
 * Created by Andrzej on 03.02.2018.
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import { Button, Grid, withStyles } from "@material-ui/core";
import GoogleIcon from "Icons/Google";
import FacebookIcon from "Icons/Facebook";
import LinkedinIcon from "Icons/Linkedin";
import { styleSheet } from "jss/Login/LoginCommons/SocialNetworks";

class SocialNetworks extends Component {
  render = () => {
    const { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.buttonsContainer}>
        <Button variant="contained" className={`${classes.googleButton} ${classes.button}`}>
          <GoogleIcon className={classes.icon} />
        </Button>

        <Button variant="contained" className={`${classes.facebookButton} ${classes.button}`}>
          <FacebookIcon className={classes.icon} />
        </Button>

        <Button variant="contained" className={`${classes.linkedinkButton} ${classes.button}`}>
          <LinkedinIcon className={classes.icon} />
        </Button>
      </Grid>
    );
  };
}

export default withStyles(styleSheet, { name: "SocialNetworks" })(SocialNetworks);
