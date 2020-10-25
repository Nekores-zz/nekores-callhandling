import { functions, arrays, objects, geometry, debug, observables, events, reactive, generateUid, selectors } from '../utility';

const {point, vector, x, y, add, difference, distance, segment, getRectangleVertex, expandRectangle} = geometry;

export const isNodeOutcome =
  matching.hasShape({
    key: matching.isString,
    label: matching.isString,
  })

export const nodeInputs = {
  headerLeft: 'headerLeft',
  headerTop: 'headerTop',
  headerRight: 'headerRight',
}

export const isNodeInput = (value) => !!nodeInputs[value]

export const isNode =
  matching.hasShape({
    id: matching.isString,
    nodeType: matching.isString,
    outcomes: matching.isArrayOf(isNodeOutcome),
    name: matching.isString,
    description: matching.isString,
    position: matching.isPosition,
    order: matching.isNumber,
  })

export const createNode = (data) => ({
  id: generateUid(),
  ... data,
})

export const move = (node, offset, application) => ({
  position: application.grid.snapPosition(add(node.position, offset)),
});

export const getNodes = (serviceDocument) => serviceDocument.nodes
export const getPosition = (node) => node.position
export const getName = (node) => node.name
export const getOrder = (node) => node.order
export const getNodeType = (nodeTypes) => (node) => nodeTypes[node.nodeType]
export const getOutcomes = (node) => node.outcomes
export const getNode = (nodes, nodeId) => nodes[nodeId]
