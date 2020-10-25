import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { withStyles } from "@material-ui/core";
import { Icon } from "components/Elements";
import { Text, Row, Column, Box, Stretch, Progress } from "components/LayoutElements";
import {
  styleSheet as singleAudioPlayerStyleSheet,
  largeMainIconStylesheet
} from "jss/Audio/UploadAudio";
import { AudioPlayer, PlayButton, PauseButton, Timer } from ".";
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

export const SingleAudioPlayer = withStyles(singleAudioPlayerStyleSheet, {
  name: "SingleAudioPlayer"
})(
  translate("audio")(
    class SingleAudioPlayer extends Component {
      static propTypes = {
        getPlayUrl: PropTypes.func,
        file: PropTypes.object,

        classes: PropTypes.object,
        t: PropTypes.func
      };

      state = { playState: "stop", progress: 0 };

      componentDidMount() {
        this.player.addEventListener("canplay", this.handleCanPlay);
      }

      handleCanPlay = () => {
        this.player.addEventListener("timeupdate", this.handleTimeUpdate);
        this.player.addEventListener("ended", this.handleTimeEnd);
      };

      handleTimeUpdate = () => {
        const progress = (this.player.currentTime * 100) / this.player.duration;
        this.setState({ progress });
      };

      handleTimeEnd = () => {
        this.player.currentTime = 0;
        this.player.pause();
        this.setState({ progress: 0, playState: "stop" });
      };

      handlePlayPause = () => {
        const playState = this.state.playState === "playing" ? "pause" : "playing";
        let progress = this.state.progress;

        if (this.player) {
          switch (playState) {
            case "playing":
              this.player.play();
              break;
            case "pause":
              this.player.pause();
              break;
            case "stop":
              this.player.stop();
              progress = 0;
              this.player.currentTime = 0;
              break;
          }
        }

        this.setState({ playState, progress });
      };

      handleChangeProgress = progress => {
        if (this.player) {
          const position = (progress * this.player.duration) / 100;
          this.player.currentTime = parseFloat(position);
        }
        this.setState({ progress });
      };

      render() {
        const { file, t, classes } = this.props;
        const { playState, progress } = this.state;

        const position = this.player ? Math.ceil(this.player.currentTime * 1000) : 0;
        const duration = this.player ? Math.ceil(this.player.duration * 1000) : 0;

        return (
          <Column stretch borderHalf paddingLeft paddingRight>
            <audio ref={node => (this.player = node)} controls={true} preload="auto" hidden={true}>
              <source src={this.props.getPlayUrl()} type="audio/mp3" />
            </audio>
            <Row>
              <Box>
                <LargeMainIcon name="mic" />
              </Box>
              {file.state === "uploading" && (
                <Column stretch paddingTopDouble paddingBottomDouble paddingLeft>
                  <Row paddingBottomHalf>
                    <Text>{t("uploading")}</Text>
                  </Row>
                  <Row>
                    <Progress
                      // value={(file.position * 100) / file.duration}
                      // value={file.progress}
                      value={progress}
                      variant={file.state === "uploading" ? "thick" : ""}
                      animated={file.state === "uploading"}
                    />
                  </Row>
                </Column>
              )}
              {(file.state === "playing" || file.state === "pause") && (
                <Column stretch paddingTop paddingBottom paddingLeft>
                  <Row paddingBottomHalf>
                    <Stretch />
                    <Box paddingBottomHalf>
                      <Box paddingLeft>
                        <Text className={classes.playPauseButton}>
                          {playState === "playing" ? (
                            <AudioPlayer.PauseButton onClick={this.handlePlayPause} size="small" />
                          ) : (
                            <AudioPlayer.PlayButton onClick={this.handlePlayPause} size="small" />
                          )}
                        </Text>
                      </Box>
                    </Box>
                  </Row>
                  <Row paddingBottomHalf>
                    <Slider
                      value={progress}
                      onChange={updateProgress => this.handleChangeProgress(updateProgress)}
                      color="#2196F3"
                      className={classes.singleProgress}
                    />
                  </Row>
                  <Row paddingTopHalf paddingBottomHalf>
                    <Text>
                      <Timer ms={position} />
                    </Text>
                    <Box stretch />
                    <Text>
                      <Timer ms={duration} />
                    </Text>
                  </Row>
                </Column>
              )}
            </Row>
          </Column>
        );
      }
    }
  )
);
