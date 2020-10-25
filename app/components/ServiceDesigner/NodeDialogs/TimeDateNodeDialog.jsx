import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  Grid,
  List,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  withStyles
} from "@material-ui/core";
import { PrimaryTextLink } from "components/Elements";
import {
  Row,
  Column,
  Box,
  Radio,
  Stretch,
  Text,
  RenderWithLoading
} from "components/LayoutElements";
import clsx from "clsx";
import CreateNewRuleDialog from "./TimeDateNodeDialog/CreateNewRuleDialog";
import SelectedRuleRow from "./TimeDateNodeDialog/SelectedRuleRow";
import MomentUtils from "@date-io/moment";
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import moment from "moment";
import "moment/locale/pt";

const styleSheet = theme => ({
  contentWrapper: {
    padding: "12px 24px",
    position: "relative",
    overflowY: "auto",
    height: "-webkit-fill-available",
    maxHeight: "100%"
  },

  checkModeSimple: {
    background: "#eee",
    paddingLeft: "16px !important",
    marginRight: 8,
    flexGrow: 1
  },

  checkModeAdvanced: {
    background: "#eee",
    paddingLeft: "16px !important",
    marginLeft: 8,
    flexGrow: 1
  },

  dateInputField: {
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
  },

  underline: {
    "&:before": {
      borderBottom: `1px solid ${theme.colors.primary.lightGrey} !important`
    },
    "&:after": {
      borderBottom: `2px solid ${theme.colors.primary.secondaryBlue} !important`
    },
    "&:hover:before": {
      borderBottom: `2px solid ${theme.colors.primary.lightGrey} !important`
    }
  },

  asterisk: {
    color: theme.colors.primary.secondaryBlue
  },

  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
  },

  filtersCheckbox: {
    width: 28,
    height: 28,
    marginLeft: 14
  },

  filtersCheckboxLabel: {
    color: theme.colors.primary.darkGrey
  },

  ruleModeWrapper: {
    width: "100%"
  },

  ruleModeRadio: {
    padding: 0,
    height: "32px",
    width: "100%"
  },

  rulesListHeader: {
    position: "relative",
    background: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.secondaryBlue}`
  },

  rulesList: {
    width: "100%",
    maxHeight: 230,
    overflow: "auto"
  },

  ruleActionButton: {
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.white}`
  },

  stateItem: {
    background: "#eee"
  },

  stateSelectBox: {
    marginRight: 10,
    width: "60%"
  },

  noRulesCreated: {
    fontWeight: 400,
    fontStyle: "italic",
    color: theme.colors.primary.mediumGrey,
    height: 50,
    lineHeight: "50px",
    textAlign: "center"
  }
});

const TimeDateNodeDialog = withStyles(styleSheet, { name: "TimeDateNodeDialog" })(
  translate(["servicedesigner", "services", "common"])(
    class TimeDateNodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired
      };

      state = {
        createNewRuleDialog: null,
        config: null
      };

      /**
       * We should load config server and save it into state for later update
       * TODO: This function is replicated everywhere. Consider refactoring this.
       */
      componentDidMount() {
        //Load configuration from the server
        this.props
          .loadConfig(this.props.node.id)
          .then(config => {
            console.log(config);
            this.setState(
              { config: config },
              () => this.props.callbackOnSubmit(this.handleNodeConfig) //Pass function to NodeDialog so it would be trigger from there.
            );
          })
          .catch(error => this.setState({ error: error }));
      }

      // TODO: This function is replicated everywhere. Consider refactoring this.
      componentWillUnmount() {
        this.props.callbackOnSubmit(undefined);
      }

      updateConfig = config => {
        this.setState({ config: config });
      };

      handleNodeConfig = dataFromParent => {
        //Call an Api for submitting node config
        const { config } = this.state;
        const updatedConfig = config.setName(dataFromParent.name);
        return this.props.handleNodeConfig(this.props.node.id, updatedConfig.toScala());
      };

      handleChangeWithSetter = setter => value => this.updateConfig(setter(value));

      handleChangeFromEvent = setter => event =>
        this.handleChangeWithSetter(setter)(event.target.value);

      handleChangeWithStaticValue = setter => value => param =>
        this.handleChangeWithSetter(setter)(value);

      handleChangeCheckMode = checkMode => () => {
        this.handleChangeWithSetter(this.state.config.setCheckMode)(checkMode);
      };

      handleCreateNewRule = () => {
        this.setState({
          createNewRuleDialog: (
            <CreateNewRuleDialog
              rules={this.state.rules}
              onSave={this.handleSaveNewRuleDialog}
              onClose={this.handleCloseNewRuleDialog}
            />
          )
        });
      };

      handleSaveNewRuleDialog = rule => {
        const { rules } = this.state.config;
        if (rules.indexOf(rule) !== -1) {
          rules[rules.indexOf(rule)] = { ...rule };
        } else {
          rules.push(rule);
        }
        this.setState({ createNewRuleDialog: null });
        this.handleChangeWithSetter(this.state.config.setRules)(rules);
      };

      handleCloseNewRuleDialog = rule => {
        this.setState({ createNewRuleDialog: null });
      };

      handleChangeTime = (field, value) => {
        const { time } = this.state.config;
        time[field] = value;
        this.handleChangeWithSetter(this.state.config.setTime)(time);
      };

      handleSelectDayOfWeeks = field => event => {
        const { dayOfWeeks } = this.state.config;
        dayOfWeeks.filter(weekDay => weekDay === field)[0].isSelected = event.target.checked;
        this.handleChangeWithSetter(this.state.config.setDayOfWeeks)(dayOfWeeks);
      };

      handleSelectCustomDays = event => {
        const { customDays } = this.state.config;
        customDays.isSelected = event.target.checked;
        this.handleChangeWithSetter(this.state.config.setCustomDays)(customDays);
      };

      handleAddDate = () => {
        const { customDays } = this.state.config;
        customDays.days.push({ from: null, to: null });
        this.handleChangeWithSetter(this.state.config.setCustomDays)(customDays);
      };

      handleChangeDate = (dayGroup, field, value) => {
        const { customDays } = this.state.config;
        customDays.days.filter(group => group === dayGroup)[0][field] = value;
        this.handleChangeWithSetter(this.state.config.setCustomDays)(customDays);
      };

      handleSelectRuleMode = ruleMode => event => {
        this.handleChangeWithSetter(this.state.config.setRuleMode)(ruleMode);
      };

      handleEditRule = rule => event => {
        this.setState({
          createNewRuleDialog: (
            <CreateNewRuleDialog
              rule={rule}
              onSave={this.handleSaveNewRuleDialog}
              onClose={this.handleCloseNewRuleDialog}
            />
          )
        });
      };

      handleRemoveRule = rule => event => {
        const { rules } = this.state.config;
        rules.splice(rules.indexOf(rule), 1);
        this.handleChangeWithSetter(this.state.config.setRules)(rules);
      };

      renderContent = config => {
        const { checkMode, time, dayOfWeeks, customDays, ruleMode, rules } = config;
        const { createNewRuleDialog } = this.state;
        const { classes, t } = this.props;

        return (
          <div className={classes.contentWrapper}>
            <Column stretch>
              <Row paddingTop>
                <Column>
                  <Grid container direction="row" spacing={16}>
                    <Grid item className={classes.checkModeSimple}>
                      <Radio
                        isChecked={checkMode === "simple"}
                        onChange={this.handleChangeCheckMode("simple")}
                        label={t("simple")}
                      />
                    </Grid>
                    <Grid item className={classes.checkModeAdvanced}>
                      <Radio
                        isChecked={checkMode === "advanced"}
                        onChange={this.handleChangeCheckMode("advanced")}
                        label={t("advanced")}
                      />
                    </Grid>
                  </Grid>
                </Column>
              </Row>
              {checkMode === "simple" && (
                <Row paddingTop>
                  <Column>
                    <Row paddingTop paddingBottom>
                      <Typography variant="subtitle1">{t("time")}</Typography>
                    </Row>
                    <Row paddingBottom>
                      <Column>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <TimePicker
                            keyboard
                            className={classes.dateInputField}
                            value={
                              time.from
                                ? moment(
                                    ScalaDate.timeStampToJSDate(ScalaDate.stringToTs(time.from))
                                  )
                                : null
                            }
                            onChange={content =>
                              this.handleChangeTime(
                                "from",
                                content
                                  ? ScalaDate.tsToString(ScalaDate.dateToTs(content.toDate()))
                                  : null
                              )
                            }
                            label={t("from")}
                            InputProps={{
                              classes: {
                                underline: classes.underline
                              }
                            }}
                            InputLabelProps={{
                              shrink: true,
                              FormLabelClasses: {
                                asterisk: classes.asterisk,
                                root: classes.label
                              }
                            }}
                            okLabel={t("ok")}
                            cancelLabel={t("cancel")}
                          />
                        </MuiPickersUtilsProvider>
                      </Column>
                      <Column>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <TimePicker
                            keyboard
                            className={classes.dateInputField}
                            value={
                              time.to
                                ? moment(ScalaDate.timeStampToJSDate(ScalaDate.stringToTs(time.to)))
                                : null
                            }
                            onChange={content =>
                              this.handleChangeTime(
                                "to",
                                content
                                  ? ScalaDate.tsToString(ScalaDate.dateToTs(content.toDate()))
                                  : null
                              )
                            }
                            label={t("to")}
                            InputProps={{
                              classes: {
                                underline: classes.underline
                              }
                            }}
                            InputLabelProps={{
                              shrink: true,
                              FormLabelClasses: {
                                asterisk: classes.asterisk,
                                root: classes.label
                              }
                            }}
                            okLabel={t("ok")}
                            cancelLabel={t("cancel")}
                          />
                        </MuiPickersUtilsProvider>
                      </Column>
                    </Row>
                    <Row paddingTop paddingBottom>
                      <Typography variant="subtitle1">{t("dayOfWeek")}</Typography>
                    </Row>
                    {dayOfWeeks.map(value => (
                      <Row key={value.label}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={value.isSelected}
                              onChange={this.handleSelectDayOfWeeks(value)}
                              classes={{ root: classes.filtersCheckbox }}
                            />
                          }
                          label={t(value.label)}
                          classes={{
                            label: classes.filtersCheckboxLabel
                          }}
                        />
                      </Row>
                    ))}
                    <Row>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={customDays.isSelected}
                              onChange={this.handleSelectCustomDays}
                              classes={{ root: classes.filtersCheckbox }}
                            />
                          }
                          label={t(customDays.label)}
                          classes={{
                            label: classes.filtersCheckboxLabel
                          }}
                        />
                      </FormGroup>
                    </Row>
                    {customDays.isSelected
                      ? customDays.days.map((dayGroup, index) => (
                          <Row paddingTop key={index}>
                            <Column>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                  keyboard
                                  className={classes.dateInputField}
                                  value={
                                    dayGroup.from
                                      ? moment(
                                          ScalaDate.timeStampToJSDate(
                                            ScalaDate.stringToTs(dayGroup.from)
                                          )
                                        )
                                      : null
                                  }
                                  onChange={content =>
                                    this.handleChangeDate(
                                      dayGroup,
                                      "from",
                                      content
                                        ? ScalaDate.tsToString(ScalaDate.dateToTs(content.toDate()))
                                        : null
                                    )
                                  }
                                  label={t("from")}
                                  InputProps={{
                                    classes: {
                                      underline: classes.underline
                                    }
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                    FormLabelClasses: {
                                      asterisk: classes.asterisk,
                                      root: classes.label
                                    }
                                  }}
                                  okLabel={t("ok")}
                                  cancelLabel={t("cancel")}
                                />
                              </MuiPickersUtilsProvider>
                            </Column>
                            <Column>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                  keyboard
                                  className={classes.dateInputField}
                                  value={
                                    dayGroup.to
                                      ? moment(
                                          ScalaDate.timeStampToJSDate(
                                            ScalaDate.stringToTs(dayGroup.to)
                                          )
                                        )
                                      : null
                                  }
                                  onChange={content =>
                                    this.handleChangeDate(
                                      dayGroup,
                                      "to",
                                      content
                                        ? ScalaDate.tsToString(ScalaDate.dateToTs(content.toDate()))
                                        : null
                                    )
                                  }
                                  label={t("to")}
                                  InputProps={{
                                    classes: {
                                      underline: classes.underline
                                    }
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                    FormLabelClasses: {
                                      asterisk: classes.asterisk,
                                      root: classes.label
                                    }
                                  }}
                                  okLabel={t("ok")}
                                  cancelLabel={t("cancel")}
                                />
                              </MuiPickersUtilsProvider>
                            </Column>
                          </Row>
                        ))
                      : null}
                    {customDays.isSelected && (
                      <Row>
                        <Stretch />
                        <Box>
                          <PrimaryTextLink
                            className={classes.addMoreDates}
                            onClick={this.handleAddDate}
                          >
                            {t("addMoreDates")}
                          </PrimaryTextLink>
                        </Box>
                      </Row>
                    )}
                  </Column>
                </Row>
              )}
              {checkMode === "advanced" && (
                <Row paddingTop>
                  <Column>
                    <Row paddingTop>
                      <div className={classes.ruleModeWrapper}>
                        <div className={classes.ruleModeRadio}>
                          <Radio
                            isChecked={ruleMode === "allRules"}
                            onChange={this.handleSelectRuleMode("allRules")}
                            label={t("willExitWithAnyRule")}
                          />
                        </div>
                        <div className={classes.ruleModeRadio}>
                          <Radio
                            isChecked={ruleMode === "eachRule"}
                            onChange={this.handleSelectRuleMode("eachRule")}
                            label={t("branchEachRule")}
                          />
                        </div>
                      </div>
                    </Row>
                    {ruleMode === "allRules" && (
                      <Row paddingTopDouble>
                        <Column>
                          <Row>
                            <Row paddingHalf paddingLeft classes={{ box: classes.rulesListHeader }}>
                              <Box>{t("rulesWithCount", { count: rules.length })}</Box>
                              <Stretch />
                              <Box>
                                <Button
                                  onClick={this.handleCreateNewRule}
                                  classes={{ root: classes.ruleActionButton }}
                                  variant="outlined"
                                  color="inherit"
                                >
                                  {t("createNewRule")}
                                </Button>
                              </Box>
                            </Row>
                          </Row>
                          {rules && rules.length ? (
                            <List classes={{ root: classes.rulesList }}>
                              {rules.map((item, key) => (
                                <SelectedRuleRow
                                  key={key}
                                  item={item}
                                  onEdit={this.handleEditRule(item)}
                                  onRemove={this.handleRemoveRule(item)}
                                />
                              ))}
                            </List>
                          ) : (
                            <Row borderHalf>
                              <Row padding justifyChildrenCenter>
                                <Text className={classes.noRulesCreated}>
                                  {t("nothingCreatedWithField", { field: "Rules" })}
                                </Text>
                              </Row>
                            </Row>
                          )}
                        </Column>
                      </Row>
                    )}
                    {ruleMode === "eachRule" && <Row>{/* TODO */}</Row>}

                    {createNewRuleDialog}
                  </Column>
                </Row>
              )}
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

export default TimeDateNodeDialog;
