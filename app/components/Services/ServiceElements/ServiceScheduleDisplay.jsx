/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - oct-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  AvatarServiceSchedulingCell,
  TimeDateCell,
  SchedulingSettingsCell,
  PrimaryTextButton,
  HubbubList,
  WarningMessage
} from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Services/ServiceElements";
import { DiodeSearchable } from "utils/commonShapes";

class ServiceScheduleDisplay extends Component {
  static propTypes = {
    schedule: DiodeSearchable.isRequired,
    addScheduling: PropTypes.func.isRequired,
    // editScheduling: PropTypes.func.isRequired,
    deleteScheduling: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  addScheduling = () => this.props.addScheduling();

  handleDeleteScheduling = row => this.props.deleteScheduling(row);

  listSchema = [
    {
      display: "flex",
      heading: "serviceVersion",
      args: ["serviceVersionId", "serviceVersionNumber", "serviceVersionTags"],
      render: AvatarServiceSchedulingCell,
      hidden: false
    },
    {
      display: "flex",
      heading: "startDate",
      args: ["startTime"],
      render: TimeDateCell,
      hidden: true
    },
    {
      display: "flex",
      heading: "endDate",
      args: ["endTime"],
      render: TimeDateCell,
      hidden: true
    },
    {
      display: "flex",
      heading: "settings",
      args: ["isException"],
      render: SchedulingSettingsCell,
      hidden: true
    },
    {
      display: "actions",
      args: [{ label: "delete", action: this.handleDeleteScheduling, icon: "delete" }],
      hidden: false
    }
  ];

  render = () => {
    const { schedule, addScheduling, classes, t } = this.props;

    return (
      <>
        <HubbubList
          className={classes.numbersTable}
          data={schedule.items}
          dataCount={schedule.itemsCount}
          isLoading={schedule.isLoading}
          schema={this.listSchema}
          getKeyFn={item => item.id}
          getActionPermission={(row, action) => true} // TODO: implement permission check
          headerVariation="blue" // "blue", "darkblue"
          t={t}
        />

        <br />

        {schedule.length > 99 ? (
          // maximum of 100 schedule rows allowed, we need to improve backend if we want to allow more
          // and provide a nice lazy loading support to HubbubList...
          <WarningMessage>{t("schedulingLimit")}</WarningMessage>
        ) : (
          <PrimaryTextButton onClick={addScheduling}>{t("addScheduling")}</PrimaryTextButton>
        )}
      </>
    );
  };
}

export default withStyles(styleSheet, { name: "ServiceScheduleDisplay" })(
  translate("services")(ServiceScheduleDisplay)
);
