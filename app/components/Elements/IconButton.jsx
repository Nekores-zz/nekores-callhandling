import React, { PureComponent } from "react";
import clsx from "clsx";
import { IconButton as MUIIconButton, withStyles } from "@material-ui/core";
import { iconButtonStylesheet } from "jss/Elements/IconButton";

export const IconButton = withStyles(iconButtonStylesheet, { name: "IconButton" })(
  ({ children, classes, size, ...props }) => (
    <MUIIconButton
      classes={{
        root: clsx(classes[size] || classes.medium, classes.root)
      }}
      {...props}
    >
      {children}
    </MUIIconButton>
  )
);
