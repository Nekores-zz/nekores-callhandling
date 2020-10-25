import {geometry, events, reactive, objects, arrays, functions, models, debug, matching, generateUid, shrinkString, selectors} from '../utility'
import { move as moveNode, isNode } from './nodes'
import { move as moveLink, isLink } from './links'
import { move as moveComment, isComment } from './comments'
import { applyChanges, applyAction } from './applyChanges'

export const getNextId = generateUid;

export const getId = (item) => item.id;

export const setId = (data, id = getNextId()) => data && Object.assign(data, {id});

export const createDocument = (types) => {
  let init = () => objects.map(() => ({})) (types);

  let empty = init();

  let isEmpty = (serviceDocument) => objects.every(
    (def, typeId) => objects.isEmpty(serviceDocument[typeId])
  ) (types)

  let getItems = (document, typeId) => document[typeId];

  let getItem = (document, typeId, id) => document[typeId] [id];

  let setItem = (document, typeId, item, inPlace = false) => item ? (
    inPlace ? (Object.assign(document[typeId], {[getId(item)]: item}), document) : {
      ...document,
      [typeId]: {
        ...document[typeId],
        [getId(item)]: item,
      }
    }
  ) : document;

  let copyItem = (target, source, typeId, id) => setItem(target, typeId, getItem(source, typeId, id), true);

  let fold = (f, x0, document) => objects.fold(
    (x, items, typeId) => objects.fold(
      (x, item, id) => f(x, typeId, item, id),
      x,
    ) (items),
    x0,
  ) (document);

  let bimap = (f, document) => fold(
    (result, typeId, item, id) => setItem(result, typeId, f(typeId, item, id), true),
    init(),
    document,
  );

  let map = (f, document) => bimap(
    (typeId, item, id) => setId(f(typeId, item, id), id),
    document,
  );

  let update = (fs, document) => fold(
    (result, typeId, item, id) => fs[typeId] ? setItem(result, typeId, setId(fs[typeId] (item, id), id), true) : result,
    init(),
    document,
  );

  let filter = (f, document) => fold(
    (result, typeId, item, id) => f(typeId, item, id) ? setItem(result, typeId, item, true) : result,
    init(),
    document,
  );

  let find = (f, document) => objects.find(
    (items, typeId) => objects.find(
      (item, id) => f(typeId, item, id)
    ) (items),
  ) (document);

  return {init, empty, isEmpty, getItems, getItem, setItem, copyItem, fold, map, update, filter, find, types};
};

export const createSelection = (Document) => {
  let init = () => ({});

  let add = (selection, id, type, inPlace = false) => (inPlace ? Object.assign : objects.union) (selection, {[id]: type});

  let isSelected = (selection, typeId, id) => selection[typeId] [id];

  let select = (document, selection) => objects.fold(
    (result, typeId, id) => Document.copyItem(result, document, typeId, id),
    Document.init(),
  ) (selection);

  let merge = (selections) => objects.flatten(selections);

  return {init, add, isSelected, select, merge, Document};
};

export const createReferences = (Document, Selection) => {
  let init = () => objects.map(() => ({})) (Document.types);

  let getItemReferences = (document, typeId, item) => ({
    ...(item && getId(item)? {[getId(item)]: typeId} : null),
    ...objects.flatMap(
      (typeId, key) => item[key] ? ({[item[key]]: typeId}) : null,
    ) (Document.types[typeId].references),
  });

  let getReferences = (document) => objects.flatMap(
    (type, typeId) => objects.map(
      (item, id) => getItemReferences(document, typeId, item),
    ) (document[typeId]),
  ) (Document.types);

  let getBackwardReferences = (references) => {
    let result = objects.map(() => ({})) (references);

    objects.each(
      (itemReferences, id) => objects.each(
        (typeId, referenceId) => Object.assign(result[referenceId], {[id]: typeId})
      ) (itemReferences)
    ) (references);

    return result;
  };

  let getCascadeReferences = (references) => {
    let getCascade = functions.memoize(
      (itemReferences) => objects.union(
        itemReferences,
        objects.flatMap(
          (typeId, referenceId) => references[referenceId] !== itemReferences ? getCascade(references[referenceId]) : {}
        ) (itemReferences),
      )
    );

    return objects.map(getCascade) (references);
  };

  return {init, getItemReferences, getReferences, getBackwardReferences, getCascadeReferences, Document, Selection};
};

export const createApplyChangesAction = (changes) => ({key: 'applyChanges', changes});

export const createPageAction = (item, serviceDocument) => createApplyChangesAction({pages: {[item.id]: item}});

export const createNodeAction = (item, serviceDocument) => isNode(item) ? createApplyChangesAction({nodes: {[item.id]: item}}) : null;

export const createLinkAction = (item, serviceDocument) => isLink(item) ? createApplyChangesAction({links: {[item.id]: item}}) : null;

export const createCommentAction = (item, serviceDocument) => isComment(item) ? createApplyChangesAction({comments: {[item.id]: item}}) : null;

export const editItemsAction = (changes) => createApplyChangesAction(changes);

export const moveItemsAction = (application) => (serviceDocument, selection, offset) => {
  if (geometry.isZero(offset)) return;
  let result = ServiceDocument.update({
    nodes: (node) => selection[node.id] ? moveNode(node, offset, application) : null,
    links: (link) => selection[link.id] ? moveLink(link, offset, application) : null,
    comments: (comment) => selection[comment.id] ? moveComment(comment, offset, application) : null,
  }, serviceDocument);
  return createApplyChangesAction(result);
};

export const getOrder = (item) => item.order || 0;

const setOrderToFront = (order) => order / 2;

const setOrderToBack = (order) => .5 + order / 2;

export const flipToFrontAction = (serviceDocument, selection) => {
  let changes = ServiceDocument.map(
    (typeId, item, id) => ({
      order: (selection[id] ? setOrderToFront : setOrderToBack) (getOrder(item)),
    }),
    serviceDocument,
  );
  return createApplyChangesAction(changes);
};

export const flipToBackAction = (serviceDocument, selection) => {
  let changes = ServiceDocument.map(
    (typeId, item, id) => ({
      order: (selection[id] ? setOrderToBack : setOrderToFront) (getOrder(item)),
    }),
    serviceDocument,
  );
  return createApplyChangesAction(changes);
};

export const removeItemsAction = (serviceDocument, selection) => {
  let references = ServiceDocumentReferences.getReferences(serviceDocument);
  let backwardReferences = ServiceDocumentReferences.getBackwardReferences(references);
  let cascades = ServiceDocumentReferences.getCascadeReferences(backwardReferences);
  let resultSelection = objects.flatMap((typeId, id) => cascades[id]) (selection);
  let resultItems = ServiceDocumentSelection.select(serviceDocument, resultSelection);
  let changes = objects.map(
    (items, typeId) => objects.map(() => null) (items),
  ) (resultItems);
  return createApplyChangesAction(changes);
};

export const getCopy = (serviceDocument) => {
  let newIds = new Map();

  let getNewId = (oldId) => {
    if (!oldId) return oldId;
    if (!newIds.has(oldId)) {
      let newId = generateUid();
      newIds.set(oldId, newId);
    }
    return newIds.get(oldId);
  };

  let replaceIds = (item, type) => {
    return {
      ...item,
      ...objects.map(
        (typeId, referenceKey) => getNewId(item[referenceKey])
      ) (type.references),
      id: getNewId(item.id),
    };
  };

  return objects.map(
    (items, typeId) => objects.bimap(
      (item, id) => replaceIds(item, ServiceDocument.types[typeId]),
      (item, id) => getNewId(id),
    ) (items),
  ) (serviceDocument);
};

export const insertItemsAction = (serviceDocument) => {
  return createApplyChangesAction(serviceDocument);
};

// ServiceDocument

export const ServiceDocument = {
  ...createDocument({
    nodes: {
      references: {

      },
    },
    links: {
      references: {
        fromNodeId: 'nodes',
        toNodeId: 'nodes',
      },
    },
    comments: {
      references: {
        attachToNodeId: 'nodes',
        attachToLinkId: 'links',
      },
    },
  }),
  createPageAction, createNodeAction, createLinkAction, createCommentAction,
  editItemsAction, moveItemsAction, flipToFrontAction, flipToBackAction, removeItemsAction, getCopy, insertItemsAction,
  applyChanges, applyAction,
};


export const ServiceDocumentSelection = createSelection(ServiceDocument);

export const ServiceDocumentReferences = createReferences(ServiceDocument, ServiceDocumentSelection);
