import React, { Component } from "react";
import clsx from "clsx";
import { translate } from "react-i18next";
import { PropTypes } from "prop-types";
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Accordion } from "../Accordion";
import { styleSheet } from "jss/Report/ReportElement/Table/CollapseRowTable";

class CollapseRowTable extends Component {
  static propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func
  };

  render() {
    const { collapseRowTableData, classes, t } = this.props;
    const { columns, values } = collapseRowTableData;
    
    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHead}>
              {columns.map((item, index) => (
                <TableCell key={index}>
                  <b>{t(item)} </b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((row, index) => (
              <TableRow key={index}>
                <TableCell className={classes.paddingNone}>
                  <Accordion
                    headingText={row.location}
                    accordionRootStyle={classes.accordionRootStyle}
                    accordionSummaryStyle={classes.accordionSummaryStyle}
                    accordionDetailStyle={classes.accordionDetailStyle}
                  >
                    {row.subData.map((itemRow, index) => (
                      <TableRow
                        key={index}
                        className={clsx(classes.displayTable, "dynamicDataRow")}
                      >
                        {columns.map((item, index) => (
                          <TableCell key={index}>{itemRow[item]}</TableCell>
                        ))}
                      </TableRow>
                    ))}

                    <TableRow className={clsx(classes.displayTable, classes.tableFooter)}>
                      <TableCell>{t("average")}</TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell>12,233</TableCell>
                      <TableCell>11,111</TableCell>
                      <TableCell>1.5</TableCell>
                    </TableRow>

                    <TableRow className={clsx(classes.displayTable, classes.tableFooter)}>
                      <TableCell>{t("total")}</TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell>43,123</TableCell>
                      <TableCell>12,224</TableCell>
                      <TableCell>1.5</TableCell>
                    </TableRow>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}

            <TableRow className={clsx(classes.displayTable, classes.tableFooter)}>
              <TableCell colSpan={3}>{t("grandAverage")}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell>12,95</TableCell>
              <TableCell>12,95</TableCell>
              <TableCell>1.5</TableCell>
            </TableRow>
            <TableRow className={clsx(classes.displayTable, classes.tableFooter)}>
              <TableCell>{t("grandTotal")}</TableCell>
              <TableCell />
              <TableCell className={classes.bdrLeftNone} />
              <TableCell>22,1123</TableCell>
              <TableCell>22,1237</TableCell>
              <TableCell>1.5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "CollapseRowTable" })(
  translate("report")(CollapseRowTable)
);
