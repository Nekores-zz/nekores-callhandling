import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core'
import { objects } from '../utility'

export const cursors = objects.fromArray([
  "auto", "crosshair", "default", "move", "text", "wait", "help",
  "n-resize", "e-resize", "s-resize", "w-resize",
  "ne-resize", "nw-resize", "se-resize", "sw-resize",
  "pointer", "progress", "not-allowed", "no-drop",
  "vertical-text", "all-scroll", "col-resize", "row-resize",
  "alias", "cell", "copy", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize",
  "context-menu", "none", "zoom-in", "zoom-out", "grab", "grabbing",
])

const stylesheet = (theme) => ({
  ...objects.map((cursor) => ({ cursor })) (cursors),
})

export const Cursor = withStyles(stylesheet, { name: 'Cursor' }) (
  class Cursor extends PureComponent {
    static propTypes = {
      variant: PropTypes.string,
      component: PropTypes.any,
      classes: PropTypes.any.isRequired,
    }

    static defaultProps = {
      variant: cursors.default,
      component: 'div',
    };

    render() {
      let { forwardRef, variant, component: C, classes, className, ...props } = this.props
      return (
        <C ref={forwardRef} className={clsx(className, classes[variant])} {...props}/>
      )
    }
  }
)

Cursor.variants = cursors
