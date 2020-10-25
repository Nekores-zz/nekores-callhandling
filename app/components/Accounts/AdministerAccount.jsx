import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import {
  AccConfigForm,
  CompanyDetailsForm,
  AccHolderForm,
  // PricingPlanForm,
  CostCentersForm,
  UsersForm,
  PasswordPolicyForm
} from "components/Accounts";
import { styleSheet } from "jss/Accounts/AdministerAccount";

class AdministerAccount extends PureComponent {
  static propTypes = {
    possiblePaths: PropTypes.object.isRequired,
    currentPath: PropTypes.string.isRequired,

    getConfigData: PropTypes.func.isRequired,
    getAccountDetailsData: PropTypes.func.isRequired,
    getAccountHolderData: PropTypes.func.isRequired,
    getCostCenterData: PropTypes.func.isRequired,
    getUsersData: PropTypes.func.isRequired,
    getPasswordPolicyData: PropTypes.func.isRequired,
    getEmptyRegexOption: PropTypes.func.isRequired,

    accTypes: PropTypes.array.isRequired,
    getCountries: PropTypes.func.isRequired,
    getAddresses: PropTypes.func.isRequired,
    getFullAddress: PropTypes.func.isRequired,
    checkDomainAvailability: PropTypes.func.isRequired,
    getEmptyUser: PropTypes.func.isRequired,
    validateInviteUser: PropTypes.func.isRequired,
    activeAccountStatusOptions: PropTypes.array.isRequired,

    handleAccountConfiguration: PropTypes.func.isRequired,
    handleCompanyDetails: PropTypes.func.isRequired,
    handleAccountHolder: PropTypes.func.isRequired,
    handleCostCenters: PropTypes.func.isRequired,
    handleUsers: PropTypes.func.isRequired,
    handlePasswordPolicy: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired
  };

  getForm = (possiblePaths, currentPath) => {
    switch (currentPath) {
      case possiblePaths.activityFeed:
        return "activityFeed";

      case possiblePaths.AccountConfiguration:
        return (
          <AccConfigForm
            data={{
              getConfigData: this.props.getConfigData,
              accTypes: this.props.accTypes,
              checkDomainAvailability: this.props.checkDomainAvailability,
              activeAccountStatusOptions: this.props.activeAccountStatusOptions
            }}
            savePanel={content =>
              this.props.handleAccountConfiguration(content.toScala()).then(response => {
                console.log(response);
              })
            }
            administerMode
          />
        );

      case possiblePaths.CompanyDetails:
        return (
          <CompanyDetailsForm
            data={{
              getAccountDetailsData: this.props.getAccountDetailsData,
              getCountries: this.props.getCountries,
              getAddresses: this.props.getAddresses,
              getFullAddress: this.props.getFullAddress
            }}
            savePanel={content =>
              this.props.handleCompanyDetails(content.toScala()).then(response => {
                console.log(response);
              })
            }
            administerMode
          />
        );

      case possiblePaths.AccountHolder:
        return (
          <AccHolderForm
            data={{
              getAccountHolderData: this.props.getAccountHolderData
            }}
            savePanel={content =>
              this.props.handleAccountHolder(content.toScala()).then(response => {
                console.log(response);
              })
            }
            administerMode
          />
        );

      case possiblePaths.pricingPlan:
        return "pricingPlan";

      case possiblePaths.CostCenter:
        return (
          <CostCentersForm
            data={{
              getCostCenterData: this.props.getCostCenterData,
              getAccountDetailsData: this.props.getAccountDetailsData,
              getCountries: this.props.getCountries,
              getAddresses: this.props.getAddresses,
              getFullAddress: this.props.getFullAddress
            }}
            savePanel={content =>
              this.props.handleCostCenters(content.toScala()).then(response => {
                console.log(response);
              })
            }
            administerMode
          />
        );
      //TODO We don't have users on admin page
      /* case possiblePaths.users:
         return (
           <UsersForm
             data={{
               getUsersData: this.props.getUsersData,
               getAccountHolderData: this.props.getAccountHolderData,
               getEmptyUser: this.props.getEmptyUser,
               validateInviteUser: this.props.validateInviteUser
             }}
             savePanel={content =>
               this.props.handleUsers(content).then(response => {
                 console.log(response);
               })
             }
             administerMode
           />
         );*/

      case possiblePaths.PasswordPolicy:
        return (
          <PasswordPolicyForm
            data={{
              getPasswordPolicyData: this.props.getPasswordPolicyData,
              passwordPolicyRules: this.props.passwordPolicyRules,
              getEmptyRegexOption: this.props.getEmptyRegexOption
            }}
            savePanel={content =>
              this.props.handlePasswordPolicy(content.toScala()).then(response => {
                console.log(response);
              })
            }
            administerMode
          />
        );

      default:
        return null;
    }
  };

  render() {
    const { possiblePaths, currentPath, classes } = this.props;

    return (
      <div className={classes.pageContent}>
        <Paper className={classes.paper} elevation={4}>
          <div className={classes.formContent}>{this.getForm(possiblePaths, currentPath)}</div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AdministerAccount" })(AdministerAccount);
