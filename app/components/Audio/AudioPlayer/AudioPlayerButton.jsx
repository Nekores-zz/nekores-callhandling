import React from "react";
import { withStyles } from "@material-ui/core";
import { IconButton } from "components/Elements";
import { audioPlayerButtonStylesheet } from "jss/Audio/AudioPlayer/AudioPlayer";

export const AudioPlayerButton = withStyles(audioPlayerButtonStylesheet, {
  name: "AudioPlayerButton"
})(({ onClick, children, size, classes, ...props }) => {
  return (
    <IconButton onClick={onClick} size={size || "medium"} classes={classes} {...props}>
      {children}
    </IconButton>
  );
});
