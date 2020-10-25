/**
 * This file used by Nashorn using scala from services management server. Note: It is not used in frontend code.
 */
import { DocumentHistory } from "./../ServiceDesigner/serviceDocument/documentHistory";
import { serviceDocument } from "./../config/serviceDesignerMockData";
import { applyAction } from "./../ServiceDesigner/serviceDocument/applyChanges";

/**
 * Create initial document history
 * @returns {string}
 */
export const create = () => JSON.stringify(DocumentHistory.create(serviceDocument));

/**
 * Process batch of actions and return document history after applying all the actions
 * @param documentHistory return json presentation of Javascript object.
 * @param actions
 * @returns {string}
 */
export const applyActionFromScala = (documentHistory, actions) => {
  return JSON.stringify(
    Array.prototype.reduce.call(
      actions,
      (_documentH, action) =>
        DocumentHistory.applyAction(applyAction, JSON.parse(action))(_documentH),
      JSON.parse(documentHistory)
    )
  );
};
