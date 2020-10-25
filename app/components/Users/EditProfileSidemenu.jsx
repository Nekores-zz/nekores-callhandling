import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Icon, withStyles } from "@material-ui/core";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuFooter,
  SidemenuTab,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Users/EditProfileSidemenu";

class EditProfileSidemenu extends Component {
  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    possiblePaths: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      userProfile,
      possiblePaths,
      navigate,
      handleBack,
      currentPath,
      classes,
      t
    } = this.props;

    return possiblePaths !== null ? (
      <Fragment>
        <SidemenuBack back={t("back")} onClick={handleBack} />
        <SidemenuTitle
          title={`${userProfile.firstName} ${userProfile.lastName}`}
        />

        <SidemenuDivider />
        <SidemenuTab
          isActive={currentPath === possiblePaths.general}
          onClick={() => navigate(possiblePaths.general)}
          icon={<Icon>settings</Icon>}
        >
          {t("generalDetails")}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.roles}
          onClick={() => navigate(possiblePaths.roles)}
          icon={<Icon>group_work</Icon>}
        >
          {t("rolesAndGroups")}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.settings}
          onClick={() => navigate(possiblePaths.settings)}
          icon={<Icon>account_box</Icon>}
        >
          {t("accountSettings")}
        </SidemenuTab>

        <Button
          onClick={() => navigate(possiblePaths.view)}
          classes={{ root: classes.viewProfileButton }}
          variant="contained"
        >
          {t("viewProfile")}
        </Button>

        <StretchingGridItem />

        <SidemenuDivider overlap />
        <SidemenuFooter />
      </Fragment>
    ) : null;
  }
}

export default withStyles(styleSheet, { name: "EditProfileSidemenu" })(
  translate("users")(EditProfileSidemenu)
);
