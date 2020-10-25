/**
 * Created by Andy on 2018-03-09.
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Paper, Grid, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/pages/SiteMapPage";

class SiteMapPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.gridContainer}
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item className={classes.gridItem} xs={12}>
          <br />
          *** HUBBUB.AI LINKS ***
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ ACCOUNTS PATHS ]
            <br />
            <br />
            <Link to="accounts">List accounts &gt;&gt;&gt; /accounts</Link>
            <br />
            <Link to="accounts/create">Create account &gt;&gt;&gt; /accounts/create</Link>
            <br />
            <Link to="accounts/80134/administer/configuration">
              Administer account &gt;&gt;&gt; /accounts/80134/administer/configuration
            </Link>
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ AUDIO PATHS ]
            <br />
            <br />
            <Link to="audio">List audio files &gt;&gt;&gt; /audio</Link>
            <br />
            <Link to="audio/upload">Upload audio &gt;&gt;&gt; /audio/upload</Link>
            <br />
            <Link to="audio/sets">Audio sets &gt;&gt;&gt; /audio/sets</Link>
            <br />
            <Link to="audio/sets/create">Create audio set &gt;&gt;&gt; /audio/sets/create</Link>
            <br />
            <Link to="audio/set/1">Audio set &gt;&gt;&gt; /audio/set/1</Link>
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ CALL CARE PATHS ]
            <br />
            <br />
            <Link to="call-care">Call Care &gt;&gt;&gt; /call-care</Link>
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ GROUPS PATHS ]
            <br />
            <br />
            <Link to="groups">List groups &gt;&gt;&gt; /groups</Link>
            <br />
            <Link to="groups/create">Create a group &gt;&gt;&gt; /groups/create</Link>
            <br />
            <Link to="groups/20896/edit">Edit group members &gt;&gt;&gt; /groups/20896/edit</Link>
            <br />
            <Link to="groups/20896/edit/roles">
              Edit group roles &gt;&gt;&gt; /groups/20896/edit/roles
            </Link>
            <br />
            <Link to="groups/20896/edit/settings">
              Edit group settings &gt;&gt;&gt; /groups/20896/edit/settings
            </Link>
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ NUMBERS ON ACCOUNT PATHS ]
            <br />
            <br />
            <Link to="numbers">List numbers &gt;&gt;&gt; /numbers</Link>
            <br />
            <Link to="numbers/allocate">Allocate numbers &gt;&gt;&gt; /numbers/allocate</Link>
            <br />
            <Link to="numbers/purchase">Purchase numbers &gt;&gt;&gt; /numbers/purchase</Link>
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ NUMBERS MANAGEMENT PATHS ]
            <br />
            <br />
            <Link to="numbers-management">List numbers &gt;&gt;&gt; /numbers-management</Link>
            <br />
            <Link to="numbers-management/add">Add number &gt;&gt;&gt; /numbers-management/add</Link>
            <br />
            <Link to="numbers-management/bf911175d85746d58aadf1f7ac401a25/edit">Edit number &gt;&gt;&gt; /numbers-management/bf911175d85746d58aadf1f7ac401a25/edit</Link>
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ SECURITY PATHS ]
            <br />
            <br />
            <Link to="permission-sets">List permission sets &gt;&gt;&gt; /permission-sets</Link>
            <br />
            <Link to="roles">List permission set roles &gt;&gt;&gt; /roles</Link> *
            <br />
            <Link to="policies">List permission set policies &gt;&gt;&gt; /policies</Link> *
            <br />
            <Link to="permissions">
              List permission set permissions &gt;&gt;&gt; /permissions
            </Link>{" "}
            *
            <br />
            <Link to="permission-sets/1/edit">
              Edit permission set settings &gt;&gt;&gt; /permission-sets/1/edit
            </Link>{" "}
            *
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ SERVICES PATHS ]
            <br />
            <br />
            <Link to="services">List services &gt;&gt;&gt; /services</Link>
            <br />
            <Link to="services/create">Create a service &gt;&gt;&gt; /services/create</Link>
            <br />
            <Link to="services/templates">
              List service templates &gt;&gt;&gt; /services/templates
            </Link>
            <br />
            <Link to="services/78902/manage">
              Manage service versions &gt;&gt;&gt; /services/78902/manage
            </Link>
            <br />
            <Link to="services/78902/manage/settings">
              Manage service settings &gt;&gt;&gt; /services/78902/manage/settings
            </Link>
            <br />
            <Link to="service-designer">Service Designer</Link> *
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ REPORT PATHS ]
            <br />
            <br />
            <Link to="report">List report &gt;&gt;&gt; /report</Link>
            <br />
            {/* <Link to="services/create">Create a service &gt;&gt;&gt; /services/create</Link>
            <br /> */}
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ USERS PATHS ]
            <br />
            <br />
            <Link to="users">List users &gt;&gt;&gt; /users</Link>
            <br />
            <Link to="users/invite">Invite user &gt;&gt;&gt; /users/invite</Link>
            <br />
            <Link to="users/90124/view">View user &gt;&gt;&gt; /users/90124/view</Link>
            <br />
            <Link to="users/90124/edit">Edit user &gt;&gt;&gt; /users/90124/edit</Link>
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ LOGIN PAGES ]
            <br />
            <br />
            <Link to="login">Login</Link>
            <br />
            <Link to="login_announcements">Login + announcements</Link> *
            <br />
            <Link to="login_advertisement">Login + advertisement</Link> *
            <br />
            <br />
            <Link to="login_users_list">Login with users list</Link> *
            <br />
            <Link to="login_users_list_announcements">Login with users list + announcements</Link> *
            <br />
            <Link to="login_users_list_advertisement">Login with users list + advertisement</Link> *
            <br />
            <br />
            <Link to="reset_password_invitation_expired">
              Reset password + invitation expired(sc1)
            </Link>{" "}
            *
            <br />
            <Link to="reset_password_success">Reset password + success(sc2)</Link> *
            <br />
            <Link to="reset_password_first_user">Reset password + first user(sc3)</Link> *
            <br />
            <Link to="reset_password">Reset password(sc4)</Link> *
            <br />
            <Link to="reset_password_forced">Reset password + forced(sc5)</Link> *
            <br />
            <Link to="reset_password_announcements">Reset password + announcements</Link> *
            <br />
            <Link to="reset_password_advertisement">Reset password + advertisement</Link> *
            <br />
            <br />
            <Link to="forgot_password">Forgot password</Link> *
            <br />
            <Link to="forgot_password_announcements">Forgot password + announcements</Link> *
            <br />
            <Link to="forgot_password_advertisement">Forgot password + advertisement</Link> *
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            [ OTHER ]
            <br />
            <br />
            <Link to="home">Default layout</Link>
            <br />
          </Paper>
        </Grid>

        <Grid item className={classes.gridItem} xs={12}>
          <br />* need path/routing review
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "SiteMapPage" })(SiteMapPage);
