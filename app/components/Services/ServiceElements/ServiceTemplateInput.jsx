/**
 * by A. Prates, may-2018
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styleSheet } from "jss/Services/ServiceElements";
import { Typography, Paper, Grid } from "@material-ui/core";
import { PrimaryTextButton } from "components";
import { Trans } from "react-i18next";

class TemplateOption extends PureComponent {
  handlePreview = id => {};

  handleSelect = id => {
    const name = this.props.varName;
    const value = id;
    const event = { target: { name: name, value: value } };
    this.props.onChange(event);
  };

  render() {
    const { classes, selectedTemplate } = this.props;
    const { id, name, image, desc } = this.props.details;
    const isSelected = id === selectedTemplate;

    return (
      <Grid item className={classes.templateItem}>
        <Paper
          className={
            isSelected ? classes.templateSelectedPaper : classes.templatePaper
          }
        >
          <img src={image} width="100%" alt={name} />
          <Typography className={classes.templateTitle}>{name}</Typography>
          <Typography className={classes.templateDesc}>{desc}</Typography>
          {isSelected ? (
            <div className={classes.templateButtons} />
          ) : (
            <div className={classes.templateButtons}>
              <PrimaryTextButton onClick={event => this.handlePreview(id)}>
                <Trans>preview</Trans>
              </PrimaryTextButton>
              <PrimaryTextButton onClick={event => this.handleSelect(id)}>
                <Trans>select</Trans>
              </PrimaryTextButton>
            </div>
          )}
        </Paper>
      </Grid>
    );
  }
}

class ServiceTemplateInput extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    varName: PropTypes.string,
    serviceTemplates: PropTypes.array
  };

  render() {
    let { value, onChange, varName, serviceTemplates, classes } = this.props;
    return (
      <Grid container spacing={16} className={classes.templateGrid}>
        {serviceTemplates.map(template => (
          <TemplateOption
            key={template.id}
            details={template}
            classes={classes}
            onChange={onChange}
            varName={varName}
            selectedTemplate={value}
          />
        ))}
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceTemplateInput" })(
  ServiceTemplateInput
);
