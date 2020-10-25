import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withWidth
} from "@material-ui/core";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components/Dialogs";
import { ChipFacedePicker, SubmitButton, Text, GroupSelector } from "components";
import { PolicyRow } from "components/Security";
import { Permission } from "models";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/EditPoliciesDialog";

export const EditPoliciesDialog = withStyles(styleSheet, { name: "EditPoliciesDialog" })(
  translate("security")(
    class EditPoliciesDialog extends Component {
      static propTypes = {
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        selectedPolicies: PropTypes.array.isRequired,
        policies: PropTypes.object.isRequired,
        isOpen: PropTypes.bool.isRequired,
        classes: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired
      };

      state = {
        selectedPolicies: this.props.selectedPolicies
      };

      isSelectAll = () => {
        return !!this.state.selectedPolicies;
      };

      isSelected = policy => {
        return this.state.selectedPolicies.find(id => id === policy.id);
      };

      getSelected = () => {
        return this.state.selectedPolicies.map(id => this.props.policies[id]);
      };

      handleSelectAllChange = selectAll => (event, checked) => {
        let selectedPolicies = checked ? [] : undefined;
        this.setState({ selectedPolicies });
      };

      handleToggle = policy => event => {
        event.stopPropagation();
        let isSelected = this.isSelected(policy);
        let selectedPolicies = isSelected
          ? this.state.selectedPolicies.filter(id => policy.id !== id)
          : [policy.id, ...this.state.selectedPolicies];
        this.setState({ selectedPolicies });
      };

      handleClearAll = () => {
        let selectedPolicies = [];
        this.setState({ selectedPolicies });
      };

      handleSave = () => {
        this.props.onSave(this.state.selectedPolicies);
      };

      render() {
        let { policies, classes, isOpen, onClose, t } = this.props;
        let { selectedPolicies } = this.state;

        // TEMPORARY FIX: convert name to expected format
        for (let i in policies) {
          policies[i].getName = policies[i].name;
        }

        return (
          <HubbubDialog
            open={isOpen}
            onClose={onClose}
            maxWidth={"md"}
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
                <GroupSelector
                  availableItemsHeading={t("policies")}
                  availableItems={Object.values(policies)}
                  searchBy={["name", "description"]}
                  seclectedItemsHeading={t("assignedPolicies")}
                  isItemSelected={this.isSelected}
                  handleToggleItem={this.handleToggle}
                  handleClearAll={this.handleClearAll}
                  RowElement={PolicyRow}
                />
              </>
            }
            dialogFooter={<HubbubDialogFooter onClose={onClose} onConfirm={this.handleSave} />}
          />
        );
      }
    }
  )
);

export const EditPolicies = withWidth()(
  withStyles(styleSheet, { name: "EditPolicies" })(
    translate("security")(
      class EditPolicies extends Component {
        static propTypes = {
          selectedPolicies: PropTypes.array.isRequired,
          onChange: PropTypes.func.isRequired,
          policies: PropTypes.object.isRequired,
          classes: PropTypes.object.isRequired,
          t: PropTypes.func.isRequired
        };

        state = {
          dialog: null
        };

        handleEditPolicies = event => {
          this.editPoliciesDialog().then(
            polices => {
              this.setState({ dialog: null });
              this.props.onChange(polices);
            },
            () => {
              this.setState({ dialog: null });
            }
          );
        };

        editPoliciesDialog = () => {
          return new Promise((resolve, reject) => {
            const dialog = (
              <EditPoliciesDialog
                isOpen={true}
                onSave={resolve}
                onClose={reject}
                policies={this.props.policies}
                selectedPolicies={this.props.selectedPolicies}
              />
            );
            this.setState({ dialog });
          });
        };

        handleRemovePolicy = policy => event => {
          let policies = this.props.selectedPolicies.filter(id => id !== policy.id);
          this.props.onChange(policies);
        };

        getTextValue = (selectedPolicies, items) => {
          const { t } = this.props;
          return !!selectedPolicies
            ? t("countSelected", { count: selectedPolicies.length })
            : t("allSelected");
        };

        render() {
          let { policies, classes } = this.props;
          let selectedPolicies = this.props.selectedPolicies.map(id => policies[id]);

          for (let i in selectedPolicies) {
            selectedPolicies[i].getName = selectedPolicies[i].name;
          }

          return (
            <Fragment>
              <ChipFacedePicker
                label={""}
                textValue={this.getTextValue(selectedPolicies)}
                onClick={this.handleEditPolicies}
                onDelete={this.handleRemovePolicy}
                selectedItems={selectedPolicies}
                className={[classes.select, classes.fullWidth].join(" ")}
              />
              {this.state.dialog}
            </Fragment>
          );
        }
      }
    )
  )
);
