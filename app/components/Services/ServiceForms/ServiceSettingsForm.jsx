/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - sep-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import { ConfirmButtons, Text, TextField, SearchableChipSelector } from "components";
import {
  ServiceDateIntervalInput,
  ServiceScheduleDisplay
} from "components/Services/ServiceElements";
import { VersionItem } from "components/Services";
import { ServiceVersionDialog, EditSchedulingDialog } from "components/Services/ServiceDialogs";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Services/ManageService";
import { getDateTimeInterval, getTimeStampInterval } from "utils/date";
import { DiodeSearchable } from "utils/commonShapes";
import { getErrorProps } from "utils/errors";

class ServiceSettingsForm extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
    serviceVersionNumber: PropTypes.shape({
      majorVersion: PropTypes.number,
      minorVersion: PropTypes.number
    }),

    searchableVersions: DiodeSearchable.isRequired,

    searchableSchedule: DiodeSearchable.isRequired,

    getEmptyScheduling: PropTypes.func.isRequired,
    getEditableScheduling: PropTypes.func.isRequired,

    addScheduling: PropTypes.func.isRequired,
    // editScheduling: PropTypes.func.isRequired,
    deleteScheduling: PropTypes.func.isRequired,

    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    errors: null,

    service: this.props.service,
    serviceVersionNumber: this.props.serviceVersionNumber,

    changeVersionDialog: null,
    schedulingToEdit: null, // for adding/editing an scheduling
    schedulingVersionNumber: null // for adding/editing an scheduling
  };

  confirmVersion = (versionId, serviceVersionNumber) => () => {
    const service = this.state.service.setDefaultVersionId(versionId);
    this.setState({ service, serviceVersionNumber, changeVersionDialog: null });
  };

  handleVersionChange = event => {
    const newVersionId = event.target.value.id;
    const newVersionNumber = event.target.value.versionNumber;

    // short-circuit: currentVersion not defined, confirm without displaying dialog
    if (!this.state.service.defaultVersionId)
      return this.confirmVersion(newVersionId, newVersionNumber)();

    // short-circuit: currentVersion is same as newVersion, do nothing
    if (this.state.service.defaultVersionId === newVersionId) return;

    // else: confirm action with changeVersionDialog
    this.setState({
      changeVersionDialog: (
        <ServiceVersionDialog
          onConfirm={this.confirmVersion(newVersionId, newVersionNumber)}
          onCancel={() => this.setState({ changeVersionDialog: null })}
          versionsList={this.props.searchableVersions.items}
          currentVersion={
            this.state.service.defaultVersionId
              ? {
                  id: this.state.service.defaultVersionId,
                  versionNumber: this.state.serviceVersionNumber
                }
              : null
          }
          newVersionId={newVersionId}
        />
      )
    });
  };

  buildSelectedVersionFromState = () =>
    this.state.service.defaultVersionId && this.state.serviceVersionNumber
      ? {
          id: this.state.service.defaultVersionId,
          name: this.props.t("versionName", this.state.serviceVersionNumber)
        }
      : null;

  addScheduling = () =>
    this.setState({
      schedulingToEdit: this.props.getEmptyScheduling().setServiceId(this.props.service.id),
      schedulingVersionNumber: null,
      showAddSchedulingDialog: true
    });

  editScheduling = row => {
    const schedulingProps = this.props.getEditableScheduling(row);
    this.setState({ ...schedulingProps, showEditSchedulingDialog: true });
  };

  editSchedulingConfirm = schedulingData => _ =>
    this.state.showAddSchedulingDialog
      ? this.props.addScheduling(schedulingData.toScala())
      : this.props.editScheduling(schedulingData.toScala());

  closeScheduling = () =>
    this.setState({
      schedulingToEdit: null,
      showAddSchedulingDialog: false,
      showEditSchedulingDialog: false
    });

  handleChange = setter => event => {
    const service = setter(event.target.value);
    this.setState({ service, changeVersionTo: null }); // force close change version dialog
  };

  updateDateTimeInterval = event => {
    const dateInterval = getTimeStampInterval(
      event.target.value.startDateTime,
      event.target.value.endDateTime
    );
    const service = this.state.service
      .setStartTime(dateInterval.startDateTime)
      .setEndTime(dateInterval.endDateTime);
    this.setState({ service });
  };

  handleSave = service => () => this.props.onSave(service);

  deleteScheduling = scheduling => this.props.deleteScheduling(scheduling.id);

  handleCancel = () => this.props.onCancel();

  render = () => {
    const { searchableVersions, searchableSchedule, classes, t } = this.props;
    const { service, changeVersionDialog, errors } = this.state;

    const checkError = getErrorProps(t, errors);

    return (
      <Paper elevation={4} className={classes.paper}>
        <div className={classes.internalForm}>
          <TextField
            value={service.name}
            onChange={this.handleChange(service.setName)}
            className={classes.textField}
            label={t(service.fieldName)}
            error={checkError(service.fieldName).error}
            helperText={checkError(service.fieldName).helperText}
            required
          />

          <br />
          <br />

          <TextField
            value={service.description}
            onChange={this.handleChange(service.setDescription)}
            className={classes.textField}
            label={t(service.fieldDescription)}
            error={checkError(service.fieldDescription).error}
            helperText={checkError(service.fieldDescription).helperText}
            multiline
          />

          <br />
          <br />
          <br />

          <ServiceDateIntervalInput
            value={getDateTimeInterval(service.startTime, service.endTime)}
            onChange={this.updateDateTimeInterval}
            error={
              checkError(service.fieldStartTime).error || checkError(service.fieldEndTime).error
            }
            helperText={
              checkError(service.fieldStartTime).helperText ||
              checkError(service.fieldEndTime).helperText
            }
          />

          <br />
          <br />
          <br />

          <SearchableChipSelector
            searchable={searchableVersions}
            className={classes.versionSelector}
            name="selectedVersion"
            label={t("defaultVersion")}
            value={this.buildSelectedVersionFromState()}
            emptyLabel={this.props.t("selectAVersion")}
            onChange={this.handleVersionChange}
            renderItemFn={(key, item, handleSelect) => (
              <VersionItem key={key} item={item} handleSelect={handleSelect} />
            )}
            oneValue
          />

          {changeVersionDialog}

          <br />
          <br />
          <br />

          <Text variant="sectionHeaders">{t("schedule")}</Text>

          <br />
          <br />

          <ServiceScheduleDisplay
            schedule={searchableSchedule}
            addScheduling={this.addScheduling}
            deleteScheduling={this.deleteScheduling}
          />

          {this.state.showAddSchedulingDialog || this.state.showEditSchedulingDialog ? (
            <EditSchedulingDialog
              onConfirm={this.editSchedulingConfirm}
              closeDialog={this.closeScheduling}
              schedulingToEdit={this.state.schedulingToEdit}
              schedulingVersionNumber={this.state.schedulingVersionNumber}
              addMode={this.state.showAddSchedulingDialog}
              searchableVersions={this.props.searchableVersions}
            />
          ) : null}

          <br />
          <br />

          <ConfirmButtons
            onConfirm={this.handleSave(service)}
            onSuccess={_ => this.setState({ errors: null })}
            onFailure={errors => this.setState({ errors })}
            onCancel={this.handleCancel}
          />
        </div>
      </Paper>
    );
  };
}

export default withStyles(styleSheet, { name: "ServiceSettingsForm" })(
  translate("services")(ServiceSettingsForm)
);
