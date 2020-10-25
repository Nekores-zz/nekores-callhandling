import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, TableCell } from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/TableListCell";

class TableListCell extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  render = () => {
    const { children, className, classes, ...props } = this.props;

    return (
      <TableCell className={clsx(classes.cell, className)} {...props}>
        {children}
      </TableCell>
    );
  };
}

export default withStyles(styleSheet, { name: "TableListCell" })(TableListCell);
