import React, {PureComponent, Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  withStyles, Grid, Paper, Typography, Button, IconButton, Divider, Menu, MenuItem, InputAdornment,
  FormLabel, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, Select as MUISelect,
  List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Checkbox, Icon,
} from '@material-ui/core';

export const selectStylesheet = (theme) => ({
  label: {
    ...theme.typography.serviceDesignerMenu,
    textAlign: 'left',
  },
  input: {
    ...theme.typography.serviceDesignerMenu,
  },
  icon: {
    color: 'white',
  },
});

export const Select = withStyles(selectStylesheet, {name: 'Select'}) (
  class Select extends PureComponent {
    static propTypes = {
      options: PropTypes.array,
      value: PropTypes.any,
      getKey: PropTypes.func,
      renderOption: PropTypes.func,
      onChange: PropTypes.func,
      label: PropTypes.string,
      shrink: PropTypes.bool,
      focused: PropTypes.bool,
      displayEmpty: PropTypes.bool,
      required: PropTypes.bool,
      readOnly: PropTypes.bool,
      classes: PropTypes.object.isRequired,
    };

    static defaultProps = {
      shrink: true,
      focused: false,
      displayEmpty: true,
      getKey: (option) => option || '',
      renderOption: (option) => option,
    };

    handleChange = (event) => {
      let {options, getKey, onChange} = this.props;
      let key = event.target.value;
      let value = options.find((option) => getKey(option) === key);
      onChange && onChange(value, event);
    };

    render() {
      let {
        options, value, getKey, renderOption, renderValue, onChange, 
        label, readOnly, required, shrink, focused, displayEmpty, 
        classes, className,
      } = this.props;
      return (
        <FormControl required={required} className={className}>
          <MUISelect
            value={getKey(value)}
            onChange={this.handleChange}
            displayEmpty={displayEmpty}
            input={(
              <Input disableUnderline={true} readOnly={readOnly} classes={{
                root: clsx({[classes.readOnly]: readOnly}), 
                input: clsx(classes.input), 
                error: classes.inputError, 
                underline: classes.underline,
              }}/>
            )}
            classes={{icon: classes.icon}}
          >
            {options.map((option, i) => {
              return (
                <MenuItem key={i} value={getKey(option)}>
                  <span>{renderOption(option)}</span>
                </MenuItem>
              );
            })}
          </MUISelect>
        </FormControl>
      );
    }
  }
);