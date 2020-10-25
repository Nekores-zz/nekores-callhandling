/**
 * Created by Andrzej on 02.02.2018.
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import LoginPagePattern from "pages/pagePatterns/LoginPagePattern";
import LoginSimple from "components/Login/LoginSimple/LoginSimple";
import LoginPrefilled from "components/Login/LoginPrefilled/LoginPrefilled";
import { poweredBy, links } from "utils/links";

class LoginPage extends Component {
  static propTypes = {
    isLanding: PropTypes.bool,
    submitUrl: PropTypes.string,
    username: PropTypes.string,

    poweredBy: PropTypes.objectOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
  };

  static defaultProps = {
    poweredBy,
    links
  };

  state = {
    accounts: this.props.usersList || []
  };

  makeAjax = (url, callback) => {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      // XMLHttpRequest.DONE === 4
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        if (xmlhttp.status === 200) {
          callback(true, xmlhttp);
        } else if (xmlhttp.status === 400) {
          callback(false, xmlhttp);
        } else {
          callback(false, xmlhttp);
        }
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };

  removeAccount = account =>
    this.makeAjax(this.props.removeUrl + "?userId=" + account.userId, () => {
      this.setState({
        accounts: this.state.accounts.filter(a => a != account)
      });
    });

  render = () => {
    const { username, error, submitUrl, isLanding, poweredBy, accountName, links } = this.props;
    const { accounts } = this.state;

    return (
      <LoginPagePattern isLanding={isLanding} accountName={accountName}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            {!accounts.length ? (
              <LoginSimple
                submitUrl={submitUrl}
                error={error}
                username={username}
                poweredBy={poweredBy}
                links={links}
                rememberPassword={false}
              />
            ) : (
              <LoginPrefilled
                usersList={accounts}
                removeAccount={this.removeAccount}
                submitUrl={submitUrl}
                error={error}
                username={username}
                poweredBy={poweredBy}
                links={links}
              />
            )}
          </Grid>
        </Grid>
      </LoginPagePattern>
    );
  };
}

export default LoginPage;
