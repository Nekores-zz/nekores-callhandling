/**
 * by A. Prates, jan-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormGroup, FormControlLabel, MenuItem, withStyles } from "@material-ui/core";
import { ConfirmButtons, TextField } from "components";
import { InputNumbers } from "components/NumbersManagement";
import { translate } from "react-i18next";
import { styleSheet } from "jss/NumbersManagement/NumbersForms/AddNumbersForm";
import { getErrorProps } from "utils/errors";

class AddNumbersForm extends Component {
  static propTypes = {
    data: PropTypes.shape({
      numberConfiguration: PropTypes.object.isRequired,
      numberRange: PropTypes.object.isRequired,
      networks: PropTypes.array.isRequired
    }),
    savePanel: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    panelIndex: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    numberConfiguration: this.props.data.numberConfiguration,
    numberRange: this.props.data.numberRange,
    addRange: false,
    addIncludedNumbers: false,
    isCheckedExcludedNumbers: false,
  };

  toggleCheckbox = name => event => {
    this.setState({ [name]: !this.state[name] });
  };

  handleChange = obj => setter => event => {
      const newProtocol  = setter(event.target.value);
      this.setState({ [obj]: newProtocol });
  };

  handleNumConf = this.handleChange('numberConfiguration');
  handleNumRange = this.handleChange('numberRange');

  getFieldErrorMessage = fieldName =>
      (this.state.errors &&
       this.state.errors.formErrors &&
       this.state.errors.formErrors[fieldName]) ||
      (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  handleCancel = event => {};

  AddRange = (numberRange, numConf, isCheckedExcludedNumbers, checkError) => <div>
        <TextField
          value={numberRange.from.toString()}
          type={"number"}
          onChange={this.handleNumRange(v => numberRange.setFrom(Number(v)))}
          className={this.props.classes.textField}
          label={this.props.t(numberRange.fieldFrom)}
          error={checkError(numberRange.fieldFrom).error}
          helperText={checkError(numberRange.fieldFrom).helperText}
        />
        <TextField
          value={numberRange.to.toString()}
          type={"number"}
          onChange={this.handleNumRange(v => numberRange.setTo(Number(v)))}
          className={this.props.classes.textField}
          label={this.props.t(numberRange.fieldTo)}
          error={checkError(numberRange.fieldTo).error}
          helperText={checkError(numberRange.fieldTo).helperText}
        />

        <div className={this.props.classes.checkBoxes}>
          <FormGroup className={this.props.classes.formGroup}>
            <FormControlLabel
              classes={{
                label: this.props.classes.checkboxLabel
              }}
              control={
                <Checkbox
                  checked={isCheckedExcludedNumbers}
                  classes={{
                    checked: this.props.classes.checkboxChecked
                  }}
                  onChange={this.toggleCheckbox("isCheckedExcludedNumbers")}
                />
              }
              label={this.props.t("excludeNumbers")}
            />
          </FormGroup>
        </div>

        {isCheckedExcludedNumbers && (
          <InputNumbers
            value={numConf.excludes}
            name={numConf.fieldExcludes}
            label={this.props.t(numConf.fieldExcludes)}
            onChange={this.handleNumConf(v => numConf.setExcludes(v))}
            helperText={this.getFieldErrorMessage(numConf.fieldExcludes)}
          />
        )}
      </div>;

  render() {
    const { savePanel, panelIndex, classes, t } = this.props;
    const { networks } = this.props.data;
    const { numberConfiguration,
            numberRange,
            addRange,
            addIncludedNumbers,
            isCheckedExcludedNumbers,
            errors
          } = this.state;
     const checkError = getErrorProps(t, errors);

    return (
      <div className={classes.internalForm}>
        <TextField
          value={numberConfiguration.network.value.toString()}
          label={t(numberConfiguration.fieldNetwork)}
          className={classes.textField}
          type={"number"}
          onChange={this.handleNumConf(v => numberConfiguration.setNetwork(networks[v].toScala()))}
          helperText={t(this.getFieldErrorMessage(numberConfiguration.fieldNetwork))}
          select
        >
          {networks.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <br />

        <FormGroup className={classes.formGrp}>
          <FormControlLabel
            classes={{
              label: classes.checkboxLabel
            }}
            control={
              <Checkbox
                checked={addRange}
                name={"addRange"}
                classes={{
                  checked: classes.checkboxChecked
                }}
                onChange={this.toggleCheckbox("addRange")}
              />
            }
            label={t("addRange")}
          />
        </FormGroup>

        {addRange ? this.AddRange(numberRange, numberConfiguration, isCheckedExcludedNumbers, checkError) : null}

        <FormGroup className={classes.formGrp}>
          <FormControlLabel
            classes={{
              label: classes.checkboxLabel
            }}
            control={
              <Checkbox
                checked={addIncludedNumbers}
                classes={{
                  checked: classes.checkboxChecked
                }}
                onChange={this.toggleCheckbox("addIncludedNumbers")}
              />
            }
            label={t("addIndividualNumbers")}
          />
        </FormGroup>

        {addIncludedNumbers ? (
          <InputNumbers
            value={numberConfiguration.includes}
            name={numberConfiguration.fieldIncludes}
            label={t(numberConfiguration.fieldIncludes)}
            onChange={this.handleNumConf(numberConfiguration.setIncludes)}
            helperText={t(
                this.getFieldErrorMessage(numberConfiguration.fieldIncludes)
            )}
          />
        ) : null}

        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("add")}
          onConfirm={event => savePanel(event, panelIndex, { ...this.state })}
          cancelLabel={t("cancel")}
          onSuccess={() => this.setState({ errors: null })}
          onFailure={ errors => this.setState({ errors })}
          onCancel={this.props.handleBack}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AddNumbersForm" })(
  translate("numbers")(AddNumbersForm)
);
