import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';

const stylesheet = (theme) => ({
  colorBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
});

export const ColorBar = withStyles(stylesheet, {name: 'ColorBar'}) (
  class ColorBar extends PureComponent {
    static propTypes = {
      color: PropTypes.string,
      classes: PropTypes.any.isRequired,
    };

    render() {
      let {color, classes} = this.props;
      return (
        <div className={clsx(classes.colorBar)} style={{backgroundColor: color}}/>
      );
    }
  }
);