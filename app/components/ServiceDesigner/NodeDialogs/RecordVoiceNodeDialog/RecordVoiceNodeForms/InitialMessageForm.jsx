import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import { withStyles } from "@material-ui/core";
import { Pending } from "components";
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

class InitialMessageForm extends Component {
  static propTypes = {
    panelIndex: PropTypes.number, // should be set on creation mode
    data: PropTypes.shape({
      getInitialMessage: PropTypes.func,
      onPlayPause: PropTypes.func,
      onChangePosition: PropTypes.func,
      getAudioSetFromId: PropTypes.func,
      searchableAudioFiles: DiodeSearchable.isRequired,
      searchableAudioSets: DiodeSearchable.isRequired,
      getPlayUrl: PropTypes.func,
      getFileUploadMeta: PropTypes.func,
      onCreateAudioFile: PropTypes.func
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

  updateState = (setter, value) => this.setState({ initialMessage: setter(value) });

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
      .getInitialMessage()
      .then(initialMessage =>
        this.setState({
          initialMessage,
          diode: { loading: false, data: initialMessage }
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
    const { initialMessageAudio } = this.state.initialMessage;
    initialMessageAudio.audioFile = null;
    this.setState({ initialMessage: { initialMessageAudio } });
  };

  handleSaveSetupAudioFile = audioFile => {
    const { initialMessageAudio } = this.state.initialMessage;
    initialMessageAudio.audioFile = audioFile;
    this.setState({
      addAudioFileDialog: null,
      initialMessage: { initialMessageAudio }
    });
  };

  handleCloseSetupAudioFile = () => {
    this.setState({ addAudioFileDialog: null });
  };

  renderForm = initialMessage => () => {
    const { addAudioFileDialog } = this.state;
    const { initialMessageAudio } = initialMessage;
    const {
      searchableAudioFiles,
      searchableAudioSets,
      onPlayPause,
      onChangePosition,
      getAudioSetFromId,
      getPlayUrl,
      getFileUploadMeta,
      onCreateAudioFile
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
          <Column>
            <Row paddingHalf paddingLeft classes={{ box: classes.audioFileItem }}>
              <PrimaryText>{initialMessageAudio.title}</PrimaryText>
              <Stretch />
              {initialMessageAudio.audioFile ? (
                <PrimaryTextLink
                  className={classes.setupLink}
                  onClick={this.handleRemoveAudioFile(initialMessageAudio)}
                >
                  {t("remove")}
                </PrimaryTextLink>
              ) : (
                <PrimaryTextLink
                  className={classes.setupLink}
                  onClick={this.handleSetupAudioFile(initialMessageAudio)}
                >
                  {t("setUp")}
                </PrimaryTextLink>
              )}
            </Row>
            {initialMessageAudio.audioFile && (
              <Row>
                <SearchableAudioFileRow
                  audioFile={initialMessageAudio.audioFile}
                  audioPlayerInstance={audioPlayerInstance}
                  onPlayPause={onPlayPause}
                  onChangePosition={onChangePosition}
                  getAudioSetFromId={getAudioSetFromId}
                />
              </Row>
            )}
          </Column>
        </Row>
      </Column>
    );
  };

  render = () => {
    const { diode, initialMessage } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(initialMessage)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "InitialMessageForm" })(
  translate(["servicedesigner", "callcare", "common"])(InitialMessageForm)
);
