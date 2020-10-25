import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/Sidemenu/SidemenuTextButton";

class SidemenuTextButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { children, onClick, className, classes } = this.props;

    return (
      <Button
        className={clsx(classes.textButton, className)}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
}

export default withStyles(styleSheet, { name: "SidemenuTextButton" })(
  SidemenuTextButton
);
