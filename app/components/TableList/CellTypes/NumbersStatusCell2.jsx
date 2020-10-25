/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Typography, Icon, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/CellTypes/StatusCell";

class NumbersStatusCell2 extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render = () => {
    const { rowData, args, classes, t, ...props } = this.props;

    // either displays "Service Name" or "Available" if not bound to any
    const status = rowData[args[0]];
    const serviceName = rowData[args[1]];

    return (
      <TableListCellWrapper {...props}>
        {status === "Available" ? (
          <Typography className={clsx(classes.noWarp, classes.versionStatusCellG)}>
            <Icon className={classes.versionStatusIconG}>done</Icon>
            {t(status)}
          </Typography>
        ) : (
          <Typography className={clsx(classes.noWarp, classes.versionStatusCellDL)}>
            <Icon className={classes.versionStatusIconDL}>flash_on</Icon>
            {serviceName}
          </Typography>
        )}
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "NumbersStatusCell2" })(
  translate("celltypes")(NumbersStatusCell2)
);
