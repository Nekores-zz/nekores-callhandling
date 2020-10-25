import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { objects } from "utils";
import { stylesheet } from "jss/LayoutElements/Box";

export const Box = withStyles(stylesheet, { name: "Box" })(
  class Box extends PureComponent {
    static propTypes = {
      classes: PropTypes.object.isRequired,
      children: PropTypes.any
    };

    render() {
      let { children, classes, ...props } = this.props;
      let propsClasses = objects.bimap((value, key) => value, (value, key) => classes[key])(props);
      return (
        <div
          className={clsx({
            [classes.box]: true,
            [classes.container]: props.row || props.column,
            ...propsClasses
          })}
        >
          {children}
        </div>
      );
    }
  }
);

export const Row = props => <Box row {...props} />;

export const Column = props => <Box column stretch {...props} />;

export const Padding = props => <Box padding {...props} />;

export const Stretch = props => <Box stretch {...props} />;

export const Line = props => <Box stretch borderHalf {...props} />;
