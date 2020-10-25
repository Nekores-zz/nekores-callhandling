/**
 * Modified by Sajid U. / Sept-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withWidth } from "@material-ui/core";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter, GroupSelector } from "components";
import { GroupListRow } from "components/Groups/RowElements";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Users/EditGroupsDialog";

class EditGroupsDialog extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    availableGroups: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    selectedItems: []
  };

  handleSave = () => {
    this.props.onClose();
  };

  isItemSelected = item => {
    return this.state.selectedItems.findIndex(i => i.id === item.id) !== -1;
  };

  handleToggleGroups = item => {
    if (!this.isItemSelected(item)) {
      this.setState({
        selectedItems: [...this.state.selectedItems, item]
      });
    } else {
      new Promise((resolve, reject) => {
        this.setState({
          selectedItems: this.state.selectedItems.filter(i => i.id !== item.id)
        });
        resolve({});
      });
    }
  };

  // Handle Clear all
  handleClearAll = () => {
    this.setState({
      selectedItems: []
    });
  };

  // Dialog Header
  dialogHeader = (onClose, t) => (
    <HubbubDialogHeader
      icon={false}
      headerVariation="grey"
      onClose={onClose}
      headerTitle={t("addGroups")}
    />
  );

  // Dialog Content
  dialogContent = (availableGroups, GroupListRow, t) => (
    <GroupSelector
      availableItemsHeading={t("availableGroupsCount", { count: availableGroups.length })}
      availableItems={availableGroups}
      searchBy={["name"]}
      seclectedItemsHeading={t("selectedGroups")}
      isItemSelected={this.isItemSelected}
      handleToggleItem={this.handleToggleGroups}
      getItemItems={() => {
        return selectedItems;
      }}
      handleClearAll={this.handleClearAll}
      RowElement={GroupListRow}
    />
  );

  // Dialog Footer
  dialogFooter = onClose => <HubbubDialogFooter onClose={onClose} onConfirm={this.handleSave} />;

  render = () => {
    const { availableGroups, classes, onClose, t } = this.props;

    return (
      <HubbubDialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        dialogHeader={this.dialogHeader(onClose, t)}
        dialogContent={this.dialogContent(availableGroups, GroupListRow, t)}
        dialogFooter={this.dialogFooter(onClose)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "EditGroupsDialog" })(translate("security")(EditGroupsDialog))
);
