import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import MUITooltip from 'material-ui/Tooltip';
import {withStyles, Typography, Tooltip as MUITooltip} from '@material-ui/core';

const tooltipStylesheet = (theme) => ({
  popper: {
  },
  tooltip: {
    borderRadius: '14px !important',
    backgroundColor: 'rgb(100, 100, 100)',
    opacity: 0.9,
    padding: 16,
  },
  tooltipRight: {
    '&:before': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      borderTop: '8px solid transparent',
      borderBottom: '8px solid transparent',
      borderRight: '8px solid rgb(100, 100, 100)',
      left: -8,
      top: 'calc(50% - 7px)',
    }
  },
});

const tooltipContentStylesheet = (theme) => ({
  tooltipTitle: {
    ...theme.tooltip.title,
  },
  tooltipText: {
    ...theme.tooltip.text,
  },
});

const tooltipTargetStylesheet = (theme) => ({
  tooltipTarget: {
    ...theme.tooltip.target,
  },
});

export const Tooltip = withStyles(tooltipStylesheet, {name: 'Tooltip'}) (
  class Tooltip extends PureComponent {
    static propTypes = {
      content: PropTypes.any.isRequired,
    };

    static defaultProps = {
      placement: 'right',
    };

    render() {
      let {content, placement, children, classes} = this.props;
      return (
        <MUITooltip 
          title={content}
          placement={placement}
          PopperProps={{modifiers: {preventOverflow: {enabled: false}, hide: {enabled: false}}}}
          enterDelay={300}
          leaveDelay={300}
          classes={{
            popper: classes.popper,
            tooltip: classes.tooltip,
            tooltipPlacementLeft: classes.tooltipLeft,
            tooltipPlacementRight: classes.tooltipRight,
            tooltipPlacementTop: classes.tooltipTop,
            tooltipPlacementBottom: classes.tooltipBottom,
          }}
        >
          {children}
        </MUITooltip>
      );
    }
  }
);

export const TooltipContent = withStyles(tooltipContentStylesheet, {name: 'TooltipContent'}) (
  ({title, text, classes}) => (
    <Fragment>
      <Typography variant="h6" classes={{root: classes.tooltipTitle}}> {title} </Typography>
      <Typography variant="body2" classes={{root: classes.tooltipText}}> {text} </Typography>
    </Fragment>
  )
);

export const TooltipTarget = withStyles(tooltipTargetStylesheet, {name: 'TooltipTarget'}) (
  ({children, classes, className, ...props}) => (
    <span className={clsx(classes.tooltipTarget, className)} {...props}> {children} </span>
  )
);
