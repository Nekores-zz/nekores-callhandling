import { objects } from "../../utils/objects";

/*Moved from serviceDocument.js, Below functions are used from Nashorn using Scala*/
export const applyChanges = (serviceDocument, { changes }) =>
  objects.zip(serviceDocument, changes, (items, itemsChanges, type) =>
    objects.fold(
      (items, itemChanges, id) => {
        let item = items[id];
        return !item && itemChanges
          ? objects.withOne(items, id, itemChanges, true)
          : item && itemChanges
          ? objects.withOne(items, id, { ...item, ...itemChanges }, true)
          : item && !itemChanges
          ? objects.withoutKey(items, id)
          : items;
      },
      { ...items }
    )(itemsChanges)
  );

const serviceDocumentActions = { applyChanges };

export const applyAction = (serviceDocument, action) => {
  return action ? serviceDocumentActions[action.key](serviceDocument, action) : serviceDocument;
};
