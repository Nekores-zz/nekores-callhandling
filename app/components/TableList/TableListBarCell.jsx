import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/TableListBarCell";

class TableListBarCell extends PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { isVisible, classes } = this.props;
    return (
      <td className={classes.cell}>
        {isVisible ? <div className={classes.bar} /> : null}
      </td>
    );
  }
}

export default withStyles(styleSheet, { name: "TableListBarCell" })(
  TableListBarCell
);
