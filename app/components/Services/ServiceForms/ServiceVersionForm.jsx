/**
 * by A. Prates, may-2018
 * upated by A. Prates, jul-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { ConfirmButtons } from "components";
//import { ServiceVersionInput } from "../ServiceElements";
import { styleSheet } from "jss/Services/CreateService";

class ServiceVersionForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    selectedVersion: null
  };

  formInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCancel = event => {};

  render() {
    const { savePanel, panelIndex, classes } = this.props;
    const { selectedVersion } = this.state;
    const { versions } = this.props.data;

    return (
      <div className={classes.internalForm}>
        {/*
        ...ServiceVersionInput was removed!
        If this form is ever to be used...
        Find new implementation using SearchableChipSelector in ServiceSettingsForm

        <ServiceVersionInput
          varName="selectedVersion"
          value={selectedVersion}
          onChange={this.formInputChange}
          versionsList={versions}
        /> */}

        <br />
        <br />

        <ConfirmButtons
          onConfirm={event => savePanel(event, panelIndex, { ...this.state })}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceVersionForm" })(ServiceVersionForm);
