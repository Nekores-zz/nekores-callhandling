import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Divider, Grid, IconButton, Typography, Icon, withStyles } from "@material-ui/core";
import { Pending, ListAvatar, ConfirmButtons } from "components";
import UsersDialog from "./UsersDialog";
import * as formFields from "../api/account";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/CreateAccount";

class UsersForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number, // should be set on creation mode
    administerMode: PropTypes.bool, // should be set on administer mode
    data: PropTypes.shape({
      getUsersData: PropTypes.func.isRequired,
      getAccountHolderData: PropTypes.func.isRequired,
      getEmptyUser: PropTypes.func.isRequired,
      // addInvitedUser: PropTypes.func.isRequired,
      // removeInvitedUser: PropTypes.func.isRequired,
      validateInviteUser: PropTypes.func.isRequired
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_USERS
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    users: undefined, // set by componentDidMount
    accountHolder: undefined, // componentDidMount
    isDomainCodeAvailable: false,
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  validateInviteUser = invitedUsers => inviteUser =>
    this.props.data
      .validateInviteUser(inviteUser.toScala(), invitedUsers.map(user => user.toScala()))
      .then(response => this.addInvitedUser(inviteUser));

  addInvitedUser = user => {
    console.log(user);
    this.setState({ users: [user, ...this.state.users] });
  };

  removeInvitedUser = user => () =>
    this.setState({ users: this.state.users.filter(u => u.email !== user.email) });

  isAccountHolderUser = user => user.email === this.state.accountHolder.email;

  hasAccountHolderSuperUser = () => this.state.users.find(u => this.isAccountHolderUser(u));

  generateAccountHolderUser = () => {
    const { firstName, lastName, email } = this.state.accountHolder;
    return !this.hasAccountHolderSuperUser()
      ? this.props.data
          .getEmptyUser()
          .setFirstName(firstName)
          .setLastName(lastName)
          .setEmail(email)
      : null;
  };

  renderForm = users => () => {
    const { administerMode, panelIndex, t, classes, data } = this.props;
    const { getEmptyUser } = data;

    return (
      <form className={classes.formInput + " " + classes.usersform} autoComplete="off">
        <Grid container className={classes.gridUsersMargin} spacing={16}>
          <Grid item xs={12}>
            <UsersDialog
              getEmptyUser={getEmptyUser}
              validateInviteUser={this.validateInviteUser(users)}
              accountHolder={this.generateAccountHolderUser()}
            />
          </Grid>

          {users.map((user, index) => (
            <Fragment key={index}>
              <Divider className={classes.divider} />
              <div className={classes.gridUsers}>
                <ListAvatar name={user.firstName + " " + user.lastName} />
                <div className={classes.typographyWrapper}>
                  <Typography>
                    {user.firstName +
                      " " +
                      user.lastName +
                      (this.isAccountHolderUser(user) ? " - " + t("accountHolder") : "")}
                  </Typography>
                  <Typography variant="caption">{user.email}</Typography>
                </div>
                <IconButton className={classes.usersClose} onClick={this.removeInvitedUser(user)}>
                  <Icon>close</Icon>
                </IconButton>
              </div>
            </Fragment>
          ))}
          {users.length ? <Divider className={classes.divider} /> : null}
        </Grid>

        <ConfirmButtons
          className={classes.buttons}
          confirmLabel={t("update")}
          onConfirm={event =>
            !administerMode
              ? this.props.savePanel(event, panelIndex, users)
              : this.props.savePanel(users)
          }
          onFailure={errors => this.setState({ errors })}
        />
      </form>
    );
  };

  promiseToDiode = () => {
    this.props.data
      .getUsersData()
      .then(users =>
        this.setState({
          users: users,
          diode: { loading: false, data: users }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  componentDidMount() {
    this.props.data.getAccountHolderData().then(accountHolder => this.setState({ accountHolder }));
    this.promiseToDiode();
  }

  render = () => {
    const { diode, users, accountHolder } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(users)}
        onFail={this.onFail}
        forceWait={!accountHolder}
        operationMode="diode"
        fullWidthw
      />
    );
  };
}

export default withStyles(styleSheet, { name: "UsersForm" })(translate("accounts")(UsersForm));
