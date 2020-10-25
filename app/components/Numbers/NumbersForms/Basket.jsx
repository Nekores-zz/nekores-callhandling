/**
 * review by A. Prates, feb-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
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
import { styleSheet } from "jss/Numbers/NumbersForms/Basket";

class Basket extends Component {
  static propTypes = {
    bands: PropTypes.array.isRequired,
    selectedNumbers: PropTypes.array.isRequired,
    removeNumber: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,

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
    const { bands, selectedNumbers, classes, t } = this.props;
    const { expanded } = this.state;

    // separate selectedNumbers by bands
    bands.forEach(b => (b.numbers = selectedNumbers.filter(n => n.band === b.id)));

    return (
      <Paper className={classes.paper} elevation={4} square>
        <div className={classes.title}>
          <Icon className={classes.titleIcon}>shopping_basket</Icon>
          {t("yourBasket", { count: selectedNumbers.length })}
        </div>
        <Divider />

        {bands.map((band, index) => (
          <Collapse
            key={index}
            classes={{
              container: classes.container,
              entered: classes.entered
            }}
            in
          >
            <ExpansionPanel
              expanded={expanded === index}
              onChange={this.handleChangePanel(index)}
              classes={{ expanded: classes.expanded }}
              square
            >
              <ExpansionPanelSummary
                classes={{ expandIcon: classes.expandIcon, content: classes.content }}
                expandIcon={
                  <Icon className={classes.icon}>{expanded === index ? "remove" : "add"}</Icon>
                }
              >
                <div className={clsx(classes.headingWrapper, classes.marginCollapse)}>
                  <Avatar className={classes.avatar} style={{ background: band.color }} />
                  <div>
                    <Typography className={classes.heading}>{band.name}</Typography>

                    <Typography className={classes.numbersQuantity} variant="caption">
                      {band.numbers.length} numbers
                    </Typography>
                  </div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionDetails}>
                [render numbers]
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Collapse>
        ))}
      </Paper>
    );
  }
}

export default withStyles(styleSheet, { name: "Basket" })(translate("numbers")(Basket));
