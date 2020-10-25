import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { Button } from "components/Elements";
import { recordButtonStylesheet } from "jss/Audio/AudioPlayer/RecordButton";

export const RecordButton = withStyles(recordButtonStylesheet, { name: "RecordButton" })(
  ({ isRecording, onClick, children, classes, ...props }) => (
    <Button
      onClick={onClick}
      variant="contained"
      classes={{
        ...classes,
        root: clsx(classes.root, {
          [classes.recording]: isRecording
        })
      }}
      {...props}
    >
      {children}
    </Button>
  )
);
