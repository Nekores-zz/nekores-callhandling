import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import TableListCell from "./TableListCell";
import { styleSheet } from "jss/components/TableList/TableListColumnHead";

class TableListColumnHead extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    classes: PropTypes.object.isRequired,
    headerVariation: PropTypes.string // "blue", "darkblue"
  };

  render = () => {
    const { children, headerVariation, classes, ...props } = this.props;
    return (
      <TableListCell
        className={
          ["blue", "darkblue"].includes(headerVariation)
            ? clsx(classes[headerVariation + "ColumnHead"], classes.commonStyleColumnHead)
            : clsx(classes.default, classes.commonStyleColumnHead)
        }
        {...props}
      >
        {children}
      </TableListCell>
    );
  }
}

export default withStyles(styleSheet, { name: "TableListColumnHead" })(TableListColumnHead);
