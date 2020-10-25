import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import { Paper, GridPattern, ShadowFilter, ColorFilter, Link, Highlight } from '../components';
import { functions, observables, arrays, objects, geometry, events, debug } from '../utility';
import { withServiceDesigner } from './ServiceDesigner';

export const Editor = withServiceDesigner(
  observables.withGetObservable(
    ({ serviceDesigner, children }) => observables.distinctMapToObject(
      (transform, gridSize, params) => ({
        children,
        transform,
        gridSize,
        emitEvent: serviceDesigner.emitEvent,
      }),
      serviceDesigner.viewport.transform,
      serviceDesigner.grid.state,
      serviceDesigner.params,
    ),
    class Editor extends PureComponent {
      handleRef = (ref) => this.props.emitEvent('canvasRef', ref);
      handleClick = (event) => this.props.emitEvent('canvasClick', event);
      handleWheel = (event) => this.props.emitEvent('canvasWheel', event);
      handleMouseDown = (event) => this.props.emitEvent('canvasMouseDown', event);
      handleMouseMove = (event) => this.props.emitEvent('canvasMouseMove', event);
      handleMouseUp = (event) => this.props.emitEvent('canvasMouseUp', event);
      handleMouseEnter = (event) => this.props.emitEvent('canvasMouseEnter', event);
      handleMouseOver = (event) => this.props.emitEvent('canvasMouseOver', event);
      handleMouseOut = (event) => this.props.emitEvent('canvasMouseOut', event);
      render() {
        let { transform, gridSize, children } = this.props
        return (
          <Paper
            onRef={this.handleRef}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleClick}
            onWheel={this.handleWheel}
            transform={transform}
            defs={(
              <>
                <GridPattern id={'grid'} gridSize={gridSize} transform={transform}/>
                <ShadowFilter id='filterShadow' slope={0.5}/>
                <ShadowFilter id='filterShadowComment' slope={0.2}/>
                <ColorFilter id={Highlight.getFilterId('hover')} r={0.1} g={0.3} b={0.5} k={0.5} k0={0.5}/>
                <ColorFilter id={Highlight.getFilterId('selected')} r={0.1} g={0.3} b={0.5} k={0.5} k0={0.5}/>
                <ColorFilter id={Highlight.getFilterId('invalid')} r={0.5} g={0.1} b={0.3} k={0.5} k0={0.5}/>
                <Link.MarkerEnd/>
              </>
            )}
          >
            {children}
          </Paper>
        )
      }
    }
  )
);

