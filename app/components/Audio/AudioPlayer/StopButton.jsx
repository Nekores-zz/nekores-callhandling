import React from "react";
import { AudioPlayerButton } from "./AudioPlayerButton";
import { Icon } from "components/Elements";

export const StopButton = props => (
  <AudioPlayerButton {...props}>
    <Icon fontSize="inherit">stop</Icon>
  </AudioPlayerButton>
);
