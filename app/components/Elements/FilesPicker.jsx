import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { Box, Padding, Column, Row, Line } from "components/LayoutElements/Box";
import { PrimaryButton } from "./Buttons";
import { Text } from "./Text";
import { Icon } from "./Icon";
import {
  dropAreaStylesheet,
  verticalPickerStylesheet,
  horizontalPickerStylesheet,
  filesPickerStylesheet
} from "jss/Elements/FilesPicker";

export const withFilesPicker = Compo =>
  withStyles(filesPickerStylesheet, { name: "FilesPicker" })(
    class FilesPicker extends Component {
      static propTypes = {
        onFilesChange: PropTypes.func.isRequired,
        fileTypes: PropTypes.string,
        multiple: PropTypes.bool
      };

      handleFileInputRef = node => {
        this.fileInput = node;
      };

      handleFilesDialog = event => {
        event.stopPropagation();
        if (this.fileInput) {
          this.fileInput.value = null;
          this.fileInput.click();
        }
      };

      handleFilesChange = event => {
        this.props.onFilesChange(event.target.files);
      };

      render() {
        let { children, fileTypes, classes, className, multiple } = this.props;
        return (
          <Fragment>
            <input
              ref={this.handleFileInputRef}
              type="file"
              accept={fileTypes}
              multiple={!!multiple}
              onChange={this.handleFilesChange}
              className={classes.fileInput}
            />
            <Compo onFilesDialog={this.handleFilesDialog}>{children}</Compo>
          </Fragment>
        );
      }
    }
  );

export const withDropArea = Compo =>
  class withDropArea extends Component {
    static propTypes = {
      onDropFiles: PropTypes.func.isRequired,
      fileTypes: PropTypes.string
    };

    state = {
      isDragOver: false
    };

    handleDragEnter = event => {
      event.preventDefault();
      this.setState({ isDragOver: true });
    };

    handleDragOver = event => {
      event.preventDefault();
      this.setState({ isDragOver: true });
    };

    handleDragLeave = event => {
      this.setState({ isDragOver: false });
    };

    handleDrop = event => {
      event.stopPropagation();
      event.preventDefault();

      const files = event.dataTransfer.files;

      if (files) {
        this.props.onDropFiles(files);
      }
    };

    dropHandlers = {
      onDragEnter: this.handleDragEnter,
      onDragOver: this.handleDragOver,
      onDragLeave: this.handleDragLeave,
      onDrop: this.handleDrop
    };

    render() {
      let { onDropFiles, ...props } = this.props;
      return (
        <Compo {...props} dropHandlers={this.dropHandlers} isDragOver={this.state.isDragOver} />
      );
    }
  };

export const BrowseFilesButton = withFilesPicker(({ children, onFilesDialog, ...props }) => (
  <PrimaryButton onClick={onFilesDialog} {...props}>
    {children}
  </PrimaryButton>
));

export const DropArea = withStyles(dropAreaStylesheet, { name: "DropArea" })(
  withDropArea(({ dropHandlers, isDragOver, classes, children }) => (
    <Box
      stretch
      paddingHalf
      classes={{ box: classes.dashedBorder }}
      {...dropHandlers}
    >
      <Box borderDouble stretch>
        {children}
      </Box>
    </Box>
  ))
);

export const VerticalFilesPicker = translate("common")(
  withStyles(verticalPickerStylesheet, { name: "VerticalFilesPicker" })(
    ({ t, onFiles, multiple, classes }) => (
      <DropArea onDropFiles={onFiles}>
        <Column alignChildrenCenter padding>
          <Column>
            <Column stretch>
              <Icon fontSize="large" className={classes.icon}>
                backup
              </Icon>
              <Text className={classes.label}>{t("dragAndDropHere")}</Text>
            </Column>
            <Row stretch paddingHalf>
              <Line />
              <Text className={clsx(classes.label, classes.italic)}>{t("or")}</Text>
              <Line />
            </Row>
            <Column stretch paddingHalf alignChildrenStretch>
              <BrowseFilesButton onFilesChange={onFiles} multiple={multiple}>
                {t("browseFiles")}
              </BrowseFilesButton>
            </Column>
          </Column>
        </Column>
      </DropArea>
    )
  )
);

export const HorizontalFilesPicker = translate("common")(
  withStyles(horizontalPickerStylesheet, { name: "HorizontalFilesPicker" })(
    ({ t, onFiles, multiple, classes }) => (
      <DropArea onDropFiles={onFiles}>
        <Row paddingHalf>
          <Column paddingHalf justifyChildrenCenter>
            <Icon fontSize="large" className={classes.icon}>
              backup
            </Icon>
            <Text className={classes.label}>{t("dragAndDropHere")}</Text>
          </Column>
          <Box column justifyChildrenCenter>
            <Line />
            <Text className={clsx(classes.label, classes.italic)}>{t("or")}</Text>
            <Line />
          </Box>
          <Column paddingHalf justifyChildrenCenter>
            <BrowseFilesButton onFilesChange={onFiles} multiple={multiple}>
              {t("browseFiles")}
            </BrowseFilesButton>
          </Column>
        </Row>
      </DropArea>
    )
  )
);
