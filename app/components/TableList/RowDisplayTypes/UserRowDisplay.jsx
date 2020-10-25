/**
 * by A. Prates, aug-2018
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Avatar, Chip, Grid, Typography, withStyles } from "@material-ui/core";
import { RoleChip, Pending } from "components";
import Status from "components/Users/Status";
import { PromiseWithCallback } from "utils/promise";
import { translate } from "react-i18next";
import { styleSheet } from "jss/components/TableList/RowDisplayPanel";

class UserRowDisplay extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  getRoles = () => {
    return PromiseWithCallback(
      this.props.rowData.fetchUserRoles(this.props.rowData.userProfile.id),
      this.setRolesCount
    );
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  setRolesCount = roles => this.setState({ rolesCount: roles.length });

  getGroups = () => {
    return PromiseWithCallback(
      this.props.rowData.fetchUserGroups(this.props.rowData.userProfile.id),
      this.setGroupsCount
    );
  };

  setGroupsCount = groups => this.setState({ groupsCount: groups.length });

  componentWillMount() {
    this.setState({
      rolesPromise: this.getRoles(),
      groupsPromise: this.getGroups()
    });
  }

  getRoleType = role => "Sy";
  getRoleColor = role => "#00bcd4";

  renderRoles = roles => {
    return roles.map(role => (
      <Grid item key={role.id}>
        <RoleChip
          label={role.name}
          name={role.name}
          roleType={this.getRoleType(role)}
          color={this.getRoleColor(role)}
          className={clsx(this.props.classes.pill, this.props.classes.roleChipFix)}
        />
      </Grid>
    ));
  };

  renderGroups = groups => {
    return groups.map(group => (
      <Grid item key={group.id}>
        <Chip label={group.name} className={this.props.classes.pill} />
      </Grid>
    ));
  };

  render() {
    const { rowData, classes, t } = this.props;
    const { userProfile } = rowData;
    const { rolesPromise, groupsPromise } = this.state;

    return (
      <div className={classes.contentWrapper}>
        <Grid
          container
          direction="row"
          justify="space-between"
          spacing={40}
          className={classes.grid}
        >
          <Grid item className={classes.gridRight}>
            <Grid container direction="row" spacing={16}>
              <Grid item>
                <Typography className={classes.contentText}>{userProfile.jobTitle}</Typography>
              </Grid>
              <Grid item>
                <Status status={userProfile.status} />
              </Grid>
            </Grid>
            <br />
            <br />

            <Typography variant="caption">User ID</Typography>
            <Typography className={classes.contentText}>{userProfile.id}</Typography>
            <br />
            <br />

            <Typography variant="caption">{t(userProfile.fieldEmail)}</Typography>
            <Typography className={classes.contentText}>{userProfile.email}</Typography>
            <br />
            <br />

            <Typography variant="caption">{t(userProfile.fieldTelephone)}</Typography>
            <Typography className={classes.contentText}>{userProfile.telephone}</Typography>
            <br />
            <br />

            <Typography variant="caption">{t(userProfile.fieldMobile)}</Typography>
            <Typography className={classes.contentText}>{userProfile.mobile}</Typography>
          </Grid>
          <Grid item>
            <Avatar src={userProfile.avatar} classes={{ root: classes.avatar }} />
          </Grid>
        </Grid>

        <Typography variant="caption">{t(userProfile.fieldSkills)}</Typography>
        <Grid
          container
          direction="row"
          spacing={8}
          className={clsx(classes.marginTopLess, classes.marginBottomLess)}
        >
          {userProfile.skills.map(skill => (
            <Grid item key={skill}>
              <Chip label={skill} className={classes.pill} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption">{t("roles")}</Typography>
        <Grid
          container
          direction="row"
          spacing={8}
          className={clsx(classes.marginTopLess, classes.marginBottomLess)}
        >
          <Pending content={rolesPromise} onResponse={this.renderRoles} onFail={this.onFail} />
        </Grid>

        <Typography variant="caption">{t("groups")}</Typography>
        <Grid
          container
          direction="row"
          spacing={8}
          className={clsx(classes.marginTopLess, classes.marginBottomLess)}
        >
          <Pending content={groupsPromise} onResponse={this.renderGroups} onFail={this.onFail} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "UserRowDisplay" })(
  translate("users")(UserRowDisplay)
);
