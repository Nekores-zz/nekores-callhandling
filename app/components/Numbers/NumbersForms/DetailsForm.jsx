/**
 * review by A. Prates, feb-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Icon,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import { Text } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Numbers/NumbersForms/DetailsForm";

class DetailsForm extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    removeNumber: PropTypes.func.isRequired,
    reallocateMode: PropTypes.bool.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    expanded: -1
  };

  handleChangePanel = panel => event => {
    event.stopPropagation();
    this.setState({
      expanded: panel != this.state.expanded ? panel : -1
    });
  };

  renderNumber = (number, index) => (
    <Grid
      container
      key={index}
      className={this.props.classes.number}
      direction="row"
      alignItems="center"
      spacing={24}
      wrap="nowrap"
    >
      <Grid item>
        <Avatar style={{ backgroundColor: number.bandColor }}>{number.bandIcon}</Avatar>
      </Grid>
      <Grid item>
        <Typography>{number.number}</Typography>
        <Typography variant="caption">{number.rate}</Typography>
      </Grid>
    </Grid>
  );

  renderNumberButton = (number, index) =>
    number.status === "Active" ? (
      <Button
        key={index}
        variant="outlined"
        classes={{ root: this.props.classes.numberButtonRoot }}
        className={this.props.classes.numberButton}
        onClick={this.props.removeNumber(number)}
      >
        <Icon className={this.props.classes.buttonIcon}>warning</Icon>
        <div className={this.props.classes.buttonNumber}>
          <Text className={this.props.classes.buttonTextContent} variant="primarySmallBody">
            {number.number}
          </Text>
          <Text className={this.props.classes.buttonTextContent} variant="caption">
            {number.serviceName}
          </Text>
        </div>
        <Icon className={this.props.classes.buttonX}>close</Icon>
      </Button>
    ) : (
      <Button
        key={index}
        variant="outlined"
        className={this.props.classes.numberButton}
        onClick={this.props.removeNumber(number)}
      >
        <div className={this.props.classes.buttonNumber}>
          <Text className={this.props.classes.buttonTextContent2} variant="primarySmallBody">
            {number.number}
          </Text>
        </div>
        <Icon className={this.props.classes.buttonX2}>close</Icon>
      </Button>
    );

  render() {
    const { numbers, reallocateMode, classes, t } = this.props;
    const { expanded } = this.state;

    const activeNumbers = numbers.filter(n => n.status === "Active");
    const availableNumbers = numbers.filter(n => n.status === "Available");

    return (
      <Paper className={classes.paper} elevation={4} square>
        <div className={classes.title}>{t("details")}</div>

        <Divider className={reallocateMode ? "" : classes.divider} />

        {!reallocateMode ? (
          !numbers.length ? (
            <Text variant="errorMessage" className={classes.noNumbers}>No numbers selected.</Text>
          ) : (
            numbers.map((number, index) => this.renderNumber(number, index))
          )
        ) : (
          <Collapse
            key={1}
            classes={{
              container: classes.container,
              entered: classes.entered
            }}
            in
          >
            {activeNumbers.length ? (
              <ExpansionPanel
                style={{ backgroundColor: "#FBE6E6" }}
                expanded={expanded === 1}
                onChange={this.handleChangePanel(1)}
                classes={{ expanded: classes.expanded }}
                square
              >
                <ExpansionPanelSummary
                  classes={{ expandIcon: classes.expandIcon, content: classes.content }}
                  expandIcon={
                    <Icon className={classes.icon}>{expanded === 1 ? "remove" : "add"}</Icon>
                  }
                >
                  <div className={classes.marginCollapse}>
                    <Text variant="subtitle" className={classes.subtitle}>
                      {t("activeNumbers")}
                    </Text>

                    <Text variant="primarySmallBody">
                      {t("contNumbers", { count: activeNumbers.length })}
                    </Text>

                    <Typography className={classes.warning} variant="caption">
                      {t("numbersAlreadyAssignedWarning")}
                    </Typography>
                  </div>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails className={classes.expansionDetails}>
                  {activeNumbers.map((number, index) => this.renderNumberButton(number, index))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ) : null}

            {availableNumbers.length ? (
              <ExpansionPanel
                expanded={expanded === 2}
                onChange={this.handleChangePanel(2)}
                classes={{ expanded: classes.expanded }}
                square
              >
                <ExpansionPanelSummary
                  classes={{ expandIcon: classes.expandIcon, content: classes.content }}
                  expandIcon={
                    <Icon className={classes.icon}>{expanded === 2 ? "remove" : "add"}</Icon>
                  }
                >
                  <div className={classes.marginCollapse}>
                    <Text variant="subtitle" className={classes.subtitle}>
                      {t("availableNumbers")}
                    </Text>

                    <Text variant="primarySmallBody">
                      {t("contNumbers", { count: availableNumbers.length })}
                    </Text>
                  </div>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails className={classes.expansionDetails}>
                  {availableNumbers.map((number, index) => this.renderNumberButton(number, index))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ) : null}
          </Collapse>
        )}
      </Paper>
    );
  }
}

export default withStyles(styleSheet, { name: "DetailsForm" })(translate("numbers")(DetailsForm));
