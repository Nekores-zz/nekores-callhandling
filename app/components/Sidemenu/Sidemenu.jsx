import React, {Component, Fragment} from 'react';
import {SwipeableDrawer, Grid, withStyles} from '@material-ui/core';
import {styleSheet} from 'jss/components/Sidemenu/Sidemenu';

class Sidemenu extends Component {
  render() {
    let {children, classes, isOpen, toggle} = this.props;
    return (
      <SwipeableDrawer
        open={isOpen}
        onClose={toggle}
        onOpen={toggle}
        variant={'persistent'}
        className={classes.drawer}
        classes={{paper: classes.paper}}
      >
        <Grid container direction="column" wrap="nowrap" className={classes.sidemenuContent}>
          {children}
        </Grid>
      </SwipeableDrawer>
    );
  }
}

export default withStyles(styleSheet, {name: 'Sidemenu'})(Sidemenu);