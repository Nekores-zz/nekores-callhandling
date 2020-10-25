/**
 * by Sajid U. OCT-2019
 */

import React, { Component } from "react";
import { translate } from "react-i18next";
import { Grid, withStyles } from "@material-ui/core";
import { ReportOutput } from "./ReportOutput";
import { styleSheet } from "jss/Services/CreateService";
import PropTypes from "prop-types";

class RunReport extends Component {

  static propTypes = {
    getReportData: PropTypes.func.isRequired,
    reports: PropTypes.array.isRequired,
    services: PropTypes.array.isRequired,
    selectedReport: PropTypes.object.isRequired,
    timePeriods: PropTypes.array.isRequired,
    numbers: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      getReportData,
      reports,
      services,
      selectedReport,
      timePeriods,
      numbers,
      collapseRowTableData,
      classes,
      t
    } = this.props;

    return (
        <div className={classes.pageContent}>
          <Grid item className={classes.wrapper}>
            <div className={classes.root}>
              <ReportOutput
                  getReportData={getReportData}
                  collapseRowTableData={collapseRowTableData}
                  services={services}
                  numbers={numbers}
                  timePeriods={timePeriods}
                  reports={reports}
                  selectedReport={selectedReport}
                  enableVisualization={this.state.showAdvance}
              />
            </div>
          </Grid>
        </div>
    );
  }

  state = {
    showAdvance: true
  };

  showAdvance = p => {
    this.setState({
      showAdvance:p
    }); 
  };
} 

export default withStyles(styleSheet, { name: "Report" })(translate("report")(RunReport));
