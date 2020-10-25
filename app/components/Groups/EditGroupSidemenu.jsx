import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Icon } from "@material-ui/core";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuFooter,
  SidemenuSection,
  SidemenuTab,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";

class EditGroupSidemenu extends Component {
  static propTypes = {
    selectedGroup: PropTypes.object.isRequired,
    possiblePaths: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,

    t: PropTypes.func.isRequired
  };

  render() {
    const {
      selectedGroup,
      possiblePaths,
      navigate,
      handleBack,
      currentPath,
      t
    } = this.props;

    return possiblePaths !== null ? (
      <Fragment>
        <SidemenuBack back={t("back")} onClick={handleBack} />
        <SidemenuTitle
          title={selectedGroup.name}
          info={selectedGroup.description}
        />

        <SidemenuDivider />
        <SidemenuTab
          isActive={currentPath === possiblePaths.members}
          onClick={() => navigate(possiblePaths.members)}
          icon={<Icon>account_box</Icon>}
        >
          {t("membersCount", { count: selectedGroup.membersCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.roles}
          onClick={() => navigate(possiblePaths.roles)}
          icon={<Icon>assignment</Icon>}
        >
          {t("rolesCount", { count: selectedGroup.rolesCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.settings}
          onClick={() => navigate(possiblePaths.settings)}
          icon={<Icon>settings</Icon>}
        >
          {t("settings")}
        </SidemenuTab>

        <SidemenuDivider />
        <SidemenuSection title={t("help")} />

        <SidemenuDivider />
        <StretchingGridItem />

        <SidemenuDivider overlap />
        <SidemenuFooter />
      </Fragment>
    ) : null;
  }
}

export default translate("groups")(EditGroupSidemenu);
