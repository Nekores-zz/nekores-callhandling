import React from "react";
import { AudioPlayerButton } from "./AudioPlayerButton";
import { Icon } from "components/Elements";

export const PlayButton = props => (
  <AudioPlayerButton {...props}>
    <Icon fontSize="inherit">play_arrow</Icon>
  </AudioPlayerButton>
);
