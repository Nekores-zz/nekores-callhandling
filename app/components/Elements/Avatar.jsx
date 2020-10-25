import React, { PureComponent } from "react";
import clsx from "clsx";
import { Avatar as MUIAvatar, withStyles } from "@material-ui/core";
import { avatarStylesheet } from "jss/Elements/Avatar";

export const Avatar = withStyles(avatarStylesheet, { name: "Avatar" })(({ classes, ...props }) => (
  <MUIAvatar className={classes.avatar} {...props} />
));
