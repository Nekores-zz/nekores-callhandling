/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Icon, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { styleSheet } from "jss/components/TableList/CellTypes/StatusCell";
import { translate } from "react-i18next";

class NumbersStatusCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render = () => {
    const { rowData, args, classes, t, ...props } = this.props;

    const status = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        {status === "Available" ? (
          <Typography className={classes.versionStatusCellDL}>
            <Icon className={classes.versionStatusIconDL}>done</Icon>
            {t(status)}
          </Typography>
        ) : (
          <Typography className={classes.versionStatusCellG}>
            <Icon className={classes.versionStatusIconG}>shopping_basket</Icon>
            {t(status)}
          </Typography>
        )}
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "NumbersStatusCell" })(
  translate("celltypes")(NumbersStatusCell)
);
