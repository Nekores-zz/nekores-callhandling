import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Grid,
  Paper,
  Typography,
  Chip,
  Divider,
  Avatar
} from "@material-ui/core";
import { styleSheet } from "jss/Users/ViewProfile";
import { RoleChip } from "components";
import Status from "./Status";

class ViewProfile extends Component {
  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    //history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  navigate = url => () => {
    this.props.history.push(url);
  };

  getRoleType = role => {
    return "Sy";
  };

  getRoleColor = role => {
    return "#00bcd4";
  };

  render() {
    const { classes, userProfile, roles, groups } = this.props;

    return (
      <div className={classes.pageContent}>
        <Paper className={classes.paper} elevation={4}>
          <Grid
            container
            direction="row"
            spacing={40}
            className={classes.marginBottomSmall}
          >
            <Grid item>
              <Avatar
                src={userProfile.avatar}
                classes={{ root: classes.avatar }}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.userName}>
                {userProfile.firstName} {userProfile.lastName}
              </Typography>
              <Grid
                container
                direction="row"
                spacing={16}
                alignItems="center"
                className={classes.marginBottomSmall}
              >
                <Grid item>
                  <Typography className={classes.userJob}>
                    {userProfile.job}
                  </Typography>
                </Grid>
                <Grid item>
                  <Status status={userProfile.status} />
                </Grid>
              </Grid>
              <Typography className={classes.userFieldCaption}>
                User ID
              </Typography>
              <Typography className={classes.userFieldText}>
                {userProfile.id}
              </Typography>
              <br />
              <Typography className={classes.userFieldCaption}>
                Email
              </Typography>
              <Typography className={classes.userFieldText}>
                {userProfile.email}
              </Typography>
              <br />
              <Typography className={classes.userFieldCaption}>
                Telephone
              </Typography>
              <Typography className={classes.userFieldText}>
                {userProfile.telephone}
              </Typography>
              <br />
              <Typography className={classes.userFieldCaption}>
                Mobile
              </Typography>
              <Typography className={classes.userFieldText}>
                {userProfile.mobile}
              </Typography>
              <br />
            </Grid>
          </Grid>
          <Divider classes={{ root: classes.marginBottom }} />
          <Typography
            variant="subtitle1"
            align="left"
            className={[classes.sectionHeader, classes.marginBottomSmall].join(
              " "
            )}
          >
            Skills
          </Typography>
          <Grid
            container
            direction="row"
            spacing={8}
            className={classes.marginBottom}
          >
            {userProfile.skills.map(skill => (
              <Grid item key={skill}>
                <Chip label={skill} />
              </Grid>
            ))}
          </Grid>
          <Divider classes={{ root: classes.marginBottom }} />
          <Typography
            variant="subtitle1"
            align="left"
            className={[classes.sectionHeader, classes.marginBottomSmall].join(
              " "
            )}
          >
            Roles
          </Typography>
          <Grid
            container
            direction="row"
            spacing={8}
            className={classes.marginBottom}
          >
            {roles.map(role => (
              <Grid item key={role.id}>
                <RoleChip
                  label={role.name}
                  name={role.name}
                  roleType={this.getRoleType(role)}
                  color={this.getRoleColor(role)}
                />
              </Grid>
            ))}
          </Grid>
          <Divider classes={{ root: classes.marginBottom }} />
          <Typography
            variant="subtitle1"
            align="left"
            className={[classes.sectionHeader, classes.marginBottomSmall].join(
              " "
            )}
          >
            Groups
          </Typography>
          <Grid
            container
            direction="row"
            spacing={8}
            className={classes.marginBottomSmall}
          >
            {groups.map(group => (
              <Grid item key={group.id}>
                <Chip label={group.name} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ViewProfile" })(ViewProfile);
