import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { LinearProgress, withStyles } from "@material-ui/core";
import { progressStylesheet } from "jss/LayoutElements/Progress";

export const Progress = withStyles(progressStylesheet, { name: "Progress" })(
  class Progress extends PureComponent {
    static propTypes = {
      value: PropTypes.number.isRequired,
      animated: PropTypes.bool,
      variant: PropTypes.string
    };

    static defaltProps = {
      value: 0
    };

    render() {
      let { classes, animated } = this.props;
      return (
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={this.props.value}
          classes={{
            root: clsx(classes.container, classes[this.props.variant]),
            bar1Determinate: clsx({
              "linear-progress-animated": animated
            })
          }}
        />
      );
    }
  }
);
