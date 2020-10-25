/**
 * Sajid U., july-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Icon, Link, withStyles } from "@material-ui/core";
import { Text, SelectFile, UploadProcessing, PrimaryTextButton } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/CallCare/CallCareUpload";
import CSVErrorListDialog from "../CallCare/CSVErrorListDialog";
import CSVErrorDetailDialog from "../CallCare/CSVErrorDetailDialog";

import { errors, uploadResult } from "config/callcareMockData";
import { CallcareErrors } from "models/Callcare";

class CallCareUpload extends Component {
  static defaultProps = {
    errors,
    uploadResult
  };

  static propTypes = {
    fileUploadMetadata: PropTypes.func.isRequired,
    fileDownloadSuccessfulUploadMetadata: PropTypes.func.isRequired,
    fileDownloadFailedUploadMetadata: PropTypes.func.isRequired,
    possiblePaths: PropTypes.object.isRequired,
    currentPath: PropTypes.string.isRequired,
    fileTypes: PropTypes.string,
    getStatus: PropTypes.func.isRequired,
    uploadResult: PropTypes.object,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  statusTimer = null

  componentDidMount() {

this.props.getStatus().then(status => {



})

  }

  state = {
    errorListDialog: false,
    errorDetailDialog: false,
    errorDetail: { rowId: 0, errId: 0 },
    uploadStatus: null,
    errors : []
  };

  getTextKeysFromMode = () => {
    const { possiblePaths, currentPath } = this.props;
    let result = null;

    switch (currentPath) {
      case possiblePaths.branches:
        result = { heading: "uploadBranchesCSV", downloadLabel: "downBranches" };
        break;
      case possiblePaths.openingHours:
        result = { heading: "uploadHoursCSV", downloadLabel: "downHours" };
        break;
      case possiblePaths.states:
        result = { heading: "uploadStatesCSV", downloadLabel: "downStates" };
        break;
      case possiblePaths.exceptions:
        result = { heading: "uploadExceptionsCSV", downloadLabel: "downExceptions" };
        break;

      default:
        console.log("[ CallCare ]: unknown option!");
        break;
    }

    if (!this.state.uploadStatus) result.downloadLabel = "downloadSampleCSV";

    return result;
  };

  handleFilesChange = files => {
	this.setState({ uploadStatus: Object.assign({}, this.props.uploadResult) });

   // this.props.onFilesChange(files);

      const fileUploadMetadata = this.props.fileUploadMetadata();
      console.log(files)
      console.log(fileUploadMetadata)
      const formData = new FormData();
      formData.append(fileUploadMetadata.fieldName, files[0]);
      formData.append("apiRequestContext", fileUploadMetadata.apiRequestContext);
      console.log(formData)
      //console.log(xhr)
      const xhr = new XMLHttpRequest();
      xhr.open("POST", fileUploadMetadata.apiUrl, true);
      fileUploadMetadata.headers.map(header=>{
          xhr.setRequestHeader(header.name,header.value);
      });

      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              console.log(xhr.responseText);
			  this.setState({ uploadStatus: JSON.parse(xhr.responseText) });
          }
      };

      xhr.send(formData);
  };


  download = () => {};

  handleShowErrorDialog = () => {
    this.setState({ errorListDialog: true });
  };

  handleCloseErrorDialog = () => {
    this.setState({ errorListDialog: false, errorDetailDialog: false });
  };

  handleViewDetailDialog = (rowId, errId) => {
    this.setState({
      errorListDialog: false,
      errorDetailDialog: true,
      errorDetail: { rowId: rowId, errId: errId }
    });
  };

  handleViewListDialog = () => {
    this.setState({ errorListDialog: true, errorDetailDialog: false });
  };

  downloadSuccessfullyUploadedEntriesAsCSV = () => {
    return this.props.fileDownloadSuccessfulUploadMetadata();
  };

  downloadFailedToUploadEntriesAsCSV = () => {
    return this.props.fileDownloadFailedUploadMetadata();
  };


  render() {
    const { fileTypes, classes, t } = this.props;
    const { uploadStatus, errors,  errorListDialog, errorDetailDialog, errorDetail } = this.state;

    const { heading, downloadLabel } = this.getTextKeysFromMode();
    return (
      <div className={classes.pageContent}>
        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <Paper elevation={4} className={classes.paper}>
              <div className={classes.internalForm}>
                <Text variant="subtitle">{t(heading)}</Text>
                <br />
                <br />
                <br />
                {uploadStatus && uploadStatus.is_live == "true" ? (
                  <UploadProcessing
                    rowsProcessed={uploadStatus.successful_uploads}
                    errors={errors}
                    className={classes.marginBottomMedium}
                    onShowErrorDialog={this.handleShowErrorDialog}
                  />
                ) : (
                  <SelectFile
                    onFilesChange={this.handleFilesChange}
                    dndLabel={t("dragAndDropHere")}
                    className={classes.marginBottomMedium}
                    fileTypes={fileTypes}
                  />
                )}
                <br />
                <br />
                <PrimaryTextButton onClick={this.download}>
                  {// t("downloadSampleCSV")
                  t(downloadLabel)}
                </PrimaryTextButton>
				<a href={this.downloadSuccessfullyUploadedEntriesAsCSV()}>DOWNLOAD</a>
                {uploadStatus && uploadStatus.is_live == "false" && (
                  <Text className={classes.fail}>
                    <Icon className={classes.icon}>error</Icon>
                    <Link onClick={this.handleShowErrorDialog} className={classes.showErrors}>
                      {t("errorsDetected", { errorCount: CallcareErrors.getErrorsCount(errors) })}
                    </Link>
                  </Text>
                )}
              </div>

              <CSVErrorListDialog
                open={errorListDialog}
                errors={errors}
                onClose={this.handleCloseErrorDialog}
                onViewDetail={this.handleViewDetailDialog}
              />

              <CSVErrorDetailDialog
                open={errorDetailDialog}
                onClose={this.handleCloseErrorDialog}
                onBack={this.handleViewListDialog}
                currentRow={errorDetail.rowId}
                currentErr={errorDetail.errId}
                errors={errors}
              />
            </Paper>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "CallCareUpload" })(
  translate("callcare")(CallCareUpload)
);
