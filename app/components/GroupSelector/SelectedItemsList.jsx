/**
 * by A. Prates, jan-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Icon, List, Switch, Toolbar, withStyles } from "@material-ui/core";
import { PrimaryTextButton, StretchingGridItem, Tooltip, TooltipContent } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/GroupSelector/SelectedItemsList";

class SelectedItemsList extends Component {
  static propTypes = {
    selectedItems: PropTypes.array.isRequired,
    handleToggleItem: PropTypes.func.isRequired,
    openItemItemsDialog: PropTypes.func.isRequired,
    RowElement: PropTypes.func.isRequired,
    handleClearAll: PropTypes.func.isRequired,
    isRequiredAll: PropTypes.bool, // needed it handleToggleAnyOrAll is defined
    handleToggleAnyOrAll: PropTypes.func, // not required
    listHeaderDark: PropTypes.bool, // not required
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      listHeaderDark,
      selectedItems,
      handleToggleItem,
      openItemItemsDialog,
      RowElement,
      handleClearAll,
      isRequiredAll,
      handleToggleAnyOrAll,
      classes,
      t
    } = this.props;

    return (
      <Fragment>
        <List classes={{ root: classes.list }}>
          {selectedItems.map((item, index) => (
            <RowElement
              key={index}
              item={item}
              isItemSelected={() => true}
              handleToggleItem={handleToggleItem}
              openItemItemsDialog={openItemItemsDialog}
              viewMode={"selected"}
            />
          ))}
        </List>

        <Divider />

        <Toolbar className={listHeaderDark ? classes.whiteToolbar : classes.grayToolbar}>
          <Grid container spacing={8} alignItems="center">
            {handleToggleAnyOrAll !== undefined && (
              <Fragment>
                <Grid item>{t("required")}</Grid>
                <Grid item>
                  <Tooltip content={<TooltipContent title={"Lorem ipsum"} text={"Lorem ipsum"} />}>
                    <Icon color="inherit">info</Icon>
                  </Tooltip>
                </Grid>
                <StretchingGridItem />
                <Grid item>
                  {t("any")}
                  <Switch checked={isRequiredAll} onChange={handleToggleAnyOrAll} />
                  {t("all")}
                </Grid>
              </Fragment>
            )}

            <StretchingGridItem />
            <PrimaryTextButton onClick={handleClearAll} disabled={!selectedItems.length}>
              {t("clearAll")}
            </PrimaryTextButton>
          </Grid>
        </Toolbar>
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "SelectedItemsList" })(
  translate("common")(SelectedItemsList)
);
