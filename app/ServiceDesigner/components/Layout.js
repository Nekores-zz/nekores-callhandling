import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, Grid, Icon } from "@material-ui/core";

const layoutStylesheet = theme => ({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  },
  topPanel: {
    zIndex: 20
  },
  bottomContent: {
    flex: 1,
    overflow: "hidden",
    zIndex: 0
  },
  leftPanel: {
    zIndex: 10
  },
  rightPanel: {
    zIndex: 10
  },
  centerContent: {
    flex: 1,
    overflow: "hidden",
    position: "relative"
  },
  dragging: {
    cursor: "move"
  }
});

export const Layout = withStyles(layoutStylesheet, { name: "Layout" })(
  class Layout extends PureComponent {
    static propTypes = {
      classes: PropTypes.any.isRequired
    };

    static defaultProps = {};

    handleMouse = (handler, event) => {
      event.preventDefault()
      event.stopPropagation()
      handler && handler(event)
    }
    handleMouseUp = (event) => this.handleMouse(this.props.onMouseUp, event)
    handleMouseDown = (event) => this.handleMouse(this.props.onMouseDown, event)
    handleMouseMove = (event) => this.handleMouse(this.props.onMouseMove, event)

    render() {
      let {
        topPanel,
        leftPanel,
        rightPanel,
        content,
        overlay,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onKeyDown,
        isDragging,
        classes
      } = this.props;
      return (
        <Fragment>
          <Grid
            container direction="column" wrap="nowrap" alignItems="stretch"
            onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} onKeyDown={onKeyDown}
            className={clsx(classes.container, {[classes.dragging]: isDragging})}
          >
            <Grid item className={classes.topPanel}>
              {topPanel}
            </Grid>
            <Grid
              item
              container
              direction="row"
              wrap="nowrap"
              alignItems="stretch"
              className={classes.bottomContent}
            >
              <Grid item className={classes.leftPanel}>
                {leftPanel}
              </Grid>
              <Grid item className={classes.centerContent}>
                {content}
              </Grid>
              <Grid item className={classes.rightPanel}>
                {rightPanel}
              </Grid>
            </Grid>
          </Grid>
          {overlay}
        </Fragment>
      );
    }
  }
);
