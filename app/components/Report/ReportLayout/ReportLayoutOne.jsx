/**
 * by Sajid U. / OCT-2019
 */

import React, { Component, Fragment } from "react";
import { Paper, Grid, withStyles } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { translate } from "react-i18next";
import { SimpleForm } from "../ReportElement/Form";
import { HubbubChart } from "components/Charts";
import { WideTable, CollapseRowTable } from "components/Report/ReportElement/";
import ReportOutputHeader from "../ReportOutput/ReportOutputHeader";
import ReportOutputTopPanel from "../ReportOutput/ReportOutputTopPanel";
import { styleSheet } from "jss/Report/ReportOutput/ReportOutput";
import { HubbubCardGroup } from "../ReportElement/Card/";

class ReportLayoutOne extends Component {
  static propTypes = {
    selectedReport: PropTypes.object.isRequired,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    showVisualization: this.props.selectedReport.params.showVisualization
  };

  showVisualization = () => {
    this.setState({ showVisualization: !this.state.showVisualization });
  };

  render() {
    const {
      getReportData,
      selectedReport,
      services,
      data,
      numbers,
      timePeriods,
      collapseRowTableData,
      classes,
      t
    } = this.props;
    return (
      <Fragment>
        <SimpleForm
          getReportData={getReportData}
          services={services}
          numbers={numbers}
          timePeriods={timePeriods}
          selectedReport={selectedReport}
          showVisualization={this.showVisualization}
        />
        <br />
        <Paper className={classes.root} square={true}>
          <Grid>
            <ReportOutputHeader data={selectedReport} />
            <ReportOutputTopPanel data={selectedReport} />
            {this.state.showVisualization && (
              <>
                {selectedReport.params.showGraph && (
                  <>
                    <br />
                    <HubbubChart selectedReport={selectedReport} />
                  </>
                )}
                {selectedReport.params.showSummary && (
                  <>
                    <br />
                    <div className={classes.hubbubCard}>
                      <HubbubCardGroup selectedReport={selectedReport} />
                    </div>
                  </>
                )}
                <br />
              </>
            )}
            <br />
            <br />
            <div className={classes.ReportOutputTable}>
              {selectedReport.table.type === "wideTable" ? (
                <>
                  <CollapseRowTable collapseRowTableData={collapseRowTableData} />
                  {/* <WideTable
                      selectedReport={data}
                      defaultPageSize={5}
                      className="-striped -highlight"
                      ResizerComponent={() => null}
                    /> */}
                </>
              ) : (
                <CollapseRowTable collapseRowTableData={collapseRowTableData} />
              )}
            </div>
            <br />
            <br />
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "ReportLayoutOne" })(
  translate("report")(ReportLayoutOne)
);
