/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - sep-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Hidden, withStyles } from "@material-ui/core";

import { TableListCell } from "components";
import { styleSheet } from "jss/components/TableList/TableListCellWrapper";

class TableListCellWrapper extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    hidden: PropTypes.bool,
    fixedWidth: PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  render = () => {
    const { className, children, hidden, fixedWidth, isSelected, isHover, classes } = this.props;

    const cell = (
      <TableListCell
        style={fixedWidth}
        className={clsx(
          className,
          classes.noSelect,
          isSelected || isHover ? classes.selected : null
        )}
      >
        {children}
      </TableListCell>
    );

    return !!hidden ? <Hidden smDown>{cell}</Hidden> : cell;
  };
}

export default withStyles(styleSheet, { name: "TableListCellWrapper" })(TableListCellWrapper);
