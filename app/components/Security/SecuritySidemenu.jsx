import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Icon } from "@material-ui/core";
import {
  SidemenuDivider,
  SidemenuFilters,
  SidemenuFooter,
  SidemenuSection,
  SidemenuSort,
  SidemenuTab,
  SidemenuTitle,
  Stretch
} from "components";
import { securitySection } from "models";

class SecuritySidemenu extends Component {
  static propTypes = {
    permissionSetsCount: PropTypes.number.isRequired,
    rolesCount: PropTypes.number.isRequired,
    policiesCount: PropTypes.number.isRequired,
    permissionsCount: PropTypes.number.isRequired,
    area: securitySection.propTypes.area.isRequired,
    navigate: securitySection.propTypes.navigate.isRequired,

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
      permissionSetsCount,
      rolesCount,
      policiesCount,
      permissionsCount,
      area,
      navigate,

      filters,
      handleFilters,
      isFiltersOpen,

      getSearchable,

      sorting,
      handleSorting,
      isSortingOpen,

      t
    } = this.props;

    return (
      <>
        <SidemenuTitle title={t("security")} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={area === securitySection.areas.permissionSets}
          onClick={navigate.permissionSets.list}
          icon={<Icon>vpn_key</Icon>}
        >
          {t("allPermissionSetsCount", { count: permissionSetsCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={area === securitySection.areas.roles}
          onClick={navigate.roles.list}
          icon={<Icon>assignment_ind</Icon>}
        >
          {t("allRolesCount", { count: rolesCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={area === securitySection.areas.policies}
          onClick={navigate.policies.list}
          icon={<Icon>library_books</Icon>}
        >
          {t("allPoliciesCount", { count: policiesCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={area === securitySection.areas.permissions}
          onClick={navigate.permissions.list}
          icon={<Icon>list</Icon>}
        >
          {t("allPermissionsCount", { count: permissionsCount })}
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
        <Stretch />

        <SidemenuDivider overlap />
        <SidemenuFooter />
      </>
    );
  };
}

export default translate("security")(SecuritySidemenu);
