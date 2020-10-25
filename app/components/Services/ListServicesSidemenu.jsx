/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], oct-2018 - oct-2019
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

class ListServicesSidemenu extends Component {
  static propTypes = {
    servicesCount: PropTypes.number.isRequired,
    // templatesCount: PropTypes.number.isRequired,

    filters: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired,
    getSearchable: PropTypes.func.isRequired,

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
      servicesCount,
      // templatesCount,

      filters,
      handleFilters,
      isFiltersOpen,
      getSearchable,

      sorting,
      handleSorting,
      isSortingOpen,

      possiblePaths,
      currentPath,
      navigate,

      t
    } = this.props;

    return (
      <>
        <SidemenuTitle title={t("services")} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={currentPath === possiblePaths.listServices}
          onClick={() => navigate(possiblePaths.listServices)}
          icon={<Icon>library_books</Icon>}
        >
          {t("servicesCount", { count: servicesCount })}
        </SidemenuTab>
        {/* <SidemenuTab
          isActive={currentPath === possiblePaths.listTemplates}
          onClick={() => navigate(possiblePaths.listTemplates)}
          icon={<Icon>list</Icon>}
        >
          {t("serviceTemplatesCount", { count: templatesCount })}
        </SidemenuTab> */}

        <SidemenuDivider />
        <SidemenuSection title={t("filters")} isOpen={isFiltersOpen}>
          <SidemenuFilters
            filters={filters}
            onChange={handleFilters}
            getSearchable={getSearchable}
          />
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

export default translate("services")(ListServicesSidemenu);
