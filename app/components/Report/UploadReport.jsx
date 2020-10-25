/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], dec-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { Text, SelectFile, UploadProcessing } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Report/UploadReport";

class UploadReport extends Component {
  static propTypes = {
    handleBlob: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    uploadStatus: null
  };

  handleFilesChange = files => {
    const { handleBlob } = this.props;
    const blobReader = new FileReader();

    blobReader.addEventListener("load", e => {
      console.log("file reading finished successfully");
      const blob = e.target.result;
      handleBlob(blob)
        .then(_ => alert("Report successfully uploaded!"))
        .catch(error => alert(error));
    });

    blobReader.addEventListener("error", () => console.log("file reading failed"));

    blobReader.readAsArrayBuffer(files[0]);
  };

  render = () => {
    const { fileTypes, errors, classes, t } = this.props;
    const { uploadStatus } = this.state;

    return (
      <div className={classes.pageContent}>
        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <Paper elevation={4} className={classes.paper}>
              <div className={classes.internalForm}>
                <Text variant="subtitle">{t("uploadReport")}</Text>
                <br />
                <br />
                <br />
                {uploadStatus && uploadStatus.is_live === "true" ? (
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
              </div>
            </Paper>
          </div>
        </Grid>
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "UploadReport" })(translate("reports")(UploadReport));
