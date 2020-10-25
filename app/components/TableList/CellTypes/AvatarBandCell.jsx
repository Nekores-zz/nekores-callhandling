/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, Grid, withStyles } from "@material-ui/core";
import { ListAvatar, TableListCellWrapper } from "components";
import { styleSheet } from "jss/components/TableList/CellTypes/SimpleMenuCell";
import CellAvatarWrapper from "./CellAvatarWrapper";
import { bandTypes } from "utils/bands";

class AvatarBandCell extends PureComponent {
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

    classes: PropTypes.object.isRequired
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

      classes
    } = this.props;

    const number = rowData[args[0]];
    const band = rowData[args[1]];

    const newNumber = number.toString().split(" "); // TODO: This might need some review
    const isFirstIndexBold = args[2];

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
            <ListAvatar
              // in this particular case we will force the color with style prop
              style={{ backgroundColor: bandTypes[band].color }}
              label={bandTypes[band].icon}
            />
          </CellAvatarWrapper>

          <Grid item>
            {isFirstIndexBold === "isFirstIndexBold" ? (
              <Typography className={classes.noWarp}>
                <b style={{ fontWeight: "600" }}>{newNumber[0]}</b> {newNumber[1]} {newNumber[2]}
              </Typography>
            ) : (
              <Typography className={classes.noWarp}>{number}</Typography>
            )}
          </Grid>
        </Grid>
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "AvatarBandCell" })(AvatarBandCell);
