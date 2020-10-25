import React from "react";
import { AudioPlayerButton } from "./AudioPlayerButton";
import { Icon } from "components/Elements";

export const PauseButton = props => (
  <AudioPlayerButton {...props}>
    <Icon fontSize="inherit">pause</Icon>
  </AudioPlayerButton>
);
