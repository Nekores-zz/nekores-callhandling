import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  CircularProgress,
  Grid,
  Typography,
  Button,
  IconButton,
  Chip,
  Icon
} from "@material-ui/core";
import { Holder, RoleChip, TextField, SubmitButton, PrimaryTextButton } from "components";
import EditGroupsDialog from "../EditGroupsDialog";
import EditRolesDialog from "../EditRolesDialog";
import { styleSheet } from "jss/Users/InviteByCredentialsForm";

class InviteByCredentialsForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    getGroupsHandler: PropTypes.func.isRequired,
    getRolesHandler: PropTypes.func.isRequired,
    getEffectiveRolesHandler: PropTypes.func.isRequired,
    errors: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    users: [{ email: "", firstName: "", lastName: "" }],
    roles: [],
    groups: [],
    isRolesDialogOpen: false,
    isGroupsDialogOpen: false,
    loading: false
  };

  handleInviteAnotherUser = () => {
    let user = { email: "", firstName: "", lastName: "" };
    let users = [...this.state.users, user];
    this.setState({ users });
  };

  handleRemoveUser = user => () => {
    let users = this.state.users.filter(u => u !== user);
    this.setState({ users });
  };

  handleFieldChange = (user, fieldName) => event => {
    let { value } = event.target;
    let updatedUser = { ...user, [fieldName]: value };
    let users = this.state.users.map(u => (u === user ? updatedUser : u));
    this.setState({ users });
  };

  handleGroupsChange = groups => {
    this.setState({ groups });
  };

  handleRolesChange = roles => {
    this.setState({ roles });
  };

  handleRemoveRole = role => () => {
    let roles = this.state.roles.filter(r => r !== role);
    this.setState({ roles });
  };

  handleRemoveGroup = group => () => {
    let groups = this.state.groups.filter(g => g !== group);
    this.setState({ groups });
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
    if (isOpen) {
      this.props.getRolesHandler().then(response => {
        this.setState({ isRolesDialogOpen: isOpen, availableRoles: response });
      });
    } else {
      this.setState({ isRolesDialogOpen: isOpen });
    }
  };

  getFieldErrorMessage = (index, fieldName) => {
    let user =
      (this.state.response &&
        this.state.response.formErrors &&
        this.state.response.formErrors["users[" + index + "]"]) ||
      (this.state.response &&
        this.state.response.apiErrors &&
        this.state.response.apiErrors["users[" + index + "]"]);
    return user && user[fieldName];
  };

  isFieldInvalid = (userIndex, fieldName) => {
    return !!this.getFieldErrorMessage(userIndex, fieldName);
  };

  isFormValid = () => {
    let { errors } = this.props;
    return true; //!errors || !Object.keys(errors);
  };

  timer = null;

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };

  dummySubmitHandler = event => {
    event.stopPropagation();
    if (!this.state.loading) {
      this.setState({ loading: true }, () => {
        this.timer = setTimeout(() => {
          this.setState({ loading: false });
          this.submitHandler();
        }, 2000);
      });
    }
  };

  submitHandler = () => {
    this.props
      .submitHandler(
        this.props.option,
        this.props.formName,
        this.state.users,
        this.state.groups.map(grp => grp.id),
        this.state.roles.map(role => role.roleId)
      )
      .then(response => {
        console.log();
      })
      .catch(response => {
        console.log(response);
        this.setState({ response });
      });
  };

  render() {
    const { classes, getEffectiveRolesHandler } = this.props;
    const { users, roles, groups, isRolesDialogOpen, isGroupsDialogOpen } = this.state;
    const { loading } = this.state;

    return (
      <form onSubmit={this.submitHandler}>
        <Typography
          variant="subtitle1"
          align="left"
          className={[classes.sectionHeader, classes.marginBottomSmall].join(" ")}
        >
          Invite users
        </Typography>
        {users.map((user, i) => (
          <Grid
            key={i}
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            spacing={40}
          >
            <Grid item className={classes.emailGridItem}>
              <TextField
                onChange={this.handleFieldChange(user, "email")}
                value={user.email}
                required
                fullWidth
                name="email"
                label="Email (Username)"
                error={this.isFieldInvalid(i, "email")}
                helperText={this.getFieldErrorMessage(i, "email")}
              />
            </Grid>
            <Grid item className={classes.nameGridItem}>
              <TextField
                onChange={this.handleFieldChange(user, "firstName")}
                value={user.firstName}
                required
                fullWidth
                name="firstName"
                label="First name"
                error={this.isFieldInvalid(i, "firstName")}
                helperText={this.getFieldErrorMessage(i, "firstName")}
              />
            </Grid>
            <Grid item className={classes.nameGridItem}>
              <TextField
                onChange={this.handleFieldChange(user, "lastName")}
                value={user.lastName}
                required
                fullWidth
                name="lastName"
                label="Last name"
                error={this.isFieldInvalid(i, "lastName")}
                helperText={this.getFieldErrorMessage(i, "lastName")}
              />
            </Grid>
            <Grid item className={classes.removeUserItem}>
              <IconButton onClick={this.handleRemoveUser(user)}>
                <Icon>clear</Icon>
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid container justify="flex-end" spacing={16}>
          <Grid item>
            <PrimaryTextButton
              onClick={this.handleInviteAnotherUser}
              className={classes.marginBottomLarge}
              denseRight
            >
              Invite another user
            </PrimaryTextButton>
          </Grid>
        </Grid>
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
              key={role.getId}
              roleName={role.getName}
              roleType={"Ac"}
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
              Edit roles
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
              key={group.getId}
              label={group.getName}
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
              Edit groups
            </PrimaryTextButton>
          </Grid>
        </Grid>

        <Grid container justify="flex-end" spacing={16}>
          <Grid item className={classes.wrapper}>
            <Button onClick={this.props.onCancel} variant="text">
              Cancel
            </Button>
          </Grid>
          <Grid item className={classes.wrapper}>
            <SubmitButton
              disabled={!this.isFormValid() || loading}
              submitHandler={this.dummySubmitHandler}
            >
              Invite
            </SubmitButton>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Grid>
        </Grid>

        {this.state.isGroupsDialogOpen && (
          <EditGroupsDialog
            isOpen={this.state.isGroupsDialogOpen}
            onClose={this.handleToggleGroupsDialog(false)}
            onChange={this.handleGroupsChange}
            availableGroups={this.state.availableGroups}
            groups={this.state.groups}
          />
        )}
        {this.state.isRolesDialogOpen && (
          <EditRolesDialog
            isOpen={this.state.isRolesDialogOpen}
            onClose={this.handleToggleRolesDialog(false)}
            onChange={this.handleRolesChange}
            availableRoles={this.state.availableRoles}
            roles={this.state.roles}
            getEffectiveRolesHandler={getEffectiveRolesHandler}
          />
        )}
      </form>
    );
  }
}

export default withStyles(styleSheet, { name: "InviteByCredentialsForm" })(InviteByCredentialsForm);
