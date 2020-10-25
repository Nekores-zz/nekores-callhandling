/**
 * by A. Prates, may-2018
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styleSheet } from "jss/Services/ServiceElements";
import { ChipInput } from "components";
import { I18n } from "react-i18next";

class ServiceTagsInput extends PureComponent {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    varName: PropTypes.string
  };

  onAdd = tag => {
    const name = this.props.varName;
    const value = [...this.props.value, tag];
    const event = { target: { name: name, value: value } };
    this.props.onChange(event);
  };

  onDelete = tag => {
    const name = this.props.varName;
    const value = this.props.value.filter(s => s !== tag);
    const event = { target: { name: name, value: value } };
    this.props.onChange(event);
  };

  render() {
    let { value, onChange, varName, classes } = this.props;
    return (
      <I18n ns="services">
        {(t, { i18n }) => (
          <ChipInput
            value={value}
            onAdd={this.onAdd}
            onDelete={this.onDelete}
            className={classes.textField}
            name={varName}
            label={t("tags")}
          />
        )}
      </I18n>
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceTagsInput" })(
  ServiceTagsInput
);
