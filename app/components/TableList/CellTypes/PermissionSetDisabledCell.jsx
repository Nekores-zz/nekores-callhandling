/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Icon, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { Row, PrimaryText } from "components/Elements";

class PermissionSetDisabledCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired
  };

  render = () => {
    let { t, rowData, args, ...props } = this.props;

    let isEnabled = rowData[args[0]];
    let isOwn = rowData[args[1]];

    return (
      <TableListCellWrapper {...props}>
        {isEnabled ? null : <Row>
          <Icon fontSize='small'>block</Icon> 
          &nbsp;
          <PrimaryText>
            {t(isOwn ? 'disabledOnAllAccounts' : 'disabledByOwner')}
          </PrimaryText>
        </Row>}
      </TableListCellWrapper>
    );
  };
}

export default translate('security') (PermissionSetDisabledCell);
