/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - nov-2019
 */

import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import moment from "moment";
import "moment/locale/pt";
import i18n from "i18n";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Services/ServiceElements";

moment.locale(i18n.language);

class ServiceDateIntervalInput extends PureComponent {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    varName: PropTypes.string,
    withoutWarning: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    isStartDateRequired: PropTypes.bool,
    isEndDateRequired: PropTypes.bool,
    hideEndData: PropTypes.bool,
    alternativeStartLabelKey: PropTypes.string, // Change default live to this version on:

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    isStartDateRequired: true,
    isEndDateRequired: false
  };

  handleStartDateChange = date => {
    const name = this.props.varName;
    const value = {
      startDateTime: date ? date.toDate() : null,
      endDateTime: this.props.value.endDateTime
    };
    const event = { target: { name: name, value: value } };
    this.props.onChange(event);
  };

  handleEndDateChange = date => {
    const name = this.props.varName;
    const value = {
      startDateTime: this.props.value.startDateTime,
      endDateTime: date ? date.toDate() : null
    };
    const event = { target: { name: name, value: value } };
    this.props.onChange(event);
  };

  render = () => {
    const {
      value,
      withoutWarning,
      error,
      helperText,
      hideEndData,
      alternativeStartLabelKey,
      classes,
      t
    } = this.props;

    return (
      <>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            keyboard
            className={classes.inputStartTime}
            value={value.startDateTime ? moment(value.startDateTime) : null}
            onChange={this.handleStartDateChange}
            label={t(alternativeStartLabelKey || "startTD")}
            InputProps={{
              classes: {
                underline: classes.underline
              }
            }}
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                asterisk: classes.asterisk,
                root: classes.label
              }
            }}
            helperText={error ? helperText : ""}
            FormHelperTextProps={{
              classes: {
                root: classes.errorText
              }
            }}
            okLabel={t("ok")}
            cancelLabel={t("cancel")}
            required={this.props.isStartDateRequired}
            ampm={false}
          />
        </MuiPickersUtilsProvider>

        {!hideEndData && (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              keyboard
              className={classes.inputEndTime}
              value={value.endDateTime ? moment(value.endDateTime) : null}
              onChange={this.handleEndDateChange}
              label={t("endTD")}
              InputProps={{
                classes: {
                  underline: classes.underline
                }
              }}
              InputLabelProps={{
                shrink: true,
                FormLabelClasses: {
                  asterisk: classes.asterisk,
                  root: classes.label
                }
              }}
              helperText={withoutWarning ? undefined : t("dateIntervalTip")}
              FormHelperTextProps={{
                classes: {
                  root: classes.helperText
                }
              }}
              okLabel={t("ok")}
              cancelLabel={t("cancel")}
              clearLabel={t("clear")}
              clearable
              required={this.props.isEndDateRequired}
              ampm={false}
            />
          </MuiPickersUtilsProvider>
        )}
      </>
    );
  };
}

export default withStyles(styleSheet, { name: "ServiceDateIntervalInput" })(
  translate("services")(ServiceDateIntervalInput)
);
