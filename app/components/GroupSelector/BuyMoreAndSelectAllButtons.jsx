/**
 * by Sajid U. July - 2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Toolbar, Divider, withStyles } from "@material-ui/core";
import { PrimaryTextButton, SubmitButton } from "components/LayoutElements/";
import { translate } from "react-i18next";
import { styleSheet } from "jss/GroupSelector/SelectedItemsList";

class BuyMoreAndSelectAllButtons extends Component {
  static propTypes = {
    availableItems: PropTypes.array, // not required
    selectAllItems: PropTypes.func.isRequired,
    buyMoreHandler: PropTypes.func, // not required
    listHeaderDark: PropTypes.bool, // not required

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      buyMoreHandler,
      availableItems,
      selectAllItems,
      listHeaderDark,
      classes,
      t
    } = this.props;

    return (
      <Fragment>
        <Divider />
        <Toolbar className={listHeaderDark ? classes.whiteToolbar : classes.grayToolbar}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <SubmitButton wideButton={true} onClick={buyMoreHandler}>
                {t("buyMore")}
              </SubmitButton>
            </Grid>
            <Grid item>
              <PrimaryTextButton onClick={selectAllItems} disabled={!availableItems.length}>
                {t("selectAll")}
              </PrimaryTextButton>
            </Grid>
          </Grid>
        </Toolbar>
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "BuyMoreAndSelectAllButtons" })(
  translate("common")(BuyMoreAndSelectAllButtons)
);
