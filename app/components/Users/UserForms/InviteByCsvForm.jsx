import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CircularProgress,
  Chip,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  Holder,
  RoleChip,
  SelectFile,
  SubmitButton,
  PrimaryTextButton
} from "components";
import EditGroupsDialog from "../EditGroupsDialog";
import EditRolesDialog from "../EditRolesDialog";
import { styleSheet } from "jss/Users/InviteByCsvForm";

class InviteByCsvForm extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    getGroupsHandler: PropTypes.func.isRequired,
    getAssignableRoles: PropTypes.func.isRequired,
    getEffectiveRoles: PropTypes.func.isRequired,
    getPermissionSets: PropTypes.func.isRequired,
    getCompositeRoles: PropTypes.func.isRequired,
    errors: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    fileUploadMetadata: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    files: [],
    roles: [],
    groups: [],
    isRolesDialogOpen: false,
    isGroupsDialogOpen: false,
    loading: false
  };

  handleFilesChange = files => {
    console.log(files)
    const fileUploadMetadata = this.props.fileUploadMetadata();
    const formData = new FormData();
    formData.append(fileUploadMetadata.fieldName, files[0]);
    //formData.append("apiRequestContext", fileUploadMetadata.apiRequestContext);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", fileUploadMetadata.apiUrl, true);
    fileUploadMetadata.headers.map(header=>{
     xhr.setRequestHeader(header.name,header.value);
    });

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send(formData);
    //this.setState({ files });
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
    const { roles, groups, isRolesDialogOpen, isGroupsDialogOpen } = this.state;
    const { loading } = this.state;

    return (
      <form>
        <Typography
          variant="subtitle1"
          align="left"
          className={classes.sectionHeader + " " + classes.marginBottomMedium}
        >
          Invite users
        </Typography>
        <SelectFile
          onFilesChange={this.handleFilesChange}
          dndLabel="Drag and drop your CSV here"
          className={classes.marginBottomMedium}
        />
        <Grid
          container
          justify="flex-start"
          className={classes.smallText + " " + classes.marginBottomLarge}
        >
          The Roles & Groups shown below will only be applied to Users who have
          not been assigned a Role or Group in your uploaded CSV file.
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
              key={group.getId}
              label={group.getName}
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
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
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
            getEffectiveRoles={this.props.getEffectiveRoles}
            getAssignableRoles={this.props.getAssignableRoles}
            getPermissionSets={this.props.getPermissionSets}
            getCompositeRoles={this.props.getCompositeRoles}
          />
        )}
      </form>
    );
  }
}

export default withStyles(styleSheet, { name: "InviteByCsvForm" })(
  InviteByCsvForm
);
