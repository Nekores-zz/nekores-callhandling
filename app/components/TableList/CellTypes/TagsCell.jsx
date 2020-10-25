/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - sep-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Chip, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { styleSheet } from "jss/components/TableList/CellTypes/TagsCell";

class TagsCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired
  };

  render = () => {
    const { rowData, args, classes, ...props } = this.props;

    const tags = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        {tags.map((item, index) => (
          <Chip key={index} label={item} className={classes.chip} />
        ))}
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "TagsCell" })(TagsCell);
