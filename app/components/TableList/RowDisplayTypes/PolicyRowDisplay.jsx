/**
 * by A. Prates, aug-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import { ListAvatar } from "components";
import { PolicyInfo } from "components/Security";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";
import { translate } from "react-i18next";

class PolicyRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    //startAnimation: PropTypes.func.isRequired,
    //stopAnimation: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired
  };

  /*togglePanel = () => {
    this.props.startAnimation();
    setTimeout(() => this.props.stopAnimation(), 200);
  };*/

  render() {
    const { rowData, classes, t } = this.props;

    return (
      <>
        <div className={classes.contentWrapper}>
          <Typography className={classes.contentText}>{rowData.description}</Typography>

          <br/>
          <br/>

          <Typography variant="caption">{t("detail_plural")}</Typography>
          <Typography className={classes.contentText}><PolicyInfo policy={rowData} /></Typography>
        </div>

        {/*
        <div className={classes.expansionPanel}>
          <Divider />
          <ExpansionPanel
            elevation={0}
            square={true}
            onChange={this.togglePanel}
            classes={{ expanded: classes.expandedPanel }}
          >
            <ExpansionPanelSummary  expandIcon={<Icon>expand_more</Icon>}>
              <Typography className={classes.contentText}>
                <PolicyInfo policy={rowData} />
              </Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        </div>
        */}
      </>
    );
  }
}

export default withStyles(styleSheet, { name: "PolicyRowDisplay" })((translate("security"))(PolicyRowDisplay));
