import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Icon, withStyles } from "@material-ui/core";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuFooter,
  SidemenuSection,
  SidemenuTab,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/AdministerAccountSidemenu";

class AdministerAccountSidemenu extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    possiblePaths: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      accountName,
      possiblePaths,
      navigate,
      handleBack,
      currentPath,
      classes,
      t
    } = this.props;

    return possiblePaths !== null ? (
      <Fragment>
        <SidemenuBack back={t("accounts")} onClick={handleBack} />
        <SidemenuTitle title={accountName} subtitle={t("administer")} />

        <SidemenuDivider />
        {/* <SidemenuTab
          isActive={currentPath === possiblePaths.activityFeed}
          onClick={() => navigate(possiblePaths.activityFeed)}
          icon={<Icon>list_alt</Icon>}
        >
          {t("activityFeed")}
        </SidemenuTab> */}
        <SidemenuTab
          isActive={currentPath === possiblePaths.AccountConfiguration}
          onClick={() => navigate(possiblePaths.AccountConfiguration)}
          icon={<Icon>settings</Icon>}
        >
          {t("accountConfiguration")}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.CompanyDetails}
          onClick={() => navigate(possiblePaths.CompanyDetails)}
          icon={<Icon>details</Icon>}
        >
          {t("companyDetails")}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.AccountHolder}
          onClick={() => navigate(possiblePaths.AccountHolder)}
          icon={<Icon>account_box</Icon>}
        >
          {t("accountHolder")}
        </SidemenuTab>
        {/* <SidemenuTab
          isActive={currentPath === possiblePaths.pricingPlan}
          onClick={() => navigate(possiblePaths.pricingPlan)}
          icon={<Icon>attach_money</Icon>}
        >
          {t("pricingPlan")}
        </SidemenuTab> */}
        <SidemenuTab
          isActive={currentPath === possiblePaths.CostCenter}
          onClick={() => navigate(possiblePaths.CostCenter)}
          icon={<Icon>account_balance</Icon>}
        >
          {t("costCenters")}
        </SidemenuTab>
       {/* <SidemenuTab
          isActive={currentPath === possiblePaths.users}
          onClick={() => navigate(possiblePaths.users)}
          icon={<Icon>person</Icon>}
        >
          {t("users")}
        </SidemenuTab>*/}
        <SidemenuTab
          isActive={currentPath === possiblePaths.PasswordPolicy}
          onClick={() => navigate(possiblePaths.PasswordPolicy)}
          icon={<Icon>lock</Icon>}
        >
          {t("passwordPolicy")}
        </SidemenuTab>

        <Button
          onClick={() => navigate(possiblePaths.goToAccount)}
          classes={{ root: classes.goToAccountButton }}
          variant="contained"
        >
          {t("goToAccount")}
        </Button>

        <SidemenuDivider />
        <SidemenuSection title={t("help")} />
        <SidemenuDivider />

        <StretchingGridItem />

        <SidemenuDivider overlap />
        <SidemenuFooter />
      </Fragment>
    ) : null;
  }
}

export default withStyles(styleSheet, { name: "AdministerAccountSidemenu" })(
  translate("accounts")(AdministerAccountSidemenu)
);
