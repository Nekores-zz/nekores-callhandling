/**
 * Created by Andrzej on 02.02.2018.
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import LoginPagePattern from "pages/pagePatterns/LoginPagePattern";
import ForgotPassword from "components/Login/ForgotPassword/ForgotPassword";
import { poweredBy, links } from "utils/links";

class ForgotPasswordPage extends Component {
  static propTypes = {
    isLanding: PropTypes.bool,
    welcomeMessage: PropTypes.string,
    submitHandler: PropTypes.func.isRequired,

    poweredBy: PropTypes.objectOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
  };

  static defaultProps = {
    poweredBy,
    links
  };

  render = () => {
    const { isLanding, welcomeMessage, submitHandler, poweredBy, links, accountName } = this.props;

    return (
      <LoginPagePattern isLanding={isLanding} accountName={accountName}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <ForgotPassword
              welcomeMessage={welcomeMessage}
              submitHandler={submitHandler}
              poweredBy={poweredBy}
              links={links}
            />
          </Grid>
        </Grid>
      </LoginPagePattern>
    );
  };
}

export default ForgotPasswordPage;
