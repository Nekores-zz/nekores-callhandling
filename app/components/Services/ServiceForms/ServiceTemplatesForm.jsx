/**
 * by A. Prates, may-2018
 * upated by A. Prates, jul-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { ConfirmButtons } from "components";
import { ServiceTemplateInput } from "../ServiceElements";
import { styleSheet } from "jss/Services/CreateService";

class ServiceTemplatesForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    selectedTemplate: null
  };

  formInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCancel = event => {};

  render() {
    const { savePanel, panelIndex, classes } = this.props;
    const { selectedTemplate } = this.state;
    const { serviceTemplates } = this.props.data;

    return (
      <div className={classes.internalForm}>
        <ServiceTemplateInput
          varName="selectedTemplate"
          value={selectedTemplate}
          onChange={this.formInputChange}
          serviceTemplates={serviceTemplates}
        />

        <ConfirmButtons
          onConfirm={event => savePanel(event, panelIndex, { ...this.state })}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceTemplatesForm" })(ServiceTemplatesForm);
