import React, { Component } from "react";
import PropTypes from "prop-types";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components/Dialogs";
import {
  withStyles,
  withWidth,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Icon
} from "@material-ui/core";
import { Text, ListAvatar } from "components";
import { styleSheet } from "jss/Security/CreatePolicyDialog";
import { translate } from "react-i18next";

class CreatePolicyDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  handleSelect = type => event => {
    this.props.onClose(type);
  };

  render() {
    const { onClose, classes, t } = this.props;

    return (
      <HubbubDialog
        maxWidth="md"
        open={true}
        onClose={onClose}
        classDialogContent={classes.paddingNone}
        dialogHeader={
          <HubbubDialogHeader
            icon={false}
            headerVariation="grey"
            onClose={onClose}
            headerTitle={t("editPolicies")}
          />
        }
        dialogContent={
          <>
            <List className={classes.list}>
              <Divider />
              <ListItem divider button onClick={this.handleSelect("user")}>
                <ListItemAvatar>
                  <ListAvatar color={0}>
                    <Icon>assignment</Icon>
                  </ListAvatar>
                </ListItemAvatar>
                <ListItemText primary={t("userPolicy")} />
                <ListItemSecondaryAction>
                  <Icon>chevron_right</Icon>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem divider button onClick={this.handleSelect("role")}>
                <ListItemAvatar>
                  <ListAvatar color={1}>
                    <Icon>person</Icon>
                  </ListAvatar>
                </ListItemAvatar>
                <ListItemText primary={t("rolePolicy")} />
                <ListItemSecondaryAction>
                  <Icon>chevron_right</Icon>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem divider button onClick={this.handleSelect("aggregated")}>
                <ListItemAvatar>
                  <ListAvatar color={2}>A</ListAvatar>
                </ListItemAvatar>
                <ListItemText primary={t("aggregatedPolicy")} />
                <ListItemSecondaryAction>
                  <Icon>chevron_right</Icon>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </>
        }
      />
    );
  }
}

export default withWidth()(
  withStyles(styleSheet, { name: "CreatePolicyDialog" })(translate("security")(CreatePolicyDialog))
);
