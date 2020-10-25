import React, { PureComponent, Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  Radio,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  withStyles
} from "@material-ui/core";
import { PrimaryTextLink, Icon, PrimaryText } from "components/Elements";
import {
  Row,
  Column,
  Box,
  Select,
  Stretch,
  Text,
  TextField,
  RenderWithLoading
} from "components/LayoutElements";
import { greetingAndPromptsList } from "config/serviceDesignerMockData";
import { DiodeSearchable } from "utils/commonShapes";
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

  audioFileItem: {
    background: "#eee",
    border: `1px solid ${theme.colors.primary.lightGrey}`
  },

  setupLink: {
    padding: 0,
    margin: 0,
    marginLeft: 16
  },

  tooltipOverridden: {
    padding: theme.spacing.unit * 2,
    fontSize: "1em"
  },

  information: {
    cursor: "pointer",
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
  },

  enabledKeysWrapper: {},

  enabledKeysRow: {
    width: "auto"
  },

  enabledKeysCol: {
    width: 80,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },

  enabledKeysCode: {
    fontSize: 24,
    lineHeight: "24px"
  },

  enabledKey: {
    "&>*": {
      color: theme.colors.primary.secondaryBlue
    },
    backgroundColor: theme.colors.primary.paleBlue
  }
});

const MenuNodeDialog = withStyles(styleSheet, { name: "MenuNodeDialog" })(
  translate(["servicedesigner", "services", "common"])(
    class MenuNodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired,

        greetingAndPromptsList: PropTypes.array,
        getPlayUrl: PropTypes.func,
        getFileUploadMeta: PropTypes.func,
        searchableAudioFiles: DiodeSearchable.isRequired,
        searchableAudioSets: DiodeSearchable.isRequired,
        onCreateAudioFile: PropTypes.func,
        getAudioSetFromId: PropTypes.func,

        handleNodeConfig: PropTypes.func.isRequired, //Promise API
        loadConfig: PropTypes.func.isRequired, //Promise API
        callbackOnSubmit: PropTypes.func.isRequired
      };

      static defaultProps = {
        greetingAndPromptsList
      };

      state = {
        showOtherOptions: false,
        addAudioFileDialog: null,
        audioPlayerInstance: {
          currentPlayingFile: null,
          position: 0,
          playState: "stop"
        },
        jumpModeOptions: ["day", "milliSeconds"],
        delayOptions: [],

        config: null
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

      handleChangeCheckMode = checkMode => () => {
        this.handleChangeWithSetter(this.state.config.setCheckMode)(checkMode);
      };

      handleSelectEnabledKey = number => () => {
        const { enabledKeys } = this.state.config;
        const matchedKey = enabledKeys.findIndex(item => item.key === number);

        if (matchedKey === -1) enabledKeys.push({ key: number, description: "" });
        else enabledKeys.splice(matchedKey, 1);
        this.handleChangeWithSetter(this.state.config.setEnabledKeys)([...enabledKeys]);
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

      handleSetupAudioFile = audioFile => () => {
        this.setState({
          addAudioFileDialog: audioFile
        });
      };

      handleRemoveAudioFile = audioFile => () => {
        const greetingAndPromptsList = [...this.state.config.greetingAndPromptsList];
        audioFile.audioFile = null;
        this.handleChangeWithSetter(this.state.config.setGreetingAndPromptsList)(
          greetingAndPromptsList
        );
      };

      handleSaveSetupAudioFile = audioFile => {
        const { greetingAndPromptsList } = this.state.config;
        const { addAudioFileDialog } = this.state;
        const index = greetingAndPromptsList.findIndex(item => item === addAudioFileDialog);
        greetingAndPromptsList[index].audioFile = { ...audioFile };
        this.setState({
          addAudioFileDialog: null
        });
        this.handleChangeWithSetter(this.state.config.setGreetingAndPromptsList)([
          ...greetingAndPromptsList
        ]);
      };

      handleCloseSetupAudioFile = () => {
        this.setState({ addAudioFileDialog: null });
      };

      // advanced option
      handleChangeEnabledKeyValue = key => value => {
        key.key = value;
        const { enabledKeys } = this.state.config;
        this.handleChangeWithSetter(this.state.config.setEnabledKeys)(enabledKeys);
      };

      handleChangeEnabledKeyDescription = key => event => {
        key.description = event.target.value;
        const { enabledKeys } = this.state.config;
        this.handleChangeWithSetter(this.state.config.setEnabledKeys)(enabledKeys);
      };

      handleAddMoreEnabledKey = () => {
        const { enabledKeys } = this.state.config;
        enabledKeys.push({ key: "", description: "" });
        this.handleChangeWithSetter(this.state.config.setEnabledKeys)([...enabledKeys]);
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

      renderContent = config => {
        const {
          showOtherOptions,
          addAudioFileDialog,
          audioPlayerInstance,
          jumpModeOptions,
          delayOptions
        } = this.state;

        const {
          checkMode,
          enabledKeys,
          greetingAndPromptsList,
          addMultipleKey,
          forcedEndOfDTMF,
          selectToSaveDTMF,
          customTimeout,
          detectRepeatedKeys,
          menuRepeatMode,
          // other options
          detectKeyPress,
          preventCaller,
          flushOnInterrupt,
          flushAfterPlay,
          enableBackwardForwardJumps,
          jumpMode,
          delay,
          backwardsKey,
          forwardsKey
        } = config;

        const { getPlayUrl, classes, t } = this.props;

        // single
        const keyGrid = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["*", "0", "#"]];

        // advanced
        const unselectedKeys = [];
        keyGrid.forEach(row =>
          row.forEach(col => {
            if (!enabledKeys.find(key => key.key === col)) {
              unselectedKeys.push(col);
            }
          })
        );

        return (
          <div className={classes.contentWrapper}>
            <audio ref={node => (this.player = node)} controls={true} preload="auto" hidden={true}>
              <source src={getPlayUrl(audioPlayerInstance.currentPlayingFile)} type="audio/mp3" />
            </audio>
            <Column stretch>
              <Row classes={{ box: classes.mainForm }}>
                <Column>
                  <Row paddingTop>
                    <Column>
                      <Grid container direction="row" spacing={16}>
                        <Grid item className={classes.checkModeSimple}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={checkMode === "simple"}
                                onChange={this.handleChangeCheckMode("simple")}
                              />
                            }
                            label={t("simple")}
                          />
                        </Grid>
                        <Grid item className={classes.checkModeAdvanced}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={checkMode === "advanced"}
                                onChange={this.handleChangeCheckMode("advanced")}
                              />
                            }
                            label={t("advanced")}
                          />
                        </Grid>
                      </Grid>
                    </Column>
                  </Row>
                  {checkMode === "simple" && (
                    <Row paddingTop>
                      <Column>
                        <Row paddingTop>
                          <Text className={classes.heading}>{t("enabledKeys")}</Text>
                        </Row>
                        <Row paddingTop paddingBottom>
                          <Column classes={{ box: classes.enabledKeysWrapper }}>
                            {keyGrid.map((row, rowIndex) => (
                              <Row classes={{ box: classes.enabledKeysRow }} key={rowIndex}>
                                {row.map((col, colIndex) => (
                                  <div key={colIndex} onClick={this.handleSelectEnabledKey(col)}>
                                    <Box
                                      classes={{
                                        box: clsx(
                                          classes.enabledKeysCol,
                                          enabledKeys.find(item => item.key === col) &&
                                            classes.enabledKey
                                        )
                                      }}
                                      borderHalf
                                    >
                                      <Text className={classes.enabledKeysCode}>{col}</Text>
                                    </Box>
                                  </div>
                                ))}
                              </Row>
                            ))}
                          </Column>
                        </Row>
                      </Column>
                    </Row>
                  )}
                  {checkMode === "advanced" && (
                    <Row paddingTop>
                      <Column>
                        <Row paddingTop>
                          <Text className={classes.heading}>{t("enabledKeys")}</Text>
                        </Row>
                        <Row paddingTop>
                          <Column>
                            {enabledKeys.map((key, index) => (
                              <Row paddingTop key={index}>
                                <Grid container spacing={16}>
                                  <Grid item xs={2}>
                                    <Select
                                      onChange={this.handleChangeEnabledKeyValue(key)}
                                      getKey={value => value}
                                      renderOption={x => x}
                                      options={unselectedKeys}
                                      value={key.key}
                                      label={t("key")}
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={10}>
                                    <TextField
                                      onChange={this.handleChangeEnabledKeyDescription(key)}
                                      value={key.description}
                                      label={t("description")}
                                      fullWidth
                                    />
                                  </Grid>
                                </Grid>
                              </Row>
                            ))}
                            {enabledKeys.length < 12 &&
                            !enabledKeys.find(item => item.key === "") ? (
                              <Row>
                                <Stretch />
                                <PrimaryTextLink
                                  className={classes.setupLink}
                                  onClick={this.handleAddMoreEnabledKey}
                                >
                                  {t("addMore")}
                                </PrimaryTextLink>
                              </Row>
                            ) : null}
                          </Column>
                        </Row>
                        <Row paddingTop>
                          <Column>
                            <Row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={addMultipleKey}
                                    onChange={this.handleChangeWithStaticValue(
                                      config.setAddMultipleKey
                                    )(!addMultipleKey)}
                                    className={classes.formCheckboxControl}
                                  />
                                }
                                label={t("addMultipleKey")}
                              />
                            </Row>
                            <Row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={forcedEndOfDTMF}
                                    onChange={this.handleChangeWithStaticValue(
                                      config.setForcedEndOfDTMF
                                    )(!forcedEndOfDTMF)}
                                    className={classes.formCheckboxControl}
                                  />
                                }
                                label={t("forcedEndOfDTMF")}
                              />
                            </Row>
                            <Row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={selectToSaveDTMF}
                                    onChange={this.handleChangeWithStaticValue(
                                      config.setSelectToSaveDTMF
                                    )(!selectToSaveDTMF)}
                                    className={classes.formCheckboxControl}
                                  />
                                }
                                label={t("selectToSaveDTMF")}
                              />
                            </Row>
                          </Column>
                        </Row>
                        <Row paddingTop>
                          <Column>
                            <Row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={customTimeout}
                                    onChange={this.handleChangeWithStaticValue(
                                      config.setCustomTimeout
                                    )(!customTimeout)}
                                    className={classes.formCheckboxControl}
                                  />
                                }
                                label={t("customTimeout")}
                              />
                            </Row>
                            <Row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={detectRepeatedKeys}
                                    onChange={this.handleChangeWithStaticValue(
                                      config.setDetectRepeatedKeys
                                    )(!detectRepeatedKeys)}
                                    className={classes.formCheckboxControl}
                                  />
                                }
                                label={t("detectRepeatedKeys")}
                              />
                            </Row>
                          </Column>
                        </Row>
                        <Row paddingTop>
                          <Column>
                            <Row>
                              <FormControlLabel
                                control={
                                  <Radio
                                    checked={menuRepeatMode === "menuRepeats"}
                                    onChange={this.handleChangeWithStaticValue(
                                      config.setMenuRepeatMode
                                    )("menuRepeats")}
                                    className={classes.formCheckboxControl}
                                  />
                                }
                                label={t("menuRepeats")}
                              />
                            </Row>
                            <Row>
                              <FormControlLabel
                                control={
                                  <Radio
                                    checked={menuRepeatMode === "returnNoKeyAfterFirstBlank"}
                                    onChange={this.handleChangeWithStaticValue(
                                      config.setMenuRepeatMode
                                    )("returnNoKeyAfterFirstBlank")}
                                    className={classes.formCheckboxControl}
                                  />
                                }
                                label={t("returnNoKeyAfterFirstBlank")}
                              />
                            </Row>
                          </Column>
                        </Row>
                      </Column>
                    </Row>
                  )}
                  <Row paddingTop>
                    <Text className={classes.heading}>{t("greetingAndPrompts")}</Text>
                  </Row>
                  <Row paddingTop>
                    <Column>
                      {greetingAndPromptsList.map((item, key) => (
                        <Row paddingTop key={key}>
                          <Row>
                            <Column>
                              <Row paddingHalf paddingLeft classes={{ box: classes.audioFileItem }}>
                                <PrimaryText>{item.title}</PrimaryText>
                                <Stretch />
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
                                    getAudioSetFromId={this.props.getAudioSetFromId}
                                  />
                                </Row>
                              )}
                            </Column>
                          </Row>
                        </Row>
                      ))}
                    </Column>
                  </Row>
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
                      </Column>
                    </Row>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Row>

              {addAudioFileDialog && (
                <AddAudioFileDialog
                  audioFile={addAudioFileDialog}
                  searchableAudioFiles={this.props.searchableAudioFiles}
                  searchableAudioSets={this.props.searchableAudioSets}
                  onSave={this.handleSaveSetupAudioFile}
                  onClose={this.handleCloseSetupAudioFile}
                  audioPlayerInstance={{
                    ...audioPlayerInstance,
                    duration: this.player.duration
                  }}
                  onPlayPause={this.handlePlayPause}
                  onChangePosition={this.handleChangePosition}
                  getPlayUrl={getPlayUrl}
                  getFileUploadMeta={this.props.getFileUploadMeta}
                  onCreateAudioFile={this.props.onCreateAudioFile}
                  getAudioSetFromId={this.props.getAudioSetFromId}
                />
              )}
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

export default MenuNodeDialog;
