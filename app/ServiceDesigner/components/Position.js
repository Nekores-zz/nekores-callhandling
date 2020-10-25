import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {geometry, events, objects} from '../utility';

export class Position extends PureComponent {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    x: 0,
    y: 0,
  };

  render() {
    let {x, y, children, ... props } = this.props;
    return (
      <g transform={`translate(${x} ${y})`} {... props}>
        {children}
      </g>
    );
  }
}
