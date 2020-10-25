import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import {
  Avatar,
  Grid,
  Icon,
  Typography,
  List,
  FormControlLabel,
  Checkbox,
  Radio,
  withStyles,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { ConfirmButtons, Pending, Select, TextField, Tooltip, TooltipContent } from "components";
import { Column, Row, Box, Stretch } from "components/LayoutElements";
import { SecondaryButton } from "components/Elements";
import * as formFields from "../../../api/serviceDesigner";
import SelectAccountDialog from "../../CallCareNodeDialog/SelectAccountDialog";
import SelectedAccountRow from "../../CallCareNodeDialog/SelectedAccountRow";

const styleSheet = theme => ({
  selectWeekDays: {
    paddingLeft: 36
  },

  selectAccount: {
    marginLeft: 36
  },

  selectedAccounts: {
    width: "100%"
  },

  formRadioControl: {
    alignItems: "flex-start",
    marginTop: -12
  },

  formRadioLabel: {
    color: theme.colors.primary.darkGrey,
    paddingTop: 12
  },

  formCheckboxControl: {
    width: 28,
    height: 28,
    marginLeft: 12,
    marginRight: 8
  },

  tooltipIcon: {
    color: theme.colors.primary.darkGrey
  }
});

class BasicInfoForm extends Component {
  static propTypes = {
    panelIndex: PropTypes.number, // should be set on creation mode
    data: PropTypes.shape({
      getBasicInfo: PropTypes.func,
      getChildAccounts: PropTypes.func
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_CCP_BASIC_INFO
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    basicInfo: {
      accountMode: "",
      accounts: [],
      timeout: 0,
      openingHourCombineMode: "",
      openingHourExceptionWeekday: "",
      useToday: false,
      useTomorrow: false,
      timeSelectionInterval: "",
      settings: "",

      timeOutOptions: [],
      weekdayOptions: [],
      timeSelectionIntervalOptions: [],
      settingsOptions: []
    },
    selectAccountDialog: null,
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  updateState = (setter, value) => this.setState({ basicInfo: setter(value) });

  handleChange = setter => event => this.updateState(setter, event.target.value);

  handleChangeAccountMode = accountMode => () => {
    this.updateState(this.state.basicInfo.setAccountMode, accountMode);
  };

  handleSelectAccount = () => {
    this.setState({
      selectAccountDialog: (
        <SelectAccountDialog
          onClose={this.handleCloseSelectAccount}
          onSave={this.handleSaveSelectAccount}
          getChildAccounts={this.props.data.getChildAccounts}
        />
      )
    });
  };

  handleCloseSelectAccount = () => {
    this.setState({ selectAccountDialog: null });
  };

  handleSaveSelectAccount = accounts => {
    this.updateState(this.state.basicInfo.setAccounts, accounts);
    this.setState({ selectAccountDialog: null });
  };

  handleRemoveSelectedAccount = account => () => {
    const accounts = this.state.basicInfo.accounts;
    accounts.splice(accounts.indexOf(account), 1);
    this.updateState(this.state.basicInfo.setAccounts, accounts);
  };

  handleTimeOutChange = timeOut => {
    this.updateState(this.state.basicInfo.setTimeOut, timeOut);
  };

  handleChangeOpeningHourCombineMode = openingHourCombineMode => () => {
    this.updateState(this.state.basicInfo.setOpeningHourCombineMode, openingHourCombineMode);
  };

  handleChangeOpeningHourExceptionWeekday = openingHourExceptionWeekday => {
    this.updateState(
      this.state.basicInfo.setOpeningHourExceptionWeekday,
      openingHourExceptionWeekday
    );
  };

  handleChangeUseToday = () => {
    this.updateState(this.state.basicInfo.setUseToday, !this.state.basicInfo.useToday);
  };

  handleChangeUseTomorrow = () => {
    this.updateState(this.state.basicInfo.setUseTomorrow, !this.state.basicInfo.useTomorrow);
  };

  handleChangeTimeSelectionInterval = interval => {
    this.updateState(this.state.basicInfo.setTimeSelectionInterval, interval);
  };

  handleChangeSettings = settings => {
    this.updateState(this.state.basicInfo.setSettings, settings);
  };

  // handleStatus = selectedValue => {
  //   const basicInfo = this.state.basicInfo.setStatus(this.state.basicInfo.status.get(selectedValue.value));
  //   this.setState({ basicInfo });
  // };

  componentDidMount() {
    this.promiseToDiode();
  }

  getFieldErrorMessage = fieldName =>
    (this.state.errors &&
      this.state.errors.formErrors &&
      this.state.errors.formErrors[fieldName]) ||
    (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

  isFieldInvalid = fieldName => !!this.getFieldErrorMessage(fieldName);

  revertToServer = () => this.promiseToDiode();

  promiseToDiode = () => {
    this.props.data
      .getBasicInfo()
      .then(basicInfo =>
        this.setState({
          basicInfo,
          diode: { loading: false, data: basicInfo }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  renderForm = basicInfo => () => {
    const { panelIndex, classes, t } = this.props;

    const {
      accountMode,
      timeOut,
      openingHourCombineMode,
      openingHourExceptionWeekday,
      useToday,
      useTomorrow,
      timeSelectionInterval,
      settings,
      accounts,
      timeOutOptions,
      weekdayOptions,
      timeSelectionIntervalOptions,
      settingsOptions
    } = basicInfo;
    const { selectAccountDialog } = this.state;

    return (
      <Column stretch>
        <Row>
          <FormControlLabel
            control={
              <Radio
                checked={accountMode === "thisAccount"}
                onChange={this.handleChangeAccountMode("thisAccount")}
              />
            }
            label={t("thisAccount")}
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
                checked={accountMode === "childAccount"}
                onChange={this.handleChangeAccountMode("childAccount")}
              />
            }
            label={t("childAccount")}
            classes={{
              root: classes.formRadioControl,
              label: classes.formRadioLabel
            }}
          />
        </Row>
        {accountMode === "childAccount" &&
          (accounts && accounts.length ? (
            <List classes={{ root: classes.selectedAccounts }}>
              {accounts.map((item, index) => (
                <SelectedAccountRow
                  key={index}
                  item={item}
                  onRemove={this.handleRemoveSelectedAccount(item)}
                />
              ))}
            </List>
          ) : (
            <Row>
              <SecondaryButton className={classes.selectAccount} onClick={this.handleSelectAccount}>
                {t("selectAccount")}
              </SecondaryButton>

              {selectAccountDialog}
            </Row>
          ))}
        <Row paddingTop>
          <Select
            onChange={this.handleTimeOutChange}
            getKey={time => time}
            renderOption={time => (time ? t("secs", { seconds: time }) : "")}
            options={timeOutOptions}
            value={timeOut ? timeOut : ""}
            label={t("timeOutIfNoData")}
            fullWidth
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
          />
        </Row>
        <Row paddingTopDouble>
          <FormControlLabel
            control={
              <Radio
                checked={openingHourCombineMode === "fromToday"}
                onChange={this.handleChangeOpeningHourCombineMode("fromToday")}
              />
            }
            label={t("openingHoursCombined")}
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
                checked={openingHourCombineMode === "nextSevenDays"}
                onChange={this.handleChangeOpeningHourCombineMode("nextSevenDays")}
              />
            }
            label={t("readExceptionsNextSevenDays")}
            classes={{
              root: classes.formRadioControl,
              label: classes.formRadioLabel
            }}
          />
        </Row>
        {openingHourCombineMode === "nextSevenDays" && (
          <Select
            className={classes.selectWeekDays}
            onChange={this.handleChangeOpeningHourExceptionWeekday}
            getKey={weekday => weekday}
            renderOption={t}
            options={weekdayOptions}
            value={openingHourExceptionWeekday}
            fullWidth
          />
        )}
        <Row paddingTopDouble>
          <FormControlLabel
            control={
              <Checkbox
                checked={useToday}
                onChange={this.handleChangeUseToday}
                className={classes.formCheckboxControl}
              />
            }
            label={t("useToday")}
          />
        </Row>
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={useTomorrow}
                onChange={this.handleChangeUseTomorrow}
                className={classes.formCheckboxControl}
              />
            }
            label={t("useTomorrow")}
          />
        </Row>
        <Row paddingTopDouble>
          <Select
            onChange={this.handleChangeTimeSelectionInterval}
            getKey={interval => interval}
            renderOption={interval => t("minutes", { minutes: interval })}
            options={timeSelectionIntervalOptions}
            value={timeSelectionInterval}
            label={t("audioFileTimeInterval")}
            tooltip={
              <Tooltip
                content={
                  <TooltipContent
                    title={t("audioFileTimeInterval")}
                    text={t("timeIntervalTooltip")}
                  />
                }
                placement="top"
              >
                <Icon color="inherit" className={classes.tooltipIcon}>
                  info
                </Icon>
              </Tooltip>
            }
            fullWidth
          />
        </Row>
        <Row paddingTopDouble>
          <Select
            onChange={this.handleChangeSettings}
            getKey={option => option}
            renderOption={option => t(option + "ToNearestInterval")}
            options={settingsOptions}
            value={settings}
            label={t("settings")}
            tooltip={
              <Tooltip
                content={<TooltipContent title={t("settings")} text={t("settingsTooltip")} />}
                placement="top"
              >
                <Icon color="inherit" className={classes.tooltipIcon}>
                  info
                </Icon>
              </Tooltip>
            }
            fullWidth
          />
        </Row>
      </Column>
    );
  };

  render = () => {
    // const basicInfo = this.props.data.getBasicInfo();
    // return this.renderForm(basicInfo);

    const { diode, basicInfo } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(basicInfo)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidthw
      />
    );
  };
}

export default withStyles(styleSheet, { name: "BasicInfoForm" })(
  translate(["servicedesigner", "common"])(BasicInfoForm)
);
