import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import {
  InviteByEmailForm,
  InviteByCredentialsForm,
  InviteByCsvForm
} from "./UserForms";
import { PAGE_INVITE_USERS } from "./api/user";
import { styleSheet } from "jss/Users/InviteUsers";

class InviteUsers extends Component {
  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
    getGroupsHandler: PropTypes.func.isRequired,
    getAssignableRoles: PropTypes.func.isRequired,
    getEffectiveRoles: PropTypes.func.isRequired,
    getPermissionSets: PropTypes.func.isRequired,
    getCompositeRoles: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    errors: PropTypes.object,
    fileUploadMetadata: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  inviteBy = {
    email: {
      label: (
        <Fragment>
          Invite via email
          <Typography
            color="textSecondary"
            variant="body1"
            className={this.props.classes.recommend}
          >
            {" "}
            (Recommend)
          </Typography>
        </Fragment>
      ),
      form: InviteByEmailForm
    },
    credentials: {
      label: "Invite via a username and password",
      form: InviteByCredentialsForm
    },
    csv: {
      label: "Invite using CSV upload",
      form: InviteByCsvForm
    }
  };

  state = {
    inviteBy: Object.keys(this.inviteBy)[0]
  };

  handleChange = event => {
    this.setState({ inviteBy: event.target.value });
  };

  handleCancel = () => {
    this.props.handleBack();
  };

  render() {
    const {
      classes,
      submitHandler
    } = this.props;
    const InviteForm = this.inviteBy[this.state.inviteBy].form;

    return (
      <div className={classes.pageContent}>
        <Paper className={classes.paper} elevation={4}>
          <RadioGroup
            value={this.state.inviteBy}
            onChange={this.handleChange}
            className={classes.inviteByRadioGroup}
          >
            {Object.keys(this.inviteBy).map(key => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio color="secondary" />}
                label={this.inviteBy[key].label}
                classes={{ root: classes.inviteByOption }}
              />
            ))}
          </RadioGroup>
          <InviteForm
            onCancel={this.handleCancel}
            submitHandler={submitHandler}
            getAssignableRoles={this.props.getAssignableRoles}
            getEffectiveRoles={this.props.getEffectiveRoles}
            getPermissionSets={this.props.getPermissionSets}
            getCompositeRoles={this.props.getCompositeRoles}
            getGroupsHandler={this.props.getGroupsHandler}
            formName={PAGE_INVITE_USERS}
            option={this.state.inviteBy}
            fileUploadMetadata={this.props.fileUploadMetadata}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "InviteUsers" })(InviteUsers);
