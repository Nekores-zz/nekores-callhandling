import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Grid, Icon} from '@material-ui/core';
import {ShadowFilter, ColorFilter} from './Filter';
import { Cursor } from './Cursor'

const paperStylesheet = (theme) => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  svg: {
    backgroundColor: theme.colors.primary.backgroundGrey,
    userSelect: 'none',
    position: 'absolute',
    overflow: 'hidden',
  },
});

export const Paper = withStyles(paperStylesheet, {name: 'Paper'}) (
  class Paper extends PureComponent {
    static propTypes = {
      transform: PropTypes.string,
      cursor: PropTypes.string,
      onMouseMove: PropTypes.func,
      onMouseUp: PropTypes.func,
      onRef: PropTypes.func,
      children: PropTypes.any,
      defs: PropTypes.any,
      className: PropTypes.string,
      classes: PropTypes.any.isRequired,
    };

    state = {
      width: 0,
      height: 0,
    };

    handleResize = () => {
      let { container } = this;
      if (container) {
        let { offsetWidth: width, offsetHeight: height } = container;
        this.setState({ width, height });
      }
    };

    handleContainerRef = (container) => {
      this.container = container;
      let {onRef} = this.props;
      if (onRef) {
        onRef(container);
      }
      if (global.ResizeObserver && container) {
        this.observer = new ResizeObserver(this.handleResize);
        this.observer.observe(container);
      }
      this.handleResize();
    };

    componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }

    render() {
      let { transform, cursor, onWheel, onMouseDown, onMouseUp, onMouseMove, children, defs, classes, className, onRef, ...props } = this.props;
      let { width, height } = this.state;
      return (
        <div ref={this.handleContainerRef} className={clsx(classes.container)}>
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={clsx(classes.svg)} {...props}
          >
            <rect x={0} y={0} width='100%' height='100%' fill='url(#grid)' onWheel={onWheel} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}/>
            <g transform={transform} className={clsx(classes.content)} >
              {children}
            </g>
            <defs>
              {defs}
            </defs>
          </svg>
        </div>
      );
    }
  }
);
