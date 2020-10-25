import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepConnector,
  withStyles
} from "@material-ui/core";
import { I18n } from "react-i18next";
import { styleSheet } from "jss/SteppedForm/VerticalLinearStepper";

class VerticalLinearStepper extends Component {
  static propTypes = {
    forms: PropTypes.array.isRequired,
    expandedIndex: PropTypes.number.isRequired,
    savePanel: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    ns: PropTypes.string,
    classes: PropTypes.object.isRequired,
    stepLabelClasses: PropTypes.object.isRequired
  };

  render() {
    const {
      forms,
      expandedIndex,
      savePanel,
      handleBack,
      ns,
      classes,
      stepLabelClasses
    } = this.props;

    return (
      <I18n ns={ns}>
        {(t, { i18n }) => (
          <Stepper
            activeStep={expandedIndex}
            orientation="vertical"
            connector={<StepConnector classes={{ line: classes.connectorLine }} />}
            elevation={4}
          >
            {forms.map((form, index) => (
              <Step key={form.heading}>
                <StepLabel
                  classes={{ label: classes.labelText }}
                  StepIconProps={{ classes: stepLabelClasses }}
                >
                  {t(form.heading)}
                </StepLabel>
                <StepContent classes={{ root: classes.contentRoot }}>
                  <form.form
                    savePanel={savePanel}
                    handleBack={handleBack}
                    panelIndex={index}
                    data={form.data}
                  />
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      </I18n>
    );
  }
}

export default withStyles(styleSheet, { name: "VerticalLinearStepper" })(VerticalLinearStepper);
