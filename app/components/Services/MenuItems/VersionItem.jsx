/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], oct-2019
 */
import React, { PureComponent } from "react";
import { MenuItem, Grid, Typography, withStyles } from "@material-ui/core";
import { ListAvatar } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/LayoutElements/SearchableChipSelector";

class VersionItem extends PureComponent {
  render = () => {
    const { key, item, handleSelect, classes, t } = this.props;

    return (
      <MenuItem key={key} onClick={handleSelect(item)} className={classes.listItem} divider>
        <Grid container direction="row" alignItems="center" spacing={24} wrap="nowrap">
          <Grid item>
            <ListAvatar color={item.id} label={"V" + item.versionNumber.majorVersion} />
          </Grid>
          <Grid item>
            <Typography>{t("versionName", item.versionNumber)}</Typography>
            <Typography variant="caption">{item.tags && item.tags.join(", ")}</Typography>
          </Grid>
        </Grid>
      </MenuItem>
    );
  };
}

export default withStyles(styleSheet, { name: "VersionItem" })(translate("services")(VersionItem));
