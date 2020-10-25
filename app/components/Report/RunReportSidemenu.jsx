/**
 * by , Sajid U. / NOV-2019
 */

import React, { Component } from "react";
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

class RunReportSidemenu extends Component {

  static propTypes = {
    reportName: PropTypes.string.isRequired,
    handleBack: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  render = () => {
    const { reportName, handleBack, t } = this.props;

    return (
      <>
        <SidemenuBack back={t("reports")} onClick={handleBack} />
        <SidemenuTitle title={reportName} />

        <SidemenuDivider />
        <SidemenuSection title={t("help")} />

        <SidemenuDivider />
        <StretchingGridItem />

        <SidemenuDivider overlap />
        <SidemenuFooter />
      </>
    );
  };
}

export default translate("report")(RunReportSidemenu);
