import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Avatar, withStyles } from "@material-ui/core";
import Reseller from "Icons/Reseller";
import Seller from "Icons/Seller";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/AccountType";

class AccountType extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  getIcon = typeName => {
    switch (typeName) {
      case "reseller":
        return <Reseller />;

      case "seller":
      case "group": // new name convention (with same icon)
        return <Seller />;

      default:
        // no icon
        return null;
    }
  };

  render = () => {
    const { type, classes, t } = this.props;

    const icon = this.getIcon(type);

    return (
      <span className={classes.type}>
        {icon && (
          <Avatar className={classes.iconWrapper}>
            <Avatar className={classes.icon}>{icon}</Avatar>
          </Avatar>
        )}
        {t(type)}
      </span>
    );
  };
}

export default withStyles(styleSheet, { name: "AccountType" })(translate("accounts")(AccountType));
