import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { 
    DialogTitle as MUIDialogTitle, 
    DialogContent as MUIDialogContent, 
    DialogActions as MUIDialogActions, 
    Dialog as MUIDialog, 
    withStyles 
} from "@material-ui/core";
import {
  dialogStylesheet,
} from "jss/Elements/Dialogs";

export const Dialog = withStyles(dialogStylesheet, { name: "Dialog" }) (
    ({ width, height, children, classes, ...props }) => (
        <MUIDialog
            classes={{
                ...classes,
                paper: clsx(
                  classes.dialogPaper,
                  classes[`width-${width || 'auto'}`],
                  classes[`height-${height || 'auto'}`],
                ),
            }}
            {...props}
        >
            {children}
        </MUIDialog>
    )
);

export const DialogTitle = MUIDialogTitle;

export const DialogContent = withStyles(dialogStylesheet, { name: "DialogContent" }) (
  ({ children, classes, noPadding, width }) => (
    <MUIDialogContent className={clsx({
        [classes["padding-none"]]: noPadding,
    })}>
        {children}
    </MUIDialogContent>
  )
);

export const DialogActions = withStyles(dialogStylesheet, { name: "DialogActions" }) (
  ({ children, classes }) => (
    <MUIDialogActions className={classes.dialogActions}>
        {children}
    </MUIDialogActions>
  )
);

