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
import {ListAvatar, Text} from "components";
import { PermissionsInfo } from "components/Security";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class PermissionRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    //startAnimation: PropTypes.func.isRequired,
    //stopAnimation: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  /*togglePanel = panel => (event, expanded) => {
    this.props.startAnimation();
    setTimeout(() => this.props.stopAnimation(), 200);
  };*/

  capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const { rowData, classes, t } = this.props;
    const { policies, actions } = rowData;

    return (
      <>
        <div className={classes.contentWrapper}>
          <Typography className={classes.contentText}>
            <PermissionsInfo permission={rowData} {...rowData.props} />
          </Typography>

          <br />
          <br />

          <Typography variant="caption">{t('detail_plural')}</Typography>
          <Typography className={classes.contentText}>
            {policies.length + " " + this.capitalize(t("policy", {count: policies.length}))}
          </Typography>
          <Typography className={classes.contentText}>
            {/*{logger.info("Permissions Actions" + JSON.stringify(actions))}*/}
            {actions? actions.length : t("all")}{" "}
            {this.capitalize(actions? t("action", {count: actions.length}): t("action_plural"))}
          </Typography>
        </div>

        {/*
        <div className={classes.expansionPanel}>
          <Divider />
          <ExpansionPanel
            elevation={0}
            square={true}
            onChange={this.togglePanel("panel1")}
            classes={{ expanded: classes.expandedPanel }}
          >
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography className={classes.contentText}>
                {rowData.policies.length + " " + t("policies")}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List className={classes.avatarList}>
                {rowData.policies.map((policy, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <ListAvatar color={policy.id} name={policy.name} />
                    </ListItemAvatar>
                    <ListItemText primary={policy.name} />
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Divider />
          <ExpansionPanel
            elevation={0}
            square={true}
            onChange={this.togglePanel("panel2")}
            classes={{ expanded: classes.expandedPanel }}
          >
            <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography className={classes.contentText}>
                {Object.values(rowData.actions).length + " " + t("actions")}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List className={classes.avatarList}>
                {Object.values(rowData.actions).map((action, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <ListAvatar color={action.id} name={action.name} />
                    </ListItemAvatar>
                    <ListItemText primary={action.name} />
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>*/}
      </>
    );
  }
}

export default withStyles(styleSheet, { name: "PermissionRowDisplay" })(
  translate("security")(PermissionRowDisplay)
);
