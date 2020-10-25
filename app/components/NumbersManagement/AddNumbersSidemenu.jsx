import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuFooter,
  SidemenuSection,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";

class AddNumbersSidemenu extends Component {
  static propTypes = {
    handleBack: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { handleBack, t } = this.props;

    return (
      <Fragment>
        <SidemenuBack back={t("numbersAndNetworks")} onClick={handleBack} />
        <SidemenuTitle title={t("addANumber")} />

        <SidemenuDivider />
        <SidemenuSection title={t("help")} />

        <SidemenuDivider />
        <StretchingGridItem />

        <SidemenuDivider overlap />
        <SidemenuFooter />
      </Fragment>
    );
  }
}

export default translate("numbers")(AddNumbersSidemenu);
