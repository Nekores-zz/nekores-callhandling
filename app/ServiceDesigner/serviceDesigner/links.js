import React, { PureComponent, Fragment } from 'react';
import { Link as LinkComponents } from '../components';
import { Highlight, Position } from '../ServiceDesignerComponents/SVG';
import { or, not, areEqual, geometry, events, reactive, objects, arrays, functions, models, debug, matching, generateUid, observables } from '../utility';
import { concat, connectAll, connectNode, connectPoint, properPath } from './pathfinding'
import { emptyModule, createModule, observeModule, Selection, mergeObservables, mergeInternals, mergeModules, ComplexModule, DynamicModule, Container } from '../editor'
import { pathToCellIndices, createLookup, addCellsForId, getIds } from './lookup'
import { initCreatingLink } from './creatingLink';
import { initEditingLink } from './editLink';
import { getLinks, getFromNodeId, getFromLinkSource, getToNodeId, getToLinksEnd, getElbows, getNode } from '../serviceDocument';

export * from '../serviceDocument/links'

const { point, vector, multiply, add, addTo, getRectangleVertex, expandRectangle, segmentCrossingRectangle, getShortestPaths, unfoldPath, pathLength, difference, getRectangleVertices, segment, pathSegments, isInsideRectangle, rectangle, } = geometry;

export const Link = observables.withObservables(
  class Link extends PureComponent {
    handleMouseDown = (event) => this.props.emitEvent('linkMouseDown', this.props.linkId, event);
    handleMouseUp = (event) => this.props.emitEvent('linkMouseUp', this.props.linkId, event);
    handleClick = (event) => this.props.emitEvent('linkClick', this.props.linkId, event);
    render() {
      let { vertices, isUnderEdit, isProcessing } = this.props;
      return (
        <LinkComponents.Path
          path={vertices}
          onMouseDown={this.handleMouseDown}
          onClick={this.handleClick}
          variant={isUnderEdit || isProcessing ? 'drawing' : 'default'}
        />
      );
    }
  }
)

export const concatPieces = (pieces) => {
  return concat(...pieces)
}

const getNodeIds = (nodesLookup, lookupCells) => {
  return getIds(nodesLookup, lookupCells)
}

const observeNodeObstacles = (nodeIds, nodes) => {
  return observables.fromObject(objects.map((value, nodeId) => nodes[nodeId].rectangle) (nodeIds))
}

const fromNodeToNode = (fromSlot, fromRectangle, toSlot, toRectangle, elbows = []) => {
  return connectAll(
    connectNode(fromSlot, fromRectangle, not(isInsideRectangle(toRectangle))),
    ...elbows.map(connectPoint),
    connectNode(toSlot, toRectangle, not(isInsideRectangle(fromRectangle))),
  )
}

function observePath(application, linkId) {
  let { nodes } = application
  return (fromNodeId, fromSlot, fromRectangle, toNodeId, toSlot, toRectangle, elbows, isUnderEdit) => {
    let initialPieces = fromNodeToNode(fromSlot, fromRectangle, toSlot, toRectangle, elbows)
    let initialVertices = concatPieces(initialPieces)
    let initialObstacles = { [fromNodeId]: fromRectangle, [toNodeId]: toRectangle }
    let nodeObstacles = observables.of(initialObstacles)
    let pieces = observables.of(initialPieces)
    let vertices = observables.of(initialVertices)
    let cells = {}
    let lookupCells = observables.distinctMapToObject(
      (vertices) => (cells = { ... cells, ... getLookupCells(vertices), }),
      vertices,
    )
    let nodeIds = observables.distinctMapToObject(getNodeIds, nodes.lookup, lookupCells)
    let observedNodeObstacles = observables.switchMap(observeNodeObstacles, nodeIds, nodes.nodes)
    let asyncTask = isUnderEdit ? observables.of(null) :
      observables.map(
        (prevObstacles, newObstacles) => {
          let enterObstacles = objects.symmetricDifference(newObstacles, prevObstacles)
          if (prevObstacles === initialObstacles) {
            enterObstacles = objects.keysDifference(enterObstacles, initialObstacles)
          }
          if (!objects.isEmpty(enterObstacles)) {
            return () => {
              let newPieces = properPath(fromSlot, toSlot, elbows, newObstacles)
              let newVertices = concatPieces(newPieces)
              nodeObstacles.set(newObstacles)
              pieces.set(newPieces)
              vertices.set(newVertices)
            }
          }
        },
        nodeObstacles, observedNodeObstacles,
      )
    return observables.denote(
      { nodeObstacles, vertices, pieces, asyncTask, lookupCells, nodeIds, observedNodeObstacles },
      `link-${linkId.slice(-4)}.path.`,
    )
  }
}

const getNodeRectangle = (node) => node.draftRectangle
const isNodeUnderEdit = (node) => node.isUnderEdit
const getLookupCells = (vertices) => pathToCellIndices(vertices)

const observeLinkSource = (fromNode, fromLinkSource) => fromNode.linkSource(fromLinkSource)
const observeLinkEnds = (node) => node.linkEnds
const observeLinkEnd = (linkEnds, toLinkEnd) => linkEnds[toLinkEnd]

function observeLookup(links) {
  return observables.switchMap(
    (links) => observables.distinctMapToObject(
      objects.fold(addCellsForId, createLookup()),
      observables.fromObject(objects.map((link) => link.lookupCells) (links)),
    ),
    links,
  )
}

function observeByNodeIds(links) {
  return observables.switchMap(
    (links) => observables.distinctMapToObject(
      objects.group((fromNodeId, linkId) => fromNodeId, (fromNodeId, linkId) => links[linkId]),
      observables.fromObject(objects.map((link) => link.fromNodeId) (links)),
    ),
    links,
  )
}

function observeAsyncTasks(links) {
  return observables.switchMap(
    (links) => observables.distinctMapToArray(
      (... asyncTasks) => asyncTasks.filter(Boolean),
      ... objects.toArray(links, (link) => link.asyncTask).filter(Boolean),
    ),
    links,
  )
}

function observeRendering(links) {
  return observables.map(
    (links) => objects.toArray(links, (link) => link.element),
    links,
  )
}

export const createLinks = (application) => {
  let { emitEvent, selection, serviceDocument } = application
  let { nodes, lookup: nodesLookup } = application.nodes

  let editingLinks = new Container().denote('editingLinks')
  let creatingLinks = new Container().denote('creatingLinks')

  let isAutoLinkLayoutEnabled = observables.of(true)

  let eventsHandlers = observables.of({
    autoLinkLayout(event) {
      observables.update(isAutoLinkLayoutEnabled, (value) => !value)
    },
    linkMouseDown(linkId, event) {
      emitEvent('selection', linkId, event)
      emitEvent('dragging', event)
      editingLinks.create(initEditingLink, application, linkId, event)
      events.endEvent(event);
    },
    nodeOptionMouseDown(nodeId, linkSource, event) {
      creatingLinks.create(initCreatingLink, application, nodeId, linkSource, event)
      .then(serviceDocument.applyAction)
      events.endEvent(event)
    },
  })

  let actualLinks = observables.map(getLinks, serviceDocument.actual)
  let draftLinks = observables.map(getLinks, serviceDocument.draft)

  let links = observables.fromKeys(
    actualLinks,
    (linkId) => {
      let actual = observables.entry(linkId, actualLinks)
      let draftLink = observables.entry(linkId, draftLinks)
      let fromNodeId = observables.map(getFromNodeId, actual)
      let fromLinkSource = observables.map(getFromLinkSource, actual)
      let toNodeId = observables.map(getToNodeId, draftLink)
      let toLinkEnd = observables.map(getToLinksEnd, draftLink)
      let fromNode = observables.switchMap((nodeId) => observables.entry(nodeId, nodes), fromNodeId)
      let fromSlot = observables.switchMap(observeLinkSource, fromNode, fromLinkSource)
      let fromRectangle = observables.switchMap(getNodeRectangle, fromNode)
      let toNode = observables.switchMap((nodeId) => observables.entry(nodeId, nodes), toNodeId)
      let linkEnds = observables.switchMap(observeLinkEnds, toNode)
      let toSlot = observables.switchMap(observeLinkEnd, linkEnds, toLinkEnd)
      let toRectangle = observables.switchMap(getNodeRectangle, toNode)
      let elbows = observables.map(getElbows, draftLink)
      let isUnderEdit = observables.map(
        or,
        observables.switchMap(isNodeUnderEdit, fromNode),
        observables.switchMap(isNodeUnderEdit, toNode),
        observables.map(not(areEqual), actual, draftLink),
      )
      let path = observables.map(
        observePath(application, linkId),
        fromNodeId, fromSlot, fromRectangle, toNodeId, toSlot, toRectangle, elbows, isUnderEdit,
      )
      let asyncTask = observables.switchMap((path) => path.asyncTask, path)
      let lookupCells = observables.switchMap((path) => path.lookupCells, path)
      let pieces = observables.switchMap((path) => path.pieces, path)
      let vertices = observables.switchMap((path) => path.vertices, path)
      let isProcessing = observables.map(Boolean, asyncTask)
      let isSelected = selection.ofId(linkId)

      let element = (
        <Highlight key={linkId} isSelected={isSelected}>
          <Link
            linkId={linkId}
            vertices={vertices}
            isUnderEdit={isUnderEdit}
            isProcessing={isProcessing}
            emitEvent={emitEvent}
          />
        </Highlight>
      )

      return observables.denote({
        linkId, actual, draftLink, isUnderEdit,
        fromNodeId, fromLinkSource, toNodeId, toLinkEnd,
        fromNode, toNode, linkEnds, toSlot, fromSlot,
        elbows, pieces, vertices,
        lookupCells, asyncTask, isSelected, isUnderEdit,
        path, element,
      }, `link-${linkId.slice(-4)}.`)
    },
  )

  let lookup = observeLookup(links)

  let byNodeIds = observeByNodeIds(links)

  let asyncTasks = observeAsyncTasks(links)

  let renderings = observables.map(
    (links) => ({ links }),
    observeRendering(links),
  )

  let components = { editingLinks, creatingLinks, links, byNodeIds, lookup, isAutoLinkLayoutEnabled, renderings, eventsHandlers, asyncTasks }

  let submodules = observables.map(
    (editingLinks, creatingLinks) => [... editingLinks, ... creatingLinks],
    editingLinks.observable, creatingLinks.observable,
  )

  return observables.denote(new ComplexModule(components, submodules), 'links.')
}

