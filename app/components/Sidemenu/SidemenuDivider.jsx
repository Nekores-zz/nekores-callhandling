import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Divider, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/Sidemenu/SidemenuDivider";

class SidemenuDivider extends PureComponent {
  static propTypes = {
    overlap: PropTypes.bool,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { overlap, classes } = this.props;
    return (
      <Divider
        className={clsx(classes.divider, overlap ? classes.overlap : "")}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "SidemenuDivider" })(
  SidemenuDivider
);
