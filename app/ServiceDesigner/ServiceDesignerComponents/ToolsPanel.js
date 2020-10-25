import React, {PureComponent,} from 'react';
import PropTypes from 'prop-types';
import {ToolsPanel as ToolsPanelContainer, ToolsPanelButton, Divider, PointerIcon, SelectionIcon, CopyIcon, PasteIcon, RemoveIcon, FlipToFrontIcon, FlipToBackIcon, CommentIcon, LinkIcon} from '../components';
import {functions, observables, arrays, objects, geometry, events, debug} from '../utility';
import {withServiceDesigner} from './ServiceDesigner';
import { Selection } from '../editor';

export const ToolsPanel = withServiceDesigner(
  observables.withGetObservable(
    ({ serviceDesigner, ...props }) => {
      let { params, selection, links, emitEvent } = serviceDesigner
      return observables.distinctMapToObject(
        (params, isSelectionEmpty, clipboardContent, isAutoLinkLayoutEnabled) => ({
          editorMode: params.editorMode,
          emitEvent,
          clipboardContent,
          isAutoLinkLayoutEnabled,
          isSelectionEmpty,
        }),
        params,
        selection.isEmpty,
        serviceDesigner.serviceDesigner.clipboard,
        links.isAutoLinkLayoutEnabled,
      );
    },
    class ToolsPanel extends PureComponent {
      handleAutoLinkLayout = (event) => this.props.emitEvent('autoLinkLayout', event)
      handleDefaultMode = (event) => !!this.props.editorMode && this.props.emitEvent('defaultMode')
      handleLassoMode = (event) => this.props.emitEvent('lassoMode', this.props.editorMode !== 'lasso')
      handleCommentMode = (event) => this.props.emitEvent('commentMode', this.props.editorMode !== 'comment')
      handleCopySelection = (event) => this.props.emitEvent('copySelection')
      handlePasteSelection = (event) => this.props.emitEvent('pasteSelection')
      handleRemoveSelection = (event) => this.props.emitEvent('removeSelection')
      handleFlipSelectionToFront = (event) => this.props.emitEvent('flipSelectionToFront')
      handleFlipSelectionToBack = (event) => this.props.emitEvent('flipSelectionToBack')
      render() {
        let { isAutoLinkLayoutEnabled, editorMode, isSelectionEmpty, clipboardContent } = this.props;
        return (
          <ToolsPanelContainer>
            <ToolsPanelButton hint={'Pointer tool'} icon={PointerIcon} isActive={!editorMode} onClick={this.handleDefaultMode}/>
            <ToolsPanelButton hint={'Selection tool'} icon={SelectionIcon} isActive={editorMode === 'lasso'} onClick={this.handleLassoMode}/>
            <Divider/>
            <ToolsPanelButton hint={'Copy'} icon={CopyIcon} onClick={this.handleCopySelection} isDisabled={isSelectionEmpty}/>
            <ToolsPanelButton hint={'Paste'} icon={PasteIcon} onClick={this.handlePasteSelection} isDisabled={!clipboardContent}/>
            <ToolsPanelButton hint={'Remove'} icon={RemoveIcon} onClick={this.handleRemoveSelection} isDisabled={isSelectionEmpty}/>
            <ToolsPanelButton hint={'Flip to front'} icon={FlipToFrontIcon} onClick={this.handleFlipSelectionToFront} isDisabled={isSelectionEmpty}/>
            <ToolsPanelButton hint={'Flip to back'} icon={FlipToBackIcon} onClick={this.handleFlipSelectionToBack} isDisabled={isSelectionEmpty}/>
            <Divider/>
            <ToolsPanelButton hint={'Comments tool'} icon={CommentIcon} isActive={editorMode === 'comment'} onClick={this.handleCommentMode}/>
            {/* <ToolsPanelButton hint={'Auto link layout'} icon={LinkIcon} isActive={isAutoLinkLayoutEnabled} onClick={this.handleAutoLinkLayout}/> */}
          </ToolsPanelContainer>
        );
      }
    }
  )
);
