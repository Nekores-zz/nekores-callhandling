import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, Toolbar } from "@material-ui/core";
import { Row } from 'components/Elements';
import {
  stylesheet,
} from "jss/components/List/ListFooter";

export const ListFooter = withStyles(stylesheet, { name: "ListFooter" }) (
    ({ children, classes, ...props }) => (
        <Toolbar className={classes.listFooter} {...props}>
            {children}
        </Toolbar>
    )
);
