import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Radio, FormControlLabel, List, withStyles } from "@material-ui/core";
import { PrimaryTextLink, Icon, SecondaryButton } from "components/Elements";
import {
  Row,
  Column,
  Select,
  RenderWithLoading,
  SearchableChipSelector,
  Tooltip,
  TooltipContent
} from "components";
import clsx from "clsx";
import SelectAccountDialog from "./CallCareNodeDialog/SelectAccountDialog";
import SelectedAccountRow from "./CallCareNodeDialog/SelectedAccountRow";
import SwitchStateDialog from "./CallCareNodeDialog/SwitchStateDialog";
import { states, timeOutOptions } from "config/serviceDesignerMockData";
import { PromiseSearchable } from "utils/commonShapes";

const styleSheet = theme => ({
  contentWrapper: {
    padding: "12px 24px",
    position: "relative",
    overflowY: "auto",
    height: "-webkit-fill-available",
    maxHeight: "100%"
  },

  accountModeWrapper: {
    width: "100%"
  },

  accountModeRadio: {
    padding: 0,
    height: "32px",
    width: "100%"
  },

  selectAccount: {
    marginLeft: 36
  },

  selectedAccounts: {
    width: "100%"
  },

  configureStates: {
    padding: 0
  },

  formRadioControl: {
    alignItems: "flex-start",
    marginTop: -12
  },

  formRadioLabel: {
    color: theme.colors.primary.darkGrey,
    paddingTop: 12
  },

  tooltipIcon: {
    color: theme.colors.primary.darkGrey,
    fontSize: "24px"
  }
});

const CallCareNodeDialog = withStyles(styleSheet, { name: "CallCareNodeDialog" })(
  translate(["servicedesigner", "security", "common"])(
    class CallCareNodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired,
        timeOutOptions: PropTypes.array,
        listSearchable: PromiseSearchable.isRequired, //Function to get accounts from an API
        callbackOnSubmit: PropTypes.func.isRequired, //This will trigger handleSaveNode function NodeDialog.jsx' which eventually trigger API to submit(handleNodeConfig) a config
        handleNodeConfig: PropTypes.func.isRequired, //Promise API
        loadConfig: PropTypes.func.isRequired //Promise API
      };

      static defaultProps = {
        timeOutOptions
      };

      state = {
        accounts: [],
        selectAccountDialog: null,
        switchStateDialog: null,
        config: null
      };

      /**
       * We should load config server and save it into state for later update
       */
      componentDidMount() {
        //Load configuration from the server
        this.props
          .loadConfig(this.props.node.id)
          .then(config =>
            this.setState(
              { config: config },
              () => this.props.callbackOnSubmit(this.handleNodeConfig) //Pass function to NodeDialog so it would be trigger from there.
            )
          )
          .catch(error => this.setState({ error: error }));
      }

      componentWillUnmount() {
        this.props.callbackOnSubmit(undefined);
      }

      /**
       * We will receive dataFromParent from NodeDialog component and this function would be trigger on clicking of save button
       * of NodeDialog.
       * We must have all the form data as config.
       * @param dataFromParent
       * @returns {*}
       */
      handleNodeConfig = dataFromParent => {
        //Call an Api for submitting node config
        const { accounts, config } = this.state;
        const updatedConfig = config
          .setName(dataFromParent.name)
          .setAccountIds(accounts.map(account => account.id));
        return this.props.handleNodeConfig(this.props.node.id, updatedConfig.toScala());
      };

      handleChangeWithSetter = setter => value => this.setState({ config: setter(value) });

      handleChangeFromEvent = setter => event =>
        this.handleChangeWithSetter(setter)(event.target.value);

      handleSelectAccountMode = mode => event => {
        this.handleChangeWithSetter(this.state.config.setAccountMode)(mode);
      };

      handleSaveSelectAccount = event => {
        this.setState({ accounts: event.target.value, selectAccountDialog: null });
      };

      handleConfigureEnabledStates = () => {
        this.setState({
          switchStateDialog: (
            <SwitchStateDialog
              onClose={this.handleCloseSwitchState}
              onSave={this.handleSaveSwitchState}
              states={this.state.config.states}
              getEmptyStates={this.state.config.getEmptyStates}
            />
          )
        });
      };

      handleSaveSwitchState = states => {
        this.handleChangeWithSetter(this.state.config.setStates)(
          states.map(state => state.toScala())
        );
        this.setState({ switchStateDialog: null });
      };

      handleCloseSwitchState = () => {
        this.setState({ switchStateDialog: null });
      };

      handleTimeOutChange = timeOut => {
        this.handleChangeWithSetter(this.state.config.setTimeout)(timeOut);
      };

      renderContent = config => {
        console.log(config);
        const { accounts, selectAccountDialog, switchStateDialog } = this.state;
        const { classes, t } = this.props;
        const timeOutOptions = this.props.timeOutOptions;
        return (
          <div className={classes.contentWrapper}>
            <Column stretch>
              <Row paddingTop>
                <FormControlLabel
                  control={
                    <Radio
                      checked={config.accountMode === "accountOne"}
                      onChange={this.handleSelectAccountMode("accountOne")}
                    />
                  }
                  label={t("accountOne")}
                  classes={{
                    root: classes.formRadioControl,
                    label: classes.formRadioLabel
                  }}
                />
              </Row>
              <Row>
                <FormControlLabel
                  control={
                    <Radio
                      checked={config.accountMode === "childAccount"}
                      onChange={this.handleSelectAccountMode("childAccount")}
                    />
                  }
                  label={t("childAccount")}
                  classes={{
                    root: classes.formRadioControl,
                    label: classes.formRadioLabel
                  }}
                />
              </Row>
              {config.accountMode === "childAccount" ? (
                <Row paddingBottom>
                  <SearchableChipSelector
                    apiMode="promise"
                    searchable={this.props.listSearchable}
                    name="accountSearch"
                    value={this.state.accounts}
                    savedIds={this.state.config.accountIds}
                    onChange={this.handleSaveSelectAccount}
                    className={classes.textField}
                    topLevelOnlyClassName={classes.searchableChipSelector}
                  />
                </Row>
              ) : null}
              <Row>
                <FormControlLabel
                  control={
                    <Radio
                      checked={config.accountMode === "selectFromVariable"}
                      onChange={this.handleSelectAccountMode("selectFromVariable")}
                    />
                  }
                  label={t("selectAccountFromVariable")}
                  classes={{
                    root: classes.formRadioControl,
                    label: classes.formRadioLabel
                  }}
                />
              </Row>
              <Row paddingTop paddingBottom>
                <PrimaryTextLink
                  className={classes.configureStates}
                  onClick={this.handleConfigureEnabledStates}
                >
                  {t("configureEnabledStates")}
                </PrimaryTextLink>
                {switchStateDialog}
              </Row>
              <Row>
                <Select
                  onChange={this.handleTimeOutChange}
                  getKey={time => time}
                  renderOption={time => t("secs", { seconds: time })}
                  options={timeOutOptions}
                  value={config.timeout}
                  label={t("timeOutIfNoData")}
                  tooltip={
                    <Tooltip
                      content={<TooltipContent title={t("timeout")} text={t("timeoutTooltip")} />}
                      placement="top"
                    >
                      <Icon color="inherit" className={classes.tooltipIcon}>
                        info
                      </Icon>
                    </Tooltip>
                  }
                  required
                  fullWidth
                />
              </Row>
            </Column>
          </div>
        );
      };

      render = () => (
        <RenderWithLoading property={this.state.config} renderCallback={this.renderContent} />
      );
    }
  )
);

export default CallCareNodeDialog;
