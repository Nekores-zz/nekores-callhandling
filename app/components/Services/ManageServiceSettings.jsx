/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - sep-2019

 * Modified by Sajid U. / Sept-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { Pending, ConfirmDialog } from "components";
import { ServiceSettingsForm } from "./ServiceForms";
import { styleSheet } from "jss/Services/ManageService";
import { DiodeSearchable } from "utils/commonShapes";
import { translate } from "react-i18next";

class ManageServiceSettings extends Component {
  // WARNING: Async code might have some leak issues, due to Javascript promise design
  // (promises are not cancelable), any attempt to change this will most probably be
  // only a hack on to hide the warning from react, but does not really solve the issue.
  // See: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html

  static propTypes = {
    getServiceData: PropTypes.func.isRequired,
    handleUpdateService: PropTypes.func.isRequired,

    searchableVersions: DiodeSearchable.isRequired,
    searchableSchedule: DiodeSearchable.isRequired,

    getEmptyScheduling: PropTypes.func.isRequired,
    getEditableScheduling: PropTypes.func.isRequired,

    addScheduling: PropTypes.func.isRequired,
    // editScheduling: PropTypes.func.isRequired,
    deleteScheduling: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    confirmDialog: null,
    serviceDiode: {
      loading: true,
      error: null,
      data: null,
      isSaved: null
    }
  };

  promiseToDiode = () => {
    this.props
      .getServiceData()
      .then(data =>
        this.setState({
          serviceDiode: { loading: false, data },
          errors: null
        })
      )
      .catch(error => this.setState({ serviceDiode: { loading: false, error: error } }));
  };

  componentDidMount = () => this.promiseToDiode();

  revertToServer = () => this.promiseToDiode();

  onFail = reason => {
    alert(reason);
    return null;
  };

  handleSave = updatedService =>
    new Promise((resolve, reject) =>
      this.setState({
        confirmDialog: (
          <ConfirmDialog
            maxWidth="md"
            headerTitle={this.props.t("areYouSure")}
            dialogMessage={this.props.t(
              "saveChangesToService",
              this.state.serviceDiode.data.service
            )}
            onConfirm={resolve}
            onCancel={() => reject(null)}
          />
        )
      })
    )
      .then(_ => {
        this.setState({ confirmDialog: null });
        return this.props.handleUpdateService(updatedService.toScala());
      })
      .catch(errors => {
        this.setState({ confirmDialog: null });
        throw errors;
      });

  renderForm = diodeData => () => {
    const {
      searchableVersions,
      searchableSchedule,
      getEmptyScheduling,
      getEditableScheduling,
      addScheduling,
      editScheduling,
      deleteScheduling,
      classes
    } = this.props;

    const { confirmDialog } = this.state;

    return (
      <div className={classes.pageContent}>
        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <ServiceSettingsForm
              service={diodeData.service}
              serviceVersionNumber={diodeData.versionNumber}
              searchableVersions={searchableVersions}
              searchableSchedule={searchableSchedule}
              getEmptyScheduling={getEmptyScheduling}
              getEditableScheduling={getEditableScheduling}
              addScheduling={addScheduling}
              editScheduling={editScheduling}
              deleteScheduling={deleteScheduling}
              onSave={this.handleSave}
              onCancel={this.revertToServer}
            />
            {confirmDialog}
          </div>
        </Grid>
      </div>
    );
  };

  render = () => {
    const { serviceDiode } = this.state;
    return (
      <Pending
        content={serviceDiode}
        onResponse={this.renderForm(serviceDiode.data)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "ManageServiceSettings" })(
  translate("services")(ManageServiceSettings)
);
