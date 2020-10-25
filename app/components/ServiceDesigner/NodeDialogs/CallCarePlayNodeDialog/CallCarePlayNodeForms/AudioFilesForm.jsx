import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import {
  FormControlLabel,
  Checkbox,
  Radio,
  Button,
  withStyles,
  TextField
} from "@material-ui/core";
import { PrimaryTextLink, IconButton, Icon, PrimaryText } from "components/Elements";
import { Pending, ConfirmButtons } from "components";
import { Box, Column, Row, Stretch, Tooltip, TooltipContent, Text } from "components/LayoutElements";
import * as formFields from "../../../api/serviceDesigner";
import AddAudioFileDialog from "../AddAudioFileDialog";
import SearchableAudioFileRow from "../SearchableAudioFileRow";

const AddStateForm = ({ props }) => {
  return (
    <Column stretch padding>
      <Row />
    </Column>
  );
};
const styleSheet = theme => ({
  audioFilesListHeader: {
    position: "relative",
    background: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.secondaryBlue}`
  },

  listActionButton: {
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.white}`,
    marginLeft: 10
  },

  actionButtonIcon: {
    fontSize: "1.5em"
  },

  audioFileItem: {
    background: "#eee",
    border: `1px solid ${theme.colors.primary.lightGrey}`
  },

  setupLink: {
    padding: 0,
    margin: 0,
    marginLeft: 16
    // position: "absolute",
    // right: 0,
    // top: "calc(50% - 19px)"
  },

  tooltipOverridden: {
    padding: theme.spacing.unit * 2,
    fontSize: "1em"
  },

  information: {
    cursor: "pointer",
    // paddingTop: 6,
    paddingLeft: 8,
    position: "relative",
    top: 3,
    fontSize: "1.5em"
  },

  addStateForm: {
    background: "#eee"
  },

  descriptionLink: {
    padding: 0,
    margin: 0
  }
});

class AudioFilesForm extends Component {
  static propTypes = {
    panelIndex: PropTypes.number, // should be set on creation mode
    data: PropTypes.shape({
      getAudioFiles: PropTypes.func,
      getPlayUrl: PropTypes.func,
      getAudioSetFromId: PropTypes.func
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_CCP_AUDIO_FILES
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    audioFiles: {
      systemAudioFiles: [],
      manualAudioFiles: []
    },
    diode: {
      loading: true,
      error: null,
      data: null
    },
    addAudioFileDialog: null,
    audioPlayerInstance: {
      currentPlayingFile: null,
      position: 0,
      playState: "stop"
    },
    newState: {
      name: "",
      description: "",
      showAddState: false,
      showDescription: false
    }
  };

  updateState = (setter, value) => this.setState({ grouping: setter(value) });

  handleChange = setter => event => this.updateState(setter, event.target.value);

  handleRefresh = () => {
    this.setState({ audioFiles: { ...this.state.audioFiles, manualAudioFiles: [] } });
  };

  handleShowAddState = () => {
    const { newState } = this.state;
    newState.showAddState = true;
    this.setState({ newState });
  };

  handleCancelAddState = () => {
    const { newState } = this.state;
    newState.showAddState = false;
    this.setState({ newState });
  };

  handleChangeStateName = event => {
    const { newState } = this.state;
    newState.name = event.target.value;
    this.setState({ newState });
  };

  handleChangeStateDescription = event => {
    const { newState } = this.state;
    newState.description = event.target.value;
    this.setState({ newState });
  };

  handleToggleAddDescription = () => {
    const { newState } = this.state;
    newState.showDescription = !newState.showDescription;
    this.setState({ newState });
  };

  handleAddState = () => {
    const { newState, audioFiles } = this.state;
    const { manualAudioFiles } = audioFiles;
    newState.showAddState = false;

    manualAudioFiles.push({
      title: newState.name,
      description: newState.description,
      audioFile: null
    });
    this.setState({ newState, audioFiles: { ...this.state.audioFiles, manualAudioFiles } });
  };

  handleSetupAudioFile = audioFile => () => {
    this.setState({
      addAudioFileDialog: audioFile
    });
  };

  handleRemoveAudioFile = audioFile => () => {
    audioFile.audioFile = null;
  };

  handleSaveSetupAudioFile = audioFile => {
    const { addAudioFileDialog } = this.state;
    const { systemAudioFiles, manualAudioFiles } = this.state.audioFiles;
    const systemIndex = systemAudioFiles.findIndex(item => item === addAudioFileDialog);
    const manualIndex = manualAudioFiles.findIndex(item => item === addAudioFileDialog);

    if (systemIndex !== -1) systemAudioFiles[systemIndex].audioFile = { ...audioFile };
    else if (manualIndex !== -1) manualAudioFiles[manualIndex].audioFile = { ...audioFile };

    this.setState({
      addAudioFileDialog: null,
      audioFiles: {
        systemAudioFiles: [...systemAudioFiles],
        manualAudioFiles: [...manualAudioFiles]
      }
    });
  };

  handleCloseSetupAudioFile = () => {
    this.setState({ addAudioFileDialog: null });
  };

  componentDidMount() {
    this.promiseToDiode();
  }

  componentDidUpdate() {
    if (this.player) this.player.addEventListener("canplay", this.handleCanPlay);
  }

  // audioPlayer events
  handleCanPlay = () => {
    this.player.addEventListener("timeupdate", this.handleTimeUpdate);
    this.player.addEventListener("ended", this.handleTimeEnd);
  };

  handleTimeUpdate = () => {
    const { audioPlayerInstance } = this.state;
    audioPlayerInstance.position = this.player.currentTime;
    this.setState({ audioPlayerInstance });
  };

  handleTimeEnd = () => {
    const { audioPlayerInstance } = this.state;
    this.player.currentTime = 0;
    this.player.pause();

    audioPlayerInstance.position = 0;
    audioPlayerInstance.playState = "stop";
    this.setState({ audioPlayerInstance });
  };

  handlePlayPause = fileId => {
    const { audioPlayerInstance } = this.state;

    if (audioPlayerInstance.currentPlayingFile === fileId) {
      audioPlayerInstance.playState =
        audioPlayerInstance.playState === "playing" ? "pause" : "playing";
    } else {
      audioPlayerInstance.currentPlayingFile = fileId;
      audioPlayerInstance.playState = "playing";
      audioPlayerInstance.position = 0;
      if (this.player) {
        this.player.currentTime = 0;
      }
    }

    if (this.player) {
      switch (audioPlayerInstance.playState) {
        case "playing":
          this.player.play();
          break;
        case "pause":
          this.player.pause();
          break;
        case "stop":
          this.player.stop();
          audioPlayerInstance.position = 0;
          this.player.currentTime = 0;
          break;
      }
    }

    this.setState({ audioPlayerInstance });
  };

  handleChangePosition = position => {
    const { audioPlayerInstance } = this.state;
    audioPlayerInstance.position = position;
    if (this.player) {
      this.player.currentTime = parseFloat(position);
    }
    this.setState({ audioPlayerInstance });
  };
  // end of audioPlayer events

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  revertToServer = () => this.promiseToDiode();

  promiseToDiode = () => {
    this.props.data
      .getAudioFiles()
      .then(audioFiles =>
        this.setState({
          audioFiles,
          diode: { loading: false, data: audioFiles }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  renderForm = audioFiles => () => {
    const { panelIndex, classes, t } = this.props;
    const { systemAudioFiles, manualAudioFiles } = audioFiles;
    const { addAudioFileDialog, audioPlayerInstance, newState } = this.state;

    return (
      <Column stretch>
        <audio ref={node => (this.player = node)} controls={true} preload="auto" hidden={true}>
          <source
            src={this.props.data.getPlayUrl(audioPlayerInstance.currentPlayingFile)}
            type="audio/mp3"
          />
        </audio>
        {/* <Row>
          <Row paddingHalf paddingLeft classes={{ box: classes.audioFilesListHeader }}>
            <Box>
              {t("systemAudioFiles", {
                count: systemAudioFiles.length
              })}
            </Box>
            <Stretch />
            <Box>
              <Button
                onClick={this.handleRefresh}
                classes={{ root: classes.listActionButton }}
                variant="outlined"
                color="inherit"
              >
                {t("refresh")}
              </Button>
            </Box>
          </Row>
        </Row> */}
        {systemAudioFiles.map((item, key) => (
          <Row paddingTop key={key}>
            <Row>
              <Column>
                <Row paddingHalf paddingLeft classes={{ box: classes.audioFileItem }}>
                  <PrimaryText>{item.title}</PrimaryText>
                  <Stretch />
                  <Tooltip
                    content={<TooltipContent title={item.title} text={item.description} />}
                    placement="top"
                    classes={{ tooltipTop: classes.tooltipOverridden }}
                  >
                    <Text className={classes.information}>
                      <Icon>info</Icon>
                    </Text>
                  </Tooltip>
                  {item.audioFile ? (
                    <PrimaryTextLink
                      className={classes.setupLink}
                      onClick={this.handleRemoveAudioFile(item)}
                    >
                      {t("remove")}
                    </PrimaryTextLink>
                  ) : (
                    <PrimaryTextLink
                      className={classes.setupLink}
                      onClick={this.handleSetupAudioFile(item)}
                    >
                      {t("setUp")}
                    </PrimaryTextLink>
                  )}
                </Row>
                {item.audioFile && (
                  <Row>
                    <SearchableAudioFileRow
                      audioFile={item.audioFile}
                      audioPlayerInstance={{
                        ...audioPlayerInstance,
                        duration: this.player.duration
                      }}
                      onPlayPause={this.handlePlayPause}
                      onChangePosition={this.handleChangePosition}
                      getAudioSetFromId={this.props.data.getAudioSetFromId}
                    />
                  </Row>
                )}
              </Column>
            </Row>
          </Row>
        ))}
        <Row paddingTop>
          <Row paddingHalf paddingLeft classes={{ box: classes.audioFilesListHeader }}>
            <Box>{t("manualAudioFiles", { count: manualAudioFiles.length })}</Box>
            <Stretch />
            <Box>
              <Button
                onClick={this.handleRefresh}
                classes={{ root: classes.listActionButton }}
                variant="outlined"
                color="inherit"
              >
                <Icon className={classes.actionButtonIcon}>refresh</Icon>&nbsp;&nbsp;
                {t("refresh")}
              </Button>
              <Button
                onClick={this.handleShowAddState}
                classes={{ root: classes.listActionButton }}
                variant="outlined"
                color="inherit"
              >
                <Icon className={classes.actionButtonIcon}>add_to_queue</Icon>&nbsp;&nbsp;
                {t("addState")}
              </Button>
            </Box>
          </Row>
        </Row>
        {newState.showAddState && (
          <Row paddingTop>
            <Column padding classes={{ box: classes.addStateForm }}>
              <Row>
                <TextField
                  value={newState.name}
                  onChange={this.handleChangeStateName}
                  // className={classes.textField}
                  label={t("stateName")}
                  // error={true}
                  // helperText={t("stateNameNeedsToMatchUploadedData")}
                  fullWidth
                />
              </Row>
              <Row paddingTopHalf paddingBottom>
                <Text variant="errorMessage">
                  <Icon>warning</Icon> &nbsp;{t("stateNameNeedsToMatchUploadedData")}
                </Text>
              </Row>
              {newState.showDescription && (
                <Row>
                  <TextField
                    value={newState.description}
                    onChange={this.handleChangeStateDescription}
                    // className={classes.textField}
                    label={t("stateDescription")}
                    fullWidth
                  />
                </Row>
              )}
              <Row>
                <PrimaryTextLink
                  className={classes.descriptionLink}
                  onClick={this.handleToggleAddDescription}
                >
                  {t(newState.showDescription ? "hideDescription" : "addDescription")}
                </PrimaryTextLink>
              </Row>
              <Row>
                <ConfirmButtons
                  className={classes.buttons}
                  confirmLabel={t("createState")}
                  onConfirm={this.handleAddState}
                  onCancel={this.handleCancelAddState}
                  blocked={!newState.name}
                />
              </Row>
            </Column>
          </Row>
        )}
        {manualAudioFiles.map((item, key) => (
          <Row paddingTop key={key}>
            <Row>
              <Column>
                <Row paddingHalf paddingLeft classes={{ box: classes.audioFileItem }}>
                  <PrimaryText>{item.title}</PrimaryText>
                  <Stretch />
                  <Tooltip
                    content={<TooltipContent title={item.title} text={item.description} />}
                    placement="top"
                    classes={{ tooltipTop: classes.tooltipOverridden }}
                  >
                    <Text className={classes.information}>
                      <Icon>info</Icon>
                    </Text>
                  </Tooltip>
                  {item.audioFile ? (
                    <PrimaryTextLink
                      className={classes.setupLink}
                      onClick={this.handleRemoveAudioFile(item)}
                    >
                      {t("remove")}
                    </PrimaryTextLink>
                  ) : (
                    <PrimaryTextLink
                      className={classes.setupLink}
                      onClick={this.handleSetupAudioFile(item)}
                    >
                      {t("setUp")}
                    </PrimaryTextLink>
                  )}
                </Row>
                {item.audioFile && (
                  <Row>
                    <SearchableAudioFileRow
                      audioFile={item.audioFile}
                      audioPlayerInstance={{
                        ...audioPlayerInstance,
                        duration: this.player.duration
                      }}
                      onPlayPause={this.handlePlayPause}
                      onChangePosition={this.handleChangePosition}
                      getAudioSetFromId={this.props.data.getAudioSetFromId}
                    />
                  </Row>
                )}
              </Column>
            </Row>
          </Row>
        ))}

        {addAudioFileDialog && (
          <AddAudioFileDialog
            audioFile={addAudioFileDialog}
            searchableAudioFiles={this.props.data.searchableAudioFiles}
            searchableAudioSets={this.props.data.searchableAudioSets}
            onSave={this.handleSaveSetupAudioFile}
            onClose={this.handleCloseSetupAudioFile}
            audioPlayerInstance={{
              ...this.state.audioPlayerInstance,
              duration: this.player.duration
            }}
            onPlayPause={this.handlePlayPause}
            onChangePosition={this.handleChangePosition}
            getPlayUrl={this.props.data.getPlayUrl}
            getFileUploadMeta={this.props.data.getFileUploadMeta}
            onCreateAudioFile={this.props.data.onCreateAudioFile}
            getAudioSetFromId={this.props.data.getAudioSetFromId}
          />
        )}
      </Column>
    );
  };

  render = () => {
    const { diode, audioFiles } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(audioFiles)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "AudioFilesForm" })(
  translate(["servicedesigner", "callcare", "common"])(AudioFilesForm)
);
