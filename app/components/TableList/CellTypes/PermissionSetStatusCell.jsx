/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TableListCellWrapper } from "components";
import { PermissionSetStatus } from "components/Security";

class PermissionStatusCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired
  };

  render = () => {
    const { rowData, args, ...props } = this.props;

    const status = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        <PermissionSetStatus status={status} />
      </TableListCellWrapper>
    );
  };
}

export default PermissionStatusCell;
