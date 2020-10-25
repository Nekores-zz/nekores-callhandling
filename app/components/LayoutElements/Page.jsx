import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Grid, Paper as MUIPaper, withStyles } from "@material-ui/core";
import { contentStyleSheet, paperStyleSheet } from "jss/LayoutElements/Page";

const Content = withStyles(
  contentStyleSheet, 
  { name: "Content" },
) (

  class Content extends PureComponent {
    static propTypes = {
      classes: PropTypes.object.isRequired,
    };

    render() {
      let { 
        classes, 
        children,
      } = this.props;
      return (
        <div className={classes.pageContent}>
          <Grid item className={classes.wrapper}>
            <div className={classes.root}>
              {children}
            </div>
          </Grid>
        </div>
      );
    }
  }

);

const Paper = withStyles(
  paperStyleSheet, 
  { name: "Paper" },
) (

  class Paper extends PureComponent {
    static propTypes = {
      classes: PropTypes.object.isRequired,
    };

    render() {
      let { 
        classes, 
        children,
      } = this.props;
      return (
        <MUIPaper elevation={4} className={classes.paper}>
          {children}
        </MUIPaper>
      );
    }
  }

);

export const Page = {
  Content,
  Paper,
};