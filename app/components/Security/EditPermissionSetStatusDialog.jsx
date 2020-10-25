import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components/Dialogs";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  withStyles,
  withWidth
} from "@material-ui/core";
import {
  ConfirmButtons,
  Text,
  TextField,
  Tooltip,
  TooltipContent,
  TooltipTarget,
  WarningMessage
} from "components";
import { PermissionSet } from "models";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/EditPermissionSetStatusDialog";

class EditPermissionSetStatusDialog extends Component {
  static propTypes = {
    permissionSet: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    status: this.props.permissionSet.status
  };

  handleChange = event => this.setState({ status: event.target.value });

  handleSave = () => this.props.onSave(this.state.status);

  render() {
    const { onClose, classes, t } = this.props;

    return (
      <HubbubDialog
        open={true}
        onClose={onClose}
        dialogHeader={
          <HubbubDialogHeader
            maxWidth="md"
            icon={false}
            onClose={onClose}
            headerTitle={t("editPolicies")}
          />
        }
        dialogContent={
          <>
            <Text block>
              {t("aSetCanBe") + " "}
              <Tooltip
                content={
                  <TooltipContent
                    title={t(PermissionSet.statuses.active)}
                    text={t("permissionSetActiveStatus")}
                  />
                }
              >
                <TooltipTarget>{t(PermissionSet.statuses.active)}</TooltipTarget>
              </Tooltip>
              {", "}
              <Tooltip
                content={
                  <TooltipContent
                    title={t(PermissionSet.statuses.available)}
                    text={t("permissionSetAvailableStatus")}
                  />
                }
              >
                <TooltipTarget>{t(PermissionSet.statuses.available)}</TooltipTarget>
              </Tooltip>
              {" " + t("or") + " "}
              <Tooltip
                content={
                  <TooltipContent
                    title={t(PermissionSet.statuses.disabled)}
                    text={t("permissionSetDisabledStatus")}
                  />
                }
              >
                <TooltipTarget>{t(PermissionSet.statuses.disabled)}</TooltipTarget>
              </Tooltip>
            </Text>
            <TextField
              select
              onChange={this.handleChange}
              value={this.state.status}
              name="status"
              label={t("setStatus")}
              className={clsx(classes.marginBottomSmall)}
              fullWidth
              required
            >
              {Object.values(PermissionSet.statuses).map(status => (
                <MenuItem key={status} value={status}>
                  {t(status)}
                </MenuItem>
              ))}
            </TextField>

            {this.state.status === PermissionSet.statuses.active ? (
              <WarningMessage>
                {t("changeSetToActiveWarning1")}{" "}
                <Text variant="bold">{t(PermissionSet.statuses.active)}</Text>{" "}
                {t("changeSetToActiveWarning2")}
              </WarningMessage>
            ) : null}
          </>
        }
        dialogFooter={
          <HubbubDialogFooter onConfirm={this.handleSave} onCancel={this.props.onClose} />
        }
      />
    );
  }
}

export default withWidth()(
  withStyles(styleSheet, { name: "EditPermissionSetStatusDialog" })(
    translate("security")(EditPermissionSetStatusDialog)
  )
);
