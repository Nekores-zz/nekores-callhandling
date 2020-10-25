import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import AccordionStep from "./AccordionStep";
import VerticalLinearStepper from "./VerticalLinearStepper";
import { styleSheet } from "jss/SteppedForm/StepLabelClasses";

class SteppedForm extends Component {
  static propTypes = {
    forms: PropTypes.array.isRequired,
    mode: PropTypes.string,
    ns: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  // mode options should be: [ "accordion" | "verticalLinear" | "horizontalLinear" | "tabbedWizard" ]
  static defaultProps = { mode: "accordion" };

  state = { showAdvance: false, expandedIndex: 0 };

  savePanel = (event, panelIndex, content) => {
    event.stopPropagation();
    return this.props.forms[panelIndex].saveForm(content, this.doneCallBack, panelIndex);
  };

  handleChange = index => event => {
    event.stopPropagation();
    this.setState({ expandedIndex: index != this.state.expandedIndex ? index : -1 });
  };

  handleBack = event => {
    event.stopPropagation();
    if (this.state.expandedIndex > 0)
      this.setState({ expandedIndex: this.state.expandedIndex - 1 });
  };

  doneCallBack = index =>
    this.setState({ expandedIndex: index < this.props.forms.length - 1 ? index + 1 : -1 });

  // componentDidMount() {}
  render = () => {
    const { forms, mode, ns, showAdvance, classes } = this.props;
    const { expandedIndex } = this.state;
    return (
      <Fragment>
        {mode === "accordion" ? (
          <Fragment>
            <>
              {forms.map((form, i) => (
                <AccordionStep
                  key={i}
                  index={i}
                  heading={form.heading}
                  expandedIndex={expandedIndex}
                  valid={form.valid}
                  blocked={form.blocked}
                  savePanel={this.savePanel}
                  onChange={() => this.handleChange(i)}
                  showAdvance={showAdvance}
                  data={form.data}
                  Form={form.form}
                  icon={form.icon}
                  ns={ns}
                />
              ))}
            </>
          </Fragment>
        ) : mode === "verticalLinear" ? (
          <VerticalLinearStepper
            forms={forms}
            expandedIndex={expandedIndex}
            savePanel={this.savePanel}
            handleBack={this.handleBack}
            ns={ns}
            // The use of "stepLabelClasses" is a dirty solution,
            // but the only working one!
            // It took me a day to figure out this work arround,
            // as the MuiStepper component has styling flaws.
            // - Antonio Prates
            stepLabelClasses={classes}
          />
        ) : mode === "horizontalLinear" ? (
          console.log("[ horizontalLinear ]: operation mode not yet implemented")
        ) : mode === "tabbedWizard" ? (
          console.log("[ SteppedForm ]: operation mode not yet implemented")
        ) : (
          console.log("[ SteppedForm ]: operation mode unknown!")
        )}
      </Fragment>
    );
  };
}

export default withStyles(styleSheet, { name: "SteppedForm" })(SteppedForm);
