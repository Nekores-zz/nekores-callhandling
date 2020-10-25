import React, { PureComponent } from "react";
import { Button, Grid, withStyles } from "@material-ui/core";
import UserAvatar from "components/Login/UsersList/UserAvatar";
import { translate } from "react-i18next";
import { styleSheet } from "jss/MainNavbar/UsersMenuHeader";
import { PrimaryButton } from "components/Elements";

class UsersMenuHeader extends PureComponent {
  render() {
    const { userInfo, classes, t } = this.props;

    return (
      <Grid container spacing={0} className={classes.header}>
        <div className={classes.userAvatarWrapper}>
          <UserAvatar big className={classes.userAvatar} name={userInfo.name} />
        </div>
        <div className={classes.userInfo}>
          <span className={classes.userInfoHeading}>{userInfo.name}</span>
          <span className={classes.userInfoEmail}>{userInfo.email}</span>
          <br />
          <br />
          <PrimaryButton
            onClick={() => {
              const location = window.location;
              const path =
                location.protocol +
                "//" +
                userInfo.domainCode +
                ":" +
                location.port +
                "/users/edit/" +
                userInfo.sub;

              window.open(path, "_self");
            }}
          >
            {" "}
            {t("myProfile")}
          </PrimaryButton>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styleSheet, { name: "UsersMenuHeader" })(
  translate("common")(UsersMenuHeader)
);
