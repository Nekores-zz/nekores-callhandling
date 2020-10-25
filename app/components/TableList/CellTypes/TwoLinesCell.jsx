/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - sep-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { styleSheet } from "jss/components/TableList/CellTypes/SimpleTextCell";

class TwoLinesCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired
  };

  render = () => {
    const { rowData, args, classes, ...props } = this.props;

    const line1 = rowData[args[0]];
    const line2 = rowData[args[1]];

    return (
      <TableListCellWrapper {...props}>
        <Typography className={classes.darkGray}>{line1}</Typography>
        <Typography variant="caption" className={classes.rawText}>
          {line2}
        </Typography>
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "TwoLinesCell" })(TwoLinesCell);
