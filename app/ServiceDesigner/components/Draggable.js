import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';

export const withDrag = (C) => (
  class withDrag extends PureComponent {
    static propTypes = {
      onDragStart: PropTypes.func,
      onDrag: PropTypes.func,
      onDragEnd: PropTypes.func,
    };

    state = {
      dragging: null,
    };

    startDrag = (x, y, event) => {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      let dragging = {
        x, y,
        x0: x, y0: y,
        dx: 0, dy:0,
        grabbed: true,
        dragged: false,
        released: false,
      }
      this.setState({ dragging });
      this.props.onDragStart && this.props.onDragStart(dragging, event);
    };

    drag = (x, y, event) => {
      let dragging = {
        ... this.state.dragging,
        dragged: true,
        x, y,
        dx: x - this.state.dragging.x,
        dy: y - this.state.dragging.y,
      }
      this.setState({ dragging });
      this.props.onDrag && this.props.onDrag(dragging, event);
    };

    endDrag = (x, y, event) => {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      let dragging = {
        ... this.state.dragging,
        released: true,
        x, y,
        dx: x - this.state.dragging.x,
        dy: y - this.state.dragging.y,
      }
      this.setState({ dragging });
     this.props.onDragEnd && this.props.onDragEnd(dragging, event);
    };

    handleMouseDown = (event) => {
      this.startDrag(event.pageX, event.pageY, event);
      event.stopPropagation();
      event.preventDefault();
    };

    handleMouseMove = (event) => {
        this.drag(event.pageX, event.pageY, event)
        event.stopPropagation();
        event.preventDefault();
    };

    handleMouseUp = (event) => {
      this.endDrag(event.pageX, event.pageY, event);
      event.stopPropagation();
      event.preventDefault();
    };

    componentWillUnmount() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
      let {isDragging} = this.state;
      let {onDragStart, onDrag, onDragEnd, ...props} = this.props;
      return (
        <C {...this.props} drag={{
          isDragging,
          onMouseDown: onDragStart || onDrag || onDragEnd ? this.handleMouseDown : undefined,
        }}/>
      );
    }
  }
);

const dragStylesheet = (theme) => ({
  draggable: {
    cursor: 'move',
  },
  dragging: {
    cursor: 'grabbing',
  },
});

export const DraggableG = withStyles(dragStylesheet, {name: 'withDrag'}) (
  withDrag(
    class  extends PureComponent {
      static propTypes = {
        classes: PropTypes.any.isRequired,
      };

      static defaultProps = {
      };

      render() {
        let {drag, children, classes, ...props} = this.props;
        return (
          <g onMouseDown={drag.onMouseDown} className={clsx({[classes.draggable]: !!drag.onMouseDown, [classes.dragging]: drag.isDragging})} {...props}>
            {children}
          </g>
        );
      }
    }
  )
);