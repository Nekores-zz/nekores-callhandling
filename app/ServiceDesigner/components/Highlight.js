import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';
import {withHover} from './withHover';

const getFilterId = (variant) => `highlight-filter-${variant}`;

export class Highlight extends PureComponent {
  static defaultProps = {
    variant: 'selected',
    isEnabled: true,
  };

  render() {
    let {variant, isEnabled, children, ...props} = this.props;
    return (
      <g {...props} filter={isEnabled ? `url(#${getFilterId(variant)})` : ''}>
        {children}
      </g>
    );
  }
}

Highlight.getFilterId = getFilterId;

export const HighlightHover = withHover(
  class HighlightHover extends PureComponent {
    static defaultProps = {
      variant: 'hover',
    };

    render() {
      let {hover, isDisabled, isOn, variant, children, classes} = this.props;
      let {isHover, ...hoverHandlers} = hover;
      return (
        <Highlight isEnabled={Boolean((isHover && !isDisabled) || isOn)} variant={variant} {...hoverHandlers}>
          {children}
        </Highlight>
      );
    }
  }
);
