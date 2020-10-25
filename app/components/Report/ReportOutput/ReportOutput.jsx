/**
 * by Sajid U. / OCT-2019
 */

import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { translate } from "react-i18next";
import {Text} from "components";
import { styleSheet } from "jss/Report/ReportOutput/ReportOutput";
import { ReportLayoutOne } from "../ReportLayout";

class ReportOutput extends Component {
  static propTypes = {
    selectedReport: PropTypes.object.isRequired,
    classes: PropTypes.object,
    t: PropTypes.func
  };
  state = {
    reports: this.props.reports,
    data: {
      columns: [
        {
          fixed: "left",
          columns: [
            {
              Header: this.props.t("service"),
              accessor: "service",
               width: 200,
              Footer: row => {
                return (
                  <>
                   <Text variant={"sectionHeaders"}>{this.props.t("average")}</Text><br/>
                  <Text variant={"sectionHeaders"}>{this.props.t("total")}</Text>
                 </>
                 )
              },
            }
          ]
        },

        {
          columns: [
            {
              Header: this.props.t("number"),
              accessor: "number",
              width: 200
            },

            {
              Header: this.props.t("description"),
              accessor: "description",
              width: 150
            },

            {
              Header: this.props.t("attempts"),
              accessor: "attempts",
              width: 150,
              Footer: row => {
                const length = row.data.length;
                const ageSum = row.data.map(({ attempts }) => attempts).reduce((a, b) =>parseFloat(a) +parseFloat(b), 0);
                const average = Math.round(ageSum / length);
                const total=Math.round(ageSum)
                return (
                  <>
                  <Text variant={"sectionHeaders"}>{average}</Text><br/>
                  <Text variant={"sectionHeaders"}>{total}</Text>
                  </>
                  );
              }
            },
            {
              Header: this.props.t("connected"),
              accessor: "connected",
              width: 150,
              Footer: row => {
                const length = row.data.length;
                const ageSum = row.data.map(({ connected }) => connected).reduce((a, b) =>parseFloat(a) +parseFloat(b), 0);
                const average = Math.round(ageSum / length);
                const total=Math.round(ageSum)
                return (
                 <>
                  <Text variant={"sectionHeaders"}>{average}</Text><br/>
                  <Text variant={"sectionHeaders"}>{total}</Text>
                 </>
                  );
              }
            },
            {
              Header: this.props.t("connectedPercent"),
              accessor: "connectedPercent",
              width: 150,
              Footer: row => {
                const length = row.data.length;
                const ageSum = row.data.map(({ connectedPercent }) => connectedPercent).reduce((a, b) =>parseFloat(a) +parseFloat(b), 0);
                const average = Math.round((length / ageSum)*100);
                const total=Math.round((length/ageSum)*100);
                return (
                  <>
                  <Text variant={"sectionHeaders"}>{average}%</Text><br/>
                  <Text variant={"sectionHeaders"}>{total}%</Text>
                 </>
                 );
              }
            },
            {
              Header: this.props.t("busy"),
              accessor: "busy",
              width: 150,
              Footer: row => {
                const length = row.data.length;
                const ageSum = row.data.map(({ busy }) => busy).reduce((a, b) =>parseFloat(a) +parseFloat(b), 0);
                const average = Math.round((length / ageSum)*100);
                const total=Math.round(ageSum);
                return (
                  <>
                  <Text variant={"sectionHeaders"}>{average}</Text><br/>
                  <Text variant={"sectionHeaders"}>{total}</Text>
                 </>
                 );
              }
              
            },
            {
              Header: this.props.t("busyPercent"),
              accessor: "busyPercent",
              // id: "busyPercent",
              width: 150,
              Footer: row => {
                const length = row.data.length;
                const ageSum = row.data.map(({ busyPercent }) => busyPercent).reduce((a, b) =>parseFloat(a) +parseFloat(b), 0);
                const average = Math.round(length / ageSum);
                const total=Math.round((length/ageSum)*100);
                return (
                  <>
                  <Text variant={"sectionHeaders"}>{average} %</Text><br/>
                  <Text variant={"sectionHeaders"}>{total} %</Text>
                 </>
                  );
              }
            },
            {
              Header: this.props.t("notAnswered"),
              accessor: "notAnswered",
              width: 150
            },
            {
              Header: this.props.t("abandoned"),
              accessor: "abandoned",
              width: 150,
              Footer: row => {
                const length = row.data.length;
                const ageSum = row.data.map(({ abandoned }) => abandoned).reduce((a, b) =>parseFloat(a) +parseFloat(b), 0);
                const average = Math.round((length / ageSum)*100);
                const total=Math.round(ageSum);
                return (
                  <>
                  <Text variant={"sectionHeaders"}>{average}</Text><br/>
                  <Text variant={"sectionHeaders"}>{total}</Text>
                 </>
                 );
              }
            },
            {
              Header: this.props.t("abandonedPercent"),
              accessor: "abandonedPercent",
              width: 150,
              Footer: row => {
                const length = row.data.length;
                const ageSum = row.data.map(({ abandonedPercent }) => abandonedPercent).reduce((a, b) =>parseFloat(a) +parseFloat(b), 0);
                const average = Math.round((length/ageSum)*100);
                const total=Math.round(ageSum);
                return (
                  <>
                  <Text variant={"sectionHeaders"}>{average} %</Text><br/>
                  <Text variant={"sectionHeaders"}>{total} %</Text>
                 </>
                  );
              }
            },
            {
              Header: this.props.t("talkTime"),
              accessor: "talkTime",
              width: 150
            },
            {
              Header: "Status",
              accessor: "status"
            }
          ]
        }
      ],
      values: this.props.selectedReport.table.data
    }
  };

  render() {
    const {

      getReportData,
      selectedReport,
      services,
      enableVisualization,
      numbers,
      timePeriods,
      collapseRowTableData,
      classes,
      t
    } = this.props;
    const { data } = this.state;
    return (
      <Fragment>
        {selectedReport.params.layoutType === "lout1" || selectedReport.params.layoutType === undefined ? (
          <ReportLayoutOne
            getReportData={getReportData}
            collapseRowTableData={collapseRowTableData}
            services={services}
            numbers={numbers}
            timePeriods={timePeriods}
            selectedReport={selectedReport}
            enableVisualization={enableVisualization}
            data={data}
          />
        ) : (
          selectedReport.params.layoutType === "lout2" ? console.log("Not Implemented yet!!!!") : null
        )}
      </Fragment>
    );
  }
} 

export default withStyles(styleSheet, { name: "ReportOutput" })(translate("report")(ReportOutput));
