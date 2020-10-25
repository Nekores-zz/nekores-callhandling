import React, { Component } from "react";
import { Button, Divider, Grid, Paper, withStyles } from "@material-ui/core";
import UsersMenuHeader from "./UsersMenuHeader";
import UsersMenuAccounts from "./UsersMenuAccounts";
import { translate } from "react-i18next";
import { styleSheet } from "jss/MainNavbar/UsersMenuContent";

class UsersMenuContent extends Component {
  signOut = dispatcher => () => dispatcher.dispatch(hubbub.globals.actions.signOut);

  render = () => {
    const { dispatcher, userInfo, quickSwitchUsers, classes, t } = this.props;

    return (
      <Paper classes={{ root: classes.paper }}>
        <Grid container spacing={0} className={classes.menuWrapper}>
          <Grid item xs={12}>
            <UsersMenuHeader userInfo={userInfo} />
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <UsersMenuAccounts usersAccounts={quickSwitchUsers} />
          </Grid>

          <Grid item xs={12} className={classes.usersMenuFooter}>
            <Button classes={{ root: classes.usersMenuFooterButton }}>{t("addAnAccount")}</Button>
            <Button
              classes={{ root: classes.usersMenuFooterButton }}
              onClick={this.signOut(dispatcher)}
            >
              {t("logout")}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };
}

export default withStyles(styleSheet, { name: "UsersMenuContent" })(
  translate("common")(UsersMenuContent)
);
