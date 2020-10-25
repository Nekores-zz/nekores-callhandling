import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withWidth, withStyles } from "@material-ui/core";
import {
  PrimaryButton,
  PrimaryTextLink,
  SecondaryTextLink,
  ThirdTextLink,
  IconButton,
  Icon,
  Text,
  Paper,
  Row,
  Column,
  Stretch,
  Box,
  Padding,
  Checkbox,
  Radio,
  FormControlLabel,
  RadioGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListHeader,
  ListCheckbox,
  ListFooter,
  ListItem,
  ListHeaderSearch,
  ListItemText,
  ListAvatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  Field,
  FieldChip,
  FieldText,
  ModalHeader,
  SecondaryText
} from "components/Elements";
import { translate } from "react-i18next";
import { withPromiseProps } from "../../../utils/promise";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";
import { ResourcesSelections, ResourcesItems } from "models";
import { styleSheet } from "jss/Security/EditResourcesDialog";

export const EditResourcesDialog = withStyles(styleSheet, { name: "EditResourcesDialog" })(
  translate("security")(
    class EditResourcesDialog extends Component {
      static propTypes = {
        selectedResources: ResourcesSelections.propType,
        resources: ResourcesItems.propType,
        selectedTypes: PropTypes.arrayOf(PropTypes.number).isRequired,
        type: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        t: PropTypes.func.isRequired
      };

      state = {
        selectedResources: this.props.selectedResources,
        parentItem: null,
        isSearchActive: false,
        searchString: ""
      };

      handleChange = (setter, ...args0) => (...args1) => {
        let selectedResources = setter(this.state.selectedResources, ...args0, ...args1);
        this.setState({ selectedResources });
      };

      handleParentItemChange = parentItem => event => {
        this.setState({ parentItem });
        event.stopPropagation();
        event.preventDefault();
      };

      handleToggleSearch = isSearchActive => {
        this.setState({ isSearchActive });
      };

      handleSearchChange = searchString => {
        this.setState({ searchString });
      };

      handleSave = () => {
        let { onSave } = this.props;
        let { selectedResources } = this.state;
        return onSave(selectedResources);
      };

      renderLabel(item) {
        if (item.relation) {
          return `All Resources Related to ${item.typeName} ${item.name} under ${
            item.relationName
          }`;
        } else if (item.type) {
          return `All Resources Under ${item.typeName} ${item.name}`;
        } else {
          return item.name;
        }
      }

      renderAvailableRow = item => {
        let { selectedResources } = this.state;
        let isSelected = ResourcesSelections.isSelected(selectedResources, item);
        let name = this.props.resources.resources[item.id];
        let label = this.renderLabel(item);
        return (
          <ListItem
            key={`${item.id} ${item.type} ${item.relation}`}
            divider
            button
            onClick={this.handleChange(ResourcesSelections.toggle, item)}
          >
            <ListItemAvatar>
              {isSelected ? (
                <ListCheckbox checked={isSelected} />
              ) : (
                <ListAvatar color={name.charCodeAt(0)} name={name} />
              )}
            </ListItemAvatar>
            <ListItemText primary={label} />
            {item.children ? (
              <ListItemSecondaryAction>
                <IconButton onClick={this.handleParentItemChange(item)}>
                  <Icon>keyboard_arrow_right</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        );
      };

      renderAvailableList() {
        let { t, resources } = this.props;
        let { parentItem, isSearchActive, searchString } = this.state;
        let items = parentItem
          ? ResourcesItems.getChildrenItems(resources, parentItem)
          : resources.items;
        return (
          <Column noOverflow fill alignChildrenStretch borderHalf>
            <ListHeader color="secondary">
              {parentItem ? (
                <Stretch>
                  <ListHeader.Button nav onClick={this.handleParentItemChange(null)}>
                    <Icon>keyboard_backspace</Icon>
                    {parentItem.name}
                  </ListHeader.Button>
                </Stretch>
              ) : !isSearchActive && !searchString ? (
                <Stretch onClick={() => this.handleToggleSearch(true)}>{t("resources")}</Stretch>
              ) : null}
              <ListHeaderSearch
                isActive={isSearchActive}
                onToggle={this.handleToggleSearch}
                searchString={searchString}
                onChange={this.handleSearchChange}
              />
            </ListHeader>
            <List scroll>{items.map(this.renderAvailableRow)}</List>
          </Column>
        );
      }

      renderSelection = selection => {
        let { resources, t, type } = this.props;
        let item = ResourcesItems.getSelectedItem(resources, selection);
        let name = resources.resources[item.id];
        let label = this.renderLabel(item);
        return (
          <ListItem key={item.id} divider>
            <ListItemAvatar>
              <ListAvatar color={name.charCodeAt(0)} name={name} />
            </ListItemAvatar>
            <ListItemText primary={label} />
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleChange(ResourcesSelections.toggle, item)}>
                <Icon>clear</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      };

      renderSelectedList() {
        let { type, t } = this.props;
        let { selectedResources } = this.state;
        return (
          <Column noOverflow fill alignChildrenStretch borderHalf>
            <ListHeader color="secondary">{t("selectedType", { type: type.name })}</ListHeader>
            <List scroll>{selectedResources.map(this.renderSelection)}</List>
            {!selectedResources.length ? (
              <Row padding justifyChildrenCenter>
                <SecondaryText>{t("noResourcesYet")}</SecondaryText>
              </Row>
            ) : null}
          </Column>
        );
      }

      // Dialog Header
      dialogHeader = (onClose, type, t) => (
        <HubbubDialogHeader
          HubbubDialogHeader
          icon={false}
          headerVariation="grey" // "default", "grey", "red" - If no headerVariation prop, it take default one.
          onClose={onClose}
          headerTitle={t("selectType", { type: type.name })}
        />
      );

      // Dialog Conent
      dialogContent = (isSelectAll, t) => (
        <Column fill alignChildrenStretch noOverflow>
          <Column noStretch alignChildrenStart>
            <RadioGroup>
              <FormControlLabel
                control={
                  <Radio
                    checked={isSelectAll}
                    onChange={this.handleChange(ResourcesSelections.selectAll, true)}
                    color="secondary"
                    padding
                  />
                }
                label={t("selectAll")}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={!isSelectAll}
                    onChange={this.handleChange(ResourcesSelections.selectAll, false)}
                    color="secondary"
                    padding
                  />
                }
                label={t("configure")}
              />
            </RadioGroup>
          </Column>

          {isSelectAll ? null : (
            <Fragment>
              <Column stretch noOverflow alignChildrenStretch paddingTop>
                {this.renderAvailableList()}
              </Column>
              <Column stretch noOverflow alignChildrenStretch paddingTop>
                {this.renderSelectedList()}
              </Column>
            </Fragment>
          )}
        </Column>
      );

      // Dialog Footer
      dialogFooter = (onClose, t) => (
        <HubbubDialogFooter
          onClose={onClose}
          onConfirm={this.handleSave}
          confirmLabel={t("save")}
        />
      );

      render() {
        let { width, onClose, type, classes, t } = this.props;
        let { selectedResources } = this.state;
        let isSelectAll = !selectedResources;
        return (
          <HubbubDialog
            open={true}
            dialogClass={{ paper: classes.dialogPaper }}
            maxWidth="md"
            onClose={onClose}
            dialogHeader={this.dialogHeader(onClose, type, t)}
            dialogContent={this.dialogContent(isSelectAll, t)}
            dialogFooter={this.dialogFooter(onClose, t)}
          />
        );
      }
    }
  )
);

export const EditResources = withWidth()(
  translate("security")(
    withPromiseProps(
      props => {
        return {
          resources: props.loadResources(props.selectedTypes[0], props.accountId)
        };
      },
      class EditResources extends Component {
        static propTypes = {
          onChange: PropTypes.func.isRequired,
          accountId: PropTypes.string,
          selectedResources: ResourcesSelections.propType,
          resources: ResourcesItems.propType.isRequired,
          selectedTypes: PropTypes.arrayOf(PropTypes.number).isRequired,
          types: PropTypes.object.isRequired,
          t: PropTypes.func.isRequired
        };

        state = {
          dialog: null
        };

        isSelectionAllowed = (selectedType) => {
          return !!!(hubbub.globals.types && hubbub.globals.types.group === selectedType)
        };

        handleEditResources = event => {
          this.editResourcesDialog().then(
            resources => {
              this.setState({ dialog: null });
              if (resources && resources.length) {
                this.props.onChange(resources);
              } else {
                this.props.onChange(undefined);
              }
            },
            () => {
              this.setState({ dialog: null });
            }
          );
        };

        editResourcesDialog = () => {
          return new Promise((resolve, reject) => {
            let { resources, selectedResources, selectedTypes, types } = this.props;
            let selectedTypeId = selectedTypes[0];
            let type = types[selectedTypeId];
            const dialog = (
              <EditResourcesDialog
                isOpen={true}
                onSave={resolve}
                onClose={reject}
                resources={resources}
                selectedResources={selectedResources}
                type={type}
                types={types}
                selectedTypes={selectedTypes}
              />
            );
            this.setState({ dialog });
          });
        };

        render() {
          let { selectedResources, selectedTypes, label, t } = this.props;
          return (
            <Field label={label || ""} onClick={this.isSelectionAllowed(selectedTypes[0]) ? this.handleEditResources:null}>
              {!selectedResources ? (
                <FieldText>{t("allSelected")}</FieldText>
              ) : !selectedResources.length ? (
                <FieldText>{t("noneSelected")}</FieldText>
              ) : (
                <FieldText>{t("countSelected", { count: selectedResources.length })}</FieldText>
              )}
              {this.state.dialog}
            </Field>
          );
        }
      }
    )
  )
);
