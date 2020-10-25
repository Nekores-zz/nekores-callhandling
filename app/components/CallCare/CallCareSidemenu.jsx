/**
 * by, Sajid U. / SEPT-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, withStyles } from "@material-ui/core";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuFilters,
  SidemenuFooter,
  SidemenuSection,
  SidemenuSort,
  SidemenuTab,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import Branches from "Icons/Branches";
import { translate } from "react-i18next";
import { styleSheet } from "jss/CallCare/CallCareSidemenu";

class CallCareSidemenu extends Component {
  static propTypes = {
    handleHome: PropTypes.func.isRequired,
    possiblePaths: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,

    filters: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired,

    sorting: PropTypes.array.isRequired,
    handleSorting: PropTypes.func.isRequired,
    isSortingOpen: PropTypes.bool.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render = () => {
    const {
      handleHome,
      possiblePaths,
      navigate,
      currentPath,

      filters,
      handleFilters,
      isFiltersOpen,

      sorting,
      handleSorting,
      isSortingOpen,

      classes,
      t
    } = this.props;

    return (
      <>
        <SidemenuBack back={t("home")} onClick={handleHome} />
        <SidemenuTitle title={t("callCare")} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={currentPath === possiblePaths.branches}
          onClick={() => navigate(possiblePaths.branches)}
          icon={
            <Branches
              className={
                // as we are using a custom icon we need this hack, but only here,
                // other MUI icons don't need to check if tab is selected to get proper color
                currentPath === possiblePaths.branches ? classes.activeIcon : classes.inactiveIcon
              }
            />
          }
        >
          {t("branches")}
        </SidemenuTab>

        <SidemenuTab
          isActive={currentPath === possiblePaths.openingHours}
          onClick={() => navigate(possiblePaths.openingHours)}
          icon={<Icon>access_time</Icon>}
        >
          {t("openingHours")}
        </SidemenuTab>

        <SidemenuTab
          isActive={currentPath === possiblePaths.states}
          onClick={() => navigate(possiblePaths.states)}
          icon={<Icon>check_circle_outline</Icon>}
        >
          {t("states")}
        </SidemenuTab>

        <SidemenuTab
          isActive={currentPath === possiblePaths.exceptions}
          onClick={() => navigate(possiblePaths.exceptions)}
          icon={<Icon>error_outline</Icon>}
        >
          {t("exceptions")}
        </SidemenuTab>

        <SidemenuDivider />
        <SidemenuTab
          isActive={currentPath === possiblePaths.sharingSettings}
          onClick={() => navigate(possiblePaths.sharingSettings)}
          icon={<Icon>share</Icon>}
        >
          {t("sharingSettings")}
        </SidemenuTab>

        <SidemenuDivider />
        <SidemenuSection title={t("filters")} isOpen={isFiltersOpen}>
          <SidemenuFilters filters={filters} onChange={handleFilters} />
        </SidemenuSection>

        <SidemenuDivider />
        <SidemenuSection title={t("sort")} isOpen={isSortingOpen}>
          <SidemenuSort sorting={sorting} onChange={handleSorting} />
        </SidemenuSection>

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

export default withStyles(styleSheet, { name: "CallCareSidemenu" })(
  translate("callcare")(CallCareSidemenu)
);
