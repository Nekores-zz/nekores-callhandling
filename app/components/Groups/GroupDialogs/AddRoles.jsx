/**
 * by A. Prates, feb-2019
 * Modified by: Sajid U. / Sept-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withWidth, withStyles } from "@material-ui/core";
import { GroupSelector } from "components";
import { RoleRow } from "components/Security/RowElements";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Groups/GroupDialogs/InviteMember";
import { HubbubDialog, HubbubDialogFooter, HubbubDialogHeader } from "../../Dialogs";

class AddRoles extends Component {
  static propTypes = {
    getAssignableRoles: PropTypes.func.isRequired,
    getEffectiveRoles: PropTypes.func.isRequired,
    getPermissionSets: PropTypes.func.isRequired,
    getCompositeRoles: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,

    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    roles: [],
    availableRoles: [],
    effectiveRoles: [],
    permissionSets: []
  };

  isSelectedRole = role => !!this.state.roles.find(r => r === role);

  handleToggleRole = role => event => {
    event.stopPropagation();

    const roles = this.isSelectedRole(role)
      ? this.state.roles.filter(g => g !== role)
      : [...this.state.roles, role];

    this.setState({ roles });

    if (roles.length === 0) {
      this.setState({ effectiveRoles: [] });
    } else {
      this.setState({
        effectiveRoles: this.props.getEffectiveRoles(roles.map(r => r.id))
      });
    }
  };

  handleClearAll = () => this.setState({ roles: [] });

  getSetName = role => (role.set && role.set.name ? role.set.name : "No Set");

  getRoleRoles = role => {
    return this.props.getCompositeRoles(role.id);
  };

  componentWillMount() {
    this.setState({
      availableRoles: this.props.getAssignableRoles(),
      permissionSets: this.props.getPermissionSets()
    });
  }

  // Dialog Header
  dialogHeader = (onCancel, t) => (
    <HubbubDialogHeader
      icon={false}
      headerVariation="default"
      onClose={onCancel}
      headerTitle={t("addRoles")}
    />
  );

  // Dialog Content
  dialogContent = (availableRoles, permissionSets, effectiveRoles, RoleRow, t) => (
    <GroupSelector
      availableItemsHeading={t("availableRoles")}
      availableItems={availableRoles}
      availableItemsSets={permissionSets}
      searchBy={["name", "description", "permissionSetName"]}
      seclectedItemsHeading={t("selectedRoles")}
      isItemSelected={this.isSelectedRole}
      effectiveItemsHeading={t("effectiveRoles")}
      effectiveItems={effectiveRoles}
      handleToggleItem={this.handleToggleRole}
      itemItemsHeading={t("roleRoles")}
      getItemItems={this.getRoleRoles}
      handleClearAll={this.handleClearAll}
      //isRequiredAll={anyOrAll}
      //handleToggleAnyOrAll={this.handleToggleAnyOrAll}
      RowElement={RoleRow}
      stretchingLayout
    />
  );

  // Dialog Footer
  dialogFooter = (onConfirm, roles, blocked, onCancel, fullScreen, t) => (
    <HubbubDialogFooter
      onConfirm={() => onConfirm([...roles])}
      blocked={blocked}
      onClose={onCancel}
      confirmLabel={!fullScreen || blocked ? t("add") : t("addCount", { count: roles.length })}
    />
  );

  render() {
    const { onCancel, onConfirm, width, t } = this.props;
    const { roles, availableRoles, permissionSets, effectiveRoles } = this.state;
    const fullScreen = width === "sm" || width === "xs";
    const blocked = roles.length === 0;

    // add/inject permissionSetName to availableRoles
    availableRoles.forEach(r => (r.permissionSetName = this.getSetName(r)));

    return (
      <HubbubDialog
        open={true}
        maxWidth="md"
        // - Dialog Header
        dialogHeader={this.dialogHeader(onCancel, t)}
        // - Dialog Content
        dialogContent={this.dialogContent(
          availableRoles,
          permissionSets,
          effectiveRoles,
          RoleRow,
          t
        )}
        // - Dialog Footer
        dialogFooter={this.dialogFooter(onConfirm, roles, blocked, onCancel, fullScreen, t)}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "AddRoles" })(
  withWidth()(translate("groups")(AddRoles))
);
