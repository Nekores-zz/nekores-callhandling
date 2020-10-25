import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {styleSheet} from 'jss/components/Sidemenu/SidemenuOption';

class SidemenuOption extends Component {
  render() {
    const {classes, children, onSelect, isActive} = this.props;
    return (
      <Typography onClick={onSelect} className={`${classes.option} ${isActive ? classes.active : ''}`}>
        {children}
      </Typography>
    )
  }
}

export default withStyles(styleSheet, {name: 'SidemenuOption'})(SidemenuOption);