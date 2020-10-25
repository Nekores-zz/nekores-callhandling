/**
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 *  Author: 4ητonio Prατєs [antonioprates@gmail.com], may-2018 - sep-2019
 * No need to refactor this Dialog Module, Coz, it is not used anywhere. #Sajid U.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  withStyles
} from "@material-ui/core";
import { ConfirmButtons, ListAvatar } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Services/Dialogs";

class ServiceVersionDialog extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    versionsList: PropTypes.array.isRequired,
    currentVersion: PropTypes.object,
    newVersionId: PropTypes.any, // of type versionId

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  getVersionData = (versions, id) => versions.find(v => v.id === id);

  render = () => {
    const {
      onConfirm,
      onCancel,
      versionsList,
      currentVersion,
      newVersionId,

      classes,
      t
    } = this.props;

    const newVersionData = this.getVersionData(versionsList, newVersionId);

    return (
      <Dialog fullScreen={false} open={true} onClose={this.handleClose}>
        <DialogTitle>{t("areYouSureChangeVersion", currentVersion.versionNumber)}</DialogTitle>

        <DialogContent>
          <Divider />
          <div className={classes.versionItem}>
            <div className={classes.versionAvatar}>
              <ListAvatar
                color={newVersionData.id}
                label={"V" + newVersionData.versionNumber.majorVersion}
              />
            </div>
            <div className={classes.versionLabel}>
              <Typography className={classes.versionName}>
                {t("versionName", newVersionData.versionNumber)}
              </Typography>
              <Typography className={classes.versionTags}>
                {newVersionData.tags.join(", ")}
              </Typography>
            </div>
          </div>
          <Divider />
        </DialogContent>

        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("yes")}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </Dialog>
    );
  };
}

export default withStyles(styleSheet, { name: "ServiceVersionDialog" })(
  translate("services")(ServiceVersionDialog)
);
