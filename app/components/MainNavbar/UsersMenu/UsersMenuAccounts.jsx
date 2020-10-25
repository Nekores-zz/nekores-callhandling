import React, { Component } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  withStyles
} from "@material-ui/core";
import UserAvatar from "components/Login/UsersList/UserAvatar";
import { styleSheet } from "jss/MainNavbar/UsersMenuAccounts";

class UsersMenuAccounts extends Component {
  constructor() {
    super();
  }

  renderUserAccount = (account, index) => {
    const { classes } = this.props;
    return (
      <div key={index}>
        <ListItem classes={{ root: classes.listItem }}>
          <Avatar>
            <UserAvatar className={classes.userAvatar} name={account.name} />
          </Avatar>
          <ListItemText
            primary={account.name}
            secondary={account.email}
            classes={{
              primary: classes.userInfoHeading,
              secondary: classes.userInfoEmail
            }}
          />
        </ListItem>
        <Divider />
      </div>
    );
  };

  render() {
    const { usersAccounts } = this.props;

    return (
      <List>
        {usersAccounts.map((item, index) =>
          this.renderUserAccount(item, index)
        )}
      </List>
    );
  }
}

export default withStyles(styleSheet, { name: "UsersMenuAccounts" })(
  UsersMenuAccounts
);
