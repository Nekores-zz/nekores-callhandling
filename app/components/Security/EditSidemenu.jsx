import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Icon } from "@material-ui/core";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuTitle,
  SidemenuSection,
  SidemenuFooter,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";

class EditSidemenu extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleKey: PropTypes.string,
    backLabelName: PropTypes.string,
    backLabelOptionKey: PropTypes.string.isRequired,
    handleBack: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  };

  render() {
    const { title, titleKey, backLabelName, backLabelOptionKey, handleBack, t } = this.props;
    return (
      <Fragment>
        <SidemenuBack
          back={
            backLabelName ? (
              <Fragment>
                {backLabelName} <Icon>chevron_right</Icon> {t(backLabelOptionKey)}
              </Fragment>
            ) : (
              t(backLabelOptionKey)
            )
          }
          onClick={handleBack}
        />
        <SidemenuTitle title={title ? title : t(titleKey)} />

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

export default translate("security") (EditSidemenu);
