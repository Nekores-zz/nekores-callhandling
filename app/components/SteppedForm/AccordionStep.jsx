import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Avatar,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  withStyles
} from "@material-ui/core";
import { I18n } from "react-i18next";
import { styleSheet } from "jss/SteppedForm/AccordionStep";

class AccordionStep extends Component {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    expandedIndex: PropTypes.number.isRequired,
    valid: PropTypes.bool,
    blocked: PropTypes.any,
    savePanel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    Form: PropTypes.any.isRequired,
    data: PropTypes.object.isRequired,
    icon: PropTypes.string, // if not defined uses numbers instead
    ns: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  state = {
    hasAlreadyBeenExpanded: false
  };

  static getDerivedStateFromProps = (props, state) =>
    props.expandedIndex === props.index && !state.hasAlreadyBeenExpanded
      ? { hasAlreadyBeenExpanded: true }
      : null;

  render() {
    const {
      heading,
      index,
      expandedIndex,
      valid,
      blocked,
      savePanel,
      onChange,
      showAdvance,
      Form,
      data,
      icon,
      ns,
      classes
    } = this.props;

    const { hasAlreadyBeenExpanded } = this.state;

    const expanded = expandedIndex === index;

    return (
      <I18n ns={ns}>
        {(t, { i18n }) => (
          <ExpansionPanel
            expanded={blocked ? false : expanded}
            onChange={blocked ? null : onChange(index)}
            elevation={4}
          >
            <ExpansionPanelSummary
              className={classes.expansionPanelSummary}
              expandIcon={blocked ? null : expanded ? <Icon>remove</Icon> : <Icon>add</Icon>}
            >
              <div>
                <Avatar className={blocked ? classes.blockedAvatar : classes.avatar}>
                  {icon ? <Icon className={classes.stepIcon}>{icon}</Icon> : String(index + 1)}
                </Avatar>
              </div>

              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Typography className={blocked ? classes.blockedHeading : classes.heading}>
                    {t(heading)}
                  </Typography>
                </Grid>
              </Grid>

              {valid && (
                <div className={classes.column}>
                  <Avatar className={classes.doneIcon}>
                    <Icon>done</Icon>
                  </Avatar>
                </div>
              )}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {blocked || !hasAlreadyBeenExpanded ? (
                <div />
              ) : (
                <Form
                  savePanel={savePanel}
                  panelIndex={index}
                  showAdvance={showAdvance}
                  data={data}
                />
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </I18n>
    );
  }
}

export default withStyles(styleSheet, { name: "AccordionStep" })(AccordionStep);
