/**
 * by A. Prates, may-2018
 * updated by A. Prates, jul-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Services/CreateService";
import { ConfirmButtons, SteppedForm } from "components";
import { ServiceDetailsForm, ServiceVersionForm, ServiceNumbersForm } from "./ServiceForms";
import { translate } from "react-i18next";

class CreateService extends Component {
  static propTypes = {
    getServiceData: PropTypes.func.isRequired,
    handleService: PropTypes.func.isRequired,
    validateServiceData: PropTypes.func,
    // serviceTemplates: PropTypes.array.isRequired,
    // versions: PropTypes.array.isRequired,
    // numbers: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = { validatedForms: {} };

  // updatePanel = (response, doneCallback, panelIndex) => {
  //   this.forms[panelIndex].valid = !!response;
  //   const { validatedForms } = this.state;
  //   const key = Object.keys(validatedForms).find(
  //     key => key.toLowerCase() === this.forms[panelIndex].heading.toLowerCase()
  //   );
  //   if (key) validatedForms[key] = !!response;
  //   console.log("[ CreateService ]: save action on " + key + " form performed!");
  //   this.setState({ validatedForms });
  //   doneCallback(panelIndex);
  // };

  // handleService = (content, doneCallback, panelIndex) => {
  //   const errors = this.props.validateServiceData(content.toScala());

  //   if (Object.keys(errors).length) {
  //     console.log("[ CreateService ]: validateServiceData (scalajs only) errors: ");
  //     console.log(errors);
  //   }

  //   return Object.keys(errors).length
  //     ? new Promise((resolve, reject) => {
  //         reject({ formErrors: errors });
  //       })
  //     : this.props
  //         .handleService(content.toScala())
  //         .then(response => this.updatePanel(response, doneCallback, panelIndex));
  // };

  handleService = (content, doneCallback, panelIndex) =>
    this.props.handleService(content.toScala()).then(_ => doneCallback(panelIndex));

  handleSave = event => {};
  handleCancel = event => {};
  handleDelete = event => {};

  forms = [
    {
      heading: "serviceDetails",
      form: ServiceDetailsForm,
      data: {
        getServiceData: this.props.getServiceData
      },
      saveForm: this.handleService,
      valid: false
    }
    // {
    //   heading: "template",
    //   form: ServiceTemplatesForm,
    //   data: {
    //     serviceTemplates: this.props.serviceTemplates
    //   },
    //   saveForm: this.saveContent,
    //   valid: false
    // },
    // {
    //   heading: "version",
    //   form: ServiceVersionForm,
    //   data: {
    //     versions: this.props.versions
    //   },
    //   saveForm: this.saveContent,
    //   valid: false
    // },
    // {
    //   heading: "numbers",
    //   form: ServiceNumbersForm,
    //   data: {
    //     serviceNumbers: this.props.numbers
    //   },
    //   saveForm: this.saveContent,
    //   valid: false
    // }
  ];

  // componentDidMount = () => {
  //   this.props.getServiceForms().then(validatedForms => {
  //     const keys = Object.keys(validatedForms);
  //     keys.forEach(key => {
  //       const form = this.forms.find(form => form.heading.toLowerCase() === key.toLowerCase());
  //       if (form) form.valid = validatedForms[key];
  //     });
  //     this.setState({ validatedForms });
  //   });
  // };

  render = () => {
    const { classes, t } = this.props;

    return (
      <div className={classes.pageContent}>
        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <SteppedForm forms={this.forms} ns="services" />

            <ConfirmButtons
              className={classes.buttons}
              confirmLabel={t("saveAndDesign")}
              onConfirm={this.handleSave}
              onCancel={this.handleCancel}
              altActionLabel={t("deleteService")}
              onAltAction={this.handleDelete}
            />
          </div>
        </Grid>
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "CreateService" })(
  translate("services")(CreateService)
);
