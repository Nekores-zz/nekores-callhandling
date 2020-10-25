/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { styleSheet } from "jss/components/TableList/CellTypes/SimpleTextCell";
import { TableListBarCell } from "components";

class BarCell extends PureComponent {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    isMobileLayout: PropTypes.bool.isRequired,
    isHover: PropTypes.bool.isRequired
  };

  render = () => {
    const { isSelected, isMobileLayout, isHover } = this.props;

    return (
      <TableListBarCell
        isVisible={isSelected || (!isMobileLayout && isHover)}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "BarCell" })(BarCell);
