/**
 * Created by Andrzej on 02.02.2018.
 */
import React, { Component } from "react";
import { Avatar, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/Logo";

class Logo extends Component {
  goToHomePage = () => {
    // Place for function which handles go to homepage.
    return false;
  };

  extractLabel = () => {
    const words = this.props.name.split(" ");

    switch (words.length) {
      case 0:
        return "";
      case 1:
        return words[0][0];
      case 2:
        return words[0][0] + words[1][0];
      default:
        return words[0][0] + words[1][0] + words[2][0];
    }
  };

  render() {
    const { classes, name } = this.props;
    const safeLabel = name ? this.extractLabel() : "";

    return (
      <Avatar
        onClick={this.goToHomePage}
        className={`${classes.logoComponent} ${this.props.inline ? classes.inline : ""}`}
      >
        {safeLabel}
      </Avatar>
    );
  }
}

export default withStyles(styleSheet, { name: "Logo" })(Logo);
