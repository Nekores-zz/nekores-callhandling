import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import { Grid, withStyles } from "@material-ui/core";
import { stylesheet, FLEX, DIRECTION, ALIGN, JUSTIFY } from "jss/LayoutElements/Flex";

export const Flex = withStyles(
  stylesheet, 
  { name: "Flex" },
) (

  class Flex extends PureComponent {
    static FLEX = FLEX;
    static DIRECTION = DIRECTION;
    static JUSTIFY = JUSTIFY;
    static ALIGN = ALIGN;

    static propTypes = {
      flex: PropTypes.string,
      direction: PropTypes.string,
      justify: PropTypes.string,
      align: PropTypes.string,
      children: PropTypes.any,
    };

    static defaultProps = {
      direction: DIRECTION.COLUMN,
      justify: JUSTIFY.START,
      align: ALIGN.STRETCH,
    };

    render() {
      let { 
        children, 
        flex, 
        direction, 
        justify, 
        align, 
        classes,
        ...props
      } = this.props;
      return (
        <div className={clsx(classes.container, classes[flex], classes[direction], classes[justify], classes[align])} {...props}>
          {children}
        </div>
      );
    }
  }

);

export const Row = (props) => <Flex direction={DIRECTION.ROW} {...props}/>;

export const Column = (props) => <Flex direction={DIRECTION.COLUMN} {...props}/>;
