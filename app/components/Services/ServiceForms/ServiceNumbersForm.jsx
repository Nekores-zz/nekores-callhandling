/**
 * by A. Prates, may-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { ConfirmButtons } from "components";
import { ServiceNumbersDisplay } from "../ServiceElements";
import { styleSheet } from "jss/Services/CreateService";

class ServiceNumbersForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  handleCancel = event => {};
  handleSkip = event => {};

  render() {
    const { savePanel, panelIndex, classes } = this.props;
    const { serviceNumbers } = this.props.data;

    return (
      <div className={classes.internalForm}>
        <ServiceNumbersDisplay serviceNumbers={serviceNumbers} />

        <br />
        <br />

        <ConfirmButtons
          onConfirm={event => savePanel(event, panelIndex, { ...this.state })}
          onCancel={this.handleCancel}
          onAltAction={this.handleSkip}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceNumbersForm" })(ServiceNumbersForm);
