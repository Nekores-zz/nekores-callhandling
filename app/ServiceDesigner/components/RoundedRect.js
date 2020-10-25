import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Grid, Icon} from '@material-ui/core';
import {matching} from '../utility';

export class RoundedRect extends PureComponent {
  static propTypes = {
    x0: PropTypes.number.isRequired,
    y0: PropTypes.number.isRequired,
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    r00: PropTypes.number,
    r01: PropTypes.number,
    r10: PropTypes.number,
    r11: PropTypes.number,
  };

  static defaultProps = {
    r: 0,
  };

  render() {
    let {x0, y0, x1, y1, r, r00, r01, r10, r11, ...props} = this.props;
    r00 = matching.isNumber(r00) ? r00 : r;
    r01 = matching.isNumber(r01) ? r01 : r;
    r10 = matching.isNumber(r10) ? r10 : r;
    r11 = matching.isNumber(r11) ? r11 : r;
    let d = `
      M ${x0} ${y0 + r00}
      A ${r00} ${r00} 0 0 1 ${x0 + r00} ${y0} H ${x1 - r10}
      A ${r10} ${r10} 0 0 1 ${x1} ${y0 + r10} V ${y1 - r11}
      A ${r11} ${r11} 0 0 1 ${x1 - r11} ${y1} H ${x0 + r01}
      A ${r01} ${r01} 0 0 1 ${x0} ${y1 - r01} Z
    `;
    return (
      <path d={d} {...props}/>
    );
  }
}