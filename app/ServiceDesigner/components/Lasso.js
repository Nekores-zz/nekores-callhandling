import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';
import {arrays, geometry, svg, events} from '../utility';
import {DraggableG} from '../components';

const lassoStylesheet = (theme) => ({
  figure: {
    stroke: '#009cff99',
    fill: '#009cff33',
    pointerEvents: 'none',
  },
});

export const Lasso = withStyles(lassoStylesheet, {name: 'Lasso'}) (
  class Lasso extends PureComponent {
    static propTypes = {
      point0: PropTypes.object,
      point1: PropTypes.object,
      classes: PropTypes.any.isRequired,
    };

    render() {
      let {point0, point1, classes} = this.props;
      return (
        <rect x={point0.x} y={point0.y} width={point1.x - point0.x} height={point1.y - point0.y} className={clsx(classes.figure)}/>
      );
    }
  }
);
