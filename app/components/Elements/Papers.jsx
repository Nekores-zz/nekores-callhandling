import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Paper as MUIPaper, withStyles } from "@material-ui/core";
import { Box, Column } from 'components/Elements';
import { paperStylesheet } from "jss/Elements/Papers";

export const Paper = withStyles(
    paperStylesheet, 
    { name: "Paper" },
) (
    ({ fillContainer, classes, ...props }) => (
        <MUIPaper
            elevation={2} 
            classes={{ root: classes.paper }}
            {...props}
        />
    )
);

export const PageContentPaper = (props) => <MUIPaper elevation={4}/>
