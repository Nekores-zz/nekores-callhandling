/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Grid } from "@material-ui/core";
import { ListAvatar, TableListCellWrapper } from "components";
import { translate } from "react-i18next";
import CellAvatarWrapper from "./CellAvatarWrapper";

class AvatarServiceSchedulingCell extends PureComponent {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.array.isRequired,
    hidden: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isHover: PropTypes.bool.isRequired,
    isSelectionMode: PropTypes.bool.isRequired,
    isMobileLayout: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func,
    fixedWidth: PropTypes.object,

    t: PropTypes.func.isRequired
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
      fixedWidth,

      t
    } = this.props;

    const itemId = rowData[args[0]];
    const versionNumber = rowData[args[1]];
    const tags = rowData[args[2]];

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
            <ListAvatar color={itemId} label={"V" + versionNumber.majorVersion} />
          </CellAvatarWrapper>

          <Grid item>
            <Typography>{t("versionName", versionNumber)}</Typography>
            <Typography variant="caption">{tags && tags.join(", ")}</Typography>
          </Grid>
        </Grid>
      </TableListCellWrapper>
    );
  };
}

export default translate("services")(AvatarServiceSchedulingCell);
