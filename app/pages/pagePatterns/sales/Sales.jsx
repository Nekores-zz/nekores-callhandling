import {withStyles} from '@material-ui/core/styles';
import React from 'react';
import {styleSheet} from 'jss/Sales';
import Button from '@material-ui/core/Button';

class ScrollPanel extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Button className={classes.btn}>
          <span className={classes.tour}><p>Take the tour</p></span>
        </Button>
      </div>
    );
  }
}
export default withStyles(styleSheet, {name: 'ScrollPanel'})(ScrollPanel);
