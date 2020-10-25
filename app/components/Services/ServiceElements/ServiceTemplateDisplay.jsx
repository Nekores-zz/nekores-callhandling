/**
 * by A. Prates, may-2018
 */
import { PrimaryTextButton } from "components";
import { styleSheet } from "jss/Services/ServiceElements";
import { Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class TemplateOption extends PureComponent {
  handlePreview = id => {};

  handleOpen = id => {
    const name = this.props.varName;
    const value = id;
    const event = { target: { name: name, value: value } };
    this.props.onOpen(event);
  };

  render() {
    const { classes } = this.props;
    const { id, name, imageUrl, desc } = this.props.details;

    return (
      <Grid item className={classes.templateItem}>
        <Paper className={classes.templatePaper}>
          <img src={imageUrl} width="100%" alt={name} />
          <Typography className={classes.templateTitle}>{name}</Typography>
          <Typography className={classes.templateDesc}>{desc}</Typography>
          <div className={classes.templateButtons}>
            <PrimaryTextButton onClick={event => this.handleOpen(id)}>
              Open
            </PrimaryTextButton>
          </div>
        </Paper>
      </Grid>
    );
  }
}

class ServiceTemplateDisplay extends PureComponent {
  static propTypes = {
    onOpen: PropTypes.func,
    serviceTemplates: PropTypes.array
  };

  render() {
    let { onOpen, serviceTemplates, classes } = this.props;
    return (
      <Grid container spacing={16} className={classes.templateGrid}>
        {serviceTemplates.map(template => (
          <TemplateOption
            key={template.id}
            details={template}
            classes={classes}
            onOpen={onOpen}
          />
        ))}
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "ServiceTemplateDisplay" })(
  ServiceTemplateDisplay
);
