/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Icon, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/CellTypes/ExceptionSettingsCell";

class SchedulingSettingsCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render = () => {
    const { rowData, args, classes, t, ...props } = this.props;

    const isException = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        {isException ? (
          <Typography className={classes.exceptionText}>
            <Icon className={classes.exceptionIcon}>flag</Icon>
            {t("exception")}
          </Typography>
        ) : (
          <Typography className={classes.defaultText}>
            <Icon className={classes.defaultIcon}>fiber_manual_record</Icon>
            {t("default")}
          </Typography>
        )}
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "SchedulingSettingsCell" })(
  translate("celltypes")(SchedulingSettingsCell)
);
