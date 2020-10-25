import React, { Component } from "react";
import {
  withStyles,
  Grid,
  FormControlLabel,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Icon,
  Typography,
  Avatar
} from "@material-ui/core";
import { Text } from "components/LayoutElements";
import { Pending, ConfirmButtons, TextField, Select, ChipInput } from "components";
import { ReportDateIntervalInput } from "components/Report/ReportElement";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Report/ReportElement/Accordion/Accordion";
import { getDateTimeInterval, getTimeStampInterval } from "utils/date";
import { ReportFormSelectService } from "../Input/";

class Accordion extends Component {
  state = {
    expanded: false
  };

  handleChange = index => {
    event.stopPropagation();
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      classes,
      blocked,
      index,
      valid,
      icon,
      headingText,
      accordionSummaryStyle,
      accordionRootStyle,
      accordionDetailStyle,
      children,
      t
    } = this.props;
    const { expanded } = this.state;

    return (
      <>
        <ExpansionPanel
          expanded={blocked ? false : expanded}
          onChange={blocked ? null : this.handleChange}
          elevation={4}
          className={accordionRootStyle}
          
        >
          <ExpansionPanelSummary
            className={accordionSummaryStyle ? accordionSummaryStyle : classes.expansionPanelSummary}
            expandIcon={blocked ? null : expanded ? <Icon>remove</Icon> : <Icon>add</Icon>}
          >
            <>
              {icon && (
                <div>
                  <Avatar className={blocked ? classes.blockedAvatar : classes.avatar}>
                    {icon ? <Icon className={classes.stepIcon}>{icon}</Icon> : String(index + 1)}
                  </Avatar>
                </div>
              )}

              {headingText && (
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography className={blocked ? classes.blockedHeading : classes.headingStyle}>
                      {t(headingText)}
                    </Typography>
                  </Grid>
                </Grid>
              )}

              {valid && (
                <div className={classes.column}>
                  <Avatar className={classes.doneIcon}>
                    <Icon>done</Icon>
                  </Avatar>
                </div>
              )}
            </>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={accordionDetailStyle ? accordionDetailStyle : classes.root}>{children}</ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    );
  }
}

export default withStyles(styleSheet, { name: "Accordion" })(translate("report")(Accordion));
