/**
 * by , Sajid U. / NOV-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "@material-ui/core";
import {
  SidemenuDivider,
  SidemenuFilters,
  SidemenuFooter,
  SidemenuSection,
  SidemenuSort,
  SidemenuTab,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";

class ListReportSidemenu extends Component {

  static propTypes = {
    reportsCount: PropTypes.number.isRequired,

    filters: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired,

    sorting: PropTypes.array.isRequired,
    handleSorting: PropTypes.func.isRequired,
    isSortingOpen: PropTypes.bool.isRequired,

    possiblePaths: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,

    t: PropTypes.func.isRequired
  };

  render = () => {
    const {
      reportsCount,

      filters,
      handleFilters,
      isFiltersOpen,

      sorting,
      handleSorting,
      isSortingOpen,

      possiblePaths,
      navigate,
      currentPath,

      t
    } = this.props;

    return (
      <>
        <SidemenuTitle title={t("reports")} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={currentPath === possiblePaths.listReports}
          onClick={() => navigate(possiblePaths.listReports)}
          icon={<Icon>library_books</Icon>}
        >
          {t("reportsCount", { count: reportsCount })}
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

export default translate("report")(ListReportSidemenu);
