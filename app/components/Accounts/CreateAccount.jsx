import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { ConfirmButtons, SteppedForm } from "components";
import {
  AccConfigForm,
  CompanyDetailsForm,
  AccHolderForm,
  // PricingPlanForm,
  CostCentersForm,
  UsersForm,
  PasswordPolicyForm
} from "components/Accounts";
import { PAGE_CREATE_ACCOUNT } from "./api/account";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/CreateAccount";

class CreateAccount extends Component {
  static propTypes = {
    accountId: PropTypes.string,
    account: PropTypes.object, // if defined it should edit
    getAccountForms: PropTypes.func.isRequired,
    getConfigData: PropTypes.func.isRequired,
    getAccountDetailsData: PropTypes.func.isRequired,
    getAccountHolderData: PropTypes.func.isRequired,
    getCostCenterData: PropTypes.func.isRequired,
    getUsersData: PropTypes.func.isRequired,
    getEmptyUser: PropTypes.func.isRequired,
    getPasswordPolicyData: PropTypes.func.isRequired,
    getEmptyRegexOption: PropTypes.func.isRequired,
    passwordPolicyRules: PropTypes.object.isRequired,
    accTypes: PropTypes.array.isRequired,
    getCountries: PropTypes.func.isRequired,
    getAddresses: PropTypes.func.isRequired,
    getFullAddress: PropTypes.func.isRequired,
    checkDomainAvailability: PropTypes.func.isRequired,
    handleAccountConfiguration: PropTypes.func.isRequired,
    handleCompanyDetails: PropTypes.func.isRequired,
    handleAccountHolder: PropTypes.func.isRequired,
    handleCostCenters: PropTypes.func.isRequired,
    handleUsers: PropTypes.func.isRequired,
    handlePasswordPolicy: PropTypes.func.isRequired,
    validateInviteUser: PropTypes.func.isRequired,
    activateAccount: PropTypes.func.isRequired,
    // defaultPricingPlan: PropTypes.any.isRequired,
    // plans: PropTypes.any.isRequired,
    // accountPanelTitles: PropTypes.any.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = { validatedForms: {} };

  hasValidatedAll = () => !this.forms.find(form => !form.valid && form.heading !== "users");

  updatePanel = (response, doneCallback, panelIndex) => {
    this.forms[panelIndex].valid = !!response;
    const { validatedForms } = this.state;
    const key = Object.keys(validatedForms).find(
      key => key.toLowerCase() === this.forms[panelIndex].heading.toLowerCase()
    );
    if (key) validatedForms[key] = !!response;
    console.log("[ CreateAccount ]: save action on " + key + " form performed!");
    this.setState({ validatedForms });
    doneCallback(panelIndex);
  };

  handleAccountConfiguration = (content, doneCallback, panelIndex) => {
    return this.props
      .handleAccountConfiguration(content.toScala())
      .then(response => this.updatePanel(response, doneCallback, panelIndex));
  };

  handleCompanyDetails = (content, doneCallback, panelIndex) => {
    return this.props
      .handleCompanyDetails(content.toScala())
      .then(response => this.updatePanel(response, doneCallback, panelIndex));
  };

  handleAccountHolder = (content, doneCallback, panelIndex) => {
    return this.props
      .handleAccountHolder(content.toScala())
      .then(response => this.updatePanel(response, doneCallback, panelIndex));
  };

  handleCostCenters = (content, doneCallback, panelIndex) => {
    return this.props
      .handleCostCenters(content.toScala())
      .then(response => this.updatePanel(response, doneCallback, panelIndex));
  };

  handleUsers = (invitedUsers, doneCallback, panelIndex) => {
    return this.props
      .handleUsers(invitedUsers.map(u => u.toScala()))
      .then(response => this.updatePanel(response, doneCallback, panelIndex));
  };

  handlePasswordPolicy = (content, doneCallback, panelIndex) => {
    return this.props
      .handlePasswordPolicy(content.toScala())
      .then(response => this.updatePanel(response, doneCallback, panelIndex));
  };

  forms = [
    {
      heading: "accountConfiguration",
      form: AccConfigForm,
      data: {
        getConfigData: this.props.getConfigData,
        accTypes: this.props.accTypes,
        checkDomainAvailability: this.props.checkDomainAvailability
      },
      saveForm: this.handleAccountConfiguration,
      valid: false,
      icon: "settings"
    },
    {
      heading: "companyDetails",
      form: CompanyDetailsForm,
      data: {
        getAccountDetailsData: this.props.getAccountDetailsData,
        getCountries: this.props.getCountries,
        getAddresses: this.props.getAddresses,
        getFullAddress: this.props.getFullAddress
      },
      saveForm: this.handleCompanyDetails,
      valid: false,
      icon: "details"
    },
    {
      heading: "accountHolder",
      form: AccHolderForm,
      data: {
        getAccountHolderData: this.props.getAccountHolderData
      },
      saveForm: this.handleAccountHolder,
      valid: false,
      icon: "account_box"
    },
    // {
    //   heading: "pricingPlan",
    //   form: PricingPlanForm,
    //   data: {
    //     defaultPricingPlan: defaultPricingPlan,
    //     plans: plans,
    //     accountPanelTitles: accountPanelTitles
    //   },
    //   saveForm: this.saveContent,
    //   valid: false,
    //   icon: "attach_money"
    // },
    {
      heading: "costCenter",
      form: CostCentersForm,
      data: {
        getCostCenterData: this.props.getCostCenterData,
        getAccountDetailsData: this.props.getAccountDetailsData,
        getCountries: this.props.getCountries,
        getAddresses: this.props.getAddresses,
        getFullAddress: this.props.getFullAddress
      },
      saveForm: this.handleCostCenters,
      valid: false,
      icon: "account_balance"
    },
    {
      heading: "users",
      form: UsersForm,
      data: {
        getUsersData: this.props.getUsersData,
        getAccountHolderData: this.props.getAccountHolderData,
        getEmptyUser: this.props.getEmptyUser,
        validateInviteUser: this.props.validateInviteUser
      },
      saveForm: this.handleUsers,
      valid: false,
      icon: "person"
    },
    {
      heading: "passwordPolicy",
      form: PasswordPolicyForm,
      data: {
        getPasswordPolicyData: this.props.getPasswordPolicyData,
        passwordPolicyRules: this.props.passwordPolicyRules,
        getEmptyRegexOption: this.props.getEmptyRegexOption
      },
      saveForm: this.handlePasswordPolicy,
      valid: false,
      icon: "lock"
    }
  ];

  componentDidMount = () => {
    this.props.getAccountForms().then(validatedForms => {
      const keys = Object.keys(validatedForms);
      keys.forEach(key => {
        const form = this.forms.find(form => form.heading.toLowerCase() === key.toLowerCase());
        if (form) form.valid = validatedForms[key];
      });
      this.setState({ validatedForms });
    });
  };

  render = () => {
    const { classes, t } = this.props;
    const { validatedForms } = this.state;

    return (
      <div className={classes.pageContent}>
        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <SteppedForm
              forms={this.forms}
              ns="accounts"
              pageName={PAGE_CREATE_ACCOUNT}
              // getAccountForms update workarround:
              // we are not reading from validatedForms prop, we read from forms object instead
              // but we pass it in to SteppedForm, so that react knows it needs to update render!
              validatedForms={validatedForms}
            />

            <ConfirmButtons
              className={classes.buttons}
              confirmLabel={t("activateAcc")}
              onConfirm={() => this.props.activateAccount()}
              onFailure={errors => console.log(errors)}
              blocked={!this.hasValidatedAll()}
              altActionLabel={t("deleteAcc")}
              onAltAction={() => {}}
            />
          </div>
        </Grid>
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "CreateAccount" })(
  translate("accounts")(CreateAccount)
);
