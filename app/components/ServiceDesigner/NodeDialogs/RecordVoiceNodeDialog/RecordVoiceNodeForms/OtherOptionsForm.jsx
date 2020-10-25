import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import { FormControlLabel, Checkbox, Grid, withStyles } from "@material-ui/core";
import { Pending, Select } from "components";
import { PrimaryTextLink, Icon, PrimaryText } from "components/Elements";
import { Box, Column, Row, Stretch, Text } from "components/LayoutElements";
import { DiodeSearchable } from "utils/commonShapes";
import AddAudioFileDialog from "../../CallCarePlayNodeDialog/AddAudioFileDialog";
import SearchableAudioFileRow from "../../CallCarePlayNodeDialog/SearchableAudioFileRow";
import * as formFields from "../../../api/serviceDesigner";

const styleSheet = theme => ({
  audioFileItem: {
    background: "#eee",
    border: `1px solid ${theme.colors.primary.lightGrey}`
  },

  setupLink: {
    padding: 0,
    margin: 0,
    marginLeft: 16
  }
});

class OtherOptionsForm extends Component {
  static propTypes = {
    panelIndex: PropTypes.number, // should be set on creation mode
    data: PropTypes.shape({
      getOtherOptions: PropTypes.func,
      onPlayPause: PropTypes.func,
      onChangePosition: PropTypes.func,
      getAudioSetFromId: PropTypes.func,
      searchableAudioFiles: DiodeSearchable.isRequired,
      searchableAudioSets: DiodeSearchable.isRequired,
      getPlayUrl: PropTypes.func,
      getFileUploadMeta: PropTypes.func,
      onCreateAudioFile: PropTypes.func,
      keyOptions: PropTypes.array
    }),
    audioPlayerInstance: PropTypes.object,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_RV_INITIAL_MESSAGE
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    diode: {
      loading: true,
      error: null,
      data: null
    },
    addAudioFileDialog: null
  };

  updateState = (setter, value) => this.setState({ otherOptions: setter(value) });

  handleChange = setter => event => this.updateState(setter, event.target.value);

  componentDidMount() {
    this.promiseToDiode();
  }

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  revertToServer = () => this.promiseToDiode();

  promiseToDiode = () => {
    this.props.data
      .getOtherOptions()
      .then(otherOptions =>
        this.setState({
          otherOptions,
          diode: { loading: false, data: otherOptions }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  handleSetupAudioFile = audioFile => () => {
    this.setState({
      addAudioFileDialog: audioFile
    });
  };

  handleRemoveAudioFile = audioFile => () => {
    const { messageAudio } = this.state.otherOptions;
    messageAudio.audioFile = null;
    this.setState({ messageAudio: { messageAudio } });
  };

  handleSaveSetupAudioFile = audioFile => {
    const { messageAudio } = this.state.otherOptions;
    messageAudio.audioFile = audioFile;
    this.setState({
      addAudioFileDialog: null,
      otherOptions: { ...this.state.otherOptions, messageAudio }
    });
  };

  handleCloseSetupAudioFile = () => {
    this.setState({ addAudioFileDialog: null });
  };

  handleChangeOtherOptions = (key, value) => {
    const { otherOptions } = this.state;
    otherOptions[key] = value;
    this.setState({ otherOptions: { ...otherOptions } });
  };

  handleChangeOtherOptionsEvent = (key, value) => event => {
    this.handleChangeOtherOptions(key, value);
  };

  handleChangePlaybackKey = value => {
    this.handleChangeOtherOptions("toPlaybackKey", value);
  };

  handleChangeAcceptKey = value => {
    this.handleChangeOtherOptions("toAcceptKey", value);
  };

  handleChangeRerecordKey = value => {
    this.handleChangeOtherOptions("toRerecordKey", value);
  };

  handleChangeRepeatKey = value => {
    this.handleChangeOtherOptions("toRepeatKey", value);
  };

  renderForm = otherOptions => () => {
    const { addAudioFileDialog } = this.state;
    const {
      isPlayAfterRecordFinish,
      messageAudio,
      toPlaybackKey,
      toAcceptKey,
      toRerecordKey,
      toRepeatKey
    } = otherOptions;
    const {
      searchableAudioFiles,
      searchableAudioSets,
      onPlayPause,
      onChangePosition,
      getAudioSetFromId,
      getPlayUrl,
      getFileUploadMeta,
      onCreateAudioFile,
      keyOptions
    } = this.props.data;

    const { audioPlayerInstance, classes, t } = this.props;

    return (
      <Column stretch>
        {addAudioFileDialog && (
          <AddAudioFileDialog
            audioFile={addAudioFileDialog}
            searchableAudioFiles={searchableAudioFiles}
            searchableAudioSets={searchableAudioSets}
            onSave={this.handleSaveSetupAudioFile}
            onClose={this.handleCloseSetupAudioFile}
            audioPlayerInstance={audioPlayerInstance}
            onPlayPause={onPlayPause}
            onChangePosition={onChangePosition}
            getPlayUrl={getPlayUrl}
            getFileUploadMeta={getFileUploadMeta}
            onCreateAudioFile={onCreateAudioFile}
            getAudioSetFromId={getAudioSetFromId}
          />
        )}
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPlayAfterRecordFinish}
                onChange={this.handleChangeOtherOptionsEvent(
                  "isPlayAfterRecordFinish",
                  !isPlayAfterRecordFinish
                )}
                className={classes.formCheckboxControl}
              />
            }
            label={t("playMessageAfterRecording")}
          />
        </Row>
        {isPlayAfterRecordFinish && (
          <Row>
            <Column>
              <Row paddingHalf paddingLeft classes={{ box: classes.audioFileItem }}>
                <PrimaryText>{messageAudio.title}</PrimaryText>
                <Stretch />
                {messageAudio.audioFile ? (
                  <PrimaryTextLink
                    className={classes.setupLink}
                    onClick={this.handleRemoveAudioFile(messageAudio)}
                  >
                    {t("remove")}
                  </PrimaryTextLink>
                ) : (
                  <PrimaryTextLink
                    className={classes.setupLink}
                    onClick={this.handleSetupAudioFile(messageAudio)}
                  >
                    {t("setUp")}
                  </PrimaryTextLink>
                )}
              </Row>
              {messageAudio.audioFile && (
                <Row>
                  <SearchableAudioFileRow
                    audioFile={messageAudio.audioFile}
                    audioPlayerInstance={audioPlayerInstance}
                    onPlayPause={onPlayPause}
                    onChangePosition={onChangePosition}
                    getAudioSetFromId={getAudioSetFromId}
                  />
                </Row>
              )}
            </Column>
          </Row>
        )}
        <Row paddingTop>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Select
                onChange={this.handleChangePlaybackKey}
                getKey={delay => delay}
                options={keyOptions}
                value={toPlaybackKey}
                label={t("toPlaybackMessage")}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                onChange={this.handleChangeAcceptKey}
                getKey={delay => delay}
                options={keyOptions}
                value={toAcceptKey}
                label={t("toAcceptMessage")}
                fullWidth
              />
            </Grid>
          </Grid>
        </Row>
        <Row paddingTop>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Select
                onChange={this.handleChangeRerecordKey}
                getKey={delay => delay}
                options={keyOptions}
                value={toRerecordKey}
                label={t("toRerecordMessage")}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                onChange={this.handleChangeRepeatKey}
                getKey={delay => delay}
                options={keyOptions}
                value={toRepeatKey}
                label={t("toRepeatMessage")}
                fullWidth
              />
            </Grid>
          </Grid>
        </Row>
      </Column>
    );
  };

  render = () => {
    const { diode, otherOptions } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(otherOptions)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "OtherOptionsForm" })(
  translate(["servicedesigner", "callcare", "common"])(OtherOptionsForm)
);
