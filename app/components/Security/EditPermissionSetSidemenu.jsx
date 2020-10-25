import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
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
  Stretch
} from "components";
import { securitySection } from "models";

class EditPermissionSetSidemenu extends Component {
  static propTypes = {
    permissionSetId: PropTypes.string.isRequired,
    permissionSetName: PropTypes.string.isRequired,
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
      permissionSetId,
      permissionSetName,
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
        <SidemenuBack back={t("permissionSets")} onClick={navigate.back} />
        <SidemenuTitle title={permissionSetName} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={area === securitySection.areas.roles}
          onClick={() => navigate.permissionSets.roles(permissionSetId)}
          icon={<Icon>assignment_ind</Icon>}
        >
          {t("rolesCount", { count: rolesCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={area === securitySection.areas.policies}
          onClick={() => navigate.permissionSets.policies(permissionSetId)}
          icon={<Icon>description</Icon>}
        >
          {t("policiesCount", { count: policiesCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={area === securitySection.areas.permissions}
          onClick={() => navigate.permissionSets.permissions(permissionSetId)}
          icon={<Icon>list</Icon>}
        >
          {t("permissionsCount", { count: permissionsCount })}
        </SidemenuTab>
        <SidemenuTab
          isActive={area === "edit" /* ... */}
          onClick={() => navigate.permissionSets.edit(permissionSetId)}
          icon={<Icon>settings</Icon>}
        >
          {t("settings")}
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

export default translate("security")(EditPermissionSetSidemenu);
