import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {geometry, events, objects} from '../utility';
import {withStyles, Grid, Icon} from '@material-ui/core';
import {RoundedRect, ShadowFilter, Tooltip, TooltipContent, MoreVert} from '../components';

const nodeHeaderStylesheet = (theme) => ({
  headerIcon: {
    fill: 'white',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerText: {
    fill: 'white',
    textAnchor: 'start',
    dominantBaseline: 'middle',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    fill: 'white',
  },
  button: {
    cursor: 'pointer',

  },
  ...(theme.colors.sequence.reduce((result, color, i) => {
    result[`color${i}`] = {
      fill: color,
    };
    result[`darkColor${i}`] = {
      fill: theme.colors.sequenceDarken[i],
    };
    return result;
  }, {})),
});

export const Header = withStyles(nodeHeaderStylesheet, {name: 'NodeHeader'}) (
  class NodeHeader extends PureComponent {
    static propTypes = {
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      label: PropTypes.any.isRequired,
      icon: PropTypes.any.isRequired,
      color: PropTypes.string.isRequired,
      classes: PropTypes.any.isRequired,
      onMoreClick: PropTypes.func.isRequired,
    };

    static defaultProps = {
      y: 0,
      width: 200,
      height: 48,
      label: '',
      icon: '',
      color: 0,
      onMoreClick: () => {},
    };

    render() {
      let {y, width, height, label, icon: Icon, color, darkenColor, onMoreClick, classes, nodeOptions, nodeType, isFavorite,  ...props} = this.props;
      return (
        <g transform={`translate(0 ${y})`}>
          <rect x={0} y={0} width={height} height={height} style={{fill: darkenColor}}/>
          <Icon x={8} y={8} width={24} height={24} className={classes.headerIcon}/>
          <rect x={height} y={0} width={width-height} height={height} style={{fill: color}}/>
          <text x={height + 10} y={height/2} className={classes.headerText}>{label}</text>
          <svg x={width - 24 - 8} y={8} width={24} height={24} className={classes.button} onClick={onMoreClick}>
            <rect x={0} y={0} width={24} height={24} stroke='none' fill='transparent'/>
            <MoreVert width={24} height={24} className={classes.icon}/>
          </svg>
        </g>
      )
    }
  }
);

const nameRowStylesheet = (theme) => ({
  row: {
    fill: 'white',
  },
  nameText: {
    fontWeight: '500',
    fill: theme.colors.darkGrey,
    textAnchor: 'start',
    dominantBaseline: 'middle',
    fontSize: 14,
  },
  underline: {
    fontSize: 14,
    fontWeight: '500',
    textAnchor: 'start',
    dominantBaseline: 'middle',
    fill: 'none',
    stroke: theme.colors.primary.mediumGrey,
    strokeDasharray: '1 2',
    textDecoration: 'underline',
  },
});

export const NameRow = withStyles(nameRowStylesheet, {name: 'NameRow'}) (
  class NameRow extends PureComponent {
    static propTypes = {
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
      y: 0,
      width: 200,
      height: 48,
      name: '',
      description: '',
    };

    render() {
      let {y, width, height, name, description, classes, ...props} = this.props;
      let underlineOffset = 2;
      return (
        <g transform={`translate(0 ${y})`} {...props}>
          <rect x={0} y={0} width={width} height={height} className={clsx(classes.row)}/>
          <Tooltip content={<TooltipContent title={name} text={description}/>}>
            <g>
              <text x={10} y={height/2 + underlineOffset} className={clsx(classes.underline)}>{name}</text>
              <text x={10} y={height/2} className={clsx(classes.nameText)}>{name}</text>
            </g>
          </Tooltip>
        </g>
      );
    }
  }
);

const optionStylesheet = (theme) => ({
  option: {
    fill: 'white',
  },
  divider: {
    stroke: '#c8c8c8',
    opacity: 0.87,
  },
  optionText: {
    fill: theme.colors.primary.darkGrey,
    textAnchor: 'start',
    dominantBaseline: 'middle',
    fontSize: 14,
    paddingLeft: 10,
    pointerEvents: 'none',
  },
});

export const Option = withStyles(optionStylesheet, {name: 'Option'}) (
  class Option extends PureComponent {
    static propTypes = {
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      label: PropTypes.string,
      isLast: PropTypes.bool,
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
      y: 0,
      width: 200,
      height: 48,
      label: '',
      isLast: false,
    };

    render() {
      let {y, width, height, label, isLast, classes, ...props} = this.props;
      let r = isLast ? 3 : 0;
      return (
        <g transform={`translate(0 ${y})`} {...props}>
          <RoundedRect x0={0} y0={0} x1={width} y1={height} r01={r} r11={r} className={clsx(classes.option)}/>
          <line x1={0} y1={0} x2={width} y2={0} className={clsx(classes.divider)}/>
          <text x={10} y={height/2} className={clsx(classes.optionText)}>{label}</text>
        </g>
      );
    }
  }
);

const overlayStylesheet = (theme) => ({
  overlay: {
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: 1000,
  },
});

export const Overlay = withStyles(overlayStylesheet, {name: 'Overlay'}) (
  class Overlay extends PureComponent {
    static propTypes = {
      x: PropTypes.number,
      y: PropTypes.number,
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
      x: 0,
      y: 0,
    };

    render() {
      let {children, x, y, classes} = this.props;
      return (
        <div style={{left: x, top: y}} className={classes.overlay}>
          {children}
        </div>
      );
    }
  }
);

const containerStylesheet = (theme) => ({
  container: {
    overflow: 'hidden',
    borderRadius: 2,
    filter: 'url(#filterShadow)',
  },
});

const padding = 10;

export const Container = withStyles(containerStylesheet, {name: 'Container'}) (
  class Container extends PureComponent {
    static propTypes = {
      width: PropTypes.number,
      height: PropTypes.number,
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
      width: 200,
      height: 48,
    };

    render() {
      let {children, width, height, classes, ...props} = this.props;
      return (
        <svg x={-padding} y={-padding} width={width + 2 * padding} height={height + 2 * padding} viewBox={`${-padding} ${-padding} ${width + 2 * padding} ${height + 2 * padding}`} className={clsx(classes.container)} {...props}>
          {children}
        </svg>
      )
    }
  }
)
