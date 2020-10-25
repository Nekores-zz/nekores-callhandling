import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from 'clsx';
import { FormControlLabel, Checkbox as MUICheckbox, Radio as MUIRadio, Collapse as MUICollapse, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, withStyles } from "@material-ui/core";
import { Column } from './Box';
import { stylesheet } from "jss/LayoutElements/Selection";

const Selection = withStyles(
  stylesheet, 
  { name: "Selection" },
) (

  class Selection extends PureComponent {
    static propTypes = {
      isChecked: PropTypes.bool,
      onChange: PropTypes.func,
      label: PropTypes.string,
      control: PropTypes.any,
      classes: PropTypes.object.isRequired,
    };

    render() {
      let { classes, children } = this.props;
      let Control = this.props.control;
      return (
        <FormControlLabel
          control={
            <Control
              checked={this.props.isChecked}
              onChange={this.props.onChange}
            />
          }
          label={this.props.label}
          classes={{ label: classes.label }}
        />
      );
    }
  }

);

export const Radio = (props) =>  <Selection control={MUIRadio} {...props}/>;

export const Checkbox = (props) =>  <Selection control={MUICheckbox} {...props}/>;

export const ExpandableSectionRadio = ({ onCheck, ...props }) => (
  <Radio 
    onChange={(isChecked) => {
      if (isChecked) {
        onCheck();
      }
    }} 
    {...props}
  />
);

