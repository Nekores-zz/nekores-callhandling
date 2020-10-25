import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export class ShadowFilter extends PureComponent {
  static propTypes = {
    
  };

  static defaultProps = {
  };

  render() {
    let {id, width, height, slope} = this.props;
    return (
      <filter id={id} y="-10" height={(height || 0) + 20} x="-10" width={(width || 0) + 20}>
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="2" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope={slope || 0.5}/>
        </feComponentTransfer>
        <feMerge> 
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    );
  }
}

export class ColorFilter extends PureComponent {
  static defaultProps = {
    r: 1,
    g: 1,
    b: 1,
    a: 0,
    k: 1,
    k0: 1,
  };

  render() {
    let {id, r, g, b, a, k0, k} = this.props;
    return (
      <filter id={id}>
        <feColorMatrix type="matrix" values={`
          ${k * r} ${k * r} ${k * r} 0 ${k0 * r}
          ${k * g} ${k * g} ${k * g} 0 ${k0 * g}
          ${k * b} ${k * b} ${k * b} 0 ${k0 * b}
          0 0 0 1 ${k0 * a}
        `}/>
      </filter>
    );
  };
}