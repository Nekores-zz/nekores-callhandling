import React, { PureComponent } from "react";
import clsx from 'clsx';
import { Divider as MUIDivider, withStyles } from "@material-ui/core";
import { 
  dividerStylesheet,
} from "jss/Elements/Divider";

export const Divider = withStyles(
  dividerStylesheet, 
  { name: "Divider" },
) (
  ({ classes, ...props }) => (
    <div
      className={clsx({
        [classes.divider]: true,
        [classes.half]: props.half,
        [classes.single]: props.single,
        [classes.double]: props.double,
        [classes.light]: props.light,
        [classes.dark]: props.dark,
      })}
    />
  )
);
