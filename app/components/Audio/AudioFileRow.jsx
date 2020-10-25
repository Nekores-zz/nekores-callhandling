import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  CircularProgress,
  Menu,
  MenuItem,
  Checkbox,
  withStyles,
  withWidth
} from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet, largeMainIconStylesheet } from "jss/Audio/UploadAudio";
import { IconButton, Icon } from "components/Elements";
import { Text, TextField, Box, Row, Column, withHover } from "components/LayoutElements";
import { AudioPlayer } from "./AudioPlayer";
import { ConfirmDialog } from "components";
import { Slider } from "material-ui-slider";

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

const ListRow = ({ children, isSelected, ...props }) => (
  <Row borderHalf paddingHalf backgroundHighlight={isSelected} {...props}>
    {children}
  </Row>
);

class AudioFileRow extends Component {
  static propTypes = {
    audioFile: PropTypes.object.isRequired,
    isUploadMode: PropTypes.bool,
    isUploading: PropTypes.bool,
    onDeleteRow: PropTypes.func,
    onFileRename: PropTypes.func,
    // onAudioPlayPause: PropTypes.func,
    onRowSelect: PropTypes.func,

    audioPlayerInstance: PropTypes.object,
    onPlayPause: PropTypes.func,
    onChangeProgress: PropTypes.func
  };

  state = {
    anchorMoreMenu: null,
    isRenaming: false,
    deleteDialog: false,

    playState: "pause",
    progress: 0
  };

  componentWillReceiveProps(nextProps) {
    const playState =
      this.props.audioPlayerInstance &&
      this.props.audioPlayerInstance.currentPlayingFile === this.props.audioFile.id
        ? this.props.audioPlayerInstance.playState
        : "pause";
    const progress =
      this.props.audioPlayerInstance &&
      this.props.audioPlayerInstance.currentPlayingFile === this.props.audioFile.id
        ? this.props.audioPlayerInstance.progress
        : this.state.progress;

    this.setState({ playState, progress });
  }

  handleMoreMenuOpen = event => {
    this.setState({ anchorMoreMenu: event.currentTarget });
  };

  handleMoreMenuClose = () => {
    this.setState({ anchorMoreMenu: false });
  };

  handleDeleteRow = () => {
    this.props.onDeleteRow(this.props.audioFile);
  };

  handleAudioPlayPause = () => {
    // this.props.onAudioPlayPause(this.props.audioFile);
    const playState = this.state.playState === "playing" ? "pause" : "playing";

    this.props.onPlayPause(this.props.audioFile.id);
    if (playState === "playing") {
      this.props.onChangeProgress(this.state.progress);
    }
  };

  handleChangeProgress = progress => {
    this.setState({ progress });
    if (this.props.audioPlayerInstance.currentPlayingFile === this.props.audioFile.id) {
      this.props.onChangeProgress(progress);
    }
  };

  handleFileRename = () => {
    this.setState({ isRenaming: true });
    this.handleMoreMenuClose();
  };

  handleDeleteFile = () => {
    this.setState({ deleteDialog: true });
    this.handleMoreMenuClose();
  };

  handleChangeFileName = audioFile => event => {
    if (event.key === "Enter") {
      this.setState({ isRenaming: false });
      this.props.onFileRename(this.props.audioFile, event.target.value);
    }
  };

  handleConfirmDeleteDialog = () => {
    this.setState({ deleteDialog: false });
    this.handleDeleteRow();
  };

  handleCancelDeleteDialog = () => {
    this.setState({ deleteDialog: false });
  };

  handleSelect = () => {
    this.props.onRowSelect(this.props.audioFile);
  };

  render = () => {
    const { t, audioFile, isUploadMode, audioPlayerInstance, hover, classes } = this.props;
    const { anchorMoreMenu, isRenaming, deleteDialog } = this.state;

    const { isHover, ...hoverHandlers } = hover;

    let isUploading = audioFile.state === "uploading";
    // let isPlaying = audioFile.state === "playing";

    const { playState, progress } = this.state;
    let isPlaying = playState === "playing";

    return (
      <div
        className={clsx(classes.audioFileRowWrapper, isHover && classes.audioFileRowHoverWrapper)}
        {...hoverHandlers}
      >
        <ListRow isSelected={!!audioFile.selected} paddingHalf noStretch>
          <Box paddingHalf>
            {!!(audioFile.selected || (isUploadMode && !isUploading && isHover)) ? (
              <Checkbox
                checked={!!audioFile.selected}
                onChange={this.handleSelect}
                className={classes.mediumIcon}
              />
            ) : (
              <LargeMainIcon name="mic" className={classes.mediumIcon} />
            )}
            {isRenaming ? (
              <Column paddingLeft>
                <TextField
                  onKeyPress={this.handleChangeFileName(audioFile)}
                  defaultValue={audioFile.name}
                  label={t("pressEnterWhenFinish")}
                />
              </Column>
            ) : isUploadMode ? (
              <Column>
                <Row paddingLeft>
                  <Text className={classes.rowFileName}>{audioFile.name}</Text>
                </Row>
                <Row>
                  <Text className={classes.typeClass}>
                    <Icon className={classes.typeIconClass}>{t(audioFile.type + "_icon")}</Icon>
                    {t(audioFile.type)}
                  </Text>
                </Row>
              </Column>
            ) : (
              <Box paddingHalf paddingLeft>
                <Text className={classes.rowFileName}>{audioFile.name}</Text>
              </Box>
            )}
          </Box>
          <Box stretch />
          {isUploadMode ? (
            <Box paddingHalf>
              <Box>
                {/* <AudioPlayer.PlaybackPosition
                  duration={audioFile.duration}
                  position={audioFile.position}
                /> */}
                <Slider
                  value={progress}
                  onChange={updateProgress => this.handleChangeProgress(updateProgress)}
                  color="#2196F3"
                  className={classes.miniProgress}
                />
              </Box>
              <Box paddingHalf>
                {isUploading ? (
                  <CircularProgress className={classes.circularProgress} size={24} />
                ) : isPlaying ? (
                  <AudioPlayer.PauseButton size="small" onClick={this.handleAudioPlayPause} />
                ) : (
                  <AudioPlayer.PlayButton size="small" onClick={this.handleAudioPlayPause} />
                )}
                <Box paddingLeftHalf>
                  <IconButton
                    size="small"
                    aria-controls="more-menu"
                    aria-haspopup="true"
                    onClick={this.handleMoreMenuOpen}
                  >
                    <Icon fontSize="small">more_horiz</Icon>
                  </IconButton>
                  <Menu
                    id="more-menu"
                    anchorEl={anchorMoreMenu}
                    keepMounted
                    open={Boolean(anchorMoreMenu)}
                    onClose={this.handleMoreMenuClose}
                  >
                    <MenuItem onClick={this.handleFileRename}>
                      <Text>
                        <Icon>edit</Icon> Rename
                      </Text>
                    </MenuItem>
                    <MenuItem onClick={this.handleDeleteFile}>
                      <Text>
                        <Icon>delete</Icon> Delete
                      </Text>
                    </MenuItem>
                  </Menu>

                  <ConfirmDialog
                    open={deleteDialog}
                    headerTitle={t("confirmDeleteTitle")}
                    primaryMessage={t("stillWantToDelete")}
                    dialogMessage={t("removeForever")}
                    confirmLabel={t("confirmDelete")}
                    onConfirm={this.handleConfirmDeleteDialog}
                    onCancel={this.handleCancelDeleteDialog}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box paddingHalf>
              <Box paddingLeftHalf>
                <IconButton size="small" onClick={this.handleDeleteRow}>
                  <Icon fontSize="small">delete</Icon>
                </IconButton>
              </Box>
            </Box>
          )}
        </ListRow>
      </div>
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "AudioFileRow" })(
    translate(["audio", "common"])(withHover(AudioFileRow))
  )
);
