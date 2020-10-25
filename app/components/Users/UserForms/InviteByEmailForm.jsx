import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Chip,
  Grid,
  IconButton,
  Typography,
  Icon,
  withStyles
} from "@material-ui/core";
import {
  Holder,
  RoleChip,
  TextField,
  ConfirmButtons,
  PrimaryTextButton
} from "components";
import EditGroupsDialog from "../EditGroupsDialog";
import EditRolesDialog from "../EditRolesDialog";
import { styleSheet } from "jss/Users/InviteByEmailForm";
import * as formFields from "../api/user";
import { translate } from "react-i18next";

class InviteByEmailForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    getGroupsHandler: PropTypes.func.isRequired,
    getAssignableRoles: PropTypes.func.isRequired,
    getEffectiveRoles: PropTypes.func.isRequired,
    getPermissionSets: PropTypes.func.isRequired,
    getCompositeRoles: PropTypes.func.isRequired,
    errors: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_INVITE_BY_EMAIL
  };

  state = {
    users: [
      {
        [formFields.EMAIL]: "",
        [formFields.FIRST_NAME]: "",
        [formFields.LAST_NAME]: ""
      }
    ],
    roles: [],
    groups: [],
    isRolesDialogOpen: false,
    isGroupsDialogOpen: false
  };

  handleInviteAnotherUser = () => {
    let user = {
      [formFields.EMAIL]: "",
      [formFields.FIRST_NAME]: "",
      [formFields.LAST_NAME]: ""
    };
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
    this.setState({ isRolesDialogOpen: isOpen });
  };

  /**
   * Error response will be like below if errors are multi-form errors.
   *
   "InviteByEmailForm.0": {
        "email":"InviteByEmailForm.email.invalid"
    },
   "InviteByEmailForm.1": {
        "firstName":"InviteByEmailForm.firstName.required"
    },
   "InviteByEmailForm.2":{
        "email":"InviteByEmailForm.email.required",
        "firstName":"InviteByEmailForm.firstName.required"
    }}
   * @param index
   * @param fieldName
   * @returns {*}
   */
  getFieldErrorMessage = (index, fieldName) => {
    let formIndex = this.props.formName + "." + index;
    let user =
      (this.state.response &&
        this.state.response.formErrors &&
        this.state.response.formErrors[formIndex]) ||
      (this.state.response &&
        this.state.response.apiErrors &&
        this.state.response.apiErrors[formIndex]);

    return user && user[fieldName];
  };

  isFieldInvalid = (userIndex, fieldName) => {
    return !!this.getFieldErrorMessage(userIndex, fieldName);
  };

  isFormValid = () => {
    const { errors } = this.props;
    return true; //!errors || !Object.keys(errors);
  };

  render() {
    const { classes, t } = this.props;
    const {
      users,
      roles,
      groups
    } = this.state;

    return (
      <Fragment>
        <Typography
          variant="subtitle1"
          align="left"
          className={[classes.sectionHeader, classes.marginBottomSmall].join(
            " "
          )}
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
                onChange={this.handleFieldChange(user, formFields.EMAIL)}
                value={user[formFields.EMAIL]}
                required
                fullWidth
                name={formFields.EMAIL}
                label={t(formFields.EMAIL)}
                error={this.isFieldInvalid(i, formFields.EMAIL)}
                helperText={t(this.getFieldErrorMessage(i, formFields.EMAIL))}
              />
            </Grid>
            <Grid item className={classes.nameGridItem}>
              <TextField
                onChange={this.handleFieldChange(user, formFields.FIRST_NAME)}
                value={user[formFields.FIRST_NAME]}
                required
                fullWidth
                name={formFields.FIRST_NAME}
                label={t(formFields.FIRST_NAME)}
                error={this.isFieldInvalid(i, formFields.FIRST_NAME)}
                helperText={t(
                  this.getFieldErrorMessage(i, formFields.FIRST_NAME)
                )}
              />
            </Grid>
            <Grid item className={classes.nameGridItem}>
              <TextField
                onChange={this.handleFieldChange(user, formFields.LAST_NAME)}
                value={user[formFields.LAST_NAME]}
                required
                fullWidth
                name={formFields.LAST_NAME}
                label={t(formFields.LAST_NAME)}
                error={this.isFieldInvalid(i, formFields.LAST_NAME)}
                helperText={t(
                  this.getFieldErrorMessage(i, formFields.LAST_NAME)
                )}
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
        <Holder
          onClick={this.handleToggleRolesDialog(true)}
          placeholder="Select roles"
        >
          {roles.map(role => (
            <RoleChip
              key={role.id}
              name={role.name}
              roleType={"Ac"}
              color={"#00bcd4"}
              onDelete={this.handleRemoveRole(role)}
            />
          ))}
        </Holder>
        <Grid container justify="space-between" spacing={16} wrap="nowrap">
          <Grid item className={classes.hintText}>
            <span className={classes.bold}>Sy</span> - System Roles
            &nbsp;&nbsp;&nbsp;
            <span className={classes.bold}>Ac</span> - Account Roles
            &nbsp;&nbsp;&nbsp;
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
        <Holder
          onClick={this.handleToggleGroupsDialog(true)}
          placeholder="Select groups"
        >
          {groups.map(group => (
            <Chip
              key={group.id}
              label={group.name}
              onDelete={this.handleRemoveGroup(group)}
              classes={{ root: classes.chip }}
            />
          ))}
        </Holder>
        <Grid
          container
          justify="flex-end"
          spacing={16}
          className={classes.marginBottomMedium}
        >
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

        <ConfirmButtons
          blocked={!this.isFormValid()}
          confirmLabel={"Invite"}
          onConfirm={() =>
            this.props.submitHandler(
              // this.props.option,
              this.props.formName,
              this.state.users,
              this.state.groups.map(grp => grp.id),
              this.state.roles.map(role => role.id)
            )
          }
          onSuccess={response => {
            console.log(response);
          }}
          onFailure={response => {
            console.log(response);
             this.setState({ response: response });
          }}
          onCancel={this.props.onCancel}
        />

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
            getEffectiveRoles={this.props.getEffectiveRoles}
            getAssignableRoles={this.props.getAssignableRoles}
            getPermissionSets={this.props.getPermissionSets}
            getCompositeRoles={this.props.getCompositeRoles}
          />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "InviteByEmailForm" })(
  translate("users")(InviteByEmailForm)
);
