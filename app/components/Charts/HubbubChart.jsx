/**
 * by Sajid U. / JAN-2020
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
import { withStyles, CircularProgress } from "@material-ui/core";
import { styleSheet } from "jss/Charts/HubbubChart";
import {Text} from "components/LayoutElements";

class HubbubChart extends Component {
  static propTypes = {
    data: PropTypes.any,
    chartTitle: PropTypes.string,
    width: PropTypes.bool,
    height: PropTypes.bool
  };
  render() {
    const { chartTitle, selectedReport, classes, ...props } = this.props;

    return (
      <div className={classes.root}>
        <Text variant="primarymallBody" bold className={classes.chartTitle}>
          {selectedReport.graph.title ? selectedReport.graph.title : null}
        </Text>
        <Chart
          className={classes.chartParent}
          chartType={selectedReport.graph.type}
          loader={<CircularProgress disableShrink className={classes.circularProgress} size={24} />}
          data={selectedReport.graph.data}
          options={selectedReport.graph.options}
          height={selectedReport.graph.options.height}
          {...props}
        />
      </div>
    );
  }
}
export default withStyles(styleSheet, { name: "HubbubChart" })(HubbubChart);
