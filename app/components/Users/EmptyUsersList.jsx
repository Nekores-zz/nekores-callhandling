import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { Fab, Icon, Paper, Typography, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Users/EmptyUsersList";

class EmptyUsersList extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  handleNavigate = url => () => {
    this.props.history.push(url);
  };

  render() {
    let { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.pageContent}>
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="h5" component="h3">
              Start inviting users
            </Typography>

            <Typography component="p" className={classes.text}>
              Here you can invite users to lorem ipsum dolor sit ametconsectetur
              adipiscing elit. Sed do eiusmod tempor incididunt.
            </Typography>

            <SubmitButton onClick={this.handleNavigate("/users/invite")}>
              Get started
            </SubmitButton>
          </Paper>
        </div>
        <Fab
          onClick={this.handleNavigate("/users/invite")}
          color="secondary"
          size="large"
          className={classes.inviteUsersFab}
        >
          <Icon>add</Icon>
        </Fab>
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "EmptyUsersList" })(
  EmptyUsersList
);
