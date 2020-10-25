import React, {PureComponent,} from 'react';
import PropTypes from 'prop-types';
import {TopPanel as TopPanelContainer, TopPanelPad, TopPanelButton, Title, Divider, ZoomSelect, GridSizeSelect, Undo, Redo, FitZoom} from '../components';
import {functions, observables, arrays, objects, geometry, events, debug} from '../utility';
import {withServiceDesigner} from './ServiceDesigner';

export const TopPanel =  withServiceDesigner(
  observables.withGetObservable(
    ({ serviceDesigner, canUndo, canRedo, undo, redo, ...props }) => {
      let { serviceDocument, viewport, emitEvent, grid } = serviceDesigner;
      return observables.distinctMapToObject(
        (viewport, isEmpty, gridSize) => ({
          emitEvent: emitEvent,
          zoom: viewport.zoom,
          canUndo,
          canRedo,
          undo,
          redo,
          canFitViewport: !isEmpty,
          gridSize,
          gridRange: grid.range,
        }),
        viewport.state, serviceDocument.isEmpty, grid.gridSize,
      );
    },
    class TopPanel extends PureComponent {
      zoomOptions = [-5, -4, -3, -2, -1, 0, 1, 2].map((p) => 2**p);
      gridSizeOptions = [10, 20, 40, 100, 200];
      handleSetZoom = (zoom) => this.props.emitEvent('setZoom', zoom);
      handleSetGridSize = (event, gridSize) => this.props.emitEvent('setGridSize', gridSize, event)
      hanleFitViewport = (event) => this.props.emitEvent('fitViewport', event);
      render() {
        let {gridRange, zoom, gridSize, canUndo, canRedo, undo, redo, canFitViewport} = this.props;
        return (
          <TopPanelContainer>
            <TopPanelPad/>
            <Title>Service 1</Title>
            <TopPanelPad/>
            <Divider variant='vertical'/>
            <TopPanelPad/>
            <TopPanelButton hint='Fit zoom' icon={<FitZoom/>} onClick={this.hanleFitViewport} isDisabled={!canFitViewport}/>
            <ZoomSelect value={zoom} options={this.zoomOptions} onChange={this.handleSetZoom}/>
            <GridSizeSelect range={gridRange} value={gridSize} options={this.gridSizeOptions} onChange={this.handleSetGridSize}/>
            <TopPanelPad/>
            <Divider variant='vertical'/>
            <TopPanelPad/>
            <TopPanelButton hint='Undo' icon={<Undo/>} onClick={undo} isDisabled={!canUndo}/>
            <TopPanelButton hint='Redo' icon={<Redo/>} onClick={redo} isDisabled={!canRedo}/>
            <TopPanelPad/>
          </TopPanelContainer>
        );
      }
    }
  )
);