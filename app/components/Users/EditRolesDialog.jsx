/**
 * Modified by Sajid U. / Sept-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withWidth } from "@material-ui/core";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter, GroupSelector } from "components";
import { RoleRow } from "components/Security";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Users/EditRolesDialog";

class EditRolesDialog extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    getAssignableRoles: PropTypes.func.isRequired,
    getEffectiveRoles: PropTypes.func.isRequired,
    getPermissionSets: PropTypes.func.isRequired,
    getCompositeRoles: PropTypes.func.isRequired,
    //roles: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    roles: [] /*this.props.roles*/,
    effectiveRoles: [],
    roleRoles: [],
    availableRoles: []
  };

  handleToggleSearch = () => this.setState({ isSearchActive: !this.state.isSearchActive });

  handleSearchChange = event => this.setState({ searchString: event.target.value });

  isRoleSelected = role => this.state.roles.findIndex(r => r === role) !== -1;

  handleToggleRole = role => event => {
    event.stopPropagation();

    const roles = this.isRoleSelected(role)
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

  getSetName = role => (role.set && role.set.name ? role.set.name : "No Set");

  handleClearAll = () => this.setState({ roles: [], effectiveRoles: [] });

  handleSave = () => {
    this.props.onChange(this.state.roles);
    this.props.onClose();
  };

  getRoleRoles = role => this.props.getCompositeRoles(role.id);

  componentWillMount = () => {
    this.setState({
      availableRoles: this.props.getAssignableRoles(),
      permissionSets: this.props.getPermissionSets()
    });
  };

  // Dialog Header
  dialogHeader = (onClose, t) => (
    <HubbubDialogHeader
      icon={false}
      headerVariation="grey"
      onClose={onClose}
      headerTitle={t("addRoles")}
    />
  );

  // Dialog Content
  dialogContent = (availableRoles, effectiveRoles, permissionSets, RoleRow, t) => (
    <GroupSelector
      availableItemsHeading={t("availableRoles")}
      availableItems={availableRoles}
      availableItemsSets={permissionSets}
      seclectedItemsHeading={t("selectedRoles")}
      isItemSelected={this.isRoleSelected}
      effectiveItemsHeading={t("effectiveRoles")}
      effectiveItems={effectiveRoles}
      searchBy={["name", "description", "permissionSetName"]}
      handleToggleItem={this.handleToggleRole}
      itemItemsHeading={t("roleRoles")}
      getItemItems={this.getRoleRoles}
      handleClearAll={this.handleClearAll}
      RowElement={RoleRow}
      stretchingLayout
    />
  );

  // Dialog Footer
  dialogFooter = onClose => <HubbubDialogFooter onClose={onClose} onConfirm={this.handleSave} />;

  render = () => {
    const { classes, onClose, width, t } = this.props;
    const { effectiveRoles, availableRoles, permissionSets } = this.state;
    const fullScreen = width === "sm" || width === "xs";

    // add/inject permissionSetName to availableRoles
    availableRoles.forEach(r => (r.permissionSetName = this.getSetName(r)));

    return (
      <HubbubDialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        dialogHeader={this.dialogHeader(onClose, t)}
        dialogContent={this.dialogContent(
          availableRoles,
          effectiveRoles,
          permissionSets,
          RoleRow,
          t
        )}
        dialogFooter={this.dialogFooter(onClose)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "EditRolesDialog" })(translate("security")(EditRolesDialog))
);
