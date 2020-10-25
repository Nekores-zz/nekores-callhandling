import React, { Component } from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class WideTable extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { selectedReport, ...props } = this.props;
    const { values, columns} = selectedReport;
    return <ReactTableFixedColumns data={values} columns={columns} {...props} />;
  }
}

export default WideTable;
