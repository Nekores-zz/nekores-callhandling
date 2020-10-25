import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Chip,
  Grid,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  Checkbox,
  Link,
  Collapse,
  withStyles,
  withWidth
} from "@material-ui/core";
import { translate } from "react-i18next";
import { largeMainIconStylesheet } from "jss/Audio/UploadAudio";
import { IconButton, Icon } from "components/Elements";
import { Text, TextField, Box, Row, Column } from "components/LayoutElements";
import { ConfirmDialog } from "components";
import { AudioPlayer, Timer } from "../../../Audio/AudioPlayer";
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

const styleSheet = theme => ({
  rowWrapper: {
    width: "100%"
  },

  audioFileAvatar: {
    minWidth: 200
  },

  rowFileName: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: 250,
    minWidth: 80
  },

  typeClass: {
    fontSize: "0.8em",
    position: "relative",
    bottom: -4
  },

  typeIconClass: {
    marginRight: 2,
    marginLeft: theme.spacing.unit * 2,
    position: "relative",
    bottom: -4
  },

  mediumIcon: {
    fontSize: "1.2em",
    width: "40px",
    height: "40px",
    lineHeight: "40px"
  },

  moreInfo: {
    textDecoration: "underline",
    cursor: "pointer",
    marginLeft: 16
  },

  collapseMoreInfo: {
    width: "100%",
  },

  miniProgress: {
    position: "relative",
    top: -16,
    height: "0px !important",
    color: theme.colors.primary.secondaryBlue,
    minWidth: "200px"
  },

  controller: {
    paddingTop: 12
  },

  expandedInfo: {
    width: "100%",
    maxWidth: 520
  },

  contentText: {
    ...theme.typography.primaryBody,
    bottom: 10
    // maxWidth: 300
  },

  audioTags: {
    marginBottom: 2,
    marginTop: 2
  },

  pill: {
    ...theme.typography.secondaryBody,
    fontSize: 12
  }
});

const ListRow = ({ children, isSelected, ...props }) => (
  <Row borderHalf paddingHalf backgroundHighlight={isSelected} {...props}>
    {children}
  </Row>
);

class SearchableAudioFileRow extends Component {
  static propTypes = {
    audioFile: PropTypes.object.isRequired,
    onRowSelect: PropTypes.func,
    audioPlayerInstance: PropTypes.object,
    onPlayPause: PropTypes.func,
    onChangePosition: PropTypes.func,
    getAudioSetFromId: PropTypes.func
  };

  state = {
    infoExpanded: false,
    playState: "pause",
    position: 0,
    duration: 1
  };

  // audio player events
  componentWillReceiveProps(nextProps) {
    const fileId =
      nextProps.audioFile && nextProps.audioFile.files && nextProps.audioFile.files[0]
        ? nextProps.audioFile.files[0].id
        : null;
    const playState =
      nextProps.audioPlayerInstance && nextProps.audioPlayerInstance.currentPlayingFile === fileId
        ? nextProps.audioPlayerInstance.playState
        : "pause";
    const position =
      nextProps.audioPlayerInstance && nextProps.audioPlayerInstance.currentPlayingFile === fileId
        ? nextProps.audioPlayerInstance.position
        : this.state.position;
    const duration =
      nextProps.audioPlayerInstance && nextProps.audioPlayerInstance.currentPlayingFile === fileId
        ? nextProps.audioPlayerInstance.duration
        : this.state.duration;

    this.setState({ playState, position, duration });
  }

  handlePlayPause = () => {
    const playState = this.state.playState === "playing" ? "pause" : "playing";
    const audioFile = this.props.audioFile;
    this.props.onPlayPause(
      audioFile && audioFile.files && audioFile.files[0] ? audioFile.files[0].id : null
    );
    if (playState === "playing") {
      this.props.onChangePosition(this.state.position);
    }
  };

  handleChangeProgress = progress => {
    const position = (this.state.duration * progress) / 100;
    const { audioFile, audioPlayerInstance } = this.props;
    this.setState({ position });
    if (
      audioFile &&
      audioFile.files &&
      audioFile.files[0] &&
      audioPlayerInstance.currentPlayingFile === audioFile.files[0].id
    ) {
      this.props.onChangePosition(position);
    }
  };
  // end of audio player events

  handleToggleMoreInfo = () => {
    this.setState({ infoExpanded: !this.state.infoExpanded });
  };

  secondsToHms = d => {
    const dateObj = new Date(d);
    const hours = dateObj.getUTCHours(),
      minutes = dateObj.getUTCMinutes(),
      seconds = dateObj.getSeconds();

    return hours
      ? hours.toString().padStart(2, "0") + ":"
      : "" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  };

  render = () => {
    const { t, audioFile, classes } = this.props;
    const { infoExpanded } = this.state;

    const { playState, position, duration } = this.state;
    let isPlaying = playState === "playing";

    const audioSet = this.props.getAudioSetFromId(audioFile.setId);

    return (
      <div
        className={classes.rowWrapper}
        onClick={this.props.onRowSelect && this.props.onRowSelect(audioFile)}
      >
        <ListRow isSelected={!!audioFile.selected} paddingHalf noStretch>
          <Column>
            <Row>
              <Box paddingHalf classes={{ box: classes.audioFileAvatar }}>
                <LargeMainIcon name="mic" className={classes.mediumIcon} />
                <Column>
                  <Row paddingLeft>
                    <Text className={classes.rowFileName}>{audioFile.name}</Text>
                  </Row>
                  <Row>
                    <Text className={classes.typeClass}>
                      <Icon className={classes.typeIconClass}>folder_icon</Icon>
                      {t("file")}
                      <Text className={classes.moreInfo} onClick={this.handleToggleMoreInfo}>
                        {t(!infoExpanded ? "moreInfo" : "lessInfo")}
                      </Text>
                    </Text>
                  </Row>
                </Column>
              </Box>
              <Box stretch />
              <Box paddingHalf>
                <Box padding>
                  <Slider
                    value={duration ? (position * 100) / duration : 0}
                    onChange={updateProgress => this.handleChangeProgress(updateProgress)}
                    color="#2196F3"
                    className={classes.miniProgress}
                  />
                </Box>
                <Box paddingTop>
                  <Text>{this.secondsToHms(position * 1000)}</Text>
                  {/* <Timer ms={position} /> */}
                </Box>
                <Box paddingHalf classes={{ box: classes.controller }}>
                  {isPlaying ? (
                    <AudioPlayer.PauseButton size="small" onClick={this.handlePlayPause} />
                  ) : (
                    <AudioPlayer.PlayButton size="small" onClick={this.handlePlayPause} />
                  )}
                </Box>
              </Box>
            </Row>
            <Collapse in={infoExpanded} className={classes.collapseMoreInfo}>
              <Row padding>
                <div className={classes.expandedInfo}>
                  <Typography variant="caption">{t("audioSet")}</Typography>
                  <Typography className={classes.contentText}>{audioSet.name}</Typography>
                  <br />
                  <Typography variant="caption">{t("description")}</Typography>
                  <Typography className={classes.contentText}>{audioFile.description}</Typography>
                  <br />
                  <Typography variant="caption">{t("tags")}</Typography>
                  <Grid container direction="row" spacing={8} className={classes.audioTags}>
                    {audioFile.tags.map((tag, index) => (
                      <Grid item key={index}>
                        <Chip label={tag} className={classes.pill} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </Row>
            </Collapse>
          </Column>
        </ListRow>
      </div>
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "SearchableAudioFileRow" })(
    translate(["servicedesigner", "common"])(SearchableAudioFileRow)
  )
);
