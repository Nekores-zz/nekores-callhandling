/**
 * Created by Andrzej on 02.02.2018.
 * updaded by A. Prates on jul-2018
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Paper, Icon, withStyles } from "@material-ui/core";
import UsersList from "../UsersList/UsersList";
import LoginHeader from "../LoginCommons/LoginHeader/LoginHeader";
import LoginPasswordForm from "../LoginCommons/LoginForm/LoginPasswordForm";
import LoginLinks from "../LoginCommons/LoginLinks/LoginLinks";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/LoginPrefilled";

class LoginPrefilled extends Component {
  static propTypes = {
    usersList: PropTypes.array.isRequired,
    removeAccount: PropTypes.func.isRequired,
    submitUrl: PropTypes.string,
    error: PropTypes.string,
    username: PropTypes.string,

    poweredBy: PropTypes.objectOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    selectedAccount: this.props.username
      ? this.props.usersList.filter(a => a.email === this.props.username)[0]
      : null,
    removeMode: false
  };

  setAccount = account => this.setState({ selectedAccount: account });

  togleRemoveMode = () => this.setState({ removeMode: !this.state.removeMode });

  getHeader = () => {
    const { t } = this.props;
    const { selectedAccount, removeMode } = this.state;

    if (selectedAccount) {
      return {
        title: t("hi", { userName: selectedAccount.name.split(" ")[0] }),
        subtitle: selectedAccount.email
      };
    }

    if (removeMode)
      return {
        title: t("removeAccount"),
        subtitle: t("fromThisBrowser")
      };

    return {
      title: t("chooseAccount"),
      subtitle: null
    };
  };

  onHeaderIconClick = () => this.setState({ selectedAccount: null });

  render() {
    const { usersList, removeAccount, submitUrl, poweredBy, links, classes, t } = this.props;
    const { selectedAccount, removeMode } = this.state;

    const header = this.getHeader();

    return (
      <Grid item md={4} lg={4} xl={4} className={classes.loginComponent}>
        <Paper elevation={2} className={classes.paper}>
          <LoginHeader
            classes={{ container: classes.titleWrapper }}
            text={header.title}
            subtitle={header.subtitle}
            headerIcon={selectedAccount && <Icon>keyboard_arrow_down</Icon>}
            onHeaderIconClick={this.onHeaderIconClick}
          />

          {!selectedAccount && (
            <UsersList
              onClick={this.setAccount}
              usersList={usersList}
              onRemove={removeAccount}
              removeMode={this.state.removeMode}
              submitUrl={submitUrl}
            />
          )}

          {selectedAccount && (
            <LoginPasswordForm
              className={classes.passwordForm}
              username={selectedAccount.email}
              submitUrl={submitUrl}
              error={this.props.error}
            />
          )}

          {!selectedAccount && (
            <Grid container spacing={0} className={classes.buttonsContainer}>
              <Grid item xs={12} className={classes.buttonsWrapper}>
                <Button onClick={this.togleRemoveMode} className={classes.buttonRemove}>
                  {removeMode ? t("done") : t("remove")}
                </Button>

                <Button className={classes.buttonAnotherAccount}>{t("useAnotherAccount")}</Button>
              </Grid>
            </Grid>
          )}
        </Paper>
        <LoginLinks poweredBy={poweredBy} links={links} />
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "LoginPrefilled" })(
  translate("login")(LoginPrefilled)
);
