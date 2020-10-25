import React, { Component } from "react";
import { Grid, Icon, Menu, MenuItem, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/Sidemenu/SidemenuFooter";

class SidemenuFooter extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    event.stopPropagation();
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, t } = this.props;
    const { anchorEl } = this.state;

    return (
      <Grid
        container
        spacing={0}
        aria-owns={anchorEl ? "sidemenu-footer-menu" : null}
        aria-haspopup="true"
        onClick={this.handleClick}
      >
        <Grid item xs={12} className={classes.footerHeading}>
          <div className={classes.poweredWrapper}>
            <span className={classes.powered}>{t("poweredBy")}</span>
            <span className={classes.poweredBy}>hubbub.ai</span>
          </div>
          {Boolean(anchorEl) ? (
            <Icon className={classes.footerHeadingIcon}>arrow_drop_up</Icon>
          ) : (
            <Icon className={classes.footerHeadingIcon}>arrow_drop_down</Icon>
          )}
        </Grid>
        <Menu
          id="sidemenu-footer-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          classes={{ paper: classes.menuPaper }}
        >
          <MenuItem onClick={this.handleClose}>{t("termsAndConds")}</MenuItem>
          <MenuItem onClick={this.handleClose}>{t("privacyPolicy")}</MenuItem>
        </Menu>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "SidemenuFooter" })(
  translate("common")(SidemenuFooter)
);
