import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Hidden, withStyles } from "@material-ui/core";
import { Logo } from "components";
import { styleSheet } from "jss/pages/LoginPagePattern";

class LoginPagePattern extends Component {
  static propTypes = {
    isLanding: PropTypes.bool,

    classes: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
  };

  render = () => {
    const { isLanding, classes, children, accountName } = this.props;

    return (
      <div
        className={clsx(
          classes.mainComponent,
          isLanding !== false ? classes.mainComponentLanding : ""
        )}
      >
        <Hidden xsDown>
          <Logo name={accountName}/>
        </Hidden>
        {children}
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "LoginPagePattern" })(LoginPagePattern);
