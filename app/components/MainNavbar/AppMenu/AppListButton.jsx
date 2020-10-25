import React from "react";
import { Button, Icon, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/MainNavbar/AppListButton";
import { translate } from "react-i18next";

export default withStyles(styleSheet, { name: "AppListButton" })(
  translate("common")(props => {
    const { item, classes, t } = props;

    return (
      <Button
        classes={{ root: classes.button, label: classes.buttonContent }}
        onClick={() => window.open(window.location.origin + item.pathname, "_self")}
      >
        <Icon className={`${classes.buttonIcon} ${item.name.toLowerCase()}`}>{item.icon}</Icon>
        <span className={classes.buttonTitle}>{t(item.name)}</span>
      </Button>
    );
  })
);
