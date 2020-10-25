import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { List as MUIList } from "@material-ui/core";
import { stylesheet } from "jss/components/List/List";

export const List = withStyles(stylesheet) (
    ({ stretch, border, scroll, classes, ...props }) => 
        <MUIList 
            {...props}
            classes={{
                root: clsx({
                    [classes.root]: true,
                    [classes.stretch]: stretch,
                    [classes.scroll]: scroll,
                    [classes.border]: border,
                }),
            }}
        />
);
