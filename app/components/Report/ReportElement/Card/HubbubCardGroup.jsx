import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Report/ReportElement/Card/HubbubCardGroup";
import { SidemenuBack } from "components";
import { translate } from "react-i18next";
import { Text } from "components/LayoutElements";
import HubbubCard from "./HubbubCard";
class HubbubCardGroup extends Component {
  state = {
    attempts: ""
  };

  setAttempts = item => {
    this.setState({
      attempts: item.attempts
    });
  };
  handleBack = () => {
    this.setState({
      attempts: ""
    });
  };

  render() {
    const { selectedReport, t, classes } = this.props;
    const { summarySection } = selectedReport;
    const { cardGroup } = summarySection;
    const { attempts } = this.state;

    return (
      <Grid container spacing={16} direction="row">
        {attempts ? (
          <Grid item xs={12} className={classes.border}>
            <SidemenuBack back={t("back")} onClick={this.handleBack} />
            <Text variant="modalHeader">
              {attempts.length > 4 ? "4+" : attempts.length} Attempts
            </Text>
          </Grid>
        ) : (
          cardGroup.map((item, index) => (
            <Grid key={index} item xs={4}>
              <HubbubCard
                setAttempts={this.setAttempts}
                item={item}
                highlight={!item.attempts && true}
                type={item.type}
              />
            </Grid>
          ))
        )}

        {attempts &&
          attempts.map((item, index) => (
            <Grid key={index} item xs={4}>
              <HubbubCard item={item} type={item.type} />
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "HubbubCardGroup" })(
  translate("reports")(HubbubCardGroup)
);
