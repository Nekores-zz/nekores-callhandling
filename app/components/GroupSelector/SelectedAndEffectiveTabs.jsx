import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Tab, Tabs, withStyles } from "@material-ui/core";
import { ListHeader, StretchingGridItem } from "components";
import { EffectiveItemsList, SelectedItemsList } from "components/GroupSelector";
import { styleSheet } from "jss/GroupSelector/SelectedAndEffectiveTabs";

class SelectedAndEffectiveTabs extends Component {
  static propTypes = {
    seclectedItemsHeading: PropTypes.string.isRequired,
    selectedItems: PropTypes.array.isRequired,
    effectiveItemsHeading: PropTypes.string, // not required
    effectiveItems: PropTypes.array, // not required
    handleToggleItem: PropTypes.func.isRequired,
    handleClearAll: PropTypes.func.isRequired,
    isRequiredAll: PropTypes.bool, // needed it handleToggleAnyOrAll is defined
    handleToggleAnyOrAll: PropTypes.func, // not required
    openItemItemsDialog: PropTypes.func.isRequired,
    RowElement: PropTypes.func.isRequired,
    compactLayout: PropTypes.bool, // not required
    stretchingLayout: PropTypes.bool, // not required
    stretchingLayout2: PropTypes.bool, // not required
    islistHeaderLight: PropTypes.string,
    listHeaderDark: PropTypes.bool, // not required
    classes: PropTypes.object.isRequired
  };

  state = {
    selectedTab: 0
  };

  handleTabChange = (event, selectedTab) => {
    event.stopPropagation();
    this.setState({ selectedTab });
  };

  render() {
    const {
      seclectedItemsHeading,
      selectedItems,
      effectiveItemsHeading,
      effectiveItems,
      handleToggleItem,
      handleClearAll,
      isRequiredAll,
      handleToggleAnyOrAll,
      openItemItemsDialog,
      RowElement,
      compactLayout,
      stretchingLayout,
      stretchingLayout2,
      listHeaderDark,
      classes
    } = this.props;

    const { selectedTab } = this.state;

    const layoutMode = compactLayout
      ? classes.compact
      : stretchingLayout
      ? classes.stretch
      : stretchingLayout2
      ? classes.stretch2
      : classes.paperGrid;

    return (
      <Paper elevation={2} classes={{ root: classes.listPaper }}>
        <Grid container direction="column" alignItems="stretch" className={layoutMode}>
          {effectiveItems === undefined ? (
            <ListHeader className={listHeaderDark ? classes.listHeaderLight : classes.listHeader}>
              <StretchingGridItem>{`${seclectedItemsHeading} (${
                selectedItems.length
              })`}</StretchingGridItem>
            </ListHeader>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              className={selectedTab ? classes.tabEffectiveHeader : classes.tabSelectedHeader}
            >
              <Tabs
                value={selectedTab}
                variant="fullWidth"
                onChange={this.handleTabChange}
                classes={{
                  indicator: classes.indicator
                }}
              >
                <Tab
                  label={`${seclectedItemsHeading} (${selectedItems.length})`}
                  className={classes.tabLabel}
                />

                <Tab
                  label={`${effectiveItemsHeading} (${effectiveItems.length})`}
                  className={classes.tabLabel}
                />
              </Tabs>
            </Grid>
          )}
          {selectedTab && effectiveItems !== undefined ? (
            <EffectiveItemsList
              effectiveItems={effectiveItems}
              RowElement={RowElement}
              openItemItemsDialog={openItemItemsDialog}
            />
          ) : (
            <SelectedItemsList
              listHeaderDark={listHeaderDark}
              selectedItems={selectedItems}
              handleToggleItem={handleToggleItem}
              RowElement={RowElement}
              handleClearAll={handleClearAll}
              isRequiredAll={isRequiredAll}
              handleToggleAnyOrAll={handleToggleAnyOrAll}
              openItemItemsDialog={openItemItemsDialog}
            />
          )}
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styleSheet, {
  name: "SelectedAndEffectiveTabs"
})(SelectedAndEffectiveTabs);
