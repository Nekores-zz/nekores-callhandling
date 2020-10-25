/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - sep-2019
 */
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/CellTypes/SimpleTextCell";

class UpdatedAtTwoLinesCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render = () => {
    const { rowData, args, classes, t, ...props } = this.props;

    const updatedAt = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        {updatedAt.updatedAt ? (
          <Fragment>
            <Typography className={classes.darkGray}>
              {updatedAt.firstName + " " + updatedAt.lastName}
            </Typography>
            <Typography variant="caption">
              {t("updatedAt", { date: ScalaDate.tsToDate(updatedAt.updatedAt) })}
            </Typography>
          </Fragment>
        ) : null}
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "UpdatedAtTwoLinesCell" })(
  translate("celltypes")(UpdatedAtTwoLinesCell)
);
