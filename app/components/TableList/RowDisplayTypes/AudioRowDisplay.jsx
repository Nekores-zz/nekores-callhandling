/**
 * by A. Prates, may-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Chip, Grid, Typography, withStyles } from "@material-ui/core";
import { AudioStatus } from "components/Audio";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class AudioRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    getPlayUrl: PropTypes.func,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    audioPlayerInstance: {
      progress: 0,
      playState: "stop"
    }
  };

  componentDidMount() {
    this.player.addEventListener("canplay", this.handleCanPlay);
  }

  handleCanPlay = () => {
    this.player.addEventListener("timeupdate", this.handleTimeUpdate);
    this.player.addEventListener("ended", this.handleTimeEnd);
  };

  handleTimeUpdate = () => {
    const { audioPlayerInstance } = this.state;
    audioPlayerInstance.progress = (this.player.currentTime * 100) / this.player.duration;
    this.setState({ audioPlayerInstance });
  };

  handleTimeEnd = () => {
    const { audioPlayerInstance } = this.state;
    this.player.currentTime = 0;
    this.player.pause();

    audioPlayerInstance.progress = 0;
    audioPlayerInstance.playState = "stop";
    this.setState({ audioPlayerInstance });
  };

  handlePlayPause = () => () => {
    const { audioPlayerInstance } = this.state;
    audioPlayerInstance.playState =
      audioPlayerInstance.playState === "playing" ? "pause" : "playing";

    if (this.player) {
      switch (audioPlayerInstance.playState) {
        case "playing":
          this.player.play();
          break;
        case "pause":
          this.player.pause();
          break;
        case "stop":
          this.player.stop();
          audioPlayerInstance.progress = 0;
          this.player.currentTime = 0;
          break;
      }
    }

    this.setState({ audioPlayerInstance });
  };

  handleChangeProgress = progress => {
    const { audioPlayerInstance } = this.state;
    audioPlayerInstance.progress = progress;
    if (this.player) {
      const position = (audioPlayerInstance.progress * this.player.duration) / 100;
      this.player.currentTime = parseFloat(position);
    }
    this.setState({ audioPlayerInstance });
  };

  render() {
    const { rowData, classes, t, getPlayUrl } = this.props;
    const { audioPlayerInstance } = this.state;
    const fileId = rowData.id;

    return (
      <div className={classes.contentWrapper}>
        <audio ref={node => (this.player = node)} controls={true} preload="auto" hidden={true}>
          <source
            src={getPlayUrl(fileId)}
            type="audio/mp3"
          />
        </audio>
        <AudioStatus
          status={rowData.status.toLowerCase()}
          fileId={fileId}
          audioPlayerInstance={{currentPlayingFile: fileId, progress: audioPlayerInstance.progress, playState: audioPlayerInstance.playState}}
          onPlayPause={this.handlePlayPause}
          onChangeProgress={this.handleChangeProgress}
        />
        <br />
        <br />
        <br />

        <Typography variant="caption">{t(rowData.fieldDescription)}</Typography>
        <Typography className={classes.contentText}>{rowData.description}</Typography>
        <br />
        <br />

        <Typography variant="caption">{t(rowData.fieldTags)}</Typography>
        <Grid
          container
          direction="row"
          spacing={8}
          className={clsx(classes.marginTopLess, classes.marginBottomLess)}
        >
          {rowData.tags.map((tag, index) => (
            <Grid item key={index}>
              <Chip label={tag} className={classes.pill} />
            </Grid>
          ))}
        </Grid>
        <br />

        <Typography variant="caption">{t(rowData.fieldSet)}</Typography>
        <Typography className={classes.contentText}>{rowData.name}</Typography>

        {rowData.createdBy && (
          <Fragment>
            <br />
            <br />

            <Typography variant="caption">{t(rowData.fieldCreatedBy)}</Typography>
            <Typography className={classes.contentText}>
              {t("userName", rowData.createdBy)}
            </Typography>
            {rowData.createdBy.date && (
              <Typography className={classes.contentText}>
                {t("simpleDate", rowData.createdBy)}
              </Typography>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AudioRowDisplay" })(
  translate("audio")(AudioRowDisplay)
);
