import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuFooter,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Users/ViewProfileSidemenu";

class ViewProfileSidemenu extends Component {
  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    editProfile: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  editProfile = userId => event => {
    event.stopPropagation();
    this.props.editProfile(userId);
  };

  render() {
    const { handleBack, userProfile, classes, t } = this.props;

    return (
      <Fragment>
        <SidemenuBack back={t("back")} onClick={handleBack} />
        <SidemenuTitle
          title={`${userProfile.firstName} ${userProfile.lastName}`}
        />

        <SidemenuDivider />
        <Button
          onClick={this.editProfile(userProfile.id)}
          variant="contained"
          classes={{ root: classes.editProfileButton }}
        >
          {t("editProfile")}
        </Button>

        <StretchingGridItem />

        <SidemenuDivider overlap />
        <SidemenuFooter />
      </Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "ViewProfileSidemenu" })(
  translate("users")(ViewProfileSidemenu)
);
