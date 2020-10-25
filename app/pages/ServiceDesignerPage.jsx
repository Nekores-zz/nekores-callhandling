import React, { Component } from "react";
import { translate } from "react-i18next";

import { ServiceDesignerComponent } from "components/ServiceDesigner";
import CallCareNodeDialog from "../components/ServiceDesigner/NodeDialogs/CallCareNodeDialog";
import CallCarePlayNodeDialog from "../components/ServiceDesigner/NodeDialogs/CallCarePlayNodeDialog";
import TimeDateNodeDialog from "../components/ServiceDesigner/NodeDialogs/TimeDateNodeDialog";
import DialNodeDialog from "../components/ServiceDesigner/NodeDialogs/DialNodeDialog";
import GotoNodeDialog from "../components/ServiceDesigner/NodeDialogs/GotoNodeDialog";
import MenuNodeDialog from "../components/ServiceDesigner/NodeDialogs/MenuNodeDialog";
import PlayNodeDialog from "../components/ServiceDesigner/NodeDialogs/PlayNodeDialog";
import RecordVoiceNodeDialog from "../components/ServiceDesigner/NodeDialogs/RecordVoiceNodeDialog";

import { accounts } from "config/accountsMockData";
import { listSearchable } from "config/utils";
import {
  callcarePlayNodeFormInfo,
  recordVoiceNodeFormInfo,
  variableOptions,
  nodes,
  users,
  currentUserId,
  callCareConfig,
  dialConfig,
  gotoConfig,
  menuConfig,
  timeConfig,
  playConfig,
  recordVoiceConfig
} from "config/serviceDesignerMockData";
import { nodeTypes } from "ServiceDesigner";
import { getMockSearchable } from "config/mockSearchable";
import {
  audioFiles,
  audioSets,
  getPlayUrl,
  onCreateAudioFile,
  getAudioSetFromId
} from "config/audioMockData";
import { numbersManagementList as numbers } from "config/numbersMockData";
import { services, versions } from "config/servicesMockData";

class ServiceDesignerPage extends Component {
  getCallcareNodeFormInfo = formInfo => {
    console.log("Calling callcarePlayNodeFormInfo");
    return new Promise((resolve, reject) => {
      resolve(formInfo());
    });
  };

  getRecordVoiceNodeFormInfo = formInfo => {
    console.log("Calling recordVoiceNodeFormInfo");
    return new Promise((resolve, reject) => {
      resolve(formInfo());
    });
  };

  state = {
    searchableAudioFiles: getMockSearchable(audioFiles, () =>
      this.setState({ searchableAudioFiles: this.state.searchableAudioFiles })
    ),
    searchableAudioSets: getMockSearchable(audioSets, () =>
      this.setState({ searchableAudioSets: this.state.searchableAudioSets })
    ),
    searchableVariableOptions: getMockSearchable(variableOptions, () =>
      this.setState({ searchableVariableOptions: this.state.searchableVariableOptions })
    ),
    searchableNumbers: getMockSearchable(
      numbers.map(item => ({ id: item.id, name: item.number })),
      () => this.setState({ searchableNumbers: this.state.searchableNumbers })
    ),
    searchableNodes: getMockSearchable(
      nodes.map(item => ({ ...item, id: item.id, name: item.name })),
      () => this.setState({ searchableNodes: this.state.searchableNodes })
    ),
    searchableServices: getMockSearchable(services, () =>
      this.setState({ searchableServices: this.state.searchableServices })
    ),
    searchableVersions: getMockSearchable(
      versions.map(item => ({
        ...item,
        id: item.id,
        name: this.props.t("versionName", item.versionNumber)
      })),
      () => this.setState({ searchableVersions: this.state.searchableVersions })
    )
  };

  getFileUploadMeta = () => {
    return {
      fieldName: "files",
      apiRequestContext: "",
      apiUrl: "https://hubbub.free.beeceptor.com/audio/upload"
    };
  };

  nodeDialogsByNodeTypes = {
    callcare: (node, callbackOnSubmit) => (
      <CallCareNodeDialog
        node={node}
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve(config))}
        loadConfig={nodeId => {
          console.log(nodeId);
          return new Promise(resolve => resolve(callCareConfig()));
        }}
        listSearchable={listSearchable(accounts)}
      />
    ),
    callcareplay: (node, callbackOnSubmit) => (
      <CallCarePlayNodeDialog
        node={node}
        getBasicInfo={() => this.getCallcareNodeFormInfo(callcarePlayNodeFormInfo.getBasicInfoForm)}
        getGrouping={() => this.getCallcareNodeFormInfo(callcarePlayNodeFormInfo.getGroupingForm)}
        getAudioFiles={() =>
          this.getCallcareNodeFormInfo(callcarePlayNodeFormInfo.getAudioFilesForm)
        }
        getKeyPress={() => this.getCallcareNodeFormInfo(callcarePlayNodeFormInfo.getKeyPressForm)}
        getChildAccounts={() => accounts}
        searchableAudioFiles={this.state.searchableAudioFiles}
        searchableAudioSets={this.state.searchableAudioSets}
        getPlayUrl={getPlayUrl}
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve({}))}
        getFileUploadMeta={this.getFileUploadMeta}
        onCreateAudioFile={onCreateAudioFile}
        getAudioSetFromId={getAudioSetFromId}
      />
    ),
    "time-date": (node, callbackOnSubmit) => (
      <TimeDateNodeDialog
        node={node}
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve(config))}
        loadConfig={nodeId => {
          console.log(nodeId);
          return new Promise(resolve => resolve(timeConfig()));
        }}
      />
    ),
    dial: (node, callbackOnSubmit) => (
      <DialNodeDialog
        node={node}
        searchableVariableOptions={this.state.searchableVariableOptions}
        searchableNumbers={this.state.searchableNumbers}
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve(config))}
        loadConfig={nodeId => {
          console.log(nodeId);
          return new Promise(resolve => resolve(dialConfig()));
        }}
      />
    ),
    "multi-dial": (node, callbackOnSubmit) => (
      <DialNodeDialog
        node={node}
        searchableVariableOptions={this.state.searchableVariableOptions}
        searchableNumbers={this.state.searchableNumbers}
        multiDial={true}
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve(config))}
        loadConfig={nodeId => {
          console.log(nodeId);
          return new Promise(resolve => resolve(dialConfig()));
        }}
      />
    ),
    "go-to-node": (node, callbackOnSubmit) => (
      <GotoNodeDialog
        node={node}
        searchableNodes={this.state.searchableNodes}
        searchableServices={this.state.searchableServices}
        searchableVersions={this.state.searchableVersions}
        nodeTypes={nodeTypes}
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve(config))}
        loadConfig={nodeId => {
          console.log(nodeId);
          return new Promise(resolve => resolve(gotoConfig()));
        }}
      />
    ),
    menu: (node, callbackOnSubmit) => (
      <MenuNodeDialog
        node={node}
        getPlayUrl={getPlayUrl}
        searchableAudioFiles={this.state.searchableAudioFiles}
        searchableAudioSets={this.state.searchableAudioSets}
        getFileUploadMeta={this.getFileUploadMeta}
        onCreateAudioFile={onCreateAudioFile}
        getAudioSetFromId={getAudioSetFromId}
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve(config))}
        loadConfig={nodeId => {
          console.log(nodeId);
          return new Promise(resolve => resolve(menuConfig()));
        }}
      />
    ),
    play: (node, callbackOnSubmit) => (
      <PlayNodeDialog
        node={node}
        getPlayUrl={getPlayUrl}
        searchableAudioFiles={this.state.searchableAudioFiles}
        searchableAudioSets={this.state.searchableAudioSets}
        getFileUploadMeta={this.getFileUploadMeta}
        onCreateAudioFile={onCreateAudioFile}
        getAudioSetFromId={getAudioSetFromId}
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve(config))}
        loadConfig={nodeId => {
          console.log(nodeId);
          return new Promise(resolve => resolve(playConfig()));
        }}
      />
    ),
    "record-voice": (node, callbackOnSubmit) => (
      <RecordVoiceNodeDialog
        node={node}
        getRecording={() =>
          this.getRecordVoiceNodeFormInfo(recordVoiceNodeFormInfo.getRecordingForm)
        }
        getTarget={() => this.getRecordVoiceNodeFormInfo(recordVoiceNodeFormInfo.getTargetForm)}
        getInitialMessage={() =>
          this.getRecordVoiceNodeFormInfo(recordVoiceNodeFormInfo.getInitialMessageForm)
        }
        getOtherOptions={() =>
          this.getRecordVoiceNodeFormInfo(recordVoiceNodeFormInfo.getOtherOptionsForm)
        }
        callbackOnSubmit={callbackOnSubmit}
        handleNodeConfig={config => new Promise(resolve => resolve({config}))}
        loadConfig={nodeId => {
          console.log(nodeId);
          return new Promise(resolve => resolve(recordVoiceConfig()));
        }}
        getAudioSetFromId={getAudioSetFromId}
        getPlayUrl={getPlayUrl}
        searchableAudioFiles={this.state.searchableAudioFiles}
        searchableAudioSets={this.state.searchableAudioSets}
        getFileUploadMeta={this.getFileUploadMeta}
        onCreateAudioFile={onCreateAudioFile}
      />
    )
    // access: AccessNodeDialog,
    // "access-control": AccessControlNodeDialog,
    // menu: MenuNodeDialog,
    // queue: QueueNodeDialog,
    // "call-dialing": CallDialingNodeDialog
  };

  processAction = action => {
    // console.log("***Start Action***");
    // console.log(JSON.stringify(action));
    // console.log("***End Action***");
  };

  documentHistory = undefined;

  render() {
    return (
      <ServiceDesignerComponent
        processAction={this.processAction}
        actions={Array()}
        documentHistory={this.documentHistory}
        nodeDialogsByNodeTypes={this.nodeDialogsByNodeTypes}
        nodeTypes={nodeTypes}
        users={users}
        currentUserId={currentUserId}
      />
    );
  }
}

export default translate("servicedesigner")(ServiceDesignerPage);
