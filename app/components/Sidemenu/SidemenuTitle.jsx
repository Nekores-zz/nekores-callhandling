import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Icon, Tooltip, withStyles } from "@material-ui/core";
import { Text, TooltipContent } from "components";
import { styleSheet } from "jss/components/Sidemenu/SidemenuTitle";

class SidemenuTitle extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string,
    subtitle: PropTypes.string,

    classes: PropTypes.object.isRequired
  };

  render() {
    const { title, info, subtitle, classes } = this.props;

    return (
      <Grid item className={classes.sidemenuHeader}>
        {info && (
          <Tooltip title={<TooltipContent title={title} text={info} />}>
            <Icon className={classes.infoIcon}>info</Icon>
          </Tooltip>
        )}

        <Text variant="headline">{title}</Text>

        {subtitle && (
          <Fragment>
            <br />
            <Text variant="subtitle">{subtitle}</Text>
          </Fragment>
        )}
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "SidemenuTitle" })(SidemenuTitle);
