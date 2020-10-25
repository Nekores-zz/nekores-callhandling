/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], feb-2018 - oct-2019
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

class ListNumbersSidemenu extends Component {
  static propTypes = {
    numbersCount: PropTypes.number.isRequired,
    activeNumbersCount: PropTypes.number.isRequired,
    availableNumbersCount: PropTypes.number.isRequired,

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
      numbersCount,
      activeNumbersCount,
      availableNumbersCount,

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
        <SidemenuTitle title={t("numbers")} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={currentPath === possiblePaths.all}
          onClick={() => navigate(possiblePaths.all)}
          icon={<Icon>repeat_one</Icon>}
        >
          {t("allNumbersCount", { count: numbersCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.active}
          onClick={() => navigate(possiblePaths.active)}
          icon={<Icon>flash_on</Icon>}
        >
          {t("activeNumbersCount", { count: activeNumbersCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={currentPath === possiblePaths.available}
          onClick={() => navigate(possiblePaths.available)}
          icon={<Icon>add_shopping_cart</Icon>}
        >
          {t("availableNumbersCount", { count: availableNumbersCount })}
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

export default translate("numbers")(ListNumbersSidemenu);
