import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  SidemenuBack,
  SidemenuDivider,
  SidemenuFooter,
  SidemenuSection,
  SidemenuTitle,
  StretchingGridItem
} from "components";
import { translate } from "react-i18next";

class UploadAudioSidemenu extends Component {
  static propTypes = {
    isCreate: PropTypes.bool.isRequired,
    audioFile: PropTypes.object,
    audioSet: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    let { isCreate, audioSet, audioFile, t } = this.props;
    return (
      <Fragment>
        <SidemenuBack back={audioSet ? t("setId", {id: audioSet.id}) : t("audios")} onClick={this.props.navigation.listAudio} />
        <SidemenuTitle title={isCreate ? t("newAudioFile") : t("editAudioFile")} />
        <SidemenuDivider />
        <SidemenuSection title={t("help")} />
        <SidemenuDivider />
        <StretchingGridItem />
        <SidemenuDivider overlap />
        <SidemenuFooter />
      </Fragment>
    );
  }
}

export default translate("audio") (UploadAudioSidemenu);
