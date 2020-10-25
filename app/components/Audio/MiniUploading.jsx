import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, Input, CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import { styleSheet, largeMainIconStylesheet } from "jss/Audio/MiniUploading";
import { translate } from "react-i18next";
import { IconButton, Icon } from "components/Elements";
import { Row, Column, Box, Text } from "components/LayoutElements";

const LargeMainIcon = withStyles(largeMainIconStylesheet, { name: "LargeMainIcon" })(
  ({ name, classes, className, ...props }) => (
    <Icon
      fontSize="large"
      className={className ? clsx(classes.root, className) : classes.root}
      {...props}
    >
      {name}
    </Icon>
  )
);

const UploadFileRow = withStyles(styleSheet, { name: "UploadFileRow" })(
  translate(["audio", "common"])(({ audioFile, classes, t }) => (
    <Row borderHalf paddingHalf>
      <Box paddingHalf>
        <LargeMainIcon
          name="mic"
          className={clsx(classes.mediumIcon, classes[audioFile.type + "Icon"])}
        />
        <Column>
          <Row paddingLeft>
            <Text>{audioFile.name}</Text>
          </Row>
          <Row>
            <Text className={classes.typeClass}>
              <Icon className={classes.typeIconClass}>{t(audioFile.type + "_icon")}</Icon>
              {t(audioFile.type)}
            </Text>
          </Row>
        </Column>
      </Box>
      <Box stretch />
      <Box paddingHalf>
        {audioFile.type === "file" ? (
          <CircularProgress className={classes.circularProgress} size={24} />
        ) : (
          <Icon fontSize="small">{t(audioFile.type + "_icon")}</Icon>
        )}
      </Box>
    </Row>
  ))
);

class MiniUploading extends Component {
  static propTypes = {
    audioFile: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    t: PropTypes.func.isRequired
  };

  state = {
    isClosed: false,
    isExpanded: false
  };

  handleToggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  handleClose = () => {
    this.setState({ isClosed: true });
  };

  render = () => {
    const { audioFile, classes, t } = this.props;
    const { isExpanded, isClosed } = this.state;
    const fileType = audioFile.type;
    const uploadAudioFiles = audioFile.files.filter(file => file.state === "uploading");

    return !!(uploadAudioFiles && uploadAudioFiles.length && !isClosed) ? (
      <div
        className={clsx(classes.uploadingTooltip, isExpanded && classes.uploadingTooltipExpanded)}
      >
        <div className={classes.uploadingTooltipHeader}>
          <div className={classes.uploadingTooltipTitle}>
            {fileType === "singleFile"
              ? t("uploading...")
              : t("uploadingAudios...", { count: uploadAudioFiles.length })}
          </div>
          <div>
            <IconButton onClick={this.handleToggleExpand}>
              <Icon className={classes.uploadingTooltipButtons}>
                {isExpanded ? "keyboard_arrow_down" : "keyboard_arrow_up"}
              </Icon>
            </IconButton>
            <IconButton onClick={this.handleClose}>
              <Icon className={classes.uploadingTooltipButtons}>close</Icon>
            </IconButton>
          </div>
        </div>
        {isExpanded && (
          <div className={classes.uploadingTooltipBody}>
            <Column>
              {Array.prototype.map.call(uploadAudioFiles, (audioFile, i) => (
                <UploadFileRow audioFile={audioFile} key={i} />
              ))}
            </Column>
          </div>
        )}
      </div>
    ) : null;
  };
}

export default withStyles(styleSheet, { name: "MiniUploading" })(
  translate(["audio", "common"])(MiniUploading)
);
