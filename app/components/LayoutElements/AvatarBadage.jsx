/**
 * by A. Prates, nov-2018
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Avatar, withStyles } from "@material-ui/core";
import Reseller from "Icons/Reseller";
import Seller from "Icons/Seller";
import { styleSheet } from "jss/LayoutElements/AvatarBadage";

class AvatarBadage extends PureComponent {
  static propTypes = {
    badageName: PropTypes.string,
    classes: PropTypes.any.isRequired
  };

  renderBadage = badageName => {
    switch (badageName) {
      case "reseller":
        return <Reseller />;

      case "seller":
        return <Seller />;

      default:
        // empty
        return null;
    }
  };

  render() {
    const { badageName, classes } = this.props;

    const badage = this.renderBadage(badageName);

    return badage !== null ? (
      <Avatar className={classes.badageWrapper}>
        <Avatar className={classes.badage}>{badage}</Avatar>
      </Avatar>
    ) : null;
  }
}

export default withStyles(styleSheet, { name: "AvatarBadage" })(AvatarBadage);
