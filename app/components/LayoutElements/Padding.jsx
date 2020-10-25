import React,{ PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core";
import { stylesheet, PADDING, TOP, RIGHT, BOTTOM, LEFT } from "jss/LayoutElements/Padding";

export const Padding = withStyles(
  stylesheet, 
  { name: "Padding" },
) (

  class Padding extends PureComponent {
    static TOP = TOP;
    static RIGHT = RIGHT;
    static BOTTOM = BOTTOM;
    static LEFT = LEFT;

    static propTypes = {
      double: PropTypes.bool,
      single: PropTypes.bool,
      half: PropTypes.bool,
      none: PropTypes.bool,
      top: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
      left: PropTypes.string,
      classes: PropTypes.object.isRequired,
      children: PropTypes.any,
    };

    static defaultProps = {
      single: true,
    };

    render() {
      let { top, right, bottom, left, double, single, half, none, children, classes } = this.props;
      return (
        <div className={clsx(
          classes.container,
          classes[top],
          classes[right],
          classes[bottom],
          classes[left],
          double && classes[PADDING.DOUBLE],
          single && classes[PADDING.SINGLE],
          half && classes[PADDING.HALF],
          none && classes[PADDING.NONE],
        )}>
          {children}
        </div>
      );
    }
  }

);