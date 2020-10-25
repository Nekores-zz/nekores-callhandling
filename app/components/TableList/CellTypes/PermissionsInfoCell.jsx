/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TableListCellWrapper } from "components";
import { PermissionsInfo } from "components/Security";

class PermissionsInfoCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired
  };

  render = () => {
    const { rowData: permission, ...props } = this.props;

    return (
      <TableListCellWrapper {...props}>
        <PermissionsInfo permission={permission} {...permission.props} />
      </TableListCellWrapper>
    );
  };
}

export default PermissionsInfoCell;
