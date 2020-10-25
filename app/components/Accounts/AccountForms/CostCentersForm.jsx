import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Checkbox, FormControlLabel, Grid, Typography, withStyles } from "@material-ui/core";
import { ConfirmButtons, Pending, PrimaryTextButton, Select, TextField } from "components";
import LookUpAddressMenu from "./LookUpAddressMenu";
import * as formFields from "../api/account";
import { PromiseWithCallback } from "utils/promise";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/CreateAccount";

class CostCentersForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number, // should be set on creation mode
    administerMode: PropTypes.bool, // should be set on administer mode
    data: PropTypes.shape({
      getCostCenterData: PropTypes.func.isRequired,
      getAccountDetailsData: PropTypes.func.isRequired,
      getCountries: PropTypes.func.isRequired,
      getAddresses: PropTypes.func.isRequired,
      getFullAddress: PropTypes.func.isRequired
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_COST_CENTERS
  };

  getCostCenterData = () =>
    PromiseWithCallback(this.props.data.getCostCenterData(), costCenter =>
      this.setState(
        { costCenter, showAddressForm: !!costCenter.address.postCode },
        this.checkIsSameAsCompany
      )
    );

  getAccountDetailsData = () =>
    this.props.administerMode
      ? null
      : PromiseWithCallback(this.props.data.getAccountDetailsData(), accountDetails =>
          this.setState({ accountDetails }, this.checkIsSameAsCompany)
        );

  checkIsSameAsCompany = () => {
    const { administerMode } = this.props;
    const { costCenter, accountDetails } = this.state;

    if (!administerMode && costCenter && accountDetails)
      this.setState({
        isSameAsCompany:
          costCenter.address.addressLine1 === accountDetails.address.addressLine1 &&
          costCenter.address.addressLine2 === accountDetails.address.addressLine2 &&
          costCenter.address.phoneNo === accountDetails.address.phoneNo &&
          costCenter.address.postCode === accountDetails.address.postCode &&
          costCenter.address.city === accountDetails.address.city &&
          costCenter.address.county === accountDetails.address.county &&
          costCenter.address.country.id === accountDetails.address.country.id
      });
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    costCenterPromise: this.getCostCenterData(),
    accountDetailsPromise: this.getAccountDetailsData(),
    costCenter: undefined, // set by this.getCostCenterData
    accountDetails: undefined, // set by this.getAccountDetailsData
    lookUpAddress: false,
    lookUpNode: null,
    showAddressForm: false,
    isSameAsCompany: false, // set by this.checkIsSameAsCompany
    countries: [],
    addresses: []
  };

  revertToServer = () =>
    this.setState({
      costCenterPromise: this.getCostCenterData(),
      accountDetailsPromise: this.getAccountDetailsData(),
      lookUpAddress: false,
      lookUpNode: null,
      showAddressForm: false
    });

  handleSelect = value => {
    const address = this.state.costCenter.address;
    const updatedCountry = address.country.setName(value.name).setId(value.id);
    const updatedAddress = address.setCountry(updatedCountry.toScala());
    const costCenter = this.state.costCenter.setAddress(updatedAddress.toScala());
    this.setState({ costCenter });
  };

  handleChange = setter => event => {
    const costCenter = setter(event.target.value);
    this.setState({ costCenter });
  };

  handleChangeAddress = setter => event => {
    const address = setter(event.target.value);
    const costCenter = this.state.costCenter.setAddress(address.toScala());
    this.setState({ costCenter });
  };

  copyCompanyAddress = costCenter => {
    const { address } = costCenter;
    const { accountDetails } = this.state;
    const updatedAddress = address
      .setAddressLine1(accountDetails.address.addressLine1)
      //.setAddressLine2(accountDetails.address.addressLine2)
      .setPostCode(accountDetails.address.postCode)
      .setCity(accountDetails.address.city)
      .setCounty(accountDetails.address.county)
      .setCountry(accountDetails.address.country.toScala());
    return costCenter.setAddress(updatedAddress.toScala()).setPhoneNo(accountDetails.phoneNo);
  };

  toggleCheckbox = event => this.setState({ isSameAsCompany: event.target.checked });

  toggleLookUp = event => {
    const lookUpNode = event.currentTarget;
    const costCenter = this.state.costCenter;
    const address = costCenter.address;
    const country = address.country;
    const postcode = address.postCode;
    if (country.id != "" && postcode !== "") {
      this.props.data
        .getAddresses(postcode, country.id)
        .then(addresses => {
          this.setState({
            addresses,
            lookUpAddress: !this.state.lookUpAddress,
            lookUpNode: lookUpNode
          });
        })
        .catch(e => {
          this.setState({
            lookUpAddress: !this.state.lookUpAddress,
            lookUpNode: lookUpNode
          });
        });
    }
  };

  closeLookUp = () => {
    this.setState({ lookUpAddress: false });
  };

  handleSelectAddress = item => event => {
    const costCenter = this.state.costCenter;
    const country = costCenter.address.country;
    this.props.data
      .getFullAddress(item.id, country.id)
      .then(address => {
        this.setState(
          {
            showAddressForm: true,
            costCenter: costCenter.setAddress(address.setCountry(country.toScala()).toScala()),
            addresses: []
          },
          () => this.closeLookUp()
        );
      })
      .catch(e => {
        this.closeLookUp();
      });
  };

  toggleAddressForm = event =>
    this.setState({
      showAddressForm: !this.state.showAddressForm
    });

  showAddressFormWhenAddressError = fieldsName => {
    if (!this.state.showAddressForm) {
      const isAddressError = fieldsName.find(fieldName => !!this.getFieldErrorMessage(fieldName));
      if (isAddressError) {
        this.setState({ showAddressForm: isAddressError });
      }
    }
  };

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => {
    return !!this.getFieldErrorMessage(fieldName);
  };

  renderForm = costCenter => () => {
    const { administerMode, panelIndex, classes, t } = this.props;
    const { lookUpNode, showAddressForm, isSameAsCompany, countries, addresses } = this.state;
    const { address } = costCenter;
    const { country } = address;

    return (
      <form className={classes.formInput} autoComplete="off">
        {!administerMode && (
          <Fragment>
            <Typography variant="caption" className={classes.addCosts}>
              {t("youCanAdd")}
            </Typography>

            <FormControlLabel
              classes={{ label: classes.label }}
              control={
                <Checkbox
                  checked={isSameAsCompany}
                  onChange={this.toggleCheckbox}
                  value={"isSameAsCompany"}
                />
              }
              label={t("isSameAsCompany")}
            />
          </Fragment>
        )}

        <Grid container className={classes.gridMarginBottom} spacing={24}>
          <Grid className={classes.gridMargin} item xg={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              value={costCenter.name}
              onChange={this.handleChange(costCenter.setName)}
              className={classes.textField}
              label={t("costCenterName")}
              error={this.isFieldInvalid(costCenter.fieldName)}
              helperText={t(this.getFieldErrorMessage(costCenter.fieldName))}
              required
            />

            <TextField
              value={costCenter.referenceId}
              onChange={this.handleChange(costCenter.setReferenceId)}
              className={classes.textField}
              label={t(costCenter.fieldReferenceId)}
              error={this.isFieldInvalid(costCenter.fieldReferenceId)}
              helperText={t(this.getFieldErrorMessage(costCenter.fieldReferenceId))}
            />

            <TextField
              value={costCenter.contactName}
              onChange={this.handleChange(costCenter.setContactName)}
              className={classes.textField}
              label={t(costCenter.fieldContactName)}
              error={this.isFieldInvalid(costCenter.fieldContactName)}
              helperText={t(this.getFieldErrorMessage(costCenter.fieldContactName))}
            />

            {!isSameAsCompany ? (
              <TextField
                value={costCenter.phoneNo}
                onChange={this.handleChange(costCenter.setPhoneNo)}
                className={classes.textField}
                label={t(costCenter.fieldPhoneNo)}
                error={this.isFieldInvalid(costCenter.fieldPhoneNo)}
                helperText={t(this.getFieldErrorMessage(costCenter.fieldPhoneNo))}
                required
              />
            ) : null}

            <TextField
              value={costCenter.email}
              onChange={this.handleChange(costCenter.setEmail)}
              className={classes.textField}
              label={t(costCenter.fieldEmail)}
              error={this.isFieldInvalid(costCenter.fieldEmail)}
              helperText={t(this.getFieldErrorMessage(costCenter.fieldEmail))}
              required
            />

            <TextField
              value={costCenter.vat}
              onChange={this.handleChange(costCenter.setVat)}
              className={classes.textField}
              label={t(costCenter.fieldVat)}
              error={this.isFieldInvalid(costCenter.fieldVat)}
              helperText={t(this.getFieldErrorMessage(costCenter.fieldVat))}
            />
          </Grid>
          {!isSameAsCompany ? (
            <Grid className={classes.gridMargin} item xg={6} lg={6} md={6} sm={12} xs={12}>
              <Select
                onChange={this.handleSelect}
                className={clsx(classes.rightItemWidth, classes.textField)}
                getKey={countries => countries.id}
                renderOption={countries => countries.name}
                options={countries}
                value={country.id ? country : { id: "", name: "" }}
                label={t(address.fieldCountry)}
                error={this.isFieldInvalid(address.country.fieldName)}
                helperText={t(this.getFieldErrorMessage(address.country.fieldName))}
                displayEmpty
                native
                required
              />

              <TextField
                value={address.postCode}
                onChange={this.handleChangeAddress(address.setPostCode)}
                className={clsx(classes.rightItemWidth, classes.textField)}
                label={t(address.fieldPostCode)}
                error={this.isFieldInvalid(costCenter.fieldPostCode)}
                helperText={t(this.getFieldErrorMessage(costCenter.fieldPostCode))}
                required
              />

              <div className={classes.postZipCode}>
                <PrimaryTextButton
                  onClick={this.toggleLookUp}
                  className={classes.primaryBtnZipLeft}
                >
                  {t("lookUpAddress")}
                </PrimaryTextButton>

                <PrimaryTextButton
                  onClick={this.toggleAddressForm}
                  className={classes.primaryBtnZip}
                >
                  {t("enterManually")}
                </PrimaryTextButton>

                <LookUpAddressMenu
                  anchorEl={lookUpNode}
                  open={this.state.lookUpAddress}
                  handleClose={this.closeLookUp}
                  handleSelect={this.handleSelectAddress}
                  addresses={addresses}
                />
              </div>

              {showAddressForm ? (
                <div className={classes.addressLines}>
                  <TextField
                    value={address.addressLine1}
                    onChange={this.handleChangeAddress(address.setAddressLine1)}
                    className={clsx(classes.rightItemWidth, classes.textField)}
                    label={t(address.fieldAddressLine1)}
                    error={this.isFieldInvalid(address.fieldAddressLine1)}
                    helperText={t(this.getFieldErrorMessage(address.fieldAddressLine1))}
                    required
                  />

                  <TextField
                    value={address.addressLine2}
                    onChange={this.handleChangeAddress(address.setAddressLine2)}
                    className={clsx(classes.rightItemWidth, classes.textField)}
                    label={t(address.fieldAddressLine2)}
                  />

                  <TextField
                    value={address.city}
                    onChange={this.handleChangeAddress(address.setCity)}
                    className={clsx(classes.rightItemWidth, classes.textField)}
                    label={t(address.fieldCity)}
                    error={this.isFieldInvalid(address.fieldCity)}
                    helperText={t(this.getFieldErrorMessage(address.fieldCity))}
                    required
                  />

                  <TextField
                    value={address.county}
                    onChange={this.handleChangeAddress(address.setCounty)}
                    className={clsx(classes.rightItemWidth, classes.textField)}
                    label={t(address.fieldCounty)}
                    error={this.isFieldInvalid(address.fieldCounty)}
                    helperText={t(this.getFieldErrorMessage(address.fieldCounty))}
                  />
                </div>
              ) : null}
            </Grid>
          ) : null}
        </Grid>

        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("update")}
          onSuccess={() => this.setState({ errors: null })}
          onConfirm={event =>
            !administerMode
              ? this.props.savePanel(
                  event,
                  panelIndex,
                  isSameAsCompany ? this.copyCompanyAddress(costCenter) : costCenter
                )
              : this.props.savePanel(
                  isSameAsCompany ? this.copyCompanyAddress(costCenter) : costCenter
                )
          }
          onFailure={errors =>
            this.setState({ errors }, () =>
              this.showAddressFormWhenAddressError([address.fieldAddressLine1, address.fieldCity])
            )
          }
          onCancel={this.revertToServer}
        />
      </form>
    );
  };

  componentDidMount() {
    this.props.data.getCountries().then(countries => this.setState({ countries }));
  }

  render = () => {
    const { administerMode } = this.props;
    const { costCenterPromise, costCenter, accountDetails } = this.state;

    return (
      <Pending
        content={costCenterPromise}
        onResponse={this.renderForm(costCenter)}
        onFail={this.onFail}
        forceWait={!administerMode && !accountDetails}
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "CostCentersForm" })(
  translate("accounts")(CostCentersForm)
);
