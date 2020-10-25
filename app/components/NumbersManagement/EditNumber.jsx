import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import { Text } from "components";
import { EditConfigureForm } from "components/NumbersManagement";
import { styleSheet } from "jss/NumbersManagement/EditNumber";
import { DiodeSearchable } from "utils/commonShapes";

class EditNumber extends Component {
  static propTypes = {
    bands: PropTypes.array.isRequired,
    searchableAccounts: DiodeSearchable.isRequired,
    searchableServices: DiodeSearchable.isRequired,
    statusOptions: PropTypes.array.isRequired,
    allocation: PropTypes.func.isRequired,
    saveNumber: PropTypes.func.isRequired,
    number: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  saveContent = (event, content) => {
    const { number } = content;
    this.props.saveNumbers(number);
  };

  render() {
    const { number,
            statusOptions,
            bands,
            allocation,
            searchableAccounts,
            searchableServices,
            classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper>
          <EditConfigureForm
            number={number}
            statusOptions={statusOptions}
            allocation={allocation}
            searchableAccounts={searchableAccounts}
            searchableServices={searchableServices}
            bands={bands}
            savePanel={this.saveContent}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "EditNumber" })(EditNumber);
