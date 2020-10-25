import React from "react";
import { withStyles } from "@material-ui/core";
import { Icon } from "components/Elements";
import { recordIconStylesheet } from "jss/Audio/AudioPlayer/AudioPlayer";

export const RecordIcon = withStyles(recordIconStylesheet, { name: "RecordIcon" })(props => (
  <Icon fontSize="large" {...props}>
    mic
  </Icon>
));
