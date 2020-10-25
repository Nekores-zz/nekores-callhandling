import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Paper, Typography, Chip } from "@material-ui/core";
import { Holder, RoleChip, PrimaryTextButton } from "components";
import EditGroupsDialog from "./EditGroupsDialog";
import EditRolesDialog from "./EditRolesDialog";
import * as formFields from "./api/user";
import { styleSheet } from "jss/Users/EditProfileRolesAndGroups";

class EditProfileRolesAndGroups extends Component {
  static propTypes = {
    getGroupsHandler: PropTypes.func.isRequired,
    getAssignableRoles: PropTypes.func.isRequired,
    getEffectiveRoles: PropTypes.func.isRequired,
    getPermissionSets: PropTypes.func.isRequired,
    getCompositeRoles: PropTypes.func.isRequired,
    addRoles: PropTypes.func.isRequired,
    removeRole: PropTypes.func.isRequired,
    addGroups: PropTypes.func.isRequired,
    removeGroup: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,

    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    formName: formFields.EDIT_USER_FORM
  };

  state = {
    //roles: [],
    //groups: [],
    isRolesDialogOpen: false,
    isGroupsDialogOpen: false
  };

  handleCancel = () => this.props.history.replace("/users");

  handleGroupsChange = groups => {
    this.props.addGroups(groups.map(group => group.toScala()));
  };

  handleRolesChange = roles => {
    this.props.addRoles(roles.map(role => role.toScala()));
  };

  handleRemoveRole = role => () => {
    this.props.removeRole(role.toScala());
  };

  handleRemoveGroup = group => () => {
    this.props.removeGroup(group.toScala());
  };

  handleToggleGroupsDialog = isOpen => () => {
    if (isOpen) {
      this.props.getGroupsHandler().then(response => {
        this.setState({
          isGroupsDialogOpen: isOpen,
          availableGroups: response
        });
      });
    } else {
      this.setState({ isGroupsDialogOpen: isOpen });
    }
  };

  handleToggleRolesDialog = isOpen => () => {
    this.setState({ isRolesDialogOpen: isOpen });
  };

  /*  resetFields = (roles, groups) => this.setState({ roles, groups });

  componentWillMount() {
    //this.resetFields(this.props.roles, this.props.groups);
  }

  componentWillReceiveProps(newProps) {
    //this.resetFields(newProps.roles, newProps.groups);
  }*/

  render() {
    const { isRolesDialogOpen, isGroupsDialogOpen } = this.state;
    const { classes, roles, groups } = this.props;
    return (
      <div className={classes.pageContent}>
        <Paper className={classes.paper} elevation={4}>
          <Typography
            variant="subtitle1"
            align="left"
            className={classes.sectionHeader + " " + classes.marginBottomMedium}
          >
            Roles
          </Typography>

          <Holder onClick={this.handleToggleRolesDialog(true)} placeholder="Select roles">
            {roles.map(role => (
              <RoleChip
                key={role.id}
                name={role.name}
                // roleType={role.type.label}
                color={"#00bcd4"}
                onDelete={this.handleRemoveRole(role)}
              />
            ))}
          </Holder>

          <Grid container justify="space-between" spacing={16} wrap="nowrap">
            <Grid item className={classes.hintText}>
              <span className={classes.bold}>Sy</span> - System Roles &nbsp;&nbsp;&nbsp;
              <span className={classes.bold}>Ac</span> - Account Roles &nbsp;&nbsp;&nbsp;
              <span className={classes.bold}>Ag</span> - Aggregated Roles
            </Grid>
            <Grid item>
              <PrimaryTextButton
                onClick={this.handleToggleRolesDialog(true)}
                className={classes.marginBottomLarge}
                denseRight
              >
                Add roles
              </PrimaryTextButton>
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            align="left"
            className={classes.sectionHeader + " " + classes.marginBottomMedium}
          >
            Groups
          </Typography>

          <Holder onClick={this.handleToggleGroupsDialog(true)} placeholder="Select groups">
            {groups.map(group => (
              <Chip
                key={group.id}
                label={group.name}
                onDelete={this.handleRemoveGroup(group)}
                classes={{ root: classes.chip }}
              />
            ))}
          </Holder>

          <Grid container justify="flex-end" spacing={16} className={classes.marginBottomMedium}>
            <Grid item>
              <PrimaryTextButton
                onClick={this.handleToggleGroupsDialog(true)}
                className={classes.marginBottomMedium}
                denseRight
              >
                Add groups
              </PrimaryTextButton>
            </Grid>
          </Grid>
        </Paper>

        {isGroupsDialogOpen && (
          <EditGroupsDialog
            isOpen={isGroupsDialogOpen}
            onClose={this.handleToggleGroupsDialog(false)}
            onChange={this.handleGroupsChange}
            availableGroups={this.state.availableGroups}
          />
        )}

        {isRolesDialogOpen && (
          <EditRolesDialog
            isOpen={this.state.isRolesDialogOpen}
            onClose={this.handleToggleRolesDialog(false)}
            onChange={this.handleRolesChange}
            // getEffectiveRoles={this.props.getEffectiveRoles}
            getAssignableRoles={this.props.getAssignableRoles}
            getPermissionSets={this.props.getPermissionSets}
            getCompositeRoles={this.props.getCompositeRoles}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "EditProfileRolesAndGroups" })(
  EditProfileRolesAndGroups
);
