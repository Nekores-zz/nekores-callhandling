import React, { Component, memo, useMemo } from "react";
import {
  ServiceDocument,
  applyAction,
  nodeTypes,
  DocumentHistory,
  ServiceDesigner,
  ServiceDesignerContent,
  Layout,
  TopPanel,
  ToolsPanel,
  TabsPanel,
  Editor
} from "ServiceDesigner";
import { NodeDialog } from "components/ServiceDesigner/NodeDialogs";
import { versions, pages, serviceDocument, } from "config/serviceDesignerMockData";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

class ServiceDesignerComponent extends Component {
  static propTypes = {
    nodeDialogsByNodeTypes: PropTypes.object.isRequired,
    processAction: PropTypes.func, //Process action
    actions: PropTypes.array, //Actions that were stored in localstorage
    documentHistory: PropTypes.object, //Reload document from DB/Entity
    updateConfig: PropTypes.func,
    config: PropTypes.object
  };

  state = {
    versions,
    versionId: "1",
    pages,
    pageId: "1",
    documentHistory:
      /*(this.props.documentHistory &&
        this.props.documentHistory.document &&
        DocumentHistory.create(this.props.documentHistory.document)) ||*/
      DocumentHistory.create(serviceDocument),
    dialog: null,
  };

  componentDidMount() {
    /**
     * Recover actions after crash/close/reload
     * */
    const documentHistory = this.props.actions.reduce(
      (accumulator, action) => DocumentHistory.applyAction(applyAction, action)(accumulator),
      this.state.documentHistory
    );
    this.setState({
      documentHistory: documentHistory
    });

    window.storeDocumentHistory = storeDocumentHistory(this)
    window.loadDocumentHistory = loadDocumentHistory(this)
  }

  handleAction = action => {
    let documentHistory = DocumentHistory.applyAction(applyAction, action)(
      this.state.documentHistory
    );
    documentHistory.version !== this.state.documentHistory.version &&
      action &&
      this.props.processAction({ actionSeqNo: documentHistory.version, ...action });
    this.setState({ documentHistory });
  };

  handleUndo = () => {
    let documentHistory = DocumentHistory.undo(applyAction)(this.state.documentHistory);
    this.setState({ documentHistory });
  };

  handleRedo = () => {
    let documentHistory = DocumentHistory.redo(applyAction)(this.state.documentHistory);
    this.setState({ documentHistory });
  };

  handleOpenNodeDialog = nodeId => {
    let node = this.state.documentHistory.document.nodes[nodeId];
    let close = () => this.setState({ dialog: null });
    let dialog = (
      <NodeDialog
        node={node}
        nodeType={nodeTypes[node.nodeType]}
        nodeDialogsByNodeTypes={this.props.nodeDialogsByNodeTypes}
        onClose={close}
      />
    );
    this.setState({ dialog });
  };

  render() {
    let { documentHistory, pages, pageId, versions, versionId, dialog, } = this.state;
    let { users, currentUserId } = this.props;
    return (
      <ServiceDesigner
        serviceDocument={documentHistory.document}
        onAction={this.handleAction}
        nodeTypes={nodeTypes}
        users={users}
        currentUserId={currentUserId}
        onOpenNodeDialog={this.handleOpenNodeDialog}
      >
        <Layout
          topPanel={
            <TopPanel
              canUndo={DocumentHistory.canUndo(documentHistory)}
              canRedo={DocumentHistory.canRedo(documentHistory)}
              undo={this.handleUndo}
              redo={this.handleRedo}
            />
          }
          leftPanel={<ToolsPanel />}
          rightPanel={
            <TabsPanel pageId={pageId} pages={pages} versions={versions} versionId={versionId} />
          }
          content={
            <Editor>
              <ServiceDesignerContent />
            </Editor>
          }
        />
        {dialog}
      </ServiceDesigner>
    );
  }
}

export default translate("security")(ServiceDesignerComponent);

function storeDocumentHistory(component) {
  return () => {
    let json = JSON.stringify(component.state.documentHistory)
    console.log({ json })
    localStorage.setItem('serviceDesigner-documentHistory', json)
  }
}

function loadDocumentHistory(component) {
  return () => {
    let json = localStorage.getItem('serviceDesigner-documentHistory')
    if (json) {
      console.log({ json })
      let documentHistory = JSON.parse(json)
      component.setState({ documentHistory })
    }
  }
}
