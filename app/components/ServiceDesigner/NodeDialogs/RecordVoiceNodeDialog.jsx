import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { Icon } from "components/Elements";
import { Text, RenderWithLoading } from "components/LayoutElements";
import { DiodeSearchable } from "utils/commonShapes";
import clsx from "clsx";
import RecordingForm from "./RecordVoiceNodeDialog/RecordVoiceNodeForms/RecordingForm";
import TargetForm from "./RecordVoiceNodeDialog/RecordVoiceNodeForms/TargetForm";
import InitialMessageForm from "./RecordVoiceNodeDialog/RecordVoiceNodeForms/InitialMessageForm";
import OtherOptionsForm from "./RecordVoiceNodeDialog/RecordVoiceNodeForms/OtherOptionsForm";
import { keyOptions } from "config/serviceDesignerMockData";

const styleSheet = theme => ({
  contentWrapper: {
    padding: "0px",
    position: "relative",
    overflowY: "auto",
    height: "-webkit-fill-available",
    maxHeight: "100%"
  },

  expansionPanel: {
    marginTop: 1,
    marginBottom: 0,
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
    height: 40,
    marginTop: 18
  },

  expansionPanelDetails: {
    paddingTop: 0
  },

  pageContent: {}
});

const RecordVoiceNodeDialog = withStyles(styleSheet, { name: "RecordVoiceNodeDialog" })(
  translate(["servicedesigner", "common"])(
    class RecordVoiceNodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired,
        getRecording: PropTypes.func.isRequired,
        getTarget: PropTypes.func.isRequired,
        getInitialMessage: PropTypes.func.isRequired,
        getOtherOptions: PropTypes.func.isRequired,
        getPlayUrl: PropTypes.func,
        getAudioSetFromId: PropTypes.func,
        getFileUploadMeta: PropTypes.func,
        searchableAudioFiles: DiodeSearchable.isRequired,
        searchableAudioSets: DiodeSearchable.isRequired,
        onCreateAudioFile: PropTypes.func,
        // getChildAccounts: PropTypes.func.isRequired,
        // getFileUploadMeta: PropTypes.func,
        // onCreateAudioFile: PropTypes.func

        handleNodeConfig: PropTypes.func.isRequired, //Promise API
        loadConfig: PropTypes.func.isRequired, //Promise API
        callbackOnSubmit: PropTypes.func.isRequired,
      };

      state = {
        expandedIndex: 0,
        audioPlayerInstance: {
          currentPlayingFile: null,
          position: 0,
          playState: "stop"
        },

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

      forms = [
        {
          heading: "recording",
          form: RecordingForm,
          data: {
            // getRecording: this.props.getRecording,
            keyOptions: keyOptions,
            // getChildAccounts: this.props.getChildAccounts
          }
        },
        {
          heading: "target",
          form: TargetForm,
          data: {
            // getTarget: this.props.getTarget
          }
        },
        {
          heading: "initialMessage",
          form: InitialMessageForm,
          data: {
            // getInitialMessage: this.props.getInitialMessage,
            onPlayPause: this.handlePlayPause,
            onChangePosition: this.handleChangePosition,
            getAudioSetFromId: this.props.getAudioSetFromId,
            getFileUploadMeta: this.props.getFileUploadMeta,
            searchableAudioFiles: this.props.searchableAudioFiles,
            searchableAudioSets: this.props.searchableAudioSets,
            onCreateAudioFile: this.props.onCreateAudioFile
          }
        },
        {
          heading: "otherOptions",
          form: OtherOptionsForm,
          data: {
            // getOtherOptions: this.props.getOtherOptions,
            onPlayPause: this.handlePlayPause,
            onChangePosition: this.handleChangePosition,
            getAudioSetFromId: this.props.getAudioSetFromId,
            getFileUploadMeta: this.props.getFileUploadMeta,
            searchableAudioFiles: this.props.searchableAudioFiles,
            searchableAudioSets: this.props.searchableAudioSets,
            onCreateAudioFile: this.props.onCreateAudioFile,
            keyOptions: keyOptions,
          }
        }
      ];

      handleStepChange = expandedIndex => () => {
        if (expandedIndex === this.state.expandedIndex) {
          expandedIndex = -1;
        }

        this.setState({ expandedIndex });
      };

      renderContent = config => {
        const { classes, t } = this.props;
        const { expandedIndex, audioPlayerInstance } = this.state;
        const forms = this.forms;

        return (
          <div className={classes.contentWrapper}>
            <audio ref={node => (this.player = node)} controls={true} preload="auto" hidden={true}>
              <source
                src={this.props.getPlayUrl(audioPlayerInstance.currentPlayingFile)}
                type="audio/mp3"
              />
            </audio>
            {forms.map((form, index) => (
              <ExpansionPanel
                key={index}
                expanded={expandedIndex === index}
                onChange={this.handleStepChange(index)}
                className={classes.expansionPanel}
              >
                <ExpansionPanelSummary
                  className={classes.expansionPanelSummary}
                  expandIcon={expandedIndex === index ? <Icon>remove</Icon> : <Icon>add</Icon>}
                >
                  <Grid container direction="row" justify="space-between">
                    <Grid item>
                      <Text className={classes.heading}>{t(form.heading)}</Text>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                  <form.form
                    panelIndex={index}
                    data={form.data}
                    audioPlayerInstance={{
                      ...audioPlayerInstance,
                      duration: this.player && this.player.duration
                    }}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        );
      }

      render = () => (
        <RenderWithLoading property={this.state.config} renderCallback={this.renderContent} />
      );
    }
  )
);

export default RecordVoiceNodeDialog;
