import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  SidemenuDivider,
  SidemenuFilters,
  SidemenuFooter,
  SidemenuSection,
  SidemenuSort,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";

class ListNumbersSidemenu extends Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired,

    sorting: PropTypes.array.isRequired,
    handleSorting: PropTypes.func.isRequired,
    isSortingOpen: PropTypes.bool.isRequired,

    t: PropTypes.func.isRequired
  };

  render = () => {
    const {
      filters,
      handleFilters,
      isFiltersOpen,

      sorting,
      handleSorting,
      isSortingOpen,

      t
    } = this.props;

    return (
      <>
        <SidemenuTitle title={t("numbersAndNetworks")} />

        <SidemenuDivider />
        <SidemenuSection title={t("filters")} isOpen={isFiltersOpen}>
          <SidemenuFilters filters={filters} onChange={handleFilters} />
        </SidemenuSection>

        <SidemenuDivider />
        <SidemenuSection title={t("sort")} isOpen={isSortingOpen}>
          <SidemenuSort sorting={sorting} onChange={handleSorting} />
        </SidemenuSection>

        <SidemenuDivider />
        <SidemenuSection title={t("more")} />

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
