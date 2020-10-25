/**
 * Created by Andy on 2018-02-11.
 */
import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Icon,
  withStyles
} from "@material-ui/core";
import UserAvatar from "./UserAvatar";
import { styleSheet } from "jss/Login/UsersList/UsersList";

export default withStyles(styleSheet, { name: "UsersList" })(props => {
  let { usersList, removeMode, classes, submitUrl } = props;

  function onClick(account) {
    return removeMode
      ? () => props.onRemove(account)
      : () => props.onClick(account);
  }

  let onSubmit = function(account, index) {
    return removeMode
      ? () => props.onRemove(account)
      : () => document.getElementById("select_" + index).submit();
  };

  return (
    <List classes={{ root: classes.list }}>
      {usersList.map((item, index) => (
        <div key={item.userId}>
          {!item.reAuthenticate && (
            <form id={"select_" + index} action={submitUrl} method="POST">
              <input type="hidden" name="username" value={item.userId} />
              <ListItem
                onClick={onSubmit(item, index)}
                classes={{ root: classes.listItem }}
                key={index}
                button
                divider
              >
                <ListItemAvatar>
                  <UserAvatar avatar={item.avatar} name={item.name} />
                </ListItemAvatar>
                <ListItemText
                  classes={{
                    primary: classes.listItemPrimaryText,
                    secondary: classes.listItemSecondaryText
                  }}
                  primary={item.name}
                  secondary={item.email}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={onSubmit(item, index)}>
                    {removeMode ? (
                      <Icon>close</Icon>
                    ) : (
                      <Icon>keyboard_arrow_right</Icon>
                    )}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </form>
          )}
          {item.reAuthenticate && (
            <ListItem
              onClick={onClick(item)}
              classes={{ root: classes.listItem }}
              key={index}
              button
              divider
            >
              <ListItemAvatar>
                <UserAvatar avatar={item.avatar} name={item.name} />
              </ListItemAvatar>
              <ListItemText
                classes={{
                  primary: classes.listItemPrimaryText,
                  secondary: classes.listItemSecondaryText
                }}
                primary={item.name}
                secondary={item.email}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={onClick(item)}>
                  {removeMode ? (
                    <Icon>close</Icon>
                  ) : (
                    <Icon>keyboard_arrow_right</Icon>
                  )}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </div>
      ))}
    </List>
  );
});
