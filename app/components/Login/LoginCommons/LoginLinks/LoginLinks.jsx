/**
 * Created by Andrzej on 04.02.2018.
 * reviewed by Antonio on jul-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Login/LoginCommons/LoginLinks";

class LoginLinks extends Component {
  static propTypes = {
    poweredBy: PropTypes.objectOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render = () => {
    const { poweredBy, links, classes, t } = this.props;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={5}>
          <span className={classes.powered}>
            {t("poweredBy")} <a href={poweredBy.url}>{poweredBy.name}</a>
          </span>
        </Grid>

        <Grid item xs={7} className={classes.links}>
          {links.map((item, index) => (
            <a key={index} href={item.url}>
              {t(item.name)}
            </a>
          ))}
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styleSheet, { name: "LoginLinks" })(translate("common")(LoginLinks));
