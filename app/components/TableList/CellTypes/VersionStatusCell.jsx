/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - sep-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TableListCellWrapper } from "components";
import { ServiceVersionStatus } from "components/Services/ServiceElements";

class VersionStatusCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired
  };

  render = () => {
    const { rowData, args, ...props } = this.props;

    const status = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        <ServiceVersionStatus status={status} />
      </TableListCellWrapper>
    );
  };
}

export default VersionStatusCell;
