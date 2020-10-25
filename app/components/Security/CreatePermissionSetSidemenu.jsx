import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuFooter,
  SidemenuSection,
  SidemenuTitle,
  Stretch,
} from "components";

class CreatePermissionSetSidemenu extends Component {
  static propTypes = {
    handleBack: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { handleBack, t } = this.props;

    return (
      <Fragment>
        <SidemenuBack back={t("permissionSets")} onClick={handleBack} />
        <SidemenuTitle title={t("createAPermissionSet")} />

        <SidemenuDivider />
        <SidemenuSection title={t("help")} />

        <SidemenuDivider />
        <Stretch />

        <SidemenuDivider overlap />
        <SidemenuFooter />
      </Fragment>
    );
  }
}

export default translate("security")(CreatePermissionSetSidemenu);
