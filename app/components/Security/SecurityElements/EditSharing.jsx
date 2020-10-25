import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Stretch,
  Box,
  Padding,
  Checkbox,
  Radio,
  Switch,
  FormControlLabel,
  RadioGroup,
  Multiselect,
  Text,
  Subtitle,
  SectionHeader,
  PrimaryText,
  Column,
  Row
} from "components/Elements";
import { objects } from "utils";
import { AccountsSelection } from "./AccountsSelection";
import {
  Sharing,
  Accounts,
  AccountSelection,
  AccountsSelections,
  AccountsExclusions,
  ActionType,
  Account
} from "models";

import { RenderWithLoading } from "components/LayoutElements";

export const EditSharing = translate("security")(
  class EditSharing extends Component {
    static propTypes = {
      onChange: PropTypes.func.isRequired,
      sharing: Sharing.propType.isRequired,
      accounts: Accounts.propType,
      loadAccounts: PropTypes.func.isRequired,
      actionTypes: PropTypes.objectOf(ActionType.propType).isRequired,
      t: PropTypes.func.isRequired
    };
    state = { accounts: this.props.accounts };

    handleChange = (setter, ...args0) => (...args1) => {
      let sharing = setter(this.props.sharing, ...args0, ...args1);
      this.props.onChange(sharing);
    };

    accountSelectionHandler = (accountSelections, accounts) => {
      this.setState({ accounts: accounts });
      this.handleChange(Sharing.setAccounts)(accountSelections);
    };

    handleAccountExclusion = (accountSelections, accounts) => {
      this.setState({ accounts: accounts });
      this.handleChange((sharing, accountSelections) =>
        Sharing.setExclusions(
          sharing,
          AccountsExclusions.setAccounts(sharing.exclusions, accountSelections)
        )
      )(accountSelections);
    };

    componentDidMount() {
      if (!this.props.accounts) {
        this.props.loadAccounts().then(accounts => this.setState({ accounts: accounts }));
      }
    }

    renderSelectedAccountRow = accountSelection => {
      let { onChange, sharing, actionTypes, t } = this.props;
      let { accounts } = this.state;
      let account = Accounts.getAccount(accounts, accountSelection.id);
      let isAccountSelected = AccountSelection.isAccountSelected(accountSelection);
      let areChildrenSelected = AccountSelection.areChildrenSelected(accountSelection);
      return (
        <Fragment>
          {isAccountSelected && areChildrenSelected ? (
            <Stretch paddingRightDouble>
              <Multiselect
                options={objects.values(Account.types)}
                value={AccountSelection.getSubAccountTypes(accountSelection)}
                renderOption={t}
                label={t("includeSubAccountTypes")}
                onChange={this.handleChange((sharing, accountTypes) =>
                  Sharing.setAccounts(
                    sharing,
                    AccountsSelections.update(
                      sharing.accounts,
                      account,
                      AccountSelection.setSubAccountTypes,
                      accountTypes
                    )
                  )
                )}
              />
            </Stretch>
          ) : null}
          {areChildrenSelected ? (
            <Stretch paddingRightDouble>
              <Multiselect
                options={objects.keys(actionTypes)}
                value={accountSelection.actionTypes}
                renderOption={id => t(actionTypes[id].name)}
                label={t("actionTypesToShare")}
                onChange={this.handleChange((sharing, actionTypes) =>
                  Sharing.setAccounts(
                    sharing,
                    AccountsSelections.update(
                      sharing.accounts,
                      account,
                      AccountSelection.setActionTypes,
                      actionTypes
                    )
                  )
                )}
              />
            </Stretch>
          ) : null}
        </Fragment>
      );
    };

    renderExcludeAccountType = accountType => {
      let { onChange, sharing, actionTypes, t } = this.props;
      let isSelected = sharing.exclusions.children[accountType];
      return (
        <FormControlLabel
          key={accountType}
          control={
            <Checkbox
              checked={isSelected}
              color="secondary"
              dense
              onChange={this.handleChange(
                Sharing.setExclusions,
                AccountsExclusions.toggleAccountType(sharing.exclusions, accountType, !isSelected)
              )}
            />
          }
          label={<PrimaryText>{t(accountType)}</PrimaryText>}
        />
      );
    };

    renderAccountsExclusions = () => {
      let { onChange, sharing, loadAccounts, t } = this.props;
      let { accounts } = this.state;
      return sharing.typ !== Sharing.typs.none ? (
        <Column alignChildrenStretch paddingTop>
          <FormControlLabel
            control={
              <Switch
                dense
                checked={!!sharing.exclusions}
                onChange={this.handleChange(
                  Sharing.setExclusions,
                  AccountsExclusions.create(!sharing.exclusions)
                )}
              />
            }
            label={<PrimaryText>{t("excludeAccounts")}</PrimaryText>}
          />
          {sharing.exclusions ? (
            <Column alignChildrenStretch paddingTop>
              <AccountsSelection
                accountsSelections={sharing.exclusions.accounts}
                accounts={accounts}
                loadAccounts={loadAccounts}
                isExclusion
                onRemove={this.handleChange((sharing, accounts) =>
                  Sharing.setExclusions(
                    sharing,
                    AccountsExclusions.setAccounts(sharing.exclusions, accounts)
                  )
                )}
                onChange={this.handleAccountExclusion}
              />
              <SectionHeader paddingBottom paddingTopDouble>
                {t("excludeAccosByType")}
              </SectionHeader>
              {objects.values(Account.types).map(this.renderExcludeAccountType)}
            </Column>
          ) : null}
        </Column>
      ) : null;
    };

    render() {
      return (
        <RenderWithLoading
          property={this.state.accounts}
          renderCallback={accounts => {
            let { onChange, sharing, loadAccounts, t } = this.props;
            return (
              <Fragment>
                <SectionHeader paddingBottom paddingTop>
                  {t("share")}
                </SectionHeader>

                <RadioGroup>
                  {objects.values(Sharing.typs).map(typ => (
                    <FormControlLabel
                      label={t(`sharingTyp${typ}`)}
                      control={
                        <Radio
                          checked={sharing.typ === typ}
                          color="secondary"
                          padding
                          onChange={this.handleChange(Sharing.setTyp, typ)}
                        />
                      }
                    />
                  ))}
                </RadioGroup>

                {sharing.typ === Sharing.typs.selectedAccounts ? (
                  <Column paddingTop alignChildrenStretch>
                    <AccountsSelection
                      accountsSelections={sharing.accounts}
                      accounts={accounts}
                      loadAccounts={loadAccounts}
                      renderRow={this.renderSelectedAccountRow}
                      // onChange={this.handleChange(Sharing.setAccounts)}
                      onChange={this.accountSelectionHandler}
                      onRemove={this.handleChange(Sharing.setAccounts)}
                    />
                  </Column>
                ) : null}

                {this.renderAccountsExclusions()}
              </Fragment>
            );
          }}
        />
      );
    }
  }
);
export default EditSharing;
