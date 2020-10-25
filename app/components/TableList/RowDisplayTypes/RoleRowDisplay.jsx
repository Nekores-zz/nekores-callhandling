/**
 * by A. Prates, out-2018
 */
import React, { Component, Fragment } from "react";
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
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class RoleRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    startAnimation: PropTypes.func.isRequired,
    stopAnimation: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  togglePanel = panel => (event, expanded) => {
    this.props.startAnimation();
    setTimeout(() => this.props.stopAnimation(), 200);
  };

  render() {
    const { rowData, classes, t } = this.props;

    return (
      <Fragment>
        <div className={classes.contentWrapper}>
          <Typography className={classes.contentText}>{rowData.description}</Typography>
        </div>

        {rowData.isComposite ? (
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
                  {t("composedOf") + " " + rowData.children.length + " " + t("roles")}
                </Typography>
              </ExpansionPanelSummary>
             {/* <ExpansionPanelDetails>
                <List className={classes.avatarList}>
                  {rowData.children.map((id, index) => {
                    const role = this.props.roles[id];
                    return (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <ListAvatar color={role.id} name={role.name} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={role.name}
                          secondary={role.permissionSetName}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </ExpansionPanelDetails>*/}
            </ExpansionPanel>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "RoleRowDisplay" })(
  translate("security")(RoleRowDisplay)
);
