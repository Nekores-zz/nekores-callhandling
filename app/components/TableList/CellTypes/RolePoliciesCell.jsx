/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TableListCellWrapper, Text } from "components";
import { PolicyInfo } from "components/Security";

class RolePoliciesCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired
  };

  render = () => {
    const { rowData: policy, ...props } = this.props;

    return (
      <TableListCellWrapper {...props}>
        <Text>
          <PolicyInfo policy={policy} />
        </Text>
      </TableListCellWrapper>
    );
  };
}

export default RolePoliciesCell;
