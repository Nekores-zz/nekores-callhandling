import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';

const dividerStylesheet = (theme) => ({
  divider: {
    backgroundColor: theme.colors.darkWhite,
    opacity: 0.2,
    flex: 'none',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
  horizontal: {
    width: '100%',
    height: 1,
  },
});

export const Divider = withStyles(dividerStylesheet, {name: 'Divider'}) (
  class Divider extends PureComponent {
    static propTypes = {
      variant: PropTypes.string,
      classes: PropTypes.any.isRequired,
    };

    static defaultProps = {
    };

    render() {
      let {variant, classes} = this.props;
      return (
        <div className={clsx(classes.divider, classes[variant || 'horizontal'])}/>
      );
    }
  }
);

export class Divide extends PureComponent {
  static propTypes = {
    variant: PropTypes.string,
  };

  static defaultProps = {

  };

  render() {
    let {children, top, bottom, ...props} = this.props;
    return (
      <Fragment>
        {top ? <Divider {...props}/> : null}
        {children}
        {bottom ? <Divider {...props}/> : null}
      </Fragment>
    );
  }
}
