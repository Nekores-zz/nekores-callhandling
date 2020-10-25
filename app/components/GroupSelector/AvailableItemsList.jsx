/**
 *
 * by A. Prates, jan-2019
 *
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Grid,
  Input,
  List,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  withStyles
} from "@material-ui/core";
import { ListHeader, ListHeaderSearch, StretchingGridItem } from "components";
import { BuyMoreAndSelectAllButtons } from "components/GroupSelector";
import { translate } from "react-i18next";
import { styleSheet } from "jss/GroupSelector/AvailableItemsList";

class AvailableItemsList extends Component {
  static propTypes = {
    availableItemsHeading: PropTypes.string.isRequired,
    availableItems: PropTypes.array.isRequired,
    availableItemsSets: PropTypes.array, // not required
    searchBy: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.func.isRequired]),
    isItemSelected: PropTypes.func.isRequired,
    handleToggleItem: PropTypes.func.isRequired,
    openItemItemsDialog: PropTypes.func.isRequired,
    RowElement: PropTypes.func.isRequired,
    compactLayout: PropTypes.bool, // not required
    stretchingLayout: PropTypes.bool, // not required
    stretchingLayout2: PropTypes.bool, // not required
    listHeaderDark: PropTypes.bool, // not required
    withBuyMoreAndSelectAllButtons: PropTypes.bool, // not required
    buyMoreHandler: PropTypes.func, // not required
    minLength: PropTypes.number,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    isSearchActive: false,
    searchString: "",
    selectedSet: null,
    minLength: this.props.minLength && this.props.minLength > 3 ? this.props.minLength : 2
  };

  handleToggleSearch = isSearchActive => this.setState({ isSearchActive });

  /**
   * Trigger API on text field change if `searchBy` is a function
   * */
  handleSearchChange = searchString =>
    this.setState({ searchString }, () =>
      typeof this.props.searchBy === "function" &&
      (searchString == "" || searchString.length >= this.state.minLength)
        ? this.props.searchBy(searchString)
        : null
    );

  /**
   * Select set from dropdown
   * */
  handleSetChange = event => this.setState({ selectedSet: event.target.value });

  /**
   * Filter available items by set when set is selected
   * @returns {*|*[]}
   */
  filterBySet = () => {
    const { availableItems, searchBy } = this.props;
    const { searchString, selectedSet } = this.state;
    console.info(searchString);
    let items =
      selectedSet === null
        ? availableItems
        : availableItems.filter(item => item.set.id === selectedSet.id);

    if (searchString === "") return items;
    else if (typeof this.props.searchBy !== "function") {
      //Search items from rendered list when set is selected
      const key = searchString.toLowerCase();
      let filteredList = [];
      searchBy.forEach(property => {
        filteredList = [
          ...filteredList,
          ...items.filter(item => item[property].toLowerCase().search(key) !== -1)
        ];
      });

      return filteredList.reduce((a, b) => {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);
    } else return items;
  };

  /**
   * When we use this component for roles with sets then we should consider availableItems as roles
   * @returns {*}
   */
  getItems = () => {
    const { availableItems, availableItemsSets } = this.props;
    return availableItemsSets !== undefined ? this.filterBySet() : availableItems;
  };

  render() {
    const {
      availableItemsHeading,
      availableItemsSets,
      handleToggleItem,
      availableItems,
      openItemItemsDialog,
      isItemSelected,
      RowElement,
      compactLayout,
      stretchingLayout,
      stretchingLayout2,
      buyMoreHandler,
      withBuyMoreAndSelectAllButtons,
      selectAllItems,
      listHeaderDark,
      classes,
      t
    } = this.props;
    const { isSearchActive, searchString, selectedSet } = this.state;
    const layoutMode = compactLayout
      ? classes.compact
      : stretchingLayout
      ? classes.stretch
      : stretchingLayout2
      ? classes.stretch2
      : classes.paperGrid;

    return (
      <Paper elevation={2} classes={{ root: clsx(classes.listPaper) }}>
        <Grid container direction="column" alignItems="stretch" className={layoutMode}>
          <ListHeader className={listHeaderDark ? classes.listHeaderLight : classes.listHeader}>
            {!isSearchActive && !searchString ? (
              <Fragment>
                <StretchingGridItem
                  className={classes.listHeaderText}
                  onClick={() => this.handleToggleSearch(true)}
                >
                  {availableItemsHeading}
                </StretchingGridItem>
                {availableItemsSets !== undefined && (
                  <Fragment>
                    <Select
                      value={selectedSet === null ? "" : selectedSet}
                      onChange={this.handleSetChange}
                      renderValue={set => (set ? set.name : t("allSets"))}
                      displayEmpty={true}
                      input={<Input disableUnderline={true} />}
                      classes={{
                        select: classes.searchInput,
                        icon: classes.searchInput
                      }}
                    >
                      <MenuItem value={null}>
                        <ListItemText primary={t("allSets")} />
                      </MenuItem>
                      {availableItemsSets.map((set, id) => (
                        <MenuItem key={id} value={set}>
                          <ListItemText primary={set.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <div className={classes.verticalLine} />
                  </Fragment>
                )}
              </Fragment>
            ) : null}
            <ListHeaderSearch
              listHeaderDark={listHeaderDark}
              isActive={isSearchActive}
              onToggle={this.handleToggleSearch}
              searchString={searchString}
              onChange={this.handleSearchChange}
            />
          </ListHeader>

          <List classes={{ root: classes.list }}>
            {this.getItems().map((item, index) => (
              <RowElement
                key={index}
                item={item}
                isItemSelected={isItemSelected}
                handleToggleItem={handleToggleItem}
                openItemItemsDialog={openItemItemsDialog}
                viewMode={"available"}
              />
            ))}
          </List>
          {withBuyMoreAndSelectAllButtons && (
            <BuyMoreAndSelectAllButtons
              withBuyMoreAndSelectAllButtons={withBuyMoreAndSelectAllButtons}
              listHeaderDark={listHeaderDark}
              availableItems={availableItems}
              buyMoreHandler={buyMoreHandler}
              selectAllItems={selectAllItems}
            />
          )}
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styleSheet, { name: "AvailableItemsList" })(
  translate("common")(AvailableItemsList)
);
