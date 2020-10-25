/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Grid } from "@material-ui/core";
import { AvatarBadage, ListAvatar, TableListCellWrapper } from "components";
import CellAvatarWrapper from "./CellAvatarWrapper";

class AvatarTwoLinesCell extends PureComponent {
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

    const itemId = rowData[args[0]];
    const name = rowData[args[1]];
    const description = rowData[args[2]];
    const hasBadages = args.length === 4;
    const badage = hasBadages ? rowData[args[3]] : "";

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
            <>
              <ListAvatar color={itemId} name={name} />
              {hasBadages ? <AvatarBadage badageName={badage} /> : null}
            </>
          </CellAvatarWrapper>

          <Grid item>
            <Typography>{name}</Typography>
            <Typography variant="caption">{description}</Typography>
          </Grid>
        </Grid>
      </TableListCellWrapper>
    );
  };
}

export default AvatarTwoLinesCell;
