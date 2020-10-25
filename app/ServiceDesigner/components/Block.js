import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';


const stylesheet = (theme) => ({
  root: {

  },
})

export const Block = withStyles(stylesheet, { name: 'Block' }) (
  class Block extends PureComponent {
    static propTypes = {

      classes: PropTypes.any.isRequired,
    }

    static defaultProps = {
      x: 0,
      y: 0,
      padding: 0,
    }

    render() {
      let { x, y, width, height, padding, classes, children, ... props } = this.props
      return (
        <foreignObject
          x={x - padding}
          y={y - padding}
          width={width + 2 * padding}
          height={height + 2 * padding}
          style={{padding: `${padding}px`}}
          {... props}
        >
          {children}
        </foreignObject>
      )
    }
  }
)

// <svg
//   x={position.x} y={position.y}
//   width={size.x} height={size.y}
//   onClick={onClick} onMouseUp={onMouseUp} onMouseDown={onMouseDown}
//   className={clsx(classes.container)}
// >
// </svg>