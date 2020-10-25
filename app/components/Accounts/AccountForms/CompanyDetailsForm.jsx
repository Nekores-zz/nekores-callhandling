import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, withStyles } from "@material-ui/core";
import { ConfirmButtons, Pending, PrimaryTextButton, Select, TextField } from "components";
import { LookUpAddressMenu } from "components/Accounts";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/AccountForms/CompanyDetailsForm";

class CompanyDetailsForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number, // should be set on creation mode
    administerMode: PropTypes.bool, // should be set on administer mode
    data: PropTypes.shape({
      getAccountDetailsData: PropTypes.func.isRequired,
      getCountries: PropTypes.func.isRequired,
      getAddresses: PropTypes.func.isRequired,
      getFullAddress: PropTypes.func.isRequired
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  isMounted = false;

  state = {
    accountDetails: undefined, // set by componentDidMount
    lookUpAddress: false,
    lookUpNode: null,
    showAddressForm: false,
    countries: [],
    addresses: [],
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  revertToServer = () => this.promiseToDiode();

  handleSelect = value => {
    const address = this.state.accountDetails.address;
    const updatedCountry = address.country.setName(value.name).setId(value.id);
    const updatedAddress = address.setCountry(updatedCountry.toScala());
    const accountDetails = this.state.accountDetails.setAddress(updatedAddress.toScala());
    this.setState({ accountDetails });
  };

  handleChange = setter => event => {
    const accountDetails = setter(event.target.value);
    this.setState({ accountDetails });
  };

  handleChangeAddress = setter => event => {
    const address = setter(event.target.value);
    const accountDetails = this.state.accountDetails.setAddress(address.toScala());
    this.setState({ accountDetails });
  };

  toggleLookUp = event => {
    const lookUpNode = event.currentTarget;
    const { accountDetails } = this.state;
    const address = accountDetails.address;
    const country = address.country;
    const postcode = this.state.accountDetails.address.postCode;
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

  closeLookUp = () => this.setState({ lookUpAddress: false });

  handleSelectAddress = item => event => {
    const accountDetails = this.state.accountDetails;
    const country = accountDetails.address.country;
    this.props.data
      .getFullAddress(item.id, country.id)
      .then(address => {
        this.setState(
          {
            showAddressForm: true,
            accountDetails: accountDetails.setAddress(
              address.setCountry(country.toScala()).toScala()
            ),
            addresses: []
          },
          () => this.closeLookUp()
        );
      })
      .catch(e => {
        this.closeLookUp();
      });
  };

  toggleAddressForm = () => this.setState({ showAddressForm: !this.state.showAddressForm });

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

  renderForm = accountDetails => () => {
    const { administerMode, panelIndex, classes, t } = this.props;
    const { lookUpNode, showAddressForm, countries, addresses } = this.state;
    const { address } = accountDetails;
    const { country } = address;

    return (
      <form className={classes.formInput} autoComplete="off">
        <Grid container spacing={24}>
          <Grid className={classes.gridMargin} item xg={6} lg={6} md={6} sm={12} xs={12}>
            <TextField
              value={accountDetails.companyName}
              onChange={this.handleChange(accountDetails.setCompanyName)}
              className={classes.textField}
              label={t(accountDetails.fieldCompanyName)}
              error={this.isFieldInvalid(accountDetails.fieldCompanyName)}
              helperText={t(this.getFieldErrorMessage(accountDetails.fieldCompanyName))}
              required
            />

            <TextField
              value={accountDetails.phoneNo}
              onChange={this.handleChange(accountDetails.setPhoneNo)}
              className={classes.textField}
              label={t(accountDetails.fieldPhoneNo)}
              error={this.isFieldInvalid(accountDetails.fieldPhoneNo)}
              helperText={t(this.getFieldErrorMessage(accountDetails.fieldPhoneNo))}
              required
            />

            <TextField
              value={accountDetails.referenceId}
              onChange={this.handleChange(accountDetails.setReferenceId)}
              className={classes.textField}
              label={t("referenceIdForCollator")}
              error={this.isFieldInvalid(accountDetails.fieldReferenceId)}
              helperText={t(this.getFieldErrorMessage(accountDetails.fieldReferenceId))}
            />

            <TextField
              value={accountDetails.website}
              onChange={this.handleChange(accountDetails.setWebsite)}
              className={classes.textField}
              label={t(accountDetails.fieldWebsite)}
              error={this.isFieldInvalid(accountDetails.fieldWebsite)}
              helperText={t(this.getFieldErrorMessage(accountDetails.fieldWebsite))}
            />

            <TextField
              value={accountDetails.registrationNo}
              onChange={this.handleChange(accountDetails.setRegistrationNo)}
              className={classes.textField}
              label={t(accountDetails.fieldRegistrationNo)}
              error={this.isFieldInvalid(accountDetails.fieldRegistrationNo)}
              helperText={t(this.getFieldErrorMessage(accountDetails.fieldRegistrationNo))}
            />

            <TextField
              value={accountDetails.charityNo}
              onChange={this.handleChange(accountDetails.setCharityNo)}
              className={classes.textField}
              label={t(accountDetails.fieldCharityNo)}
              error={this.isFieldInvalid(accountDetails.fieldCharityNo)}
              helperText={t(this.getFieldErrorMessage(accountDetails.fieldCharityNo))}
            />
          </Grid>

          <Grid className={classes.gridMargin} item xg={6} lg={6} md={6} sm={12} xs={12}>
            <Select
              onChange={this.handleSelect}
              className={clsx(classes.rightItemWidth, classes.textField)}
              getKey={country => country.id}
              renderOption={country => country.name}
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
              error={this.isFieldInvalid(address.fieldPostCode)}
              helperText={t(this.getFieldErrorMessage(address.fieldPostCode))}
              required
            />

            <div className={classes.postZipCode}>
              <PrimaryTextButton onClick={this.toggleLookUp} className={classes.primaryBtnZipLeft}>
                {t("lookUpAddress")}
              </PrimaryTextButton>

              <PrimaryTextButton onClick={this.toggleAddressForm} className={classes.primaryBtnZip}>
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
                />
              </div>
            ) : null}
          </Grid>
        </Grid>
        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("update")}
          onConfirm={event =>
            !administerMode
              ? this.props.savePanel(event, panelIndex, accountDetails)
              : this.props.savePanel(accountDetails)
          }
          onSuccess={() => this.setState({ errors: null })}
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

  promiseToDiode = () => {
    this.props.data
      .getAccountDetailsData()
      .then(accountDetails =>
        this.setState({
          accountDetails,
          showAddressForm: !!accountDetails.address.postCode,
          diode: { loading: false, data: accountDetails },
          lookUpAddress: false,
          lookUpNode: null,
          errors: null
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  componentDidMount = () => {
    this.props.data.getCountries().then(countries => this.setState({ countries }));
    this.promiseToDiode();
  };

  render = () => {
    const { diode, accountDetails } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(accountDetails)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "CompanyDetailsForm" })(
  translate("accounts")(CompanyDetailsForm)
);
