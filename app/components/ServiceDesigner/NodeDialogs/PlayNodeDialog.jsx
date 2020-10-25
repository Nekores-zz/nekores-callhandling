import React, { PureComponent, Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Grid,
  FormControlLabel,
  Button,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  withStyles
} from "@material-ui/core";
import { Icon } from "components/Elements";
import {
  Row,
  Column,
  Box,
  Select,
  Stretch,
  Text,
  TextField,
  DragAndDropRowSelector,
  RenderWithLoading
} from "components/LayoutElements";
import {
  numberPresentationOptions,
  countryCodeOptions,
  getCountryCode,
  getFormattedCode,
  timeOutOptions
} from "config/serviceDesignerMockData";
import { DiodeSearchable } from "utils/commonShapes";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddAudioFileDialog from "./CallCarePlayNodeDialog/AddAudioFileDialog";
import SearchableAudioFileRow from "./CallCarePlayNodeDialog/SearchableAudioFileRow";

const styleSheet = theme => ({
  contentWrapper: {
    padding: "0px",
    position: "relative",
    overflowY: "auto",
    height: "-webkit-fill-available",
    maxHeight: "100%"
  },

  mainForm: {
    padding: "12px 24px"
  },

  checkModeSimple: {
    background: "#eee",
    paddingLeft: "16px !important",
    marginRight: 8,
    flexGrow: 1
  },

  checkModeAdvanced: {
    background: "#eee",
    paddingLeft: "16px !important",
    marginLeft: 8,
    flexGrow: 1
  },

  createNewLink: {
    padding: 0,
    margin: 0
  },

  grid60: {
    width: "60%",
    marginRight: 16
  },

  grid100: {
    width: "100%"
  },

  paddingTopHalf: {
    paddingTop: 8
  },

  height100: {
    height: "100%"
  },

  numberRow: {
    background: "white"
  },

  searchableChipSelectorWrapper: {
    width: "100%",
    marginRight: -14
  },

  searchableChipSelector: {
    // width: "516px",
    width: "100%"
  },

  searchableChipSelectorList: {
    width: 552
  },

  searchableChipSelectorListWithRadio: {
    width: 552 - 32
  },

  searchableChipSelectorListWithPadding: {
    width: 479
  },

  searchableChipSelectorListWithRadioPadding: {
    width: 479 - 32
  },

  createVariableWrapper: {
    background: "#eee"
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    height: 40,
    marginTop: 18
  },

  numbersListHeader: {
    position: "relative",
    background: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.secondaryBlue}`
  },

  numbersList: {
    width: "100%",
    maxHeight: 230,
    overflow: "auto"
  },

  numberActionButton: {
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.white}`
  },

  expansionPanel: {
    marginTop: 1,
    marginBottom: 0,
    width: "100%",
    borderTop: `0.5px solid ${theme.colors.primary.lightGrey}`,
    borderBottom: `0.5px solid ${theme.colors.primary.lightGrey}`,
    "&:before": {
      display: "none"
    }
  },

  expansionPanelSummary: {
    minHeight: 72,
    alignItems: "center",
    "&>div": {
      alignItems: "center"
    }
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    marginTop: 18
  },

  expansionPanelDetails: {
    paddingTop: 0
  },

  formCheckboxControl: {
    width: 28,
    height: 28,
    marginLeft: 12,
    marginRight: 8
  },

  enableJumpsForm: {
    marginLeft: 36
  }
});

const PlayNodeDialog = withStyles(styleSheet, { name: "PlayNodeDialog" })(
  translate(["servicedesigner", "services", "common"])(
    class PlayNodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired,

        handleNodeConfig: PropTypes.func.isRequired, //Promise API
        loadConfig: PropTypes.func.isRequired, //Promise API
        callbackOnSubmit: PropTypes.func.isRequired,

        getPlayUrl: PropTypes.func,
        getFileUploadMeta: PropTypes.func,
        searchableAudioFiles: DiodeSearchable.isRequired,
        searchableAudioSets: DiodeSearchable.isRequired,
        onCreateAudioFile: PropTypes.func,
        getAudioSetFromId: PropTypes.func
      };

      static defaultProps = {
        numberPresentationOptions,
        countryCodeOptions,
        getCountryCode,
        getFormattedCode,
        timeOutOptions
      };

      state = {
        config: null,

        audioPlayerInstance: {
          currentPlayingFile: null,
          position: 0,
          playState: "stop"
        },
        addAudioFileDialog: null,

        showOtherOptions: false,
        jumpModeOptions: ["day", "milliSeconds"],
        delayOptions: [100, 200, 300, 400, 500]
      };

      /**
       * We should load config server and save it into state for later update
       * TODO: This function is replicated everywhere. Consider refactoring this.
       */
      componentDidMount() {
        //Load configuration from the server
        this.props
          .loadConfig(this.props.node.id)
          .then(config => {
            console.log(config);
            this.setState(
              { config: config },
              () => this.props.callbackOnSubmit(this.handleNodeConfig) //Pass function to NodeDialog so it would be trigger from there.
            );
          })
          .catch(error => this.setState({ error: error }));
      }

      // TODO: This function is replicated everywhere. Consider refactoring this.
      componentWillUnmount() {
        this.props.callbackOnSubmit(undefined);
      }

      updateConfig = config => {
        this.setState({ config: config });
      };

      handleNodeConfig = dataFromParent => {
        //Call an Api for submitting node config
        const { config } = this.state;
        const updatedConfig = config.setName(dataFromParent.name);
        return this.props.handleNodeConfig(this.props.node.id, updatedConfig.toScala());
      };

      handleChangeWithSetter = setter => value => this.updateConfig(setter(value));

      handleChangeFromEvent = setter => event =>
        this.handleChangeWithSetter(setter)(event.target.value);

      handleChangeWithStaticValue = setter => value => param =>
        this.handleChangeWithSetter(setter)(value);

      // events for addAudioFileDialog
      handleAddAudio = () => {
        this.setState({
          addAudioFileDialog: { title: "Add Audio", audioFile: null }
        });
      };

      handleRemoveAudio = audioFile => () => {
        const { audios } = this.state.config;
        audios.splice(audios.indexOf(audioFile), 1);
        this.handleChangeWithSetter(this.state.config.setAudios)(audios);
      };

      handleSaveAudio = audioFile => {
        const { audios } = this.state.config;
        audios.push({ audioFile, title: audioFile.name });
        this.setState({
          addAudioFileDialog: null
        });
        this.handleChangeWithSetter(this.state.config.setAudios)(audios);
      };

      handleCloseAddAudio = () => {
        this.setState({ addAudioFileDialog: null });
      };

      // events for other options
      handleToggleOtherOptions = () => {
        this.setState({ showOtherOptions: !this.state.showOtherOptions });
      };

      handleChangeJumpMode = jumpMode => {
        this.handleChangeWithSetter(this.state.config.setJumpMode)(jumpMode);

        if (jumpMode === "milliSeconds") {
          const delayOptions = [100, 200, 300, 400, 500];
          const delay = 500;

          this.setState({ delayOptions });
          this.handleChangeWithSetter(this.state.config.setDelay)(delay);
        }
      };

      handleChangeDelay = delay => {
        this.handleChangeWithSetter(this.state.config.setDelay)(delay);
      };

      handleChangeInjectDelay = injectDelay => {
        this.handleChangeWithSetter(this.state.config.setInjectDelay)(injectDelay);
      };

      // Drag-n-Drop component event handler
      onDragEnd = result => {
        if (!result.destination || result.destination.index === result.source.index) {
          return;
        }

        const audios = this.reorder(
          this.state.audios,
          result.source.index,
          result.destination.index
        );

        this.setState({ audios });
      };

      reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
      };

      // audioPlayer events
      componentDidUpdate() {
        if (this.player) this.player.addEventListener("canplay", this.handleCanPlay);
      }

      handleCanPlay = () => {
        this.player.addEventListener("timeupdate", this.handleTimeUpdate);
        this.player.addEventListener("ended", this.handleTimeEnd);
      };

      handleTimeUpdate = () => {
        const { audioPlayerInstance } = this.state;
        audioPlayerInstance.position = this.player.currentTime;
        this.setState({ audioPlayerInstance: { ...audioPlayerInstance } });
      };

      handleTimeEnd = () => {
        const { audioPlayerInstance } = this.state;
        this.player.currentTime = 0;
        this.player.pause();

        audioPlayerInstance.position = 0;
        audioPlayerInstance.playState = "stop";
        this.setState({ audioPlayerInstance: { ...audioPlayerInstance } });
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

        this.setState({ audioPlayerInstance: { ...audioPlayerInstance } });
      };

      handleChangePosition = position => {
        const { audioPlayerInstance } = this.state;
        audioPlayerInstance.position = position;
        if (this.player) {
          this.player.currentTime = parseFloat(position);
        }

        this.setState({ audioPlayerInstance: { ...audioPlayerInstance } });
      };
      // end of audioPlayer events

      renderContent = config => {
        const { addAudioFileDialog, audioPlayerInstance } = this.state;
        const { classes, t } = this.props;
        const {
          audios,
          detectKeyPress,
          preventCaller,
          flushOnInterrupt,
          flushAfterPlay,
          enableBackwardForwardJumps,
          injectDelayBetweenPlays,
          jumpMode,
          delay,
          backwardsKey,
          forwardsKey,
          injectDelay
        } = config;
        const { showOtherOptions, jumpModeOptions, delayOptions } = this.state;

        return (
          <div className={classes.contentWrapper}>
            <audio ref={node => (this.player = node)} controls={true} preload="auto" hidden={true}>
              <source
                src={this.props.getPlayUrl(audioPlayerInstance.currentPlayingFile)}
                type="audio/mp3"
              />
            </audio>
            {addAudioFileDialog && (
              <AddAudioFileDialog
                audioFile={addAudioFileDialog}
                searchableAudioFiles={this.props.searchableAudioFiles}
                searchableAudioSets={this.props.searchableAudioSets}
                onSave={this.handleSaveAudio}
                onClose={this.handleCloseAddAudio}
                audioPlayerInstance={{
                  ...audioPlayerInstance,
                  duration: this.player.duration
                }}
                onPlayPause={this.handlePlayPause}
                onChangePosition={this.handleChangePosition}
                getPlayUrl={this.props.getPlayUrl}
                getFileUploadMeta={this.props.getFileUploadMeta}
                onCreateAudioFile={this.props.onCreateAudioFile}
                getAudioSetFromId={this.props.getAudioSetFromId}
              />
            )}
            <Column stretch paddingTop>
              <Row classes={{ box: classes.mainForm }}>
                <Column>
                  <Row>
                    <Row paddingHalf paddingLeft classes={{ box: classes.numbersListHeader }}>
                      <Box>{t("audiosWithCount", { count: audios.length })}</Box>
                      <Stretch />
                      <Box>
                        <Button
                          onClick={this.handleAddAudio}
                          classes={{ root: classes.numberActionButton }}
                          variant="outlined"
                          color="inherit"
                        >
                          {t("addAudio")}
                        </Button>
                      </Box>
                    </Row>
                  </Row>
                  {audios && audios.length ? (
                    <Row>
                      <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="list">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={classes.grid100}
                            >
                              <Column>
                                {audios.map((item, key) => (
                                  <Draggable draggableId={String(key)} index={key} key={key}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={clsx(
                                          classes.grid100,
                                          // classes.height100,
                                          classes.paddingTopHalf
                                        )}
                                      >
                                        <Row borderHalf classes={{ box: classes.numberRow }}>
                                          <DragAndDropRowSelector>
                                            <SearchableAudioFileRow
                                              audioFile={item.audioFile}
                                              audioPlayerInstance={{
                                                ...audioPlayerInstance,
                                                duration: this.player.duration
                                              }}
                                              onPlayPause={this.handlePlayPause}
                                              onChangePosition={this.handleChangePosition}
                                              getAudioSetFromId={this.props.getAudioSetFromId}
                                            />
                                          </DragAndDropRowSelector>
                                        </Row>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </Column>
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </Row>
                  ) : null}
                </Column>
              </Row>
              <Row paddingTop>
                <ExpansionPanel
                  expanded={showOtherOptions}
                  onChange={this.handleToggleOtherOptions}
                  className={classes.expansionPanel}
                >
                  <ExpansionPanelSummary
                    className={classes.expansionPanelSummary}
                    expandIcon={showOtherOptions ? <Icon>remove</Icon> : <Icon>add</Icon>}
                  >
                    <Grid container direction="row" justify="space-between">
                      <Grid item>
                        <Text className={classes.heading}>{t("otherOptions")}</Text>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    <Row paddingTop>
                      <Column stretch>
                        <Row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={detectKeyPress}
                                onChange={this.handleChangeWithStaticValue(
                                  config.setDetectKeyPress
                                )(!detectKeyPress)}
                                className={classes.formCheckboxControl}
                              />
                            }
                            label={t("detectKeyPress")}
                          />
                        </Row>
                        <Row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={preventCaller}
                                onChange={this.handleChangeWithStaticValue(config.setPreventCaller)(
                                  !preventCaller
                                )}
                                className={classes.formCheckboxControl}
                              />
                            }
                            label={t("preventCallerWithKeypress")}
                          />
                        </Row>
                        <Row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={flushOnInterrupt}
                                onChange={this.handleChangeWithStaticValue(
                                  config.setFlushOnInterrupt
                                )(!flushOnInterrupt)}
                                className={classes.formCheckboxControl}
                              />
                            }
                            label={t("flushPendingKeys")}
                          />
                        </Row>
                        <Row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={enableBackwardForwardJumps}
                                onChange={this.handleChangeWithStaticValue(
                                  config.setEnableBackwardForwardJumps
                                )(!enableBackwardForwardJumps)}
                                className={classes.formCheckboxControl}
                              />
                            }
                            label={t("enableBackForwardJumps")}
                          />
                        </Row>
                        {enableBackwardForwardJumps && (
                          <Row paddingBottom>
                            <Column classes={{ box: classes.enableJumpsForm }}>
                              <Row paddingTop>
                                <Grid container spacing={16}>
                                  <Grid item xs={6}>
                                    <Select
                                      onChange={this.handleChangeJumpMode}
                                      getKey={mode => mode}
                                      renderOption={t}
                                      options={jumpModeOptions}
                                      value={jumpMode}
                                      label={t("jumpMode")}
                                      fullWidth
                                    />
                                  </Grid>
                                  {jumpMode === "milliSeconds" && (
                                    <Grid item xs={6}>
                                      <Select
                                        onChange={this.handleChangeDelay}
                                        getKey={delay => delay}
                                        options={delayOptions}
                                        value={delay}
                                        label={t(jumpMode + "Delay")}
                                        fullWidth
                                      />
                                    </Grid>
                                  )}
                                </Grid>
                              </Row>
                              <Row paddingTop>
                                <Grid container spacing={16}>
                                  <Grid item xs={3}>
                                    <TextField
                                      value={backwardsKey}
                                      onChange={this.handleChangeFromEvent(config.setBackwardsKey)}
                                      label={t("backwardsKey")}
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <TextField
                                      value={forwardsKey}
                                      onChange={this.handleChangeFromEvent(config.setForwardsKey)}
                                      label={t("forwardsKey")}
                                    />
                                  </Grid>
                                </Grid>
                              </Row>
                            </Column>
                          </Row>
                        )}
                        <Row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={flushAfterPlay}
                                onChange={this.handleChangeWithStaticValue(
                                  config.setFlushAfterPlay
                                )(!flushAfterPlay)}
                                className={classes.formCheckboxControl}
                              />
                            }
                            label={t("flushPendingKeysAfterCompleted")}
                          />
                        </Row>
                        <Row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={injectDelayBetweenPlays}
                                onChange={this.handleChangeWithStaticValue(
                                  config.setInjectDelayBetweenPlays
                                )(!injectDelayBetweenPlays)}
                                className={classes.formCheckboxControl}
                              />
                            }
                            label={t("injectDelayBetweenPlays")}
                          />
                        </Row>
                        {injectDelayBetweenPlays && (
                          <Row paddingBottom>
                            <Column classes={{ box: classes.enableJumpsForm }}>
                              <Row paddingTop>
                                <Grid container spacing={16}>
                                  <Grid item xs={6}>
                                    <Select
                                      onChange={this.handleChangeInjectDelay}
                                      getKey={delay => delay}
                                      renderOption={delay =>
                                        delay ? delay + " milli-seconds" : ""
                                      }
                                      options={delayOptions}
                                      value={injectDelay}
                                      label={t("delay")}
                                      fullWidth
                                    />
                                  </Grid>
                                </Grid>
                              </Row>
                            </Column>
                          </Row>
                        )}
                      </Column>
                    </Row>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Row>
            </Column>
          </div>
        );
      };

      render = () => (
        <RenderWithLoading property={this.state.config} renderCallback={this.renderContent} />
      );
    }
  )
);

export default PlayNodeDialog;
