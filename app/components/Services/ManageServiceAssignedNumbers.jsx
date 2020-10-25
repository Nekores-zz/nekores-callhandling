/**
 * by Sajid U. , July-2019
 */
import React, { Component } from "react";
import { withStyles, Grid, FormGroup, FormControlLabel, Checkbox, Avatar } from "@material-ui/core";
import { AvatarBandCell, TagsCell, VirtualizedList, GroupSelector, Text } from "components";
import PropTypes from "prop-types";
import { styleSheet } from "jss/Services/ManageService";
import { AssignedNumbersRow } from "components/Services/RowElements/";
import { translate } from "react-i18next";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter, ConfirmDialog } from "components";

class ManageServiceAssignedNumbers extends Component {
  static propTypes = {
    serviceNumbers: PropTypes.array.isRequired,
    serviceNumbersCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onScrollPositionChange: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    buyMoreHandler: PropTypes.func, // not required
    ConfirmSelectionHandler: PropTypes.func, // not required
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };
  state = {
    openSelectNumberDialog: false,
    serviceNumbers: this.props.serviceNumbers,
    selectedNumbers: [],
    WarningDialog: null,
    confirmed: false
  };

  ///// LIST SETUP /////

  listSchema = [
    {
      display: "flex",
      heading: "bandOrNumber",
      args: ["number", "bandType", "isFirstIndexBold"],
      render: AvatarBandCell,
      hidden: false
    },
    {
      display: "flex",
      heading: "tags",
      args: ["tags"],
      render: TagsCell,
      hidden: true
    }
  ];

  onAddButton = () => {
    this.setState({
      openSelectNumberDialog: true
    });
  };

  closeWarningDialog = () => {
    this.setState({ WarningDialog: null });
  };

  confirmWarningDialog = () => {
    console.log("You have Removed Number!");
    this.closeWarningDialog();
  };

  isNumberSelected = r => {
    return this.state.selectedNumbers.findIndex(i => i.id === r.id) !== -1;
  };
  handleToggleService = item => {
    if (!this.isNumberSelected(item)) {
      this.setState({
        selectedNumbers: [...this.state.selectedNumbers, item]
      });
    } else {
      this.onRemoveSelectNumberServicesDialog(item.id);
    }
  };
  handleClearAll = () => {
    this.onRemoveSelectNumberServicesDialog();
  };

  selectAllItems = () => {
    this.setState({
      selectedNumbers: this.state.serviceNumbers,
      getNumbers: this.props.getNumbers
    });
  };

  handleCreate = () => {
    this.dialogClose();
    return new Promise((resolve, reject) => {
      this.props.ConfirmSelectionHandler();
      resolve({});
      this.props.onClose();
    });
  };

  dialogClose = () => {
    this.setState({
      openSelectNumberDialog: false
    });
  };

  // Warning Dialog
  onRemoveSelectNumberServicesDialog = id => {
    const toggleCheckbox = () => {
      this.setState(prevState => ({
        confirmed: !prevState.confirmed
      }));
    };
    this.setState({
      WarningDialog: (
        <ConfirmDialog
          dialogMessage={this.props.t("loremIpsum")}
          confirmMessage={this.props.t("removeSelectedNumber")}
          selectedItems={this.state.selectedNumbers}
          onCancel={this.closeWarningDialog}
          onConfirm={() => {
            return new Promise((resolve, reject) => {
              id
                ? this.setState(
                    {
                      selectedNumbers: this.state.selectedNumbers.filter(i => i.id !== id)
                    },
                    () => this.closeWarningDialog()
                  )
                : this.setState(
                    {
                      selectedNumbers: []
                    },
                    () => this.closeWarningDialog()
                  );
              resolve({});
            });
          }}
        />
      )
    });
  };

  // Dialog Header
  dialogHeader = (
    <HubbubDialogHeader
      icon={false}
      headerVariation="grey"
      headerTitle="selectNumbers"
      onClose={this.dialogClose}
    />
  );

  // Dialog Content
  dialogContent = (
    <>
      <Grid container alignItems="center" spacing={8}>
        <Grid item xs={12} sm={12}>
          <Text variant="primaryBody">
            {this.props.t("addNumberDialogPara")}
            <br />
            <br />
          </Text>
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={8}>
        <GroupSelector
          listHeaderDark={true}
          withBuyMoreAndSelectAllButtons={true}
          selectAllItems={this.selectAllItems}
          availableItemsHeading={`${this.props.t("availableNumbers")}  (${
            this.props.serviceNumbersCount
          })`}
          availableItems={this.props.serviceNumbers}
          buyMoreHandler={this.props.buyMoreHandler}
          searchBy={["band", "number"]}
          seclectedItemsHeading={this.props.t("selectedNumbers")}
          isItemSelected={this.isNumberSelected}
          handleToggleItem={this.handleToggleService}
          getItemItems={() => {
            return selectedNumbers;
          }}
          handleClearAll={this.handleClearAll}
          RowElement={AssignedNumbersRow}
        />
      </Grid>
    </>
  );

  // Dialog Footer
  dialogFooter = <HubbubDialogFooter onConfirm={this.handleCreate} onClose={this.dialogClose} />;

  // Component Render Method
  render() {
    const {
      serviceNumbers,
      isLoading,
      onScrollPositionChange,
      onScrollPositionSetter,
      loadMore,
      serviceNumbersCount,
      t
    } = this.props;

    const WarningDialog = () => this.state.WarningDialog;
    return (
      <VirtualizedList
        data={serviceNumbers}
        dataCount={serviceNumbersCount}
        schema={this.listSchema}
        getKeyFn={item => item.id}
        handleAddClick={this.onAddButton}
        onScrollPositionChange={onScrollPositionChange}
        onScrollPositionSetter={onScrollPositionSetter}
        isLoading={isLoading}
        loadMore={loadMore}
        t={t}
      >
        {/* Dialog */}
        {this.state.openSelectNumberDialog && (
          <HubbubDialog
            maxWidth="md"
            open={this.state.openSelectNumberDialog}
            dialogHeader={this.dialogHeader}
            dialogContent={this.dialogContent}
            dialogFooter={this.dialogFooter}
            onClose={() => this.setState({ openSelectNumberDialog: false })}
          />
        )}
        <WarningDialog />
      </VirtualizedList>
    );
  }
}

export default withStyles(styleSheet, { name: "ManageServiceAssignedNumbers" })(
  translate("services")(ManageServiceAssignedNumbers)
);
