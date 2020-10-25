/**
 * Created by Andy on 2018-02-11.
 */
import React from "react";
import clsx from "clsx";
import { Avatar, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Login/UsersList/UserAvatar";

export default withStyles(styleSheet, { name: "UserAvatar" })(props => {
  const { avatar, name, big, classes } = props;
  let initials = name
    .split(" ")
    .map(item => item.split("")[0])
    .join("");

  return (
    <Avatar
      style={props.style}
      className={clsx(
        classes.avatar,
        !avatar ? classes.initialsAvatar : "",
        !!big ? classes.big : "",
        props.className ? props.className : ""
      )}
    >
      {avatar && <img alt="" src={avatar} className={classes.image} />}
      {!avatar && <span>{initials}</span>}
    </Avatar>
  );
});
