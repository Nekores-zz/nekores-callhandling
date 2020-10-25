// this list page might need a full review

/**
 * by A. Prates, may-2018
 */
import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
import { ServiceTemplateDisplay } from "./ServiceElements";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Services/ListTemplates";

class ListTemplates extends Component {
  handleOpenTemplate = event => {
    // TODO: acctualy open template
  };

  render() {
    const { accountName, templates, classes, t } = this.props;

    return (
      <div className={classes.pageContent}>
        <Typography variant="subtitle1" align="left" className={classes.sectionHeader}>
          {t("templates", { accountName: accountName })}
        </Typography>

        <div className={classes.paper}>
          <ServiceTemplateDisplay
            onOpen={this.handleOpenTemplate}
            serviceTemplates={templates.filter(template => !template.isSimple)}
          />
        </div>

        <Typography variant="subtitle1" align="left" className={classes.sectionHeader}>
          {t("simple")}
        </Typography>

        <div className={classes.paper}>
          <ServiceTemplateDisplay
            onOpen={this.handleOpenTemplate}
            serviceTemplates={templates.filter(template => template.isSimple)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ListTemplates" })(
  translate("services")(ListTemplates)
);
