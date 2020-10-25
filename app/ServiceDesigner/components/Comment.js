import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, Icon, Portal } from '@material-ui/core';
import { Text, Column, Row, Stretch, Padding, ListAvatar } from 'components';
import { Paper, PrimaryButton, PrimaryText, SecondaryTextLink, TextField } from 'components/Elements';
import { geometry, handlers } from '../utility'
import { Block } from './Block';
import { withDrag } from './Draggable';
import { CommentIcon } from './Icons';

console.log({ Paper, PrimaryButton, PrimaryText, SecondaryTextLink, Text, Column, Row, Stretch, Padding, ListAvatar })

const panelStylesheet = (theme) => ({
  paper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  collapsible: {
    transition: 'width 0.2s, height 0.2s',
  },
  collapsed: {
    width: 0,
    height: 0,
  },
})

const Panel = withStyles(panelStylesheet, { name: 'Panel' }) (
  class Panel extends PureComponent {
    static propTypes = {
      size: PropTypes.object,
      onMouseDown: PropTypes.func,
      onMouseMove: PropTypes.func,
      onClick: PropTypes.func,
      classes: PropTypes.any.isRequired,
    }

    static defaultProps = {
      isCollapsible: true,
    }

    render() {
      let { position, size, isCollapsed, isCollapsible, classes, onClick, onMouseDown, onMouseMove, children, ... props } = this.props
      return (
        <Block
          {... position}
          width={size.x}
          height={size.y}
          padding={10}
          className={clsx({
            [classes.collapsible]: !!isCollapsible,
            [classes.collapsed]: !!isCollapsed,
          })}
          {... props}
        >
          <Paper
            {... { onClick, onMouseDown, onMouseMove }}
            classes={{ paper: classes.paper, }}
          >
            {children}
          </Paper>
        </Block>
      )
    }
  }
)

export const Author = ({ user }) =>
  <>
    <ListAvatar
      color={user.id}
      name={user.firstName + " " + user.lastName}
    />
    &nbsp;&nbsp;&nbsp;
    <Text>
      {user.firstName} {user.lastName}
    </Text>
  </>

const textAreaStylesheet = (theme) => ({
  textArea: {
    width: '100%',
    resize: 'none',
    ...theme.typography.primaryBody,
    padding: 10,
    // border: `1px theme.colors.primary.secondaryBlue + ' !important',
  },
})

export const TextArea = withStyles(textAreaStylesheet, { name: 'TextArea' }) (
  ({ value, onChange, onKeyDown, autoFocus, classes, ... props }) =>
    <textarea
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      className={clsx(classes.textArea, )}
      {... props}
    />
)

const resizeStylesheet = (theme) => ({
  root: {
    pointerEvents: 'all',
    cursor: 'se-resize',
  },
  shape: {
    fill: theme.colors.primary.secondaryBlue,
    stroke: 'none',
    opacity: 0.37,
  },
  visible: {

  },
  dragging: {
    opacity: 0.34,
  },
})

const Resize = withDrag(
  withStyles(resizeStylesheet, { name: 'Resize' }) (
    class Resize extends PureComponent {
      static propTypes = {
        x: PropTypes.number,
        y: PropTypes.number,
        size: PropTypes.number,
        onMouseDown: PropTypes.func,
        classes: PropTypes.any.isRequired,
      }

      static defaultProps = {
        size: 16,
        x: 0,
        y: 0,
      }

      render() {
        let { x, y, size, drag, classes, ... props } = this.props
        return (
        <svg width={size} height={size}>
          <g
            onMouseDown={drag.onMouseDown}
            className={clsx(classes.root, {
              [classes.dragging]: drag.isDragging,
            })}
            {... props}
          >
            <rect x={0} y={0} width={size} height={size} fill='transparent' stroke='transparent'/>
            <path d={`M ${size} 0 L ${size} ${size} L 0 ${size} z`} className={classes.shape}/>
          </g>
        </svg>
        )
      }
    }
  )
)

const markerStylesheet = (theme) => ({
  root: {
    cursor: 'pointer',
  },
  circle: {
    fill: theme.colors.primary.secondaryBlue,
    stroke: 'none',
    // filter: 'url(#filterShadow)',
  },
  icon: {
    fill: 'white',
    stroke: 'none',
  },
})

const Marker = withDrag(
  withStyles(markerStylesheet, { name: 'Marker' }) (
    class Marker extends PureComponent {
      static propTypes = {

      }

      static defaultProps = {
        x: 0,
        y: 0,
        size: 32,
      }

      render() {
        let { x, y, size, drag, classes, ... props } = this.props
        let { isDragging, ... handlers } = drag
        return (
          <g
            {... handlers}
            {... props}
            transform={`scale(${size / 36}) translate(${x} ${y})`}
            className={classes.root}
          >
            <circle cx={0} cy={0} r={18} className={classes.circle}/>
            <CommentIcon x={-12} y={-12} className={classes.icon}/>
          </g>
        )
      }
    }
  )
)

export const Comments = { Marker, Panel, Author, Resize }