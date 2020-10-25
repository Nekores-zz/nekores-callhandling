/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TableListCellWrapper, Text } from "components";
import { translate } from "react-i18next";

class RoleInfoCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,

    t: PropTypes.func.isRequired
  };

  render = () => {
    const { rowData: role, t, ...props } = this.props;
    let childrenCount = role.children.length;

    return (
      <TableListCellWrapper {...props}>
        {role.isComposite ? (
          <Text>
            {t("roleDescription", {
              count: childrenCount,
              role: t('role', {count: childrenCount})
            })}
          </Text>
        ) : null}
      </TableListCellWrapper>
    );
  };
}

export default translate("celltypes")(RoleInfoCell);
