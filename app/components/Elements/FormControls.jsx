import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    withStyles,
    Checkbox as MUICheckbox, 
    Radio as MUIRadio,
    Switch as MUISwitch,
    FormControlLabel as MUIFormControlLabel,
    RadioGroup as MUIRadioGroup,
} from "@material-ui/core";
import {
    Select as SelectElement,
    Multiselect as MultiselectElement,
    Page,
} from "components/LayoutElements";
import { radioStylesheet } from 'jss/Elements/Radio';
import { checkboxStylesheet } from 'jss/Elements/Checkbox';
import { stylesheet as formControlLabelStylesheet } from 'jss/Elements/FormControlLabel';

export const Select = (props) => (
    <SelectElement fullWidth {...props}/>
);

export const Multiselect = (props) => (
    <MultiselectElement fullWidth {...props}/>
);

export const Checkbox = withStyles(checkboxStylesheet) (
    ({ dense, padding, avatar, classes, ...props }) => (
        <MUICheckbox 
            classes={{ 
                root: clsx({
                    [classes.root]: true, 
                    [classes.avatar]: avatar,
                    [classes.padding]: padding,
                    [classes.dense]: dense,
                }),
            }}
            {...props}
        />
    )
);

export const Radio = withStyles(radioStylesheet) (
    ({ padding, classes, ...props }) => (
        <MUIRadio 
            classes={{ 
                root: clsx({ 
                    [classes.root]: true, 
                    [classes.padding]: padding, 
                }),
            }}
            {...props}
        />
    )
);

export const Switch = (props) => (
    <MUISwitch {...props}/>
);

export const RadioGroup = (props) => (
    <MUIRadioGroup {...props}/>
);

export const FormControlLabel = withStyles(formControlLabelStylesheet) (
    ({ classes, ...props }) => (
        <MUIFormControlLabel 
            classes={{ 
                root: clsx(classes.root), 
                label: clsx(classes.label), 
            }} 
            {...props}
        />
    )
);

export {
    Page,
};