/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TableListCellWrapper } from "components";
import { AccountStatus } from "components/Accounts";

class AccountStatusCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired
  };

  render = () => {
    const { rowData, args, ...props } = this.props;

    const status = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        <AccountStatus status={status.toLowerCase()} />
      </TableListCellWrapper>
    );
  };
}

export default AccountStatusCell;
