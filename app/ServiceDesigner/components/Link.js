import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Grid, Icon, SvgIcon} from '@material-ui/core';
import {arrays, geometry, svg, events} from '../utility';
import {RoundedRect} from './RoundedRect';

const markerStartStylesheet = (theme) => ({
  markerStart: {
    stroke: 'none',
    fill: theme.colors.stroke,
  },
});

const MarkerStart = withStyles(markerStartStylesheet, {name: 'MarkerStart'}) (
  class MarkerStart extends PureComponent {
    render() {
      return (
        <marker id="markerStart" markerWidth="2" markerHeight="6" refX="0" refY="3" className={this.props.classes.markerStart}>
          <rect x={0} y={0} width={2} height={6}/>
        </marker>
      );
    }
  }
);

const markerEndStylesheet = (theme) => ({
  markerEnd: {
    stroke: theme.colors.stroke,
    fill: 'none',
    strokeLinecap: 'square',
    strokeWidth: 1.5,
    strokeLinejoin: 'miter',
  },
});

const MarkerEnd = withStyles(markerEndStylesheet, {name: 'MarkerEnd'}) (
  class MarkerEnd extends PureComponent {
    render() {
      return (
        <marker id="markerEnd" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" className={this.props.classes.markerEnd}>
          <line x1={5} y1={5} x2={2} y2={3}/>
          <line x1={5} y1={5} x2={2} y2={7}/>
        </marker>
      );
    }
  }
);

const pathStylesheet = (theme) => ({
  path: {
    stroke: theme.colors.stroke,
    strokeWidth: 2,
    strokeLinejoin: 'round',
    fill: 'none',
    markerEnd: 'url(#markerEnd)',
  },
  back: {
    stroke: 'transparent',
    fill: 'none',
    strokeWidth: 10,
  },
  rect: {
    stroke: 'none',
    fill: theme.colors.stroke,
  },
  drawing: {
    pointerEvents: 'none',
    opacity: 0.6,
  },
  default: {
    opacity: 0.9,
  },
});

const variants = {
  drawing: 'drawing',
  default: 'default',
};

const Path = withStyles(pathStylesheet, {name: 'Path'}) (
  class Path extends PureComponent {
    static propTypes = {
      path: PropTypes.array,
      variant: PropTypes.string,
      radius: PropTypes.number,
      classes: PropTypes.any.isRequired,
    };

    static variants = variants;

    static defaultProps = {
      variant: variants.default,
      radius: 9,
    };

    render() {
      let {path, variant, radius, classes, ...props} = this.props;
      let point0 = arrays.first(path);
      let points = path.slice(1, -1);
      let point1 = arrays.last(path);
      let d =
        svg.move(geometry.add(point0, geometry.vector(1, 0))) +
        arrays.aperture(3, [point0, ...points, point1]).map(([p0, p, p1]) => svg.corner(p0, p, p1, radius)).join('') +
        svg.line(point1);
      return (
        <g className={clsx(classes[variant])} {...props}>
          <path d={d} className={classes.back}/>
          <path d={d} className={clsx(classes.path, classes[variants[variant]] || '')}/>
          <rect x={point0.x} y={point0.y - 6} width={4} height={12} className={classes.rect}/>
        </g>
      );
    }
  }
);

const removeIconStylesheet = (theme) => ({
  container: {
    cursor: 'pointer',
  },
  figure: {
    stroke: '#c2185baa',
    strokeWidth: 4,
  },
  rect: {
    stroke: 'none',
    fill: 'transparent',
  }
});

const RemoveIcon = withStyles(removeIconStylesheet, {name: 'RemoveIcon'}) (
  class RemoveIcon extends PureComponent {
    static propTypes = {
      point: PropTypes.object,
      onRemove: PropTypes.func,
      classes: PropTypes.any.isRequired,
    };

    render() {
      let {point, onRemove, classes, ...props} = this.props;
      let r = 6;
      return (
        <g transform={`translate(${point.x} ${point.y})`} className={classes.container} onMouseDown={onRemove}>
          <rect x={-r} y={-r} width={2 * r} height={2 * r} className={classes.rect}/>
          <path d={`M ${-r} ${-r} L ${r} ${r} M ${-r} ${r} L ${r} ${-r}`} className={classes.figure}/>
        </g>
      );
    }
  }
);

const linkElbowStylesheet = (theme) => ({
  container: {
    cursor: 'pointer',
  },
  figure: {
    fill: '#c2185baa',
  },
  dragging: {
    opacity: 0.6,
    cursor: 'move',
  },
});

const Elbow = withStyles(linkElbowStylesheet, {name: 'Elbow'}) (
  class Elbow extends PureComponent {
    static propTypes = {
      point: PropTypes.object,
      onStartDrag: PropTypes.func,
      onRemove: PropTypes.func,
      isDragging: PropTypes.bool,
      classes: PropTypes.any.isRequired,
    };

    render() {
      let {point, isDragging, onStartDrag, onRemove, classes, props} = this.props;
      return (
        <g className={classes.container} onMouseDown={onStartDrag} onDoubleClick={onRemove}>
          <circle cx={point.x} cy={point.y} r={6} className={clsx(classes.figure, {[classes.dragging]: isDragging})}/>
        </g>
      );
    }
  }
);

const linkSegmentStylesheet = (theme) => ({
  segment: {
    cursor: 'cell',
    stroke: 'transparent',
    strokeWidth: 10,
  },
});

const Segment = withStyles(linkSegmentStylesheet, {name: 'Segment'}) (
  class Segment extends PureComponent {
    static propTypes = {
      point0: PropTypes.object,
      point1: PropTypes.object,
      onPoint: PropTypes.func,
      classes: PropTypes.any.isRequired,
    };

    render() {
      let {point0, point1, onPoint, classes} = this.props;
      return (
        <line
          x1={point0.x} y1={point0.y} x2={point1.x} y2={point1.y}
          className={classes.segment} onMouseDown={onPoint}
        />
      );
    }
  }
);

const linkSegmentDragStylesheet = (theme) => ({
  container: {
    cursor: 'pointer',
  },
  back: {
    fill: 'transparent',
    stroke: 'none',
  },
  figure: {
    fill: '#c2185baa',
    stroke: 'none',
  },
  dragging: {
    opacity: 0.6,
    cursor: 'move',
  },
});

const SegmentDrag = withStyles(linkSegmentDragStylesheet, {name: 'SegmentDrag'}) (
  class SegmentDrag extends PureComponent {
    static propTypes = {
      point0: PropTypes.object,
      point1: PropTypes.object,
      isDragging: PropTypes.bool,
      onStartDrag: PropTypes.func,
      classes: PropTypes.any.isRequired,
    };

    render() {
      let {point0, point1, onStartDrag, isDragging, classes} = this.props;
      let {x, y} = geometry.multiply(0.5, geometry.add(point0, point1));
      let angle = geometry.azimuth(geometry.difference(point0, point1));
      return (
        <g
          transform={`translate(${x} ${y}) rotate(${geometry.radiansToDegrees(angle)})`}
          className={clsx(classes.container, {[classes.dragging]: isDragging})}
          onMouseDown={onStartDrag}
        >
          <rect x={-5} y={-10} width={10} height={20} className={classes.back}/>
          <path d={'M 0 -10 L -5 -5 L 5 -5 z M 0 10 L -5 5 L 5 5 z'} className={classes.figure}/>
        </g>
      );
    }
  }
);

const linkEndDragStylesheet = (theme) => ({
  figure: {
    stroke: '#c2185baa',
    strokeDasharray: '4 4',
    strokeWidth: '2px',
    fill: 'none',
    pointerEvents: 'none',
  },
});

const LinksEnd = withStyles(linkEndDragStylesheet, {name: 'LinksEnd'}) (
  class LinksEnd extends PureComponent {
    static propTypes = {
      point: PropTypes.object,
      classes: PropTypes.any.isRequired,
    };

    render() {
      let {point, classes, props} = this.props;
      return (
        <g transform={`translate(${point.x} ${point.y})`}>
          <circle cx={0} cy={0} r={10} className={clsx(classes.figure)}/>
        </g>
      );
    }
  }
);

export const Link = {Path, RemoveIcon, Elbow, Segment, SegmentDrag, MarkerStart, MarkerEnd, LinksEnd};