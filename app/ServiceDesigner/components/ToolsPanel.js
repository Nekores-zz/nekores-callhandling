import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Grid, Icon, List, ListItem, ListItemText, ListItemSecondaryAction, Button, ButtonBase} from '@material-ui/core';
import {Paper, Node, Link, Divider, Tooltip, TooltipContent, TooltipTarget} from '../components';

const buttonStylesheet = (theme) => ({
  toolButton: {
    padding: 4,
    borderRadius: 4,
    width: 32,
    height: 32,
    cursor: 'pointer',
  },
  active: {
    backgroundColor: theme.colors.darkGray,
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  toolIcon: {
    color: theme.colors.white,
  },
  disabled: {
    color: '#c8c8c8',
    cursor: 'auto',
  },
});

export const ToolsPanelButton = withStyles(buttonStylesheet, {name: 'ToolsPanelButton'}) (
  class ToolsPanelButton extends PureComponent {
    static propTypes = {
      hint: PropTypes.string,
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
    };

    render() {
      let {hint, icon: Icon, onClick, isActive, isDisabled, classes} = this.props;
      return (
        <Tooltip content={<TooltipContent text={hint}/>}>
          <ButtonBase onClick={isDisabled ? undefined : onClick} className={clsx(classes.toolButton, {[classes.active]: isActive, [classes.disabled]: isDisabled})}>
            <Icon classes={{root: clsx(classes.toolIcon, {[classes.disabled]: isDisabled})}}/>
          </ButtonBase>
        </Tooltip>
      );
    }
  }
);

const styleSheet = (theme) => ({
  container: {
    padding: 4,
    height: '100%',
    backgroundColor: theme.colors.gray,
  },
});

export const ToolsPanel = withStyles(styleSheet, {name: 'ToolsPanel'}) (
  class  extends PureComponent {
    static propTypes = {
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
    };

    render() {
      let {children, classes} = this.props;
      return (
        <Grid container direction="column" className={classes.container} wrap="nowrap">
          {children}
        </Grid>
      );
    }
  }
);