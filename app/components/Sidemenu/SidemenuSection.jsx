import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Icon, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/Sidemenu/SidemenuSection";

class SidemenuSection extends Component {
  static propTypes = { isOpen: PropTypes.bool };

  state = { isOpen: this.props.isOpen };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render = () => {
    const { classes, title, children } = this.props;

    const { isOpen } = this.state;

    return (
      <>
        <Grid item className={classes.sectionTitleWrapper} onClick={this.toggle}>
          <Icon className={clsx(classes.sectionTitleIcon, isOpen ? "open" : "")}>
            keyboard_arrow_down
          </Icon>

          <span className={classes.sectionTitle}>{title}</span>
        </Grid>

        {isOpen ? <Grid item>{children}</Grid> : null}
      </>
    );
  };
}

export default withStyles(styleSheet, { name: "SidemenuSection" })(SidemenuSection);
