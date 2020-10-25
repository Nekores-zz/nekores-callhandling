import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { ConfirmButtons, Pending, TextField } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/CreateAccount";

class AccHolderForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number, // should be set on creation mode
    administerMode: PropTypes.bool, // should be set on administer mode
    data: PropTypes.shape({
      getAccountHolderData: PropTypes.func.isRequired
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    accountHolder: undefined, // set by componentDidMount
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  revertToServer = () => this.promiseToDiode();

  handleChange = setter => event => {
    const accountHolder = setter(event.target.value);
    this.setState({ accountHolder });
  };

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  renderForm = accountHolder => () => {
    const { administerMode, panelIndex, classes, t } = this.props;

    return (
      <form className={classes.formInput} autoComplete="off">
        <Grid className={classes.gridMarginBottom} container spacing={24}>
          <Grid className={classes.gridMargin} item xg={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              value={accountHolder.firstName}
              onChange={this.handleChange(accountHolder.setFirstName)}
              className={classes.textField}
              label={t(accountHolder.fieldFirstName)}
              error={this.isFieldInvalid(accountHolder.fieldFirstName)}
              helperText={t(this.getFieldErrorMessage(accountHolder.fieldFirstName))}
              required
            />

            <TextField
              value={accountHolder.lastName}
              onChange={this.handleChange(accountHolder.setLastName)}
              className={classes.textField}
              label={t(accountHolder.fieldLastName)}
              error={this.isFieldInvalid(accountHolder.fieldLastName)}
              helperText={t(this.getFieldErrorMessage(accountHolder.fieldLastName))}
              required
            />
          </Grid>

          <Grid className={classes.gridMargin} item xg={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              value={accountHolder.email}
              onChange={this.handleChange(accountHolder.setEmail)}
              className={classes.textField}
              label={t(accountHolder.fieldEmail)}
              error={this.isFieldInvalid(accountHolder.fieldEmail)}
              helperText={t(this.getFieldErrorMessage(accountHolder.fieldEmail))}
              required
            />

            <TextField
              value={accountHolder.workNo}
              onChange={this.handleChange(accountHolder.setWorkNo)}
              className={classes.textField}
              label={t(accountHolder.fieldWorkNo)}
              error={this.isFieldInvalid(accountHolder.fieldWorkNo)}
              helperText={t(this.getFieldErrorMessage(accountHolder.fieldWorkNo))}
              required
            />

            <TextField
              value={accountHolder.mobileNo}
              onChange={this.handleChange(accountHolder.setMobileNo)}
              className={classes.textField}
              label={t(accountHolder.fieldMobileNo)}
              error={this.isFieldInvalid(accountHolder.fieldMobileNo)}
              helperText={t(this.getFieldErrorMessage(accountHolder.fieldMobileNo))}
            />
          </Grid>
        </Grid>

        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("update")}
          onConfirm={event =>
            !administerMode
              ? this.props.savePanel(event, panelIndex, accountHolder)
              : this.props.savePanel(accountHolder)
          }
          onSuccess={() => this.setState({ errors: null })}
          onFailure={errors => this.setState({ errors })}
          onCancel={this.revertToServer}
        />
      </form>
    );
  };

  promiseToDiode = () => {
    this.props.data
      .getAccountHolderData()
      .then(accountHolder =>
        this.setState({
          accountHolder: accountHolder,
          diode: { loading: false, data: accountHolder }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  componentDidMount() {
    this.promiseToDiode();
  }

  render = () => {
    const { accountHolder, diode } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(accountHolder)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "AccHolderForm" })(
  translate("accounts")(AccHolderForm)
);
