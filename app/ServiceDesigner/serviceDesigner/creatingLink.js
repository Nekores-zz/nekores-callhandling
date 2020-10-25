import React, {PureComponent, Fragment, memo} from 'react';
import PropTypes, { element } from 'prop-types';
import { geometry, events, observables, objects, arrays, functions, models, debug, matching } from '../utility';
import { ServiceDocument } from './serviceDocument';
import { emptyModule, createModule, observeModule, Selection, mergeModules } from '../editor'
import { createLink, isLink, concatPiecess } from './links';
import { concat, connectAll, connectNode, connectPoint } from './pathfinding'
import { Highlight, Link } from '../components';

export const DraftLink = observables.withObservables(
  ({ vertices, linkEnds, toLinkEnd }) =>
    <Fragment>
      <Link.Path key='creatingLink' path={vertices} variant={Link.Path.variants.drawing}/>
      {objects.values(objects.map((linkEnd, key) => (
        <Highlight key={key} isEnabled={toLinkEnd === key}>
          <Link.LinksEnd point={linkEnd.position}/>
        </Highlight>
      )) (linkEnds))}
    </Fragment>
)

export const initCreatingLink = (dismiss, application, fromNodeId, fromLinkSource, event) => {
  let { viewport, serviceDocument } = application
  let { nodes } = application.nodes
  let { links, byNodeIds } = application.links

  let fromNode = nodes.get() [fromNodeId]
  let fromSlot = fromNode && fromNode.linkSource(fromLinkSource).get()
  let fromRectangle = fromNode && fromNode.rectangle.get()

  let linksFromSameNode = byNodeIds[fromNodeId]
  let isFromSameSource = (link) => link.fromLinkSource.get() === fromLinkSource
  let existingLink = objects.find(isFromSameSource) (linksFromSameNode)
  if (existingLink) return

  let toPoint = observables.of(viewport.getEventPosition(event))
  let toNodeId = observables.of(null)
  let toNode = observables.map((toNodeId, nodes) => nodes[toNodeId], toNodeId, nodes)
  let toLinkEnd = observables.map(
    (toPoint, toNode) => toNode && toNode.findLinkEnd(toPoint),
    toPoint, toNode,
  )

  let eventsHandlers = observables.of({
    mouseUp() {
      let newLink = createLink({
        fromNodeId,
        fromLinkSource,
        toPoint: toPoint.get(),
        toNodeId: toNodeId.get(),
        toLinkEnd: toLinkEnd.get(),
        elbows: [],
      })
      let action = ServiceDocument.createLinkAction(newLink, serviceDocument.get())
      serviceDocument.applyAction(action)
      dismiss()
    },
    canvasMouseMove(event) {
      toPoint.set(viewport.getEventPosition(event))
    },
    nodeMouseEnter(nodeId, event) {
      toNodeId.set(nodeId)
      toPoint.set(viewport.getEventPosition(event))
    },
    nodeMouseLeave(nodeId, event) {
      let toPoint = viewport.getEventPosition(event)
      if (nodeId === toNodeId.get()) {
        toNodeId.set(null)
      }
    },
  })

  let editorContent = observables.map(
    (toPoint, toNodeId, toNode, toLinkEnd) => {
      let toSlot = toNode && toNode.linkEnd(toLinkEnd).get()
      let toRectangle = toNode && toNode.rectangle.get()
      let pieces = connectAll(
        connectNode(fromSlot, fromRectangle),
        toNode ? connectNode(toSlot, toRectangle) : connectPoint(toPoint),
      )
      let vertices = concat(...pieces)
      return (
        <DraftLink
          key='draft-link'
          vertices={vertices}
          toLinkEnd={toLinkEnd}
          linkEnds={toNode && toNode.linkEnds}
        />
      )
    },
    toPoint, toNodeId, toNode, toLinkEnd,
  )

  let renderings = observables.map(
    (editorContent) => ({ links: editorContent }),
    editorContent,
  )

  let params = observables.of({
    cursor: 'alias',
  })

  return observables.denote({ eventsHandlers, renderings, params }, 'creatingLink.')
};

