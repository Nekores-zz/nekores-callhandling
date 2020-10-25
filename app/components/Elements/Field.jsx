import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Chip, Icon, InputAdornment, withStyles } from "@material-ui/core";
import { Holder, Text } from "components";
import { styleSheet } from "jss/Elements/Field";

export const Field = withStyles(styleSheet, { name: "Field" }) (
  ({ children, classes, ...props }) => (
    <Holder
      className={clsx(classes.holder)}
      adornment={
        <InputAdornment>
          <Icon classes={{ root: classes.adornmentIcon }}>
            edit
          </Icon>
        </InputAdornment>
      }
      {...props}
    >
      {children}
    </Holder>
  )
);

export const FieldText = withStyles(styleSheet, { name: "Field" }) (
  ({ children, classes, ...props }) => (
    <Text className={classes.text} {...props}>
      {children}
    </Text>
  )
);

export const FieldChip = withStyles(styleSheet, { name: "Chip" }) (
  ({ classes, ...props }) => (
    <Chip classes={{ root: classes.chip }} {...props} />
  )
);
