/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { translate } from "react-i18next";

class FromTwoLinesCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,

    t: PropTypes.func.isRequired
  };

  render = () => {
    const { rowData, args, t, ...props } = this.props;

    const createdBy = rowData[args[0]];

    return (
      <TableListCellWrapper {...props}>
        {createdBy ? (
          <Fragment>
            <Typography>{createdBy.firstName + " " + createdBy.lastName}</Typography>
            <Typography variant="caption">
              {t("from", { date: ScalaDate.tsToDate(createdBy.updatedAt) })}
            </Typography>
          </Fragment>
        ) : null}
      </TableListCellWrapper>
    );
  };
}

export default translate("celltypes")(FromTwoLinesCell);
