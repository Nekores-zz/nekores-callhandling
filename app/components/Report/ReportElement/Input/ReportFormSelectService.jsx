import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  withStyles,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Select as MUISelect,
  ListItemText,
  Checkbox
} from "@material-ui/core";
import { Text } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Report/ReportElement/Input/ReportFormSelectService";

class ReportFormSelectService extends PureComponent {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.array,
    renderOption: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  getSelectTextValue = items => selection => {
    const { renderOption, t } = this.props;

    return selection.length === 0
      ? t("select")
      : selection.length === 1
      ? renderOption(selection[0])
      : t("countSelected", { count: selection.length });
  };

  render() {
    let { options, renderOption, label, disabled, fullWidth, classes, className } = this.props;
    let value = this.props.value || [];

    return (
      <FormControl
        disabled={disabled}
        className={clsx(className, { [classes.fullWidth]: fullWidth })}
      >
        <InputLabel
          FormLabelClasses={{
            asterisk: classes.asterisk,
            root: classes.label
          }}
          shrink={true}
          focused={false}
          error={false}
        >
          {label}
        </InputLabel>
        <MUISelect
          multiple
          value={value}
          onChange={this.handleChange}
          renderValue={this.getSelectTextValue(options)}
          displayEmpty={true}
          input={
            <Input
              classes={{
                input: clsx(classes.input),
                error: classes.inputError,
                underline: classes.underline,
                tick: classes.inputTick
              }}
            />
          }
        >
          {options
            ? options.map((option, i) => (
                <MenuItem key={i} value={option}>
                  <Checkbox checked={value.indexOf(option) !== -1} />
                  <ListItemText primary={renderOption(option)} />
                </MenuItem>
              ))
            : null}
        </MUISelect>
      </FormControl>
    );
  }
}

export default withStyles(styleSheet, {
  name: "ReportFormSelectService"
})(translate("report", "common")(ReportFormSelectService));
