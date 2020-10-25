import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/PrimaryTextButton";

class PrimaryTextButton extends Component {
  static propTypes = {
    denseRight: PropTypes.bool,
    denseLeft: PropTypes.bool,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes, denseLeft, denseRight, children, ...props } = this.props;

    return (
      <Button
        variant="text"
        classes={{
          root: [
            classes.primaryTextButton,
            denseLeft ? classes.denseLeft : "",
            denseRight ? classes.denseRight : ""
          ].join(" "),
          disabled: classes.primaryTextButtonDisabled
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
}

export default withStyles(styleSheet, { name: "PrimaryTextButton" })(PrimaryTextButton);
