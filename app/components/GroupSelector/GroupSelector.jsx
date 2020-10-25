/**
 * by A. Prates, jan-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Hidden } from "@material-ui/core";
import { StretchingGridItem } from "components";
import {
  AvailableItemsList,
  ItemItemsDialog,
  SelectedAndEffectiveTabs
} from "components/GroupSelector";

class GroupSelector extends Component {
  static propTypes = {
    availableItemsHeading: PropTypes.string.isRequired,
    availableItems: PropTypes.array.isRequired,
    availableItemsSets: PropTypes.array, // not required
    searchBy: PropTypes.array.isRequired,
    listHeaderDark: PropTypes.bool, // not required

    seclectedItemsHeading: PropTypes.string.isRequired,
    isItemSelected: PropTypes.func.isRequired,
    handleToggleItem: PropTypes.func.isRequired,
    handleClearAll: PropTypes.func.isRequired,
    buyMoreHandler: PropTypes.func, // not required

    isRequiredAll: PropTypes.bool, // needed it handleToggleAnyOrAll is defined
    handleToggleAnyOrAll: PropTypes.func, // not required

    effectiveItemsHeading: PropTypes.string, // needed if effectiveItems is defined
    effectiveItems: PropTypes.array, // not required

    itemItemsHeading: PropTypes.string, // needed if getItemItems is defined
    getItemItems: PropTypes.func, // not required (use only for composite items)

    RowElement: PropTypes.func.isRequired,

    compactLayout: PropTypes.bool, // not required
    withBuyMoreAndSelectAllButtons: PropTypes.bool, // not required
    stretchingLayout: PropTypes.bool, // not required
    stretchingLayout2: PropTypes.bool // not required
  };

  state = {
    isOpenItemItemsDialog: false,
    itemItems: []
  };

  openItemItemsDialog = item => {
    if (this.props.getItemItems !== undefined) {
      this.setState({
        itemItems: this.props.getItemItems(item),
        isOpenItemItemsDialog: true
      });
    } else {
      console.log("[ GroupSelector ]: Undefined openItemItemsDialog function!");
    }
  };

  closeItemItemsDialog = () => this.setState({ isOpenItemItemsDialog: false });

  render() {
    const {
      availableItemsHeading,
      availableItems,
      availableItemsSets,
      searchBy,
      seclectedItemsHeading,
      isItemSelected,
      handleToggleItem,
      handleClearAll,
      isRequiredAll,
      handleToggleAnyOrAll,
      effectiveItemsHeading,
      effectiveItems,
      itemItemsHeading,
      RowElement,
      compactLayout,
      stretchingLayout,
      stretchingLayout2,
      buyMoreHandler,
      selectAllItems,
      withBuyMoreAndSelectAllButtons,
      listHeaderDark
    } = this.props;

    const { isOpenItemItemsDialog, itemItems } = this.state;
    const selectedItems = availableItems.filter(item => isItemSelected(item));

    return (
      <Grid container direction="row" alignItems="stretch" spacing={24}>
        <StretchingGridItem>
          <AvailableItemsList
            listHeaderDark={listHeaderDark}
            availableItemsHeading={availableItemsHeading}
            withBuyMoreAndSelectAllButtons={withBuyMoreAndSelectAllButtons}
            availableItems={availableItems}
            availableItemsSets={availableItemsSets}
            buyMoreHandler={buyMoreHandler}
            searchBy={searchBy}
            isItemSelected={isItemSelected}
            handleToggleItem={handleToggleItem}
            RowElement={RowElement}
            openItemItemsDialog={this.openItemItemsDialog}
            compactLayout={compactLayout}
            stretchingLayout={stretchingLayout}
            stretchingLayout2={stretchingLayout2}
            selectAllItems={selectAllItems}
          />
        </StretchingGridItem>

        <Hidden smDown>
          <StretchingGridItem>
            <SelectedAndEffectiveTabs
              listHeaderDark={listHeaderDark}
              seclectedItemsHeading={seclectedItemsHeading}
              selectedItems={selectedItems}
              effectiveItemsHeading={effectiveItemsHeading}
              effectiveItems={effectiveItems}
              handleToggleItem={handleToggleItem}
              handleClearAll={handleClearAll}
              isRequiredAll={isRequiredAll}
              handleToggleAnyOrAll={handleToggleAnyOrAll}
              openItemItemsDialog={this.openItemItemsDialog}
              RowElement={RowElement}
              compactLayout={compactLayout}
              stretchingLayout={stretchingLayout}
              stretchingLayout2={stretchingLayout2}
            />
          </StretchingGridItem>
        </Hidden>

        {isOpenItemItemsDialog && (
          <ItemItemsDialog
            onClose={this.closeItemItemsDialog}
            itemItems={itemItems}
            itemItemsHeading={itemItemsHeading}
            RowElement={RowElement}
          />
        )}
      </Grid>
    );
  }
}

export default GroupSelector;
