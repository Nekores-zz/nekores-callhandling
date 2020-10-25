/**
 * Created by Noah on 07.28.2019.
 */

import React from "react";
import { Hidden, Typography, withStyles } from "@material-ui/core";
import { Logo } from "components";
import { styleSheet } from "jss/Login/ResetPasswordCommons/ResetPasswordHeader";

export default withStyles(styleSheet, { name: "ResetPasswordHeader" })(props => {
  let headerIcon = null;

  let renderHeaderIcon = function(icon) {
    if (icon) {
      headerIcon = {
        ...props.headerIcon,
        props: {
          ...props.headerIcon.props,
          className: props.classes.icon,
          onClick: props.onHeaderIconClick
        }
      };
    }
    return headerIcon;
  };

  return (
    <div className={props.classes.container}>
      <Hidden smUp>
        <Logo inline />
      </Hidden>
      <div className={props.classes.titleWrapper}>
        {props && props.welcomeMessage ? (
          <Typography type="headline" component="span" classes={{ root: props.classes.title }}>
            {props.welcomeMessage}
          </Typography>
        ) : null}
        <Typography type="headline" component="h1" classes={{ root: props.classes.title }}>
          {props ? props.text : 'Set "text" property'}
        </Typography>
        {props.subtitle && (
          <Typography type="subtitle" component="span" classes={{ root: props.classes.subtitle }}>
            {props.subtitle}
          </Typography>
        )}
      </div>
      {renderHeaderIcon(props.headerIcon)}
    </div>
  );
});
