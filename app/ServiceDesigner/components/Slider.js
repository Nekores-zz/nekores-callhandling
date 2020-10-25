import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';
import MUISlider from '@material-ui/lab/Slider';

const sliderStylesheet = (theme) => ({

});

export const Slider = withStyles(sliderStylesheet, {name: 'Slider'}) (
  class Slider extends PureComponent {
    render() {
      const {value, onChange, classes, ...props} = this.props;
      return (
        <MUISlider value={value} onChange={onChange} {...props}/>
      );
    }
  }
);