import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Stretch,
  Row,
  Column,
  Box,
  Checkbox,
  PrimaryText,
  FormControlLabel
} from "components/Elements";
import { ConfirmButtons, Page, TextField } from "components";

import { initialAudioSet } from "config/audioMockData";
import { RenderWithLoading } from "components/LayoutElements";

class EditAudioSet extends Component {
  static propTypes = {
    getAudioSet: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  state = this.props.getAudioSet ? null : { ...Object.assign({}, initialAudioSet) };

  componentDidMount() {
    this.props.getAudioSet &&
      this.props
        .getAudioSet()
        .then(set =>
          this.setState({
            ...Object.assign({}, initialAudioSet),
            ...set,
            sharingEnabled: undefined
          })
        );
  }

  handleNameChange = event => {
    let name = event.target.value;
    this.setState({ name });
  };

  handleDescriptionChange = event => {
    let description = event.target.value;
    this.setState({ description });
  };

  handleSharingEnabledChange = () => {
    this.setState({ sharingEnabled: !this.state.sharingEnabled });
  };

  render = () => <RenderWithLoading property={this.state} renderCallback={this.content(this)} />;

  content(component) {
    return () => {
      let { onCancel, t } = component.props;

      let canSubmit = true;
      const requiredFields = ["name", "description"];
      requiredFields.forEach(field => (canSubmit &= !!component.state[field]));

      return (
        <Page.Content>
          <Page.Paper elevation={4}>
            <Column paddingDouble>
              <Row fullWidth paddingBottom>
                <TextField
                  onChange={component.handleNameChange}
                  label={t("setName")}
                  value={component.state.name}
                  error={false}
                  required
                  fullWidth
                />
              </Row>
              <Row fullWidth paddingBottom>
                <TextField
                  onChange={component.handleDescriptionChange}
                  label={t("setDescription")}
                  value={component.state.description}
                  error={false}
                  required
                  fullWidth
                />
              </Row>
              {component.state.sharingEnabled !== undefined && (
                <Row fullWidth paddingBottom>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={component.state.sharingEnabled}
                        onChange={component.handleSharingEnabledChange}
                        color="secondary"
                        dense
                      />
                    }
                    label={
                      <PrimaryText fontSizeS fontSizeM={false}>
                        {t("enableSharing")}
                      </PrimaryText>
                    }
                  />
                </Row>
              )}

              <Row fullWidth paddingTop>
                <Stretch />
                <ConfirmButtons
                  onConfirm={component.handleSubmit}
                  onCancel={onCancel}
                  blocked={!canSubmit}
                />
              </Row>
            </Column>
          </Page.Paper>
        </Page.Content>
      );
    };
  }
}

export default translate(["audio", "common"])(EditAudioSet);
