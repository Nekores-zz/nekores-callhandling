/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import { TableListCellWrapper } from "components";

class SpacerCell extends PureComponent {
  render = () => <TableListCellWrapper padding="none" {...this.props} />;
}

export default SpacerCell;
