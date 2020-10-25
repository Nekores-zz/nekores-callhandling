import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Checkbox} from '@material-ui/core';
import {colorBarStyleheet, checkboxStylesheet} from 'jss/components/List/ListRow';

export const RowColorBar = withStyles(colorBarStyleheet, {name: 'RowColorBar'}) (
  class RowColorBar extends PureComponent {
    static propTypes = {
      className: PropTypes.string,
      classes: PropTypes.object.isRequired,
    };

    render() {
      let {classes, className} = this.props;
      return (
        <div className={clsx(classes.rowColorBar, className)}/>
      );
    }
  }
);

export const ListCheckbox = withStyles(checkboxStylesheet, {name: 'ListCheckbox'}) (
  class ListCheckbox extends PureComponent {
    static propTypes = {
      checked: PropTypes.bool,
      onChange: PropTypes.func,
      className: PropTypes.string,
      classes: PropTypes.object.isRequired,
    };

    render() {
      let {checked, onChange, classes, className} = this.props;
      return (
        <Checkbox checked={!!checked} onChange={onChange} className={clsx(classes.checkbox, className)}/>
      );
    }
  }
);
