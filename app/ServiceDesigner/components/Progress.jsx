import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { LinearProgress, withStyles } from "@material-ui/core";

export const Progress = withStyles(
	(theme) => ({

    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.37)',
    },

    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-around',
    },

    message: {
      color: 'white',
      padding: 16,
      fontSize: 12,
    },

    progressbar: {
      height: 4,
    },

  }), 
	{ name: "Progress" },
) (
	({ isActive, classes }) => isActive ? (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.message}>
          Please wait, evaluating...
        </div>
        <div className={classes.progressbar}>
          <LinearProgress variant={'indeterminate'} color={'secondary'}/>
        </div>
      </div>
    </div>
	) : null
);
