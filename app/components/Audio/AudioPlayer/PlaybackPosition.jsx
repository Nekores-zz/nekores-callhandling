import React, { PureComponent, Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import { LinearProgress, withStyles } from "@material-ui/core";
import { playbackPositionStylesheet } from "jss/Audio/AudioPlayer/AudioPlayer";

export const PlaybackPosition = withStyles(playbackPositionStylesheet, {
  name: "PlaybackPosition"
})(({ position, duration, onClick, classes }) => (
  <LinearProgress
    value={(100 * position) / duration}
    onClick={onClick}
    variant={"determinate"}
    color={"secondary"}
    classes={{
      root: clsx(classes.container)
    }}
  />
));
