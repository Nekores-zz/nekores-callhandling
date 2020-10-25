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

class HomePageSideMenu extends Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired,

    sorting: PropTypes.array.isRequired,
    handleSorting: PropTypes.func.isRequired,
    isSortingOpen: PropTypes.bool.isRequired,

    selectTab: PropTypes.object.isRequired,
    selectedTab: PropTypes.string.isRequired,

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

      selectedTab,
      selectTab,

      t
    } = this.props;

    return (
      <>
        <SidemenuTitle title={t("category")} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={selectedTab === "subcategory1"}
          onClick={selectTab.subcategory1}
          icon={<Icon>picture_in_picture</Icon>}
        >
          {t("subcategory1")}
        </SidemenuTab>
        <SidemenuTab
          isActive={selectedTab === "subcategory2"}
          onClick={selectTab.subcategory2}
          icon={<Icon>picture_in_picture</Icon>}
        >
          {t("subcategory2")}
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

export default translate("common")(HomePageSideMenu);
