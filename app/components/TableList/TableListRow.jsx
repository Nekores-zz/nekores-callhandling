import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, TableRow } from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/TableListRow";

class TableListRow extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    isSelected: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  render = () => {
    const { children, isSelected, className, classes, ...props } = this.props;

    return (
      <TableRow
        className={clsx(
          classes.shadowEmulatedRow,
          { [classes.shadowEmulatedRowSelected]: isSelected },
          className
        )}
        {...props}
      >
        {children}
      </TableRow>
    );
  };
}

export default withStyles(styleSheet, { name: "TableListRow" })(TableListRow);
