import React, { PureComponent } from "react";
import clsx from 'clsx';
import { Icon as MUIIcon, withStyles } from "@material-ui/core";
import { iconStylesheet } from "jss/Elements/Icon";

export const Icon = withStyles(
  iconStylesheet, 
  { name: "Icon" },
) (
  (props) => <MUIIcon fontSize="inherit" {...props}/>
);
