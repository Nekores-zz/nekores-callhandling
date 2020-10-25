import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Icon, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Audio/AudioStatus";
import { MiniAudioPlayer } from "./AudioPlayer";

class AudioStatus extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  statusMark = {
    pending: "hourglass_empty",
    inprogress: "data_usage",
    placeholder: "crop_free",
    complete: "play_circle_filled",
    multiversion: "file_copy"
  };

  statusText = {
    pending: this.props.t("pending"),
    inprogress: this.props.t("inProgress"),
    placeholder: this.props.t("placeholder"),
    complete: this.props.t("listen"),
    multiversion: this.props.t("multiVersion")
  };

  render() {
    const { status, classes, audioPlayerInstance, fileId } = this.props;
    const { onPlayPause, onChangeProgress } = this.props;

    return (
      <span className={clsx(classes.status, classes[status])}>
        {status === "complete" && audioPlayerInstance ? (
          <MiniAudioPlayer
            progress={audioPlayerInstance.progress}
            playState={
              fileId === audioPlayerInstance.currentPlayingFile
                ? audioPlayerInstance.playState
                : "stop"
            }
            onPlayPause={onPlayPause(fileId)}
            onChangeProgress={onChangeProgress}
          />
        ) : (
          <Icon className={classes.icon}>{this.statusMark[status]}</Icon>
        )}
        {status !== "complete" && this.statusText[status]}
      </span>
    );
  }
}

export default withStyles(styleSheet, { name: "AudioStatus" })(translate("audio")(AudioStatus));
