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

class ListUsersSidemenu extends Component {
  static propTypes = {
    usersCount: PropTypes.number.isRequired,

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
      usersCount,

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
        <SidemenuTitle title={t("usersList")} />

        <SidemenuDivider />
        <SidemenuTab isActive={true} onClick={() => {}} icon={<Icon>account_box</Icon>}>
          {t("allUsers")} ({usersCount})
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

export default translate("users")(ListUsersSidemenu);
