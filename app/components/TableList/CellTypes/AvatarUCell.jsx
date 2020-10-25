/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Grid } from "@material-ui/core";
import { ListAvatar, TableListCellWrapper } from "components";
import CellAvatarWrapper from "./CellAvatarWrapper";

class AvatarUCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,
    hidden: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isHover: PropTypes.bool.isRequired,
    isSelectionMode: PropTypes.bool.isRequired,
    isMobileLayout: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func,
    fixedWidth: PropTypes.object
  };

  render = () => {
    const {
      rowData,
      args,
      hidden,
      isSelected,
      isHover,
      isSelectionMode,
      isMobileLayout,
      handleToggle,
      fixedWidth
    } = this.props;

    const userId = rowData[args[0]];
    const firstName = rowData[args[1]];
    const lastName = rowData[args[2]];
    const email = rowData[args[3]];

    return (
      <TableListCellWrapper
        hidden={hidden}
        isSelected={isSelected}
        isHover={isHover}
        fixedWidth={fixedWidth}
      >
        <Grid container direction="row" alignItems="center" spacing={24} wrap="nowrap">
          <CellAvatarWrapper
            rowData={rowData}
            isSelected={isSelected}
            isHover={isHover}
            isSelectionMode={isSelectionMode}
            isMobileLayout={isMobileLayout}
            handleToggle={handleToggle}
          >
            <ListAvatar color={userId} name={firstName + " " + lastName} />
          </CellAvatarWrapper>

          <Grid item>
            <Typography>{firstName + " " + lastName}</Typography>
            <Typography variant="caption">{email}</Typography>
          </Grid>
        </Grid>
      </TableListCellWrapper>
    );
  };
}

export default AvatarUCell;
