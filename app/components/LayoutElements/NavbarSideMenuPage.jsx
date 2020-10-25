import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, withStyles, withWidth } from "@material-ui/core";
import { OverlaySidemenu, Sidemenu } from "components";
import { styleSheet } from "jss/LayoutElements/NavbarSideMenuPage";

class NavbarSideMenuPage extends Component {
  static propTypes = {
    navbar: PropTypes.func.isRequired, // header function
    sidemenuContent: PropTypes.any.isRequired, //sidemenu
    children: PropTypes.any.isRequired, // content

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired
  };

  isDesktopLayout = () => !!~["md", "lg", "xl"].indexOf(this.props.width);

  state = {
    isDrawerOpen: this.isDesktopLayout(),
    path: window.location.pathname
  };

  toggleDrawer = value => {
    let isDrawerOpen = typeof value === "boolean" ? value : !this.state.isDrawerOpen;
    this.setState({ isDrawerOpen });
  };

  componentDidUpdate = () => {
    // Close sidemenu drawer on mobile when sub-page is changed
    if (window.location.pathname !== this.state.path) {
      if (!this.isDesktopLayout()) this.toggleDrawer(false);
      this.setState({ path: window.location.pathname });
    }
  };

  render = () => {
    const { children, sidemenuContent, navbar, classes } = this.props;
    const { isDrawerOpen } = this.state;

    const AdaptiveSidemenu = this.isDesktopLayout() ? Sidemenu : OverlaySidemenu;

    return (
      <Grid container direction="column" wrap="nowrap" className={classes.container}>
        <Grid item className={classes.appbar}>
          {navbar(this.toggleDrawer)}
        </Grid>

        <Grid item className={classes.page}>
          <AdaptiveSidemenu isOpen={isDrawerOpen} toggle={this.toggleDrawer}>
            {sidemenuContent}
          </AdaptiveSidemenu>

          <Grid
            item
            className={clsx(
              classes.content,
              this.isDesktopLayout() && isDrawerOpen ? classes.desktopContentDrawerOpen : ""
            )}
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "NavbarSideMenuPage" })(NavbarSideMenuPage)
);
