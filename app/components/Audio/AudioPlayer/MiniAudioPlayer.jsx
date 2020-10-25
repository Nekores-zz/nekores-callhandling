import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { withStyles } from "@material-ui/core";
import { Icon } from "components/Elements";
import { Text } from "components/LayoutElements";
import { miniAudioPlayerStylesheet } from "jss/Audio/AudioPlayer/AudioPlayer";
import { Slider } from "material-ui-slider";

export const MiniAudioPlayer = withStyles(miniAudioPlayerStylesheet, { name: "MiniAudioPlayer" })(
  translate("audio")(
    class MiniAudioPlayer extends Component {
      static propTypes = {
        progress: PropTypes.number,
        playState: PropTypes.oneOf(["playing", "pause", "stop"]),

        onPlayPause: PropTypes.func,
        onChangeProgress: PropTypes.func,
      };

      // state = {
      //   position: this.props.position ? this.props.position : 0,
      //   playState: this.props.playState ? this.props.playState : "stop"
      // };

      handleTogglePlayPause = event => {
        event.stopPropagation();

        // let { playState, position } = this.state;
        // playState = playState === "playing" ? "pause" : "playing";

        // switch (playState) {
        //   case "playing":
        //     this.player.play();
        //     break;
        //   case "pause":
        //     this.player.pause();
        //     break;
        //   case "stop":
        //     this.player.stop();
        //     position = 0;
        //     this.player.currentTime = position;
        //     break;
        // }

        // this.setState({ playState, position });
        if (this.props.onPlayPause) {
          this.props.onPlayPause();
        }
      };

      handleChange = updateProgress => {
        this.props.onChangeProgress(updateProgress);
      };

      render() {
        const { t, classes } = this.props;
        const { playState, progress } = this.props;

        return (
          <Fragment>
            <div>
              {playState === "playing" ? (
                <div onClick={e => e.stopPropagation()}>
                  <Icon onClick={this.handleTogglePlayPause} className={classes.icon}>
                    pause_circle_filled
                  </Icon>
                  <Slider
                    value={progress}
                    onChange={updateProgress => this.handleChange(updateProgress)}
                    color="#2196F3"
                    className={classes.progress}
                  />
                </div>
              ) : (
                <div>
                  <Icon onClick={this.handleTogglePlayPause} className={classes.icon}>
                    play_circle_filled
                  </Icon>
                  <Text className={classes.completeLabel}>{t("listen")}</Text>
                </div>
              )}
            </div>
          </Fragment>
        );
      }
    }
  )
);
