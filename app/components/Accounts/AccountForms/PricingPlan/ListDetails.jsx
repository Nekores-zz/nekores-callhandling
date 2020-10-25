import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Icon,
  withStyles
} from "@material-ui/core";
import { styleSheet } from "jss/Accounts/PricingPlansDialog";
import { translate } from "react-i18next";

class ListDetails extends Component {
  render() {
    const { t, classes } = this.props;
    return (
      <div>
        <Typography className={classes.planDetailsText}>
          {t(`lorem`)}
        </Typography>
        <div>
          {this.props.accountPanelTitles.map((item, index) => {
            return (
              <div key={index}>
                <ExpansionPanel className={classes.exPanel}>
                  <ExpansionPanelSummary
                    expandIcon={
                      <Icon className={classes.expandIcon}>expand_more</Icon>
                    }
                  >
                    <Typography className={classes.heading}>
                      {item.title}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography className={classes.innerPanelText}>
                      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Fusce eu tempor diam. In mollis nibh non eros consectetur
                      blandit. Etiam tellus nunc, tristique at iaculis sit amet,
                      maximus ac nisl. Duis nec efficitur ex, a vehicula est. Ut
                      mollis gravida libero, in luctus leo pharetra ut.
                      Pellentesque sem ante, iaculis id lacus sit amet, finibus
                      interdum massa.`,
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ListDetails" })(
  translate("accounts")(ListDetails)
);
