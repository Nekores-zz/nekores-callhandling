/**
 * by A. Prates, mar-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { Basket } from "components/Numbers";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Numbers/PurchaseSelectNumbers";

class PurchaseSelectNumbers extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    bands: PropTypes.array.isRequired,
    removeNumber: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    selectedNumbers: []
  };

  BasketPanel = () => (
    <Grid item className={this.props.classes.detailsWrapper}>
      <Basket
        bands={this.props.bands}
        selectedNumbers={this.state.selectedNumbers}
        removeNumber={this.props.removeNumber}
        checkout={this.props.checkout}
      />
    </Grid>
  );

  render() {
    const { numbers, bands, classes, t } = this.props;

    const BasketPanel = this.BasketPanel;

    return (
      <div className={classes.pageContent}>
        <BasketPanel />

        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <Paper className={classes.paper}>[ List search/filter options ]</Paper>

            {/* <NumbersList numbers={numbers} bands={bands} /> */}
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "PurchaseSelectNumbers" })(
  translate("numbers")(PurchaseSelectNumbers)
);
