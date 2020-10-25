/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author : geekbytes.io [0xff@geekbytes.io]
 *
 */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Page,
  PrimaryButton,
  SecondaryTextLink,
  Row,
  Column,
  Stretch,
  Divider
} from "components/Elements";
import { EditSharing } from "../Security/SecurityElements/EditSharing.jsx";
import { Accounts, ActionType } from "models";
import { RenderWithLoading } from "../LayoutElements";

class EditSharingPage extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loadSharing: PropTypes.func.isRequired,
    accounts: Accounts.propType,
    loadAccounts: PropTypes.func.isRequired,
    actionTypes: PropTypes.objectOf(ActionType.propType).isRequired,
    t: PropTypes.func.isRequired
  };

  state = null;

  componentDidMount() {
    this.props.loadSharing().then(sharing => {
      this.setState(sharing, () => {
        this.forceUpdate();
      });
    });
  }

  handleChange = sharing => this.setState(sharing);
  handleSubmit = () => this.props.onChange(this.state);

  renderSharing = sharing => {
    let { accounts, actionTypes, loadAccounts } = this.props;
    return (
      <Column paddingBottom alignChildrenStretch>
        <Column paddingTop paddingBottom alignChildrenStretch>
          <EditSharing
            sharing={sharing}
            onChange={this.handleChange}
            accounts={accounts}
            loadAccounts={loadAccounts}
            actionTypes={actionTypes}
          />
        </Column>
        <Divider />
      </Column>
    );
  };

  renderContent = sharing => {
    return (
      <Page.Content>
        <Page.Paper>
          <Column paddingDouble alignChildrenStretch>
            {this.renderSharing(sharing)}
            <Row paddingTop>
              <SecondaryTextLink onClick={onCancel}>{t("cancel")}</SecondaryTextLink>
              <Stretch />
              <PrimaryButton onClick={this.handleSubmit}>{t("confirmAndsave")}</PrimaryButton>
            </Row>
          </Column>
        </Page.Paper>
      </Page.Content>
    );
  };
  render = () => <RenderWithLoading property={this.state} renderCallback={this.renderContent} />;
}

export default translate("sharing")(EditSharingPage);
