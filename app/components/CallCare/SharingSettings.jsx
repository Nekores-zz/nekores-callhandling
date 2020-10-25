/**
 * by, Sajid U. / SEPT-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import { styleSheet } from "jss/CallCare/SharingSettings";

import { Grid, Paper, withStyles, Divider } from "@material-ui/core";
import { ConfirmButtons } from "components";
import { accounts, actionTypes } from "config/securityMockData";
import { accountTypes } from "config/accountsMockData";

import { EditSharing } from "../Security/SecurityElements/EditSharing";
import { Sharing } from "../../models/Sharing";

class SharingSettings extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    accounts,
    accountTypes,
    actionTypes
  };

  state = {
    sharing: Sharing.create()
  };

  handleChange = sharing => {
    this.setState({ sharing });
  };

  loadAccounts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.props.accounts);
      }, 100);
    });
  };

  handleConfirm = event => {
    return new Promise((resolve, rejct) => {
      resolve();
    });
  };

  handleCancel = () => {};

  handleSuccess = () => {};

  handleFailure = errors => {};

  render() {
    const { classes, t } = this.props;

    return (
      <div className={classes.pageContent}>
        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <Paper elevation={4} className={classes.paper}>
              <div className={classes.internalForm}>
                <EditSharing
                  sharing={this.state.sharing}
                  onChange={this.handleChange}
                  accounts={this.props.accounts}
                  loadAccounts={this.loadAccounts}
                  actionTypes={this.props.actionTypes}
                />
                <br />
                <Divider />
                <br />
                <ConfirmButtons
                  className={classes.buttons}
                  confirmLabel={t("save")}
                  onConfirm={this.handleConfirm}
                  onCancel={this.handleCancel}
                  onSuccess={this.handleSuccess}
                  onFailure={this.handleFailure}
                />
                <br />
              </div>
            </Paper>
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "SharingSettings" })(
  translate("callcare")(SharingSettings)
);
