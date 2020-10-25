import React, {PureComponent, } from 'react';
import PropTypes from 'prop-types';
import {Paper, GridPattern, ShadowFilter, ColorFilter, Link as Links, Highlight} from '../components';
import {functions, observables, arrays, objects, geometry, events, debug} from '../utility';
import {withServiceDesigner} from './ServiceDesigner';

export const ServiceDesignerContent = withServiceDesigner(
  observables.withGetObservable(
    ({serviceDesigner}) => observables.distinctMapToObject(
      (renderings) => ({ renderings }),
      serviceDesigner.renderings,
    ),
    class ServiceDesignerContent extends PureComponent {
      render() {
        let { renderings } = this.props
        return <>
          {renderings.below}
          {renderings.links}
          {renderings.nodes}
          {renderings.comments}
          {renderings.above}
        </>
      }
    }
  )
);
