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

class AudioSetSidemenu extends Component {
  static propTypes = {
    audioSet: PropTypes.object,

    // TODO: using audioFiles array to get the count is wrong approach, because of lazy loading
    audioFiles: PropTypes.array.isRequired,

    filters: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired,

    sorting: PropTypes.array.isRequired,
    handleSorting: PropTypes.func.isRequired,
    isSortingOpen: PropTypes.bool.isRequired,

    navigation: PropTypes.object.isRequired,

    t: PropTypes.func.isRequired
  };

  render = () => {
    const {
      audioSet,
      audioFiles,
      filters,
      handleFilters,
      isFiltersOpen,
      sorting,
      handleSorting,
      isSortingOpen,
      navigation,
      t
    } = this.props;

    return (
      <>
        <SidemenuTitle title={audioSet.name} />

        <SidemenuDivider />
        <SidemenuTab isActive={true} onClick={navigation.listAudio} icon={<Icon>audiotrack</Icon>}>
          {t("audioFiles")} ({audioFiles.length})
        </SidemenuTab>
        <SidemenuTab isActive={false} onClick={() => {}} icon={<Icon>share</Icon>}>
          {t("sharing")}
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
        <SidemenuSection title={t("bulkUpload")} />

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

export default translate("audio")(AudioSetSidemenu);
