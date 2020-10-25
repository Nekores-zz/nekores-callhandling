import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components/Dialogs";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  withStyles,
  withWidth
} from "@material-ui/core";
import { ConfirmButtons, GroupSelector, Text } from "components";
import { Field, FieldText, SecondaryText, SmallText, FieldChip } from "components/Elements";
import { ActionRow } from "components/Security";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/EditActionsDialog";
import { Action, SelectedIds } from "models";

export const EditActionsDialog = withWidth()(
  withStyles(styleSheet, { name: "EditActionsDialog" })(
    translate("security")(
      class EditActionsDialog extends Component {
        static propTypes = {
          onSave: PropTypes.func.isRequired,
          onClose: PropTypes.func.isRequired,
          selectedActions: SelectedIds.propType,
          excludedActions: SelectedIds.propType,
          actions: PropTypes.objectOf(Action.propType).isRequired,
          isOpen: PropTypes.bool.isRequired,
          classes: PropTypes.object.isRequired,
          t: PropTypes.func.isRequired
        };

        state = {
          selectedActions: this.props.selectedActions,
          excludedActions: this.props.excludedActions,
          isSearchActive: false,
          searchString: ""
        };

        handleToggleSearch = isSearchActive => this.setState({ isSearchActive });

        handleSearchChange = searchString => this.setState({ searchString });

        handleSave = () => {
          let { selectedActions, excludedActions } = this.state;
          this.props.onSave({ selectedActions, excludedActions });
        };

        handleSelectAll = () => {
          this.setState({
            selectedActions: undefined
          });
        };

        handleExclude = () => {
          this.setState({
            excludedActions: this.state.excludedActions ? undefined : []
          });
        };

        handleConfigure = () => {
          this.setState({
            selectedActions: this.state.selectedActions || [],
            excludedActions: undefined
          });
        };

        render = () => {
          const { isOpen, onClose, actions, classes, width, t } = this.props;
          let { selectedActions, excludedActions } = this.state;
          const fullScreen = width === "sm" || width === "xs";

          return (
            <HubbubDialog
              fullScreen={fullScreen}
              maxWidth="md"
              open={isOpen}
              onClose={onClose}
              dialogHeader={
                <HubbubDialogHeader
                  onClose={onClose}
                  headerVariation="grey"
                  headerTitle={t("actions")}
                />
              }
              dialogContent={
                <>
                  <div className={classes.selectAllOptions}>
                    <RadioGroup>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={!selectedActions}
                            color="secondary"
                            className={classes.selectAllOption}
                          />
                        }
                        onClick={this.handleSelectAll}
                        label={t("selectAll")}
                      />

                      <FormControlLabel
                        className={classes.subOption}
                        classes={{ label: classes.label }}
                        control={
                          <Checkbox
                            checked={!selectedActions && !!excludedActions}
                            onChange={this.handleExclude}
                            value={"hasExcluded"}
                          />
                        }
                        label={t("excludeActions")}
                        disabled={!!selectedActions}
                      />

                      <FormControlLabel
                        control={
                          <Radio
                            checked={!!selectedActions}
                            color="secondary"
                            className={classes.selectAllOption}
                          />
                        }
                        onClick={this.handleConfigure}
                        label={t("configure")}
                      />
                    </RadioGroup>
                  </div>
                  {(!!selectedActions && (
                    <GroupSelector
                      availableItemsHeading={t("actions")}
                      availableItems={Object.values(actions)}
                      searchBy={["name"]}
                      seclectedItemsHeading={t("assignedActions")}
                      isItemSelected={action => SelectedIds.isSelected(selectedActions, action.id)}
                      handleToggleItem={action => (event, checked) =>
                        this.setState({
                          selectedActions: SelectedIds.toggle(selectedActions, action.id)
                        })}
                      handleClearAll={() =>
                        this.setState({
                          selectedActions: []
                        })
                      }
                      RowElement={ActionRow}
                      stretchingLayout2
                    />
                  )) ||
                    (!!excludedActions && (
                      <GroupSelector
                        availableItemsHeading={t("actions")}
                        availableItems={Object.values(actions)}
                        searchBy={["name"]}
                        seclectedItemsHeading={t("excludedActions")}
                        isItemSelected={action =>
                          SelectedIds.isSelected(excludedActions, action.id)
                        }
                        handleToggleItem={action => (event, checked) =>
                          this.setState({
                            excludedActions: SelectedIds.toggle(excludedActions, action.id)
                          })}
                        handleClearAll={() =>
                          this.setState({
                            excludedActions: []
                          })
                        }
                        RowElement={ActionRow}
                        stretchingLayout2
                      />
                    ))}
                </>
              }
              dialogFooter={<HubbubDialogFooter onClose={onClose} onConfirm={this.handleSave} />}
            />
          );
        };
      }
    )
  )
);

export const EditActions = withWidth()(
  withStyles(styleSheet, { name: "EditActions" })(
    translate("security")(
      class EditActions extends Component {
        static propTypes = {
          onChange: PropTypes.func.isRequired,
          actions: PropTypes.objectOf(Action.propType).isRequired,
          selectedActions: SelectedIds.propType,
          excludedActions: SelectedIds.propType,
          classes: PropTypes.object.isRequired,
          t: PropTypes.func.isRequired
        };

        state = {
          dialog: null
        };

        handleEditActions = event => {
          this.editActionsDialog().then(
            actions => {
              this.setState({ dialog: null });
              if (actions.selectedActions || actions.excludedActions) {
                // this.props.onChange(actions);

                this.props.onChange({
                  selectedActions: actions.selectedActions,
                  excludedActions: actions.excludedActions
                });
              } else {
                this.props.onChange(undefined);
              }
            },
            () => {
              this.setState({ dialog: null });
            }
          );
        };

        editActionsDialog = selection => {
          return new Promise((resolve, reject) => {
            let dialog = (
              <EditActionsDialog
                isOpen={true}
                onSave={resolve}
                onClose={reject}
                actions={this.props.actions}
                selectedActions={this.props.selectedActions}
                excludedActions={this.props.excludedActions}
              />
            );
            this.setState({ dialog });
          });
        };

        handleRemoveAction = id => event => {
          let { selectedActions, excludedActions } = this.props;
          this.props.onChange({
            selectedActions: selectedActions && SelectedIds.unselect(selectedActions, id),
            excludedActions: excludedActions && SelectedIds.unselect(excludedActions, id)
          });
        };

        renderAction = id => {
          let { onChange, actions, selectedActions } = this.props;
          return (
            <FieldChip key={id} label={actions[id].name} onDelete={this.handleRemoveAction(id)} />
          );
        };

        render() {
          let { selectedActions, excludedActions, label, t } = this.props;
          return (
            <Field label={label || ""} onClick={this.handleEditActions}>
              <SecondaryText inline>
                {selectedActions && selectedActions.length
                  ? selectedActions.map(this.renderAction)
                  : ""}
                {excludedActions && excludedActions.length ? (
                  <>
                    {t("excluding")} &nbsp; {excludedActions.map(this.renderAction)}
                  </>
                ) : (
                  ""
                )}
                {!(selectedActions || []).length && !(excludedActions || []).length ? t("all") : ""}
              </SecondaryText>
              {this.state.dialog}
            </Field>
          );
        }
      }
    )
  )
);
