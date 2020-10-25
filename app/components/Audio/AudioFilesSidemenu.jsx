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

class AudioFilesSidemenu extends Component {
  static propTypes = {
    activeSection: PropTypes.oneOf(["audioFiles", "audioSets"]),
    audioSet: PropTypes.object,
    count: PropTypes.number.isRequired,
    filters: PropTypes.array.isRequired,
    handleFilters: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired,
    getTags: PropTypes.func.isRequired,
    getSearchable: PropTypes.func.isRequired,

    sorting: PropTypes.array.isRequired,
    handleSorting: PropTypes.func.isRequired,
    isSortingOpen: PropTypes.bool.isRequired,

    navigation: PropTypes.object.isRequired,

    t: PropTypes.func.isRequired
  };

  render = () => {
    const {
      activeSection,
      audioSet,

      filters,
      handleFilters,
      isFiltersOpen,
      getTags,

      sorting,
      handleSorting,
      isSortingOpen,

      navigation,
      count,
      getSearchable,

      t
    } = this.props;

    return (
      <>
        <SidemenuTitle title={audioSet ? audioSet.name : t("audioFiles")} />

        <SidemenuDivider />
        <SidemenuTab
          isActive={activeSection === "audioFiles"}
          onClick={navigation.listAudio}
          icon={<Icon>audiotrack</Icon>}
        >
          {t("audioFiles")} ({count})
        </SidemenuTab>
        <SidemenuTab
          isActive={activeSection === "audioSets"}
          onClick={navigation.listAudioSets}
          icon={<Icon>view_module</Icon>}
          count
        >
          {t("sets")}
        </SidemenuTab>

        <SidemenuDivider />
        <SidemenuSection title={t("filters")} isOpen={isFiltersOpen}>
          <SidemenuFilters filters={filters} onChange={handleFilters} getTags={getTags} getSearchable />
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

export default translate("audio")(AudioFilesSidemenu);
