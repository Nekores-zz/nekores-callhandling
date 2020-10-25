import {geometry, events, observables, objects, arrays, functions, models, debug, matching, generateUid, shrinkString, selectors} from '../utility';
import { createNode } from './nodes';
import { createLink } from './links';
import {
  ServiceDocument, ServiceDocumentSelection, ServiceDocumentReferences,
  getNodes, getNode, getName, getPosition, getOrder, getNodeType, getOutcomes,
  getLinks, getLink, getFromNodeIf, getFromLinkSource, getToNideId, getToLinkEnd, getElbows,
} from '../serviceDocument/serviceDocument';

export * from '../serviceDocument/serviceDocument';
export const newServiceDocument = ServiceDocument.init();

export const createServiceDocument = (actual, applyAction, application) => {
  let { nodeTypes, draftActions } = application

  let draft = observables.map(
    (actual, actions) => actions.filter(Boolean).reduce(ServiceDocument.applyAction, actual),
    actual, draftActions,
  )

  let isEmpty = observables.map(ServiceDocument.isEmpty, actual)

  let createAction = (f, ...args) => {
    return f(actual.get(), ...args);
  };

  let getCopy = (selection) => getCopy(actual.get(), selection);

  let referencesSelector = selectors.map(ServiceDocumentReferences.getReferences, actual.get);

  let backwardReferencesSelector = selectors.map(ServiceDocumentReferences.getBackwardReferences, referencesSelector);

  let getBackwardReferencesSelector = selectors.fromFunction(
    (id) => selectors.distinct(
      selectors.map(
        (actual, backwardReferences) => ServiceDocumentSelection.select(actual, backwardReferences[id]),
        actual.get, backwardReferencesSelector,
      ),
    ),
  );

  let cascadesSelector = selectors.map(ServiceDocumentReferences.getCascadeReferences, referencesSelector);

  let getItemReferencesSelector = selectors.fromFunction(
    (id) => selectors.map((references) => references[id], referencesSelector)
  );

  global.gen = createGenerators({ nodeTypes, actual, applyAction, });

  return observables.denote({
    get(...args) {
      return actual.get(...args)
    },
    set(...args) {
      return actual.set(...args)
    },
    actual,
    draft,
    isEmpty,
    createAction,
    applyAction(...args) {
      let result = applyAction(...args)
      // debug('action', args, result)
      return result;
    },
    nodeTypes,
    referencesSelector,
    backwardReferencesSelector,
    cascadesSelector,
    getItemReferencesSelector,
    getBackwardReferencesSelector,
    getCopy,
  }, 'serviceDocument.')
};

function createGenerators({ actual, applyAction, nodeTypes }) {
  let node = (nodeType, i, j) => {
    let x = 420 * i - (i % 2 ? 120 : 0)
    let node = createNode({
      nodeType: nodeType.nodeType,
      outcomes: nodeType.fixedOutcomes,
      position: {x: x, y: j*420},
      name: `Node ${i} ${j}`,
      description: '',
      order: 0,
    });
    let action = ServiceDocument.createNodeAction(node, actual.get());
    applyAction(action);
    return node;
  };

  let link = (fromNode, toNode, fromLinkSource, toLinkEnd) => {
    let link = createLink({
      fromNodeId: fromNode.id,
      toNodeId: toNode.id,
      fromLinkSource,
      toLinkEnd,
      elbows: [],
    });
    let action = ServiceDocument.createLinkAction(link, actual.get());
    applyAction(action);
    return link;
  };

  let doc = (n, m) => {
    for (let i = 0; i < n; ++i) {
      for (let j = 0;j < m; ++j) {
        let nodeType = nodeTypes['callcare'];
        let fromNode = node(nodeType, i * 2, j);
        let toNode = node(nodeType, i * 2 + 1, j)
        let link1 = link(fromNode, toNode, fromNode.outcomes[0].key, 'headerLeft');
        let link2 = link(fromNode, toNode, fromNode.outcomes[1].key, 'headerRight');
        let link3 = link(fromNode, toNode, fromNode.outcomes[2].key, 'headerTop');
        let link4 = link(fromNode, toNode, fromNode.outcomes[3].key, 'headerRight');
        let link5 = link(toNode, fromNode, toNode.outcomes[0].key, 'headerLeft');
        let link6 = link(toNode, fromNode, toNode.outcomes[1].key, 'headerRight');
        let link7 = link(toNode, fromNode, toNode.outcomes[2].key, 'headerTop');
        let link8 = link(toNode, fromNode, toNode.outcomes[3].key, 'headerRight');
      }
    }
  }

  return {node, link, doc};
};