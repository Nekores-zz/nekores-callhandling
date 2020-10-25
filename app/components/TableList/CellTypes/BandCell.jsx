/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/CellTypes/BandCell";
import { TableListCellWrapper } from "components";
import { bandTypes } from "utils/bands";

class BandCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired
  };

  render = () => {
    const { rowData, args, classes, ...props } = this.props;

    const band = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        <div className={classes.root}>
          <div
            style={{ backgroundColor: `${bandTypes[band].color}` }}
            className={classes.bandCell}
          />
          <Typography className={classes.simpleText}>{bandTypes[band].name}</Typography>
        </div>
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "BandCell" })(BandCell);
