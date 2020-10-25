/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - sep-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { styleSheet } from "jss/components/TableList/CellTypes/SimpleTextCell";

class TextCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired
  };

  render = () => {
    const { rowData, args, classes, ...props } = this.props;

    const text = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        <Typography className={classes.rawText}>{text}</Typography>
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "TextCell" })(TextCell);
