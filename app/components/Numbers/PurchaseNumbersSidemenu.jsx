/**
 * by A. Prates, feb-2018
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Icon } from "@material-ui/core";
import {
  SidemenuDivider,
  SidemenuFooter,
  SidemenuSection,
  SidemenuTab,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";

class PurchaseNumbersSidemenu extends Component {
  static propTypes = {
    possiblePaths: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,

    t: PropTypes.func.isRequired
  };

  render() {
    const { possiblePaths, currentPath, navigate, t } = this.props;

    return (
      <Fragment>
        <SidemenuTitle title={t("purchaseNumbers")} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={currentPath === possiblePaths.select}
          onClick={() => navigate(possiblePaths.select)}
          icon={<Icon>select_all</Icon>}
        >
          {t("selectNumbers")}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.block}
          onClick={() => navigate(possiblePaths.block)}
          icon={<Icon>view_column</Icon>}
        >
          {t("blockOfNumbers")}
        </SidemenuTab>

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

export default translate("numbers")(PurchaseNumbersSidemenu);
