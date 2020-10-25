import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, Table, TableHead, TableBody } from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/TableList";

class TableList extends PureComponent {
  static propTypes = {
    head: PropTypes.any,
    children: PropTypes.any,
    classes: PropTypes.object.isRequired,
    headerVariation: PropTypes.string
  };

  render() {
    const { head, children, classes, headerVariation } = this.props;
    return (
      <Table>
        {head ? (
          <Fragment>
            {headerVariation ? (
              <TableHead className={`${classes.headerVariation} HeaderVariation`}>{head}</TableHead>
            ) : (
              <TableHead>{head}</TableHead>
            )}
          </Fragment>
        ) : null}
        <TableBody>{children}</TableBody>
      </Table>
    );
  }
}

export default withStyles(styleSheet, { name: "TableList" })(TableList);
