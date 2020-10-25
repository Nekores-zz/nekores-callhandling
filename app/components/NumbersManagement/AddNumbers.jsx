import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { SteppedForm } from "components";
import { AddNumbersForm, ConfigureForm, DetailsForm } from "components/NumbersManagement";
import { styleSheet } from "jss/NumbersManagement/AddNumbers";
import { DiodeSearchable } from "utils/commonShapes";
import { bands } from "utils/bands";

class AddNumbers extends Component {
  static propTypes = {
    getNumbersConfiguration: PropTypes.func.isRequired,
    getNumberRange: PropTypes.func.isRequired,
    searchableAccounts: DiodeSearchable.isRequired,
    searchableServices: DiodeSearchable.isRequired,
    networks: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    allocation: PropTypes.func.isRequired,
    bands: PropTypes.array.isRequired,
    handleMoveNumber: PropTypes.func.isRequired,
    saveNumbers: PropTypes.func.isRequired,
    checkExistingNumbers: PropTypes.func.isRequired,
    firstValidateNumberConfig: PropTypes.func.isRequired,
    finalValidateNumberConfig: PropTypes.func.isRequired,
    showSnackbarError: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    detailsPanel: false,
    numberConfiguration: this.props.getNumbersConfiguration(),
    numberRange: this.props.getNumberRange(),
    existingNumbers: []
  };

  showDetailsPanel = value => this.setState({ detailsPanel: value });

  saveLocalContentStep = (content, doneCallback, panelIndex) => {
      const errors = this.props.firstValidateNumberConfig(
          content.numberRange.toScala(),
          content.numberConfiguration.toScala()
      );
      return this.props.checkExistingNumbers(content.numberConfiguration.setNumbers(content.numberRange.toScala()).toScala())
          .then(existingNumbers => new Promise((resolve, reject) => {
              if(Object.keys(errors).length){
                  reject({formErrors: errors});
              } else {
                  this.setState({
                      numberRange: content.numberRange,
                      numberConfiguration: content.numberConfiguration,
                      existingNumbers
                  });
                  resolve(doneCallback(panelIndex));
              }
          }));

  };

  saveContent = (content, doneCallback, panelIndex) => {
    const { numberConfiguration, numberRange } = this.state;
    const band = content.bandOverride ? content.band : 4;
    const newNumConfig = numberConfiguration.setNumbers(numberRange.toScala()).toScala();
    return this.props.saveNumbers(newNumConfig)
        .then(_ => {
            this.props.showSnackbarError(["Saving number was successful"]);
            doneCallback(panelIndex);
        });
  };

  forms = [
    {
      heading: "addNumbers",
      form: AddNumbersForm,
      data: {
        networks: this.props.networks,
        numberConfiguration: this.state.numberConfiguration,
        numberRange: this.state.numberRange,
      },
      saveForm: this.saveLocalContentStep
    },
    {
      heading: "configure",
      form: ConfigureForm,
      data: {
        statusOptions: this.props.statusOptions,
        allocation: this.props.allocation,
        searchableAccounts: this.props.searchableAccounts,
        searchableServices: this.props.searchableServices,
        bands: this.props.bands,
        showDetailsPanel: this.showDetailsPanel,
        numberConfiguration: this.state.numberConfiguration,
        numberRange: this.state.numberRange
      },
      saveForm: this.saveContent
    }
  ];

  renderDetailsPanel = () => {
    const { classes } = this.props;
    const { existingNumbers } = this.state;

    return (
      <Grid item className={classes.detailsWrapper}>
        <DetailsForm bands={this.props.bands} existingNumbers={existingNumbers} handleMoveNumber={this.props.handleMoveNumber} />
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    const { detailsPanel } = this.state;

    return (
      <div className={classes.pageContent}>
        {detailsPanel ? this.renderDetailsPanel() : null}

        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <SteppedForm forms={this.forms} mode="verticalLinear" ns="numbers" />
          </div>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AddNumbers" })(AddNumbers);
