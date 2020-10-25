import React,{ PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core";
import { objects } from 'utils';
import { stylesheet } from "jss/Elements/Box";

// const paddings = {
//   NONE: 'paddingNone',
//   HALF: 'paddingHalf',
//   SINGLE: 'paddingSingle',
//   DOUBLE: 'paddingDouble',
// };

// const topPaddings = {
//   NONE: 'paddinTopgNone',
//   HALF: 'paddingTopHalf',
//   SINGLE: 'paddingTopSingle',
//   DOUBLE: 'paddingTopDouble',
// };

// const rightPaddings = {
//   NONE: 'paddingRightNone',
//   HALF: 'paddingRightHalf',
//   SINGLE: 'paddingRightSingle',
//   DOUBLE: 'paddingRightDouble',
// };

// const bottomPaddings = {
//   NONE: 'paddingBpottomNone',
//   HALF: 'paddingBpottomHalf',
//   SINGLE: 'paddingBpottomSingle',
//   DOUBLE: 'paddingBpottomDouble',
// };

// const leftPaddings = {
//   NONE: 'paddingLeftNone',
//   HALF: 'paddingLeftHalf',
//   SINGLE: 'paddingLeftSingle',
//   DOUBLE: 'paddingLeftDouble',
// };

// const getPaddings = (paddings, padding, none, half, single, double) => {
//   return (
//     padding === true || single ? paddings.SINGLE :
//     none ? paddings.NONE,
//     half ? paddings.HALF,
//     double ? paddings.DOUBLE,
//   ) || padding || '';
// };

// const getPadding = ({ padding, paddingNone, paddingHalf, paddingSingle, paddingDouble }) => {
//   return getPaddings(paddings, padding, paddingNone, padddingHalf, paddingSingle, paddingsDouble);
// };

// const getTopPadding = ({ paddingTop, paddingTopNone, paddingTopHalf, paddingTopSingle, paddingTopDouble }) => {
//   return getPaddings(topPaddings, paddingTop, paddingTopNone, paddingTopHalf, paddingTopSingle, paddingTopDouble);
// };

// const getRightPadding = ({ paddingRight, paddingRightNone, paddingRightHalf, paddingRightSingle, paddingRightDouble }) => {
//   return getPaddings(rightPaddings, paddingRight, paddingRightNone, padddingRightHalf, paddingRightSingle, paddingsRightDouble);
// };

// const getBottomPadding = ({ paddingBottom, paddingBottomNone, paddingBottomHalf, paddingBottomSingle, paddingBottomDouble }) => {
//   return getPaddings(bottomPaddings, paddingBottom, paddingBottomNone, paddingBottomHalf, paddingBottomSingle, paddingBottomDouble);
// };

// const getLeftPadding = ({ paddingLeft, paddingLeftNone, paddingLeftHalf, paddingLeftSingle, paddingLeftDouble }) => {
//   return getPaddings(leftPaddings, paddingLeft, paddingLeftNone, padddingLeftHalf, paddingLeftSingle, paddingsLeftDouble);
// };


export const Box = withStyles(
  stylesheet, 
  { name: "Box" },
) (

  class Box extends PureComponent {

    static propTypes = {
      classes: PropTypes.object.isRequired,
      children: PropTypes.any,
      component: PropTypes.any,
    };

    static defaultProps = {
      component: 'div',
    };

    render() {
      let { component: C, children, classes, ...props } = this.props;
      let propsClasses = objects.bimap(
        (value, key) => value,
        (value, key) => classes[key],
      ) (props);
      return (
        <C className={clsx({
          [classes.box]: true,
          [classes.container]: props.row || props.column,
          ...propsClasses,
        })}>
          {children}
        </C>
      );
    }
  }
);

export const Row = (props) => <Box row {...props}/>;

export const Column = (props) => <Box column stretch {...props}/>;

export const Padding = (props) => <Box padding {...props}/>;

export const Stretch = (props) => <Box stretch {...props}/>;

export const Line = (props) => <Box stretch borderHalf {...props}/>;