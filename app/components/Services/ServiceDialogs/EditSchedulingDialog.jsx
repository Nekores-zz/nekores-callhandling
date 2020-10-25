/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - nov-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Radio,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  withStyles
} from "@material-ui/core";
import {
  SearchableChipSelector,
  HubbubDialog,
  HubbubDialogFooter,
  HubbubDialogHeader,
  Text
} from "components";
import { ServiceDateIntervalInput } from "../ServiceElements";
import { VersionItem } from "../MenuItems";
import { translate } from "react-i18next";
import { getDateTimeInterval, getTimeStampInterval } from "utils/date";
import { DiodeSearchable } from "utils/commonShapes";
import { getErrorProps } from "utils/errors";
import { styleSheet } from "jss/Services/ServiceDialogs/EditSchedulingDialog";

class EditSchedulingDialog extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    schedulingToEdit: PropTypes.object, // protocol
    schedulingVersionNumber: PropTypes.shape({
      majorVersion: PropTypes.number,
      minorVersion: PropTypes.number
    }),
    searchableVersions: DiodeSearchable,
    addMode: PropTypes.bool,
    hideVersion: PropTypes.bool,

    t: PropTypes.func.isRequired
  };

  state = {
    errors: null,
    schedulingToEdit: this.props.schedulingToEdit,
    schedulingVersionNumber: this.props.schedulingVersionNumber
  };

  updateDateTimeInterval = event => {
    const dateInterval = getTimeStampInterval(
      event.target.value.startDateTime,
      event.target.value.endDateTime
    );
    const schedulingToEdit = this.state.schedulingToEdit
      .setStartTime(dateInterval.startDateTime)
      .setEndTime(dateInterval.endDateTime);

    this.setState({ schedulingToEdit });
  };

  handleChangeIsException = value => _ =>
    this.setState({ schedulingToEdit: this.state.schedulingToEdit.setIsException(value) });

  getSelectedVersionFromState = () => {
    const { schedulingToEdit, schedulingVersionNumber } = this.state;
    const id = schedulingToEdit ? schedulingToEdit.serviceVersionId : null;
    return id ? { id, name: this.props.t("versionName", schedulingVersionNumber) } : null;
  };

  setSelectedVersion = event => {
    const version = event.target.value;
    const schedulingToEdit = this.state.schedulingToEdit.setServiceVersionId(
      version ? version.id : null
    );
    this.setState({
      schedulingToEdit,
      schedulingVersionNumber: version ? version.versionNumber : null
    });
  };

  versionSelector = checkError => (
    <>
      <SearchableChipSelector
        searchable={this.props.searchableVersions}
        className={this.props.classes.wideDialogElement}
        name="selectedVersion"
        value={this.getSelectedVersionFromState()}
        emptyLabel={this.props.t("selectAVersion")}
        onChange={this.setSelectedVersion}
        renderItemFn={(key, item, handleSelect) => (
          <VersionItem key={key} item={item} handleSelect={handleSelect} />
        )}
        oneValue
        error={checkError("serviceVersionId").error}
        helperText={checkError("serviceVersionId").helperText}
      />

      <br />
    </>
  );

  panelStyle = {
    main: {
      root: this.props.classes.expansionPanelRoot,
      expanded: this.props.classes.expanded
    },
    summary: {
      root: this.props.classes.expansionPanelSummaryRoot,
      content: this.props.classes.expansionPanelSummaryContent,
      expanded: this.props.classes.expanded
    },
    details: { root: this.props.classes.expansionPanelDetailsRoot }
  };

  scheduleOptionPanel = (schedulingToEdit, labelKey, asException, checkError) => (
    <ExpansionPanel
      square
      expanded={schedulingToEdit.isException === asException}
      onChange={this.handleChangeIsException(asException)}
      classes={this.panelStyle.main}
    >
      <ExpansionPanelSummary classes={this.panelStyle.summary}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <Radio checked={schedulingToEdit.isException === asException} />
          </Grid>
          <Grid item>
            <Text variant="primaryBody">{this.props.t(labelKey)}</Text>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={this.panelStyle.details}>
        <div className={this.props.classes.intervalWrapper}>
          <ServiceDateIntervalInput
            value={getDateTimeInterval(schedulingToEdit.startTime, schedulingToEdit.endTime)}
            onChange={this.updateDateTimeInterval}
            isStartDateRequired
            isEndDateRequired={asException}
            hideEndData={!asException}
            alternativeStartLabelKey={!asException ? "changeDefaultTo" : undefined}
            withoutWarning
            error={
              checkError(schedulingToEdit.fieldStartTime).error ||
              checkError(schedulingToEdit.fieldEndTime).error ||
              checkError("schedulingRange").error
            }
            helperText={
              checkError(schedulingToEdit.fieldStartTime).helperText ||
              checkError(schedulingToEdit.fieldEndTime).helperText ||
              checkError("schedulingRange").helperText
            }
          />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );

  dialogContent = (schedulingToEdit, checkError) => (
    <>
      {!this.props.hideVersionSelector && this.versionSelector(checkError)}

      {this.scheduleOptionPanel(schedulingToEdit, "addDefaultUpdate", false, checkError)}

      {this.scheduleOptionPanel(schedulingToEdit, "addAnException", true, checkError)}
    </>
  );

  render = () => {
    const { onConfirm, addMode, closeDialog, t } = this.props;

    const { schedulingToEdit, errors } = this.state;

    const checkError = getErrorProps(t, errors);

    return (
      <HubbubDialog
        open={true}
        maxWidth="md"
        dialogHeader={
          <HubbubDialogHeader
            headerVariation="grey"
            headerTitle={addMode ? t("addToSchedule") : t("editScheduling")}
            onClose={closeDialog}
          />
        }
        dialogContent={this.dialogContent(schedulingToEdit, checkError)}
        dialogFooter={
          <HubbubDialogFooter
            confirmLabel={addMode ? t("add") : t("done")}
            onConfirm={onConfirm(schedulingToEdit)}
            onSuccess={_ => this.setState({ errors: null }, closeDialog)}
            onFailure={errors => this.setState({ errors })}
            onClose={closeDialog}
          />
        }
      />
    );
  };
}

export default withStyles(styleSheet, { name: "EditSchedulingDialog" })(
  translate("services")(EditSchedulingDialog)
);
