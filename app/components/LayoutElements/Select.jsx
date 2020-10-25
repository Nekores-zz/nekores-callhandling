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
import { selectStylesheet, multiselectStylesheet } from "jss/LayoutElements/Select";

export const Select = withStyles(selectStylesheet, { name: "Select" })(
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
      fullWidth: PropTypes.bool,
      required: PropTypes.bool,
      readOnly: PropTypes.bool,
      disabled: PropTypes.bool,
      native: PropTypes.bool,
      white: PropTypes.bool,
      tooltip: PropTypes.any,
      classes: PropTypes.object.isRequired
    };

    static defaultProps = {
      shrink: true,
      focused: false,
      displayEmpty: true,
      getKey: option => option || "",
      renderOption: option => option
    };

    handleChange = event => {
      const { options, getKey, onChange } = this.props;
      const key = event.target.value;
      const value = options.find(option => getKey(option) === key);
      onChange && onChange(value, event);
    };

    render() {
      const {
        options,
        value,
        getKey,
        renderOption,
        label,
        readOnly,
        required,
        focused,
        displayEmpty,
        fullWidth,
        disabled,
        native,
        white,
        tooltip,
        classes,
        className
      } = this.props;

      return (
        <FormControl
          disabled={disabled}
          required={required}
          className={clsx(className, { [classes.fullWidth]: fullWidth })}
        >
          <InputLabel
            FormLabelClasses={{
              asterisk: clsx({
                [classes.asterisk]: true,
                [classes.white]: white
              }),
              root: clsx({
                [classes.label]: true,
                [classes.white]: white
              })
            }}
            focused={focused}
            error={false}
          >
            {label}
          </InputLabel>
          <MUISelect
            value={native ? getKey(value) : value}
            onChange={this.handleChange}
            displayEmpty={displayEmpty}
            input={
              <Input
                readOnly={readOnly}
                classes={{
                  root: clsx({
                    [classes.readOnly]: readOnly,
                    [classes.white]: white
                  }),
                  input: clsx({
                    [classes.input]: true,
                    [classes.white]: white
                  }),
                  underline: clsx({
                    [classes.underline]: true,
                    [classes.white]: white
                  }),
                  error: classes.inputError
                }}
                endAdornment={tooltip ? tooltip : null}
              />
            }
            native={native}
            classes={{
              root: clsx({
                [classes.white]: white
              }),
              select: clsx({
                [classes.select]: true,
                [classes.white]: white
              }),
              icon: clsx({
                [classes.icon]: true,
                [classes.white]: white
              })
            }}
            renderValue={value => (
              <Text className={clsx({ [classes.white]: white })}>{renderOption(value)}</Text>
            )}
          >
            {native && displayEmpty && (
              <option key={0} value={""}>
                &nbsp;
              </option>
            )}
            {options.map((option, i) =>
              native ? (
                <option key={i + 1} value={getKey(option)}>
                  {renderOption(option)}
                </option>
              ) : (
                <MenuItem key={i} value={getKey(option)}>
                  <Text>{renderOption(option)}</Text>
                </MenuItem>
              )
            )}
          </MUISelect>
        </FormControl>
      );
    }
  }
);

export const Multiselect = withStyles(multiselectStylesheet, {
  name: "Multiselect"
})(
  translate("common")(
    class Multiselect extends PureComponent {
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
          ? t("noneSelected")
          : selection.length === 1
          ? renderOption(selection[0])
          : selection.length === items.length
          ? t("allSelected")
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
                    underline: classes.underline
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
  )
);
