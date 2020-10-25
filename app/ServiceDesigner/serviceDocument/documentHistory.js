const historyLimit = 100;

const initDocumentHistory = (initial) => ({
  initial: initial,
  actions: [],
  version: 0,
  document: initial,
});

const applyAction = (applyActionToDocument, action) => (documentHistory) => {
  let actions = [...documentHistory.actions.slice(0, documentHistory.version), action];
  let version = documentHistory.version + 1;
  let document = applyActionToDocument(documentHistory.document, action);
  // console.log({documentHistory, action, document});
  return document !== documentHistory.document ? limitHistory({...documentHistory, actions, version, document}, historyLimit, applyActionToDocument) : documentHistory;
};

const getDocumentVersion = (applyActionToDocument, documentHistory, version) => {
  return documentHistory.actions.slice(0, version).flat().reduce(applyActionToDocument, documentHistory.initial);
};

const setDocumentHistoryVersion = (applyActionToDocument, documentHistory, version) => {
  if (version < 0 && version > documentHistory.actions.length) {
    return documentHistory;
  }
  let document = getDocumentVersion(applyActionToDocument, documentHistory, version);
  return {
    ...documentHistory,
    version,
    document,
  };
};

const limitHistory = (documentHistory, limit, applyActionToDocument) => {
  let skipCount = documentHistory.actions.length - limit;
  return skipCount > 0 ? {
    ...documentHistory,
    initial: getDocumentVersion(applyActionToDocument, documentHistory, skipCount),
    actions: documentHistory.actions.slice(skipCount),
    version: documentHistory.version - skipCount,
  } : documentHistory;
};

const canUndo = (documentHistory) => documentHistory.version > 0;
const canRedo = (documentHistory) => documentHistory.version < documentHistory.actions.length;
const undo = (applyActionToDocument) => (documentHistory) => setDocumentHistoryVersion(applyActionToDocument, documentHistory, documentHistory.version - 1);
const redo = (applyActionToDocument) => (documentHistory) => setDocumentHistoryVersion(applyActionToDocument, documentHistory, documentHistory.version + 1);

export const DocumentHistory = {
  create: initDocumentHistory, applyAction, getDocumentVersion, setDocumentHistoryVersion,
  limitHistory, canUndo, canRedo, undo, redo,
};
