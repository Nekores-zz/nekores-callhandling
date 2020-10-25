import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { ListItem as MUIListItem } from "@material-ui/core";
import { stylesheet } from "jss/components/List/ListItem";

export const ListItem = withStyles(stylesheet) (
    ({ borderTop, classes, ...props }) => 
        <MUIListItem 
            {...props}
            classes={{
                root: clsx({
                    [classes.borderTop]: borderTop,
                }),
            }}
        />
);
