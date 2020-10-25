import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  withStyles
} from "@material-ui/core";
import { ConfirmButtons, Pending, PrimaryTextButton, Text, TextField } from "components";
import { NumberField } from "components/LayoutElements";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/CreateAccount";

import { getErrorProps } from "utils/errors";

class PasswordPolicyForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number, // should be set on creation mode
    administerMode: PropTypes.bool, // should be set on administer mode
    data: PropTypes.shape({
      getPasswordPolicyData: PropTypes.func.isRequired,
      passwordPolicyRules: PropTypes.object.isRequired,
      getEmptyRegexOption: PropTypes.func.isRequired
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    passwordPolicy: undefined, // set by this.componentDidMount/promiseToDiode
    errors: null,
    diode: {
      loading: true,
      error: null,
      data: null
    },
    enabledMinChars: true,
    enabledMaxChars: true,
    enabledLowercase: true,
    enabledUppercase: true,
    enabledNumbers: true,
    enabledSpecialNumber: true,
    enabledMinimumAgeInDays: true,
    enabledMaximumAgeInDays: true,
    enabledHistory: true
  };

  revertToServer = () => this.promiseToDiode();

  toggleCheckbox = setter => event => {
    const passwordPolicy = setter(event.target.checked);
    this.setState({ passwordPolicy });
  };
  /**
   *
   * @param setter setter function for updating respective field value
   * @param defaultOption default value when checkbox i
   * @param name name of the checkbox
   * @param relatedFieldSetter function to reset related field.
   * e.g we want to reset special characters text field when corresponding checkbox is deselect.
   * @returns {Function}
   */
  toggleNumberInputCheckbox = (setter, defaultOption, name, relatedFieldSetter) => event => {
    event.stopPropagation();
    let checked = event.target.checked;
    const passwordPolicy = checked
      ? setter(defaultOption)
      : relatedFieldSetter
      ? relatedFieldSetter(setter(0))
      : setter(0); //Set 0 to disable validation on the field
    this.setState({ passwordPolicy, [name]: checked });
  };

  handleTextFieldChange = setter => event => {
    const passwordPolicy = setter(event.target.value);
    this.setState({ passwordPolicy });
  };

  buildFieldError = fieldName => {
    return {
      formErrors: {
        [fieldName]: {
          key: fieldName + ".required"
        }
      }
    };
  };

  handleNumberFieldChange = (setter, fieldName, checkboxName) => value => {
    const passwordPolicy = setter(value);
    if (this.state[checkboxName] && value === 0) {
      //Show error if checkbox is selected and number value is zero
      this.setState({ errors: this.buildFieldError(fieldName), passwordPolicy: passwordPolicy });
    } else this.setState({ errors: null, passwordPolicy: passwordPolicy });
  };

  toggleAdvancedOptions = () => {
    const passwordPolicy = this.state.passwordPolicy;
    passwordPolicy.showAdvanced = !passwordPolicy.showAdvanced;
    this.setState({ passwordPolicy });
  };

  handleChangeRegularExpressions = (setter, index, regexOption) => event => {
    const passwordPolicy = setter(index, regexOption(event.target.value));
    this.setState({ passwordPolicy });
  };

  handleRemoveRegularExpressions = (setter, index) => () => {
    const passwordPolicy = setter(index);
    this.setState({ passwordPolicy });
  };

  handleAddRegularExpression = setter => () => {
    const passwordPolicy = setter(this.props.data.getEmptyRegexOption());
    this.setState({ passwordPolicy });
  };

  isChecked = (checked, value) => !!value && checked;

  renderForm = passwordPolicy => () => {
    const { administerMode, panelIndex, classes, data, t } = this.props;
    const { passwordPolicyRules } = data;
    const {
      errors,
      enabledMinChars,
      enabledMaxChars,
      enabledLowercase,
      enabledUppercase,
      enabledNumbers,
      enabledSpecialNumber,
      enabledMinimumAgeInDays,
      enabledMaximumAgeInDays,
      enabledHistory
    } = this.state;

    let getFieldError = getErrorProps(this.props.t, errors);
    return (
      <form className={classes.formInput} autoComplete="off">
        <br />
        {!administerMode && <Divider />}
        <br />
        <br />
        <Text variant={"primaryBody"}>{t("ensurePassword")}</Text>
        <br />
        <br />
        <br />
        <FormControl>
          <FormControl className={classes.numberInputWrapper}>
            <Checkbox
              checked={enabledMinChars}
              onChange={this.toggleNumberInputCheckbox(
                passwordPolicy.setEnsureMinChars,
                passwordPolicyRules.ensureMinCharsMinLimit,
                "enabledMinChars"
              )}
              value={passwordPolicy.fieldEnsureMinChars}
              className={classes.checkboxWithText}
            />
            <NumberField
              disabled={!enabledMinChars}
              onChange={this.handleNumberFieldChange(
                passwordPolicy.setEnsureMinChars,
                passwordPolicy.fieldEnsureMinChars,
                "enabledMinChars"
              )}
              className={classes.ensureTextField}
              value={passwordPolicy.ensureMinChars}
              label={t(passwordPolicy.fieldEnsureMinChars)}
              min={passwordPolicyRules.ensureMinCharsMinLimit}
              max={passwordPolicyRules.ensureMinCharsMaxLimit}
              {...getFieldError(passwordPolicy.fieldEnsureMinChars)}
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <FormControl className={classes.numberInputWrapper}>
            <Checkbox
              checked={enabledMaxChars}
              onChange={this.toggleNumberInputCheckbox(
                passwordPolicy.setEnsureMaxChars,
                passwordPolicyRules.ensureMaxCharsMinLimit,
                "enabledMaxChars"
              )}
              value={passwordPolicy.fieldEnsureMaxChars}
              className={classes.checkboxWithText}
            />
            <NumberField
              disabled={!enabledMaxChars}
              onChange={this.handleNumberFieldChange(
                passwordPolicy.setEnsureMaxChars,
                passwordPolicy.fieldEnsureMaxChars,
                "enabledMaxChars"
              )}
              className={classes.ensureTextField}
              value={passwordPolicy.ensureMaxChars}
              label={t(passwordPolicy.fieldEnsureMaxChars)}
              min={passwordPolicyRules.ensureMaxCharsMinLimit}
              max={passwordPolicyRules.ensureMaxCharsMaxLimit}
              {...getFieldError(passwordPolicy.fieldEnsureMaxChars)}
            />
          </FormControl>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <FormControl className={classes.numberInputWrapper}>
            <Checkbox
              checked={enabledLowercase}
              onChange={this.toggleNumberInputCheckbox(
                passwordPolicy.setEnsureLowercase,
                passwordPolicyRules.ensureLowercaseMinLimit,
                "enabledLowercase"
              )}
              value={passwordPolicy.fieldEnsureLowercase}
            />
            <NumberField
              disabled={!enabledLowercase}
              onChange={this.handleNumberFieldChange(
                passwordPolicy.setEnsureLowercase,
                passwordPolicy.fieldEnsureLowercase,
                "enabledLowercase"
              )}
              className={classes.ensureTextField}
              value={passwordPolicy.ensureLowercase}
              label={t(passwordPolicy.fieldEnsureLowercase)}
              min={passwordPolicyRules.ensureLowercaseMinLimit}
              max={passwordPolicyRules.ensureLowercaseMaxLimit}
              {...getFieldError(passwordPolicy.fieldEnsureLowercase)}
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <FormControl className={classes.numberInputWrapper}>
            <Checkbox
              checked={enabledUppercase}
              onChange={this.toggleNumberInputCheckbox(
                passwordPolicy.setEnsureUppercase,
                passwordPolicyRules.ensureUppercaseMinLimit,
                "enabledUppercase"
              )}
              value={passwordPolicy.fieldEnsureUppercase}
            />
            <NumberField
              disabled={!enabledUppercase}
              onChange={this.handleNumberFieldChange(
                passwordPolicy.setEnsureUppercase,
                passwordPolicy.fieldEnsureUppercase,
                "enabledUppercase"
              )}
              className={classes.ensureTextField}
              value={passwordPolicy.ensureUppercase}
              label={t(passwordPolicy.fieldEnsureUppercase)}
              min={passwordPolicyRules.ensureUppercaseMinLimit}
              max={passwordPolicyRules.ensureUppercaseMaxLimit}
              {...getFieldError(passwordPolicy.fieldEnsureUppercase)}
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <FormControl className={classes.numberInputWrapper}>
            <Checkbox
              checked={enabledNumbers}
              onChange={this.toggleNumberInputCheckbox(
                passwordPolicy.setEnsureNumbers,
                passwordPolicyRules.ensureNumbersMinLimit,
                "enabledNumbers"
              )}
              value={passwordPolicy.fieldEnsureNumbers}
            />
            <NumberField
              disabled={!enabledNumbers}
              onChange={this.handleNumberFieldChange(
                passwordPolicy.setEnsureNumbers,
                passwordPolicy.fieldEnsureNumbers,
                "enabledNumbers"
              )}
              className={classes.ensureTextField}
              value={passwordPolicy.ensureNumbers}
              label={t(passwordPolicy.fieldEnsureNumbers)}
              min={passwordPolicyRules.ensureNumbersMinLimit}
              max={passwordPolicyRules.ensureNumbersMaxLimit}
              {...getFieldError(passwordPolicy.fieldEnsureNumbers)}
            />
          </FormControl>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <FormControl className={classes.numberInputWrapper}>
            <Checkbox
              checked={enabledSpecialNumber}
              onChange={this.toggleNumberInputCheckbox(
                passwordPolicy.setEnsureSpecial,
                passwordPolicyRules.ensureSpecialNumberMinLimit,
                "enabledSpecialNumber",
                passwordPolicyObj => passwordPolicyObj.setSpecialChars("")
              )}
              value={passwordPolicy.fieldEnsureSpecial}
            />
            <NumberField
              disabled={!enabledSpecialNumber}
              onChange={this.handleNumberFieldChange(
                passwordPolicy.setEnsureSpecial,
                passwordPolicy.fieldEnsureSpecial,
                "enabledSpecialNumber"
              )}
              className={classes.ensureTextField}
              value={passwordPolicy.ensureSpecial}
              label={t(passwordPolicy.fieldEnsureSpecial)}
              min={passwordPolicyRules.ensureSpecialNumberMinLimit}
              max={passwordPolicyRules.ensureSpecialNumberMaxLimit}
              {...getFieldError(passwordPolicy.fieldEnsureSpecial)}
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <FormControl className={classes.ensureFormSpecialControl}>
            <TextField
              disabled={!enabledSpecialNumber}
              onChange={this.handleTextFieldChange(passwordPolicy.setSpecialChars)}
              className={classes.ensureTextSpecialField}
              value={passwordPolicy.specialChars}
              label={t(passwordPolicy.fieldSpecialChars)}
              {...getFieldError(passwordPolicy.fieldSpecialChars)}
            />
          </FormControl>
        </FormControl>
        <br />
        <br />
        <Divider />
        <br />
        <FormControl className={classes.numberInputWrapper}>
          <Checkbox
            className={classes.checkbox}
            checked={passwordPolicy.meetComplexity}
            onChange={this.toggleCheckbox(passwordPolicy.setMeetComplexity)}
            value={passwordPolicy.fieldMeetComplexity}
          />
          <FormControl className={classes.labelWrapper}>
            <Text className={classes.complexityLabel}>{t(passwordPolicy.fieldMeetComplexity)}</Text>
            <Text className={classes.helperTextLabel} variant="primarySmallBody">
              {t("meetComplexityHint")}
            </Text>
          </FormControl>
        </FormControl>
        <br />
        <br /> <br />
        <FormControlLabel
          disabled={!passwordPolicy.meetComplexity}
          classes={{ label: classes.label }}
          control={
            <Checkbox
              checked={passwordPolicy.meetComplexityConsecutiveNumbers}
              onChange={this.toggleCheckbox(passwordPolicy.setMeetComplexityConsecutiveNumbers)}
              value={passwordPolicy.fieldMeetComplexityConsecutiveNumbers}
            />
          }
          label={t(passwordPolicy.fieldMeetComplexityConsecutiveNumbers)}
        />
        <FormControlLabel
          disabled={!passwordPolicy.meetComplexity}
          classes={{ label: classes.label }}
          control={
            <Checkbox
              checked={passwordPolicy.meetComplexityFirstName}
              onChange={this.toggleCheckbox(passwordPolicy.setMeetComplexityFirstName)}
              value={passwordPolicy.fieldMeetComplexityFirstName}
            />
          }
          label={t(passwordPolicy.fieldMeetComplexityFirstName)}
        />
        <FormControlLabel
          disabled={!passwordPolicy.meetComplexity}
          classes={{ label: classes.label }}
          control={
            <Checkbox
              checked={passwordPolicy.meetComplexityLastName}
              onChange={this.toggleCheckbox(passwordPolicy.setMeetComplexityLastName)}
              value={passwordPolicy.fieldMeetComplexityLastName}
            />
          }
          label={t(passwordPolicy.fieldMeetComplexityLastName)}
        />
        <FormControlLabel
          disabled={!passwordPolicy.meetComplexity}
          classes={{ label: classes.label }}
          control={
            <Checkbox
              checked={passwordPolicy.meetComplexityUsername}
              onChange={this.toggleCheckbox(passwordPolicy.setMeetComplexityUsername)}
              value={passwordPolicy.fieldMeetComplexityUsername}
            />
          }
          label={t(passwordPolicy.fieldMeetComplexityUsername)}
        />
        <br />
        <br />
        <Divider />
        <br />
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <FormControlLabel
              classes={{ label: classes.label }}
              control={
                <Checkbox
                  checked={this.isChecked(
                    enabledMinimumAgeInDays,
                    passwordPolicy.enforceMinimumAgeInDays
                  )}
                  onChange={this.toggleNumberInputCheckbox(
                    passwordPolicy.setEnforceMinimumAgeInDays,
                    passwordPolicyRules.enforceMinimumAgeInDaysMinLimit,
                    "enabledMinimumAgeInDays"
                  )}
                  value={passwordPolicy.fieldEnforceMinimumAgeInDays}
                />
              }
              label={t(passwordPolicy.fieldEnforceMinimumAgeInDays)}
            />
            <br />
            <Text className={classes.helperText} variant="primarySmallBody">
              {t("enforceMinimumAgeHint")}
            </Text>
          </Grid>

          <NumberField
            disabled={
              !this.isChecked(enabledMinimumAgeInDays, passwordPolicy.enforceMinimumAgeInDays)
            }
            onChange={this.handleNumberFieldChange(
              passwordPolicy.setEnforceMinimumAgeInDays,
              passwordPolicy.fieldEnforceMinimumAgeInDays,
              "enabledMinimumAgeInDays"
            )}
            className={classes.ensureTextFieldWithLabel}
            value={passwordPolicy.enforceMinimumAgeInDays}
            label={t("days")}
            min={passwordPolicyRules.enforceMinimumAgeInDaysMinLimit}
            max={passwordPolicyRules.enforceMinimumAgeInDaysMaxLimit}
            {...getFieldError(passwordPolicy.fieldEnforceMinimumAgeInDays)}
          />
        </Grid>
        <br />
        <br />
        <Divider />
        <br />
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <FormControlLabel
              classes={{ label: classes.label }}
              control={
                <Checkbox
                  checked={this.isChecked(
                    enabledMaximumAgeInDays,
                    passwordPolicy.enforceMaximumAgeInDays
                  )}
                  onChange={this.toggleNumberInputCheckbox(
                    passwordPolicy.setEnforceMaximumAgeInDays,
                    passwordPolicyRules.enforceMaximumAgeInDaysMinLimit,
                    "enabledMaximumAgeInDays"
                  )}
                  value={passwordPolicy.fieldEnforceMaximumAgeInDays}
                />
              }
              label={t(passwordPolicy.fieldEnforceMaximumAgeInDays)}
            />{" "}
            <br />
            <Text className={classes.helperText} variant="primarySmallBody">
              {t("enforceMaximumAgeHint")}
            </Text>
          </Grid>

          <NumberField
            disabled={
              !this.isChecked(enabledMaximumAgeInDays, passwordPolicy.enforceMaximumAgeInDays)
            }
            onChange={this.handleNumberFieldChange(
              passwordPolicy.setEnforceMaximumAgeInDays,
              passwordPolicy.fieldEnforceMaximumAgeInDays,
              "enabledMaximumAgeInDays"
            )}
            className={classes.ensureTextFieldWithLabel}
            value={passwordPolicy.enforceMaximumAgeInDays}
            label={t("days")}
            min={passwordPolicyRules.enforceMaximumAgeInDaysMinLimit}
            max={passwordPolicyRules.enforceMaximumAgeInDaysMaxLimit}
            {...getFieldError(passwordPolicy.fieldEnforceMaximumAgeInDays)}
          />
        </Grid>
        <br />
        <br />
        <Divider />
        <br />
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <FormControlLabel
              classes={{ label: classes.label }}
              control={
                <Checkbox
                  checked={this.isChecked(enabledHistory, passwordPolicy.enforceHistory)}
                  onChange={this.toggleNumberInputCheckbox(
                    passwordPolicy.setEnforceHistory,
                    passwordPolicyRules.enforceHistoryMinLimit,
                    "enabledHistory"
                  )}
                  value={passwordPolicy.fieldEnforceHistory}
                />
              }
              label={t(passwordPolicy.fieldEnforceHistory)}
            />{" "}
            <br />
            <Text className={classes.helperText} variant="primarySmallBody">
              {t("enforceHistoryHint")}
            </Text>
          </Grid>

          <NumberField
            disabled={!this.isChecked(enabledHistory, passwordPolicy.enforceHistory)}
            onChange={this.handleNumberFieldChange(
              passwordPolicy.setEnforceHistory,
              passwordPolicy.fieldEnforceHistory,
              "enabledHistory"
            )}
            className={classes.ensureTextFieldWithLabel}
            value={passwordPolicy.enforceHistory}
            label={t("resets")}
            min={passwordPolicyRules.enforceHistoryMinLimit}
            max={passwordPolicyRules.enforceHistoryMaxLimit}
            {...getFieldError(passwordPolicy.fieldEnforceHistory)}
          />
        </Grid>
        <br />
        <br />
        <Divider />
        <br />
        <PrimaryTextButton
          onClick={this.toggleAdvancedOptions}
          className={classes.primaryBtnZipLeft}
        >
          {t("advancedOptions")}
        </PrimaryTextButton>
        {passwordPolicy.showAdvanced ? (
          <Fragment>
            <br />
            <br />
            <Text variant={"primaryBody"}>{t("addRegularExpressionsHint")}</Text>
            <br />
            <br />

            {passwordPolicy.regularExpressions.map((regExp, index) => (
              <Fragment key={index}>
                <TextField
                  className={classes.regularExpression}
                  value={regExp.regex}
                  onChange={this.handleChangeRegularExpressions(
                    passwordPolicy.setRegularExpressionsIndex,
                    index,
                    regExp.setRegex
                  )}
                  label={t(passwordPolicy.fieldRegularExpressions)}
                />
                <TextField
                  className={classes.regularExpression}
                  value={regExp.description}
                  onChange={this.handleChangeRegularExpressions(
                    passwordPolicy.setRegularExpressionsIndex,
                    index,
                    regExp.setDescription
                  )}
                  label={t(passwordPolicy.fieldRegularExpressions)}
                />
                <IconButton
                  className={classes.regularExpressionRemove}
                  onClick={this.handleRemoveRegularExpressions(
                    passwordPolicy.removeRegularExpressions,
                    index
                  )}
                >
                  <Icon>clear</Icon>
                </IconButton>
                <br />
              </Fragment>
            ))}

            <div className={classes.regularExpressionAdd}>
              <PrimaryTextButton
                onClick={this.handleAddRegularExpression(passwordPolicy.addRegularExpressions)}
                className={classes.regularExpressionAddBtn}
              >
                {t("add")}
              </PrimaryTextButton>
            </div>
          </Fragment>
        ) : null}
        <br />
        <br />
        <Divider />
        <br />
        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("update")}
          onConfirm={event =>
            !administerMode
              ? // this.props.savePanel(
                //     event,
                //     panelIndex,
                //     passwordPolicy.setRegularExpressions(regularExpressions.map(f => f.toScala()))
                //   )
                this.props.savePanel(event, panelIndex, passwordPolicy)
              : // this.props.savePanel(
                //     passwordPolicy.setRegularExpressions(regularExpressions.map(f => f.toScala()))
                //   )
                this.props.savePanel(passwordPolicy)
          }
          onFailure={errors => this.setState({ errors })}
          onCancel={this.revertToServer}
        />
      </form>
    );
  };

  promiseToDiode = () => {
    this.props.data
      .getPasswordPolicyData()
      .then(passwordPolicy => {
        passwordPolicy.showAdvanced = passwordPolicy.regularExpressions.length != 0;
        this.setState({
          passwordPolicy: passwordPolicy,
          diode: { loading: false, data: passwordPolicy }
        });
      })
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  componentDidMount() {
    this.promiseToDiode();
  }

  render = () => {
    const { diode, passwordPolicy } = this.state;
    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(passwordPolicy)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "PasswordPolicyForm" })(
  translate("accounts")(PasswordPolicyForm)
);
