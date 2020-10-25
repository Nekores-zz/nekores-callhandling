/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], oct-2018 - oct-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "@material-ui/core";
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
import { translate } from "react-i18next";

class ManageServiceSidemenu extends Component {
  static propTypes = {
    serviceName: PropTypes.string.isRequired,
    versionsCount: PropTypes.number.isRequired,
    numbersCount: PropTypes.number.isRequired,

    filters: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired,
    getTags: PropTypes.func.isRequired,
    getSearchable: PropTypes.func.isRequired,

    sorting: PropTypes.array.isRequired,
    handleSorting: PropTypes.func.isRequired,
    isSortingOpen: PropTypes.bool.isRequired,

    handleBack: PropTypes.func.isRequired,
    possiblePaths: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,

    t: PropTypes.func.isRequired
  };

  checkPage = name => this.props.currentPath === this.props.possiblePaths["service" + name];
  isVersionsPage = () => this.checkPage("Versions");
  isNumbersPage = () => this.checkPage("Numbers");
  isSettingsPage = () => this.checkPage("Settings");

  render = () => {
    const {
      serviceName,
      versionsCount,
      numbersCount,

      filters,
      handleFilters,
      isFiltersOpen,
      getTags,
      getSearchable,

      sorting,
      handleSorting,
      isSortingOpen,

      handleBack,
      possiblePaths,
      navigate,

      t
    } = this.props;

    return (
      <>
        <SidemenuBack back={t("services")} onClick={handleBack} />
        <SidemenuTitle title={serviceName} />

        <SidemenuTab
          isActive={this.isVersionsPage()}
          onClick={() => navigate(possiblePaths.serviceVersions)}
          icon={<Icon>library_books</Icon>}
        >
          {t("versions")} ({versionsCount})
        </SidemenuTab>
        <SidemenuTab
          isActive={this.isNumbersPage()}
          onClick={() => navigate(possiblePaths.serviceNumbers)}
          icon={<Icon>list</Icon>}
        >
          {t("assignedNumbers")} ({numbersCount})
        </SidemenuTab>
        <SidemenuTab
          isActive={this.isSettingsPage()}
          onClick={() => navigate(possiblePaths.serviceSettings)}
          icon={<Icon>settings</Icon>}
        >
          {t("settings")}
        </SidemenuTab>

        {(this.isVersionsPage() || this.isNumbersPage()) && (
          <>
            <SidemenuDivider />
            <SidemenuSection title={t("filters")} isOpen={isFiltersOpen}>
              <SidemenuFilters
                filters={filters}
                onChange={handleFilters}
                getTags={getTags}
                getSearchable={getSearchable}
              />
            </SidemenuSection>

            <SidemenuDivider />
            <SidemenuSection title={t("sort")} isOpen={isSortingOpen}>
              <SidemenuSort sorting={sorting} onChange={handleSorting} />
            </SidemenuSection>
          </>
        )}

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

export default translate("services")(ManageServiceSidemenu);
