/**
 * Modified by, Sajid U. / SEPT-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, withStyles, withWidth } from "@material-ui/core";
import { Row, Column } from "components/LayoutElements";
import { VerticalFilesPicker, HorizontalFilesPicker } from "components/Elements";
import { Text, HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";
import { translate } from "react-i18next";
import AudioFileList from "./AudioFileList";
// import SelectFile from "../LayoutElements/SelectFile";
import { styleSheet } from "jss/Audio/FileUploadDialog";
import { getPlayUrl } from "config/audioMockData";

class FileUploadDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onUploadFiles: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    open: PropTypes.bool,
    errors: PropTypes.array,
    fileTypes: PropTypes.string,
    getPlayUrl: PropTypes.func,

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    getPlayUrl
  };

  baseState = {
    files: []
  };

  state = {
    // files: []
    files: this.props.files
  };

  handleClose = () => {
    this.props.onClose();
    this.setState(this.baseState);
  };

  isMobile = () => {
    return this.props.width === "xs";
  };

  handleFilesChange = (fileList = []) => {
    const files = this.state.files;
    Array.prototype.forEach.call(fileList, file => {
      files.push(file);
    });
    this.setState({ files: files });
  };

  handleUploadModeChange = () => {};

  handleUploadFiles = () => {
    this.props.onUploadFiles(this.state.files);
    this.setState(this.baseState);
  };

  handleDeleteRow = file => {
    const files = [...this.state.files];
    files.splice(files.indexOf(file), 1);
    this.setState({ files: files });
  };

  handleFileRename = (file, newName) => {
    file.name = newName;
    this.setState({ files: this.state.files });
    // const files = [...this.state.files];
    // files.splice(files.indexOf(file), 1);
    // this.setState({ files: files });
  };

  handleAudioPlayPause = file => {
    const files = [...this.state.files];
    const changedFile = files.indexOf(file);
    changedFile.state = changedFile.state === "playing" ? "pause" : "playing";
    this.setState({ files: files });
  };

  // Dialog Header
  dialogHeader = t => (
    <HubbubDialogHeader
      icon="cloud_upload"
      onClose={this.handleClose}
      headerVariation="grey" // "default", "grey", "red"
      headerTitle={t("uploadFiles")}
    />
  );

  // Dialog Content
  dialogContent = (errors, files, multiple, fileTypes, getPlayUrl, classes, t) => (
    <Column className={classes.dialogContent}>
      {errors && (
        <Row padding>
          <Text className={classes.errorText}>
            <Icon className={classes.errorIcon}>error</Icon>
            {t("couldNotUpload")}
          </Text>
        </Row>
      )}
      {files && files.length > 0 ? (
        multiple && (
          <Row padding>
            <HorizontalFilesPicker
              onFiles={this.handleFilesChange}
              multiple={multiple}
              fileTypes={fileTypes}
            />
          </Row>
        )
      ) : (
        <Row padding>
          <VerticalFilesPicker
            onFiles={this.handleFilesChange}
            multiple={multiple}
            fileTypes={fileTypes}
          />
        </Row>
      )}
      {files && files.length > 0 && (
        <Row padding>
          <Column>
            <Row>
              <AudioFileList
                getPlayUrl={getPlayUrl}
                files={files}
                uploadingFiles={this.state.uploadingFiles}
                uploadModeSelected={"multiVersion"}
                onDeleteRow={this.handleDeleteRow}
                onFileRename={this.handleFileRename}
                onAudioPlayPause={this.handleAudioPlayPause}
              />
            </Row>
          </Column>
        </Row>
      )}
      {/*
            <SelectFile
                  onFilesChange={this.handleFilesChange}
                  dndLabel={t("dragAndDropHere")}
                  className={classes.fileUploadZone}
                  fileTypes={fileTypes}
                  mode="horizontal"
                  mode={(files && files.length) ? "horizontal" : "vertical"}
                /> */}
    </Column>
  );

  // Dialog Footer
  dialogFooter = (files, t) =>
    files &&
    files.length > 0 && (
      <HubbubDialogFooter
        onClose={this.handleClose}
        onConfirm={this.handleUploadFiles}
        confirmLabel={t("uploadDialogConfirm", { count: files.length })}
      />
    );

  // Main Render
  render = () => {
    const { open, errors, multiple, fileTypes, getPlayUrl, classes, t } = this.props;
    const { files } = this.state;

    return (
      <HubbubDialog
        open={open}
        maxWidth="md"
        dialogClass={{ paper: classes.dialogPaper }}
        dialogHeader={this.dialogHeader(t)}
        dialogContent={this.dialogContent(errors, files, multiple, fileTypes, getPlayUrl, classes, t)}
        dialogFooter={this.dialogFooter(files, t)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "FileUploadDialog" })(
    translate(["audio", "common"])(FileUploadDialog)
  )
);
