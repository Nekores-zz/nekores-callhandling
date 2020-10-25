import React, {PureComponent, Fragment} from 'react';
import { or, not, areEqual, functions, arrays, objects, geometry, debug, observables, events, reactive, generateUid, selectors } from '../utility';
import { HighlightHover, Node as NodeComponent, } from '../components';
import { Highlight, Position } from '../ServiceDesignerComponents/SVG';
import { difference } from '../utility/geometry';
import { emptyModule, createModule, observeModule, mergeObservables, mergeInternals, mergeModules, ComplexModule, DynamicModule, Container } from '../editor'
import { nodeInputs, getNodes, getNode, getName, getPosition, getOrder, getNodeType, getOutcomes, } from '../serviceDocument';
import { initCreatingNode } from './creatingNode';
import { rectangleToCellIndices, createLookup, addCellsForId, getIds } from './lookup'

export * from '../serviceDocument/nodes';

const { point, vector, add, rectangleOfSize } = geometry;

export const sides = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
}

const { top, right, bottom, left } = sides

export const isSide = (value) => !!sides[value]

export const sidesDirections = {
  [top]: vector(0, -1),
  [right]: vector(1, 0),
  [bottom]: vector(0, 1),
  [left]: vector(-1, 0),
}

export const isSlot = matching.hasShape({
  side: isSide,
  position: matching.isPosition,
  isInput: matching.isBoolean,
})

const applyPositionToSlot = (position, slot) => ({
  ...slot,
  position: add(position, slot.position),
})

const width = 200;
const headerHeight = 40;
const rowHeight = 42;
const padding = 20;

const outcomeSlot = {
  position: point(width, .5 * rowHeight),
  side: sides.right,
  isInput: false,
}

const inputSlots = {
  [nodeInputs.headerLeft]: {
    position: point(0, .5 * headerHeight),
    side: sides.left,
    isInput: true,
  },
  [nodeInputs.headerTop]: {
    position: point(.5 * width, 0),
    side: sides.top,
    isInput: true,
  },
  [nodeInputs.headerRight]: {
    position: point(width, .5 * headerHeight),
    side: sides.right,
    isInput: true,
  },
}

class NodeOutcome extends PureComponent {
  handleMouseEnter = (event) => this.props.emitEvent('nodeOptionMouseEnter', this.props.nodeId, this.props.outcome.key, event);
  handleMouseLeave = (event) => this.props.emitEvent('nodeOptionMouseLeave', this.props.nodeId, this.props.outcome.key, event);
  handleMouseDown = (event) => this.props.emitEvent('nodeOptionMouseDown', this.props.nodeId, this.props.outcome.key, event);
  render() {
    let { nodeId, outcome, canStartCreatingLinkFrom, isCreatingLinkFrom } = this.props;
    return (
      <HighlightHover isDisabled={!canStartCreatingLinkFrom} isOn={isCreatingLinkFrom} variant={'selected'}>
        <NodeComponent.Option
          label={outcome.label}
          y={outcome.offset}
          width={outcome.width}
          height={outcome.height}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
        />
      </HighlightHover>
    );
  }
}

export const Node = observables.withObservables(
  class Node extends PureComponent {
    handleMouseEnter = (event) => this.props.emitEvent('nodeMouseEnter', this.props.nodeId, event);
    handleMouseLeave = (event) => this.props.emitEvent('nodeMouseLeave', this.props.nodeId, event);
    handleMouseDown = (event) => this.props.emitEvent('nodeMouseDown', this.props.nodeId, event);
    handleMouseUp = (event) => this.props.emitEvent('nodeMouseUp', this.props.nodeId, event);
    handleClick = (event) => this.props.emitEvent('nodeClick', this.props.nodeId, event);
    handleOpenDialog = (event) => this.props.emitEvent('openNodeDialog', this.props.nodeId, event);
    render() {
      let { nodeId, name, nodeType, outcomes, size, headerHeight, isCreatingLinkFromOutcome, emitEvent } = this.props;
      return (
        <NodeComponent.Container
          width={size.x}
          height={size.y}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onClick={this.handleClick}
          onDoubleClick={this.handleOpenDialog}
        >
          <NodeComponent.Header
            {...nodeType}
            label={name || nodeType.name}
            width={size.x}
            height={headerHeight}
            onMoreClick={this.handleOpenDialog}
          />
          {outcomes.map((outcome, index) =>
            <NodeOutcome key={outcome.key}
              nodeId={nodeId}
              outcome={outcome}
              index={index}
              canStartCreatingLinkFrom={true}
              isCreatingLinkFrom={outcome.key === isCreatingLinkFromOutcome}
              emitEvent={emitEvent}
            />
          )}
        </NodeComponent.Container>
      );
    }
  }
)

const getDisplacement = (actualPosition, draftPosition) => {
  return actualPosition === draftPosition ?
    null : difference(actualPosition, draftPosition)
}

export const getOutcomeLayouts = (outcomes) => outcomes.map(getOutcomeLayout);

export const getOutcomeLayout = (outcome, index) => {
  let height = rowHeight
  let offset = headerHeight + index * rowHeight
  let position = point(0, offset)
  return { ...outcome, height, width, index, offset, position }
}

export const getOutcomeKey = (outcome) => outcome.key

export const getLinkSources = (outcomeLayouts, position) => {
  return objects.fromArray(outcomeLayouts, getOutcomeKey, getLinkSource(position))
}

export const getLinkSource = (nodePosition) => (outcomeLayout) => {
  let position = add(nodePosition, outcomeLayout.position)
  return applyPositionToSlot(position, outcomeSlot)
}

export const getLinkEnds = (position) => {
  return objects.map(getLinkEnd(position)) (inputSlots)
}

export const getLinkEnd = (nodePosition) => (inputSlot) => {
  return applyPositionToSlot(nodePosition, inputSlot)
}

export const getSize = (outcomes) => {
  return vector(width, headerHeight + rowHeight * outcomes.length)
}

export const getRectangle = (position, size) => {
  return rectangleOfSize(position, size)
}

export const getLookupCells = (rectangle) => {
  return rectangleToCellIndices(rectangle)
}

function observeRendering(nodes) {
  return observables.switchMap(
    (nodes) => observables.map(
      (... nodes) => {
        let foreground = nodes.filter((node) => node.isSelected)
        let background = nodes.filter((node) => !node.isSelected)
        return [
          ... arrays.orderDescBy(getOrder) (background),
          ... arrays.orderDescBy(getOrder) (foreground),
        ]
        .map((node) => node.element)
      },
      ... objects.toArray(
        nodes,
        ({ element, order, isSelected }) => observables.resolve({ element, order, isSelected })
      ),
    ),
    nodes,
  )
}

function observeLookup(nodes) {
  return observables.switchMap(
    (nodes) => observables.map(
      (nodeCells) => objects.fold(addCellsForId, createLookup()) (nodeCells),
      observables.fromObject(objects.map((node) => node.lookupCells) (nodes)),
    ),
    nodes,
  )
}

export const createNodes = (application) => {
  let { emitEvent, nodeTypes, serviceDocument, selection } = application

  let creatingNode = new Container().denote('creatingNode')

  let eventsHandlers = observables.of({
    nodeMouseDown: (nodeId, event) => {
      emitEvent('selection', nodeId, event)
      emitEvent('dragging', event)
      events.endEvent(event);
    },
    startCreatingNode: (nodeType, event) => {
      creatingNode.create(initCreatingNode, application, nodeType, event)
      .then(serviceDocument.applyAction)
      events.endEvent(event)
    },
  })

  let actualNodes = observables.map(getNodes, serviceDocument.actual)
  let draftNodes = observables.map(getNodes, serviceDocument.draft)

  let nodes = observables.fromKeys(
    actualNodes,
    (nodeId) => {
      let actualNode = observables.entry(nodeId, actualNodes)
      let draftNode = observables.entry(nodeId, draftNodes)
      let actualPosition = observables.map(getPosition, actualNode)
      let draftPosition = observables.map(getPosition, draftNode)
      let displacement = observables.map(getDisplacement, actualPosition, draftPosition)
      let position = draftPosition
      let nodeType = observables.map(getNodeType(nodeTypes), actualNode)
      let name = observables.map(getName, actualNode)
      let order = observables.map(getOrder, actualNode)
      let outcomes = observables.map(getOutcomes, actualNode)
      let outcomeLayouts = observables.map(getOutcomeLayouts, outcomes)
      let linkSources = observables.map(getLinkSources, outcomeLayouts, position)
      let linkEnds = observables.map(getLinkEnds, position)
      let size = observables.map(getSize, outcomes)
      let rectangle = observables.map(getRectangle, actualPosition, size)
      let draftRectangle = observables.map(getRectangle, draftPosition, size)
      let lookupCells = observables.map(getLookupCells, rectangle)
      let isSelected = selection.ofId(nodeId)
      let isUnderEdit = observables.map(not(areEqual), actualNode, draftNode)
      let isCreatingLinkFromOutcome = observables.of(false)
      let isCreatingLinkTo = observables.of(false)
      let isInvalid = observables.of(false)

      let linkSource = (key) => observables.property(key, linkSources)
      let linkEnd = (key) => observables.property(key, linkEnds)
      let findLinkEnd = (position) => objects.minimum(
        linkEnds.get(),
        (linkEnd) => geometry.distance(linkEnd.position, position)
      )

      let element = (
        <Position
          key={nodeId}
          position={position}
        >
          <Highlight
            isSelected={observables.map(or, isSelected, isCreatingLinkTo)}
            isInvalid={isInvalid}
          >
            <Node
              nodeId={nodeId}
              name={name}
              nodeType={nodeType}
              outcomes={outcomeLayouts}
              size={size}
              headerHeight={headerHeight}
              isCreatingLinkFromOutcome={isCreatingLinkFromOutcome}
              emitEvent={emitEvent}
            />
          </Highlight>
        </Position>
      )

      return observables.denote({
        nodeId, actualNode, draftNode, nodeType, name, order, position, outcomes,
        outcomeLayouts, linkSources, linkEnds, linkSource, linkEnd,
        displacement, size, rectangle, draftRectangle,
        isSelected, isUnderEdit, isCreatingLinkFromOutcome, isCreatingLinkTo, isInvalid,
        lookupCells, findLinkEnd, element,
      }, `node-${nodeId.slice(-4)}.`)
    },
  )

  let lookup = observeLookup(nodes)

  let renderings = observables.map(
    (nodes) => ({ nodes }),
    observeRendering(nodes),
  )

  let components = { creatingNode, nodes, lookup, renderings, eventsHandlers }

  let submodules = creatingNode.observable

  return observables.denote(new ComplexModule(components, submodules), 'nodes.')
}
