/**
 * review by A. Prates, feb-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Collapse,
  Paper,
  Avatar,
  Icon,
  withStyles
} from "@material-ui/core";
import { DetailsField } from "components/NumbersManagement";
import { translate } from "react-i18next";
import { styleSheet } from "jss/NumbersManagement/NumbersForms/DetailsForm";
import { bandTypes, bands } from 'utils/bands';

class DetailsForm extends Component {
  static propTypes = {
    existingNumbers: PropTypes.array.isRequired,
    handleMoveNumber: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    expanded: -1
  };

  numbersCollections = [ // TODO: this collection of numbers should be provided from props
    {
      mode: "warning",
      label: "Existing numbers", // TODO: should be i18n key
      caption: "These numbers already exist, so will be ignored", // TODO: should be i18n key
      collection: this.props.existingNumbers
    },
    {
      mode: "band",
      band: bandTypes.Gold,
      collection: []
    },
    {
      mode: "band",
      band: bandTypes.Silver,
      collection: []
    },
    {
      mode: "band",
      band: bandTypes.Bronze,
      collection: []
    },
    {
      mode: "band",
      band: bandTypes.Standard,
      collection: this.props.existingNumbers
    }
  ];

  handleChangePanel = panel => event => {
    event.stopPropagation();
    this.setState({
      expanded: panel != this.state.expanded ? panel : -1
    });
  };

  render() {
    const { bands, handleMoveNumber, classes, t } = this.props;
    const { expanded } = this.state;

    return (
      <Paper className={classes.paper} elevation={4} square>
        <div className={classes.title}>{t("details")}</div>

        <Divider />

        {this.numbersCollections.map((item, index) => (
          <Collapse
            key={index}
            classes={{ container: classes.container, entered: classes.entered }}
            in
          >
            <ExpansionPanel
              expanded={expanded === index}
              onChange={this.handleChangePanel(index)}
              square
            >
              <ExpansionPanelSummary
                classes={{
                  expandIcon: classes.expandIcon,
                  content: classes.content,
                  expanded: classes.expanded
                }}
                expandIcon={
                  expanded === index ? (
                    <Icon className={classes.icon}>remove</Icon>
                  ) : (
                    <Icon className={classes.icon}>add</Icon>
                  )
                }
              >
                <div
                  className={
                    item.mode === "warning"
                      ? clsx(classes.headingWrapper, classes.iconBox)
                      : clsx(classes.headingWrapper, classes.marginCollapse)
                  }
                >
                  {item.mode === "warning" ? (
                    <Icon className={classes.warning}>warning</Icon>
                  ) : (
                    <Avatar className={classes.avatar} style={{ background: item.band.color }} />
                  )}
                  <div>
                    <Typography className={classes.heading}>
                      {item.mode === "band" ? item.band.name : item.label}
                    </Typography>
                    <Typography className={classes.numbersQuantity} variant="caption">
                      {item.collection.length} numbers
                    </Typography>
                    {item.mode === "warning" ? (
                      <Typography className={classes.warningCaption} variant="caption">
                        {item.caption}
                      </Typography>
                    ) : (
                      <div className={classes.spacer} />
                    )}
                  </div>
                </div>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails className={classes.expansionDetails}>
                <div>
                  {item.collection.map((number, index) =>
                    item.mode === "warning" ? (
                      <Typography className={classes.numbers} key={index}>
                        {number}
                      </Typography>
                    ) : (
                      <DetailsField
                        key={index}
                        number={number}
                        handleChange={handleMoveNumber}
                        band={item.band}
                        bands={bands}
                      />
                    )
                  )}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Collapse>
        ))}
      </Paper>
    );
  }
}

export default withStyles(styleSheet, { name: "DetailsForm" })(translate("numbers")(DetailsForm));
