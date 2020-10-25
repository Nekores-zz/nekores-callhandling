import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import { Position as SVGPosition, Highlight as SVGHighlight } from '../components';
import { functions, observables, arrays, objects, geometry, events, debug } from '../utility';

export const Highlight = observables.withObservables(
  function Highlight({ isSelected, isInvalid, children }) {
    return (
      <SVGHighlight isEnabled={!!(isSelected || isInvalid)} variant={isInvalid ? 'invalid' : 'selected'}>
        {children}
      </SVGHighlight>
    )
  }
)

export const Position = observables.withObservables(
  function Position({ position, children }) {
    return (
      <SVGPosition {...position}>
        {children}
      </SVGPosition>
    )
  }
)
