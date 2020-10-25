import React, { PureComponent, memo } from 'react';
import PropTypes from 'prop-types';
import { Portal } from '@material-ui/core';
import { Node as Nodes, Position } from '../components';
import { emptyModule, createModule, observeModule, Selection, mergeModules } from '../editor'
import { createNode } from '../serviceDocument';
import { geometry, events, objects, arrays, functions, debug, matching, observables } from '../utility';
import { ServiceDocument } from '../serviceDocument';

const width = 200;
const headerHeight = 42;

const DraftNode = ({ nodeType }) =>
  <Nodes.Container position={geometry.zero} width={width} height={headerHeight} opacity={0.64}>
    <Nodes.Header label={nodeType.nodeType} icon={nodeType.icon} color={nodeType.color} darkenColor={nodeType.darkenColor} width={width} height={headerHeight}/>
  </Nodes.Container>

export const initCreatingNode = (dismiss, application, nodeType, event) => {
  let pagePosition = observables.of(events.getPagePosition(event))
  let position = observables.of(null)

  let { grid, viewport, serviceDocument, nodeTypes } = application

  let eventsHandlers = observables.of({
    mouseMove(event) {
      let value = events.getPagePosition(event)
      pagePosition.set(value)
    },
    canvasMouseMove(event) {
      let value = grid.snapPosition(viewport.getEventPosition(event))
      position.set(value)
      events.endEvent(event)
    },
    mouseUp(event) {
      dismiss()
    },
    canvasMouseUp(event) {
      position = position.get()
      serviceDocument = serviceDocument
      let newNode = position && createNode({
        nodeType,
        outcomes: nodeTypes[nodeType].fixedOutcomes,
        name: '',
        description: '',
        position,
        order: 0,
      })
      let action = ServiceDocument.createNodeAction(newNode, serviceDocument.get())
      dismiss(action)
    },
  })

  let editorContent = observables.map(
    (position, pagePosition) => !!position ? (
      <Position key='draft-node' {... position}>
        <DraftNode nodeType={nodeTypes[nodeType]}/>
      </Position>
    ) : (
      <Portal key='draft-node'>
        <Nodes.Overlay {... pagePosition}>
          <DraftNode nodeType={nodeTypes[nodeType]}/>
        </Nodes.Overlay>
      </Portal>
    ),
    position, pagePosition,
  )

  let renderings = observables.map(
    (editorContent) => ({ nodes: editorContent }),
    editorContent,
  )

  let params = observables.of({
    cursor: 'copy',
  })

  return createModule({ eventsHandlers, renderings, params }, 'creatingNode')
}
