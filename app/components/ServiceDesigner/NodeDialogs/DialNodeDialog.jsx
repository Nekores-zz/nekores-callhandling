import React, { PureComponent, Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Grid, Typography, FormControlLabel, Button, Radio, withStyles } from "@material-ui/core";
import { PrimaryTextLink, SecondaryButton, Icon } from "components/Elements";
import {
  ConfirmButtons,
  Row,
  Column,
  Box,
  Select,
  Stretch,
  Text,
  TextField,
  DragAndDropRowSelector,
  RenderWithLoading
} from "components/LayoutElements";
import { Tooltip, TooltipContent, SearchableChipSelector } from "components";
import {
  numberPresentationOptions,
  countryCodeOptions,
  getCountryCode,
  getFormattedCode,
  timeOutOptions
} from "config/serviceDesignerMockData";
import { DiodeSearchable } from "utils/commonShapes";
import SelectedAccountRow from "./CallCareNodeDialog/SelectedAccountRow";
import NumberRow from "./DialNodeDialog/NumberRow";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  createNewLink: {
    padding: 0,
    margin: 0
  },

  grid60: {
    width: "60%",
    marginRight: 16
  },

  grid100: {
    width: "100%"
  },

  paddingTopHalf: {
    paddingTop: 8
  },

  height100: {
    height: "100%"
  },

  numberRow: {
    // height: "100%",
    background: "white"
  },

  searchableChipSelectorWrapper: {
    width: "100%",
    marginRight: -14
  },

  searchableChipSelector: {
    // width: "516px",
    width: "100%"
  },

  searchableChipSelectorList: {
    width: 552
  },

  searchableChipSelectorListWithRadio: {
    width: 552 - 32
  },

  searchableChipSelectorListWithPadding: {
    width: 479
  },

  searchableChipSelectorListWithRadioPadding: {
    width: 479 - 32
  },

  createVariableWrapper: {
    background: "#eee"
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    height: 40,
    marginTop: 18
  },

  numbersListHeader: {
    position: "relative",
    background: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.secondaryBlue}`
  },

  numbersList: {
    width: "100%",
    maxHeight: 230,
    overflow: "auto"
  },

  numberActionButton: {
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.white}`
  },

  noNumbersCreated: {
    fontWeight: 400,
    fontStyle: "italic",
    color: theme.colors.primary.mediumGrey,
    height: 50,
    lineHeight: "50px",
    textAlign: "center"
  },

  tooltipIcon: {
    color: theme.colors.primary.darkGrey,
    fontSize: "24px",
    position: "relative",
    top: 12,
    right: 8,
    float: "right"
  }
});

const DialNodeDialog = withStyles(styleSheet, { name: "DialNodeDialog" })(
  translate(["servicedesigner", "services", "common"])(
    class DialNodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired,
        multiDial: PropTypes.bool,

        numberPresentationOptions: PropTypes.array,

        handleNodeConfig: PropTypes.func.isRequired, //Promise API
        loadConfig: PropTypes.func.isRequired, //Promise API
        callbackOnSubmit: PropTypes.func.isRequired,

        searchableNumbers: DiodeSearchable.isRequired,
        searchableVariableOptions: DiodeSearchable.isRequired
      };

      static defaultProps = {
        numberPresentationOptions,
        countryCodeOptions,
        getCountryCode,
        getFormattedCode,
        timeOutOptions
      };

      state = {
        dialMode: this.props.multiDial ? "multiDial" : "singleDial",
        config: null,

        // multi-dial
        editNumber: null
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

      handleChangeDialMode = dialMode => () => {
        this.setState({ dialMode });
      };

      handleChangeNumberPresentationMode = config =>
        this.handleChangeWithSetter(config.setNumberPresentationMode);

      handleChangeNumberMode = config => this.handleChangeWithStaticValue(config.setNumberMode);

      handleChangeCodeMode = config => this.handleChangeWithStaticValue(config.setCodeMode);

      handleChangeNewVariable = event => {
        this.setState({ newVariable: event.target.value });
      };

      handleRemoveSelectedOwnedNumber = () => {
        this.handleChangeWithSetter(this.state.config.setNumber)(null);
      };

      handleChangeNewCustomNumber = event => {
        this.setState({ newCustomNumber: event.target.value });
      };

      handleShowCreateCustomNumber = () => {
        this.setState({ showCreateCustomNumber: true });
      };

      handleCreateCustomNumber = () => {
        // ... create new custom number code here
        const customNumber = { id: null, name: this.state.newCustomNumber };
        this.setState({ showCreateCustomNumber: false });
        this.handleChangeWithSetter(this.state.config.setCustomNumber)(customNumber);
      };

      handleCancelCreateCustomNumber = () => {
        this.setState({ showCreateCustomNumber: false });
      };

      handleRemoveSelectedCustomNumber = () => {
        this.handleChangeWithSetter(this.state.config.setCustomNumber)(null);
      };

      handleShowCreateNewVariable = () => {
        this.setState({ showCreateNewVariable: true });
      };

      handleCancelCreateNewVariable = () => {
        this.setState({ showCreateNewVariable: false });
      };

      handleCreateNewVariable = () => {
        // ... create new variable code here
        this.setState({ showCreateNewVariable: false });
      };

      handleChangeDistributionMode = distributionMode => () => {
        this.handleChangeWithSetter(this.state.config.setDistributionMode)(distributionMode);
      };

      handleMultiNumberPresentationMode = multiNumberPresentationMode => {
        this.handleChangeWithSetter(this.state.config.setMultiNumberPresentationMode)(
          multiNumberPresentationMode
        );
      };

      handleAddNumber = () => {
        if (this.state.editNumber === null) {
          const numbers = this.state.config.numbers;
          const id = numbers.length ? Math.max(...numbers.map(item => item.id)) + 1 : 1;
          const number = {
            id,
            numberMode: "number",
            codeMode: "countryCode",
            countryCode: "uk",
            localNumber: "",
            variable: "",
            showCreateNewVariable: false,
            newVariable: "",
            timeout: 10,
            reportLabel: "",
            numberPresentationMode: "overrideNumberPresentation"
          };
          numbers.unshift(number);
          this.handleChangeWithSetter(this.state.config.setNumbers)(numbers);

          this.handleExpandOptions(number)();
        }
      };

      handleExpandOptions = item => () => {
        const editNumber = { ...item };
        this.setState({ editNumber });
      };

      handleDeleteNumber = () => {
        const numbers = this.state.config.numbers;
        const editNumber = this.state.editNumber;
        const i = numbers.findIndex(item => item.id === editNumber.id);

        if (i !== -1) {
          numbers.splice(i, 1);
          this.setState({ editNumber: null });
          this.handleChangeWithSetter(this.state.config.setNumbers)(numbers);
        }
      };

      handleSaveNumber = () => {
        const numbers = this.state.config.numbers;
        const editNumber = this.state.editNumber;
        const i = numbers.findIndex(item => item.id === editNumber.id);

        if (i !== -1) {
          numbers[i].numberMode = editNumber.numberMode;
          numbers[i].codeMode = editNumber.codeMode;
          numbers[i].countryCode = editNumber.countryCode;
          numbers[i].localNumber = editNumber.localNumber;
          numbers[i].variable = editNumber.variable;
          numbers[i].timeout = editNumber.timeout;
          numbers[i].reportLabel = editNumber.reportLabel;
          numbers[i].numberPresentationMode = editNumber.numberPresentationMode;
          // editNumber.numberPresentationMode === "overrideNumberPresentation"
          //   ? this.state.multiNumberPresentationMode
          //   : editNumber.numberPresentationMode;
          numbers[i].number =
            numbers[i].codeMode === "countryCode"
              ? "+" +
                this.props.getCountryCode(numbers[i].countryCode) +
                " " +
                numbers[i].localNumber
              : // ?  numbers[i].localNumber
                numbers[i].variable.name;

          this.setState({ editNumber: null });
          this.handleChangeWithSetter(this.state.config.setNumbers)(numbers);
        }
      };

      handleCancelCreateNewNumber = () => {
        this.setState({ editNumber: null });
      };

      handleEditChangeNumberPresentationMode = numberPresentationMode => {
        this.setState({ editNumber: { ...this.state.editNumber, numberPresentationMode } });
      };

      handleEditChangeNumberMode = numberMode => () => {
        this.setState({ editNumber: { ...this.state.editNumber, numberMode } });
      };

      handleEditChangeCodeMode = codeMode => () => {
        this.setState({ editNumber: { ...this.state.editNumber, codeMode } });
      };

      handleEditChangeCountryCode = countryCode => {
        this.setState({ editNumber: { ...this.state.editNumber, countryCode } });
      };

      handleEditChangeLocalNumber = event => {
        this.setState({
          editNumber: { ...this.state.editNumber, localNumber: event.target.value }
        });
      };

      handleEditChangeNewVariable = event => {
        this.setState({
          editNumber: { ...this.state.editNumber, newVariable: event.target.value }
        });
      };

      handleEditChangeVariable = event => {
        this.setState({ editNumber: { ...this.state.editNumber, variable: event.target.value } });
      };

      handleEditChangeNumber = event => {
        this.setState({ editNumber: { ...this.state.editNumber, number: event.target.value } });
      };

      handleEditShowCreateNewVariable = () => {
        this.setState({ editNumber: { ...this.state.editNumber, showCreateNewVariable: true } });
      };

      handleEditCancelCreateNewVariable = () => {
        this.setState({ editNumber: { ...this.state.editNumber, showCreateNewVariable: false } });
      };

      handleEditCreateNewVariable = () => {
        // ... create new variable code here
        this.setState({ editNumber: { ...this.state.editNumber, showCreateNewVariable: false } });
      };

      handleEditChangeTimeout = timeout => {
        this.setState({ editNumber: { ...this.state.editNumber, timeout } });
      };

      handleEditChangeReportLabel = event => {
        this.setState({
          editNumber: { ...this.state.editNumber, reportLabel: event.target.value }
        });
      };

      reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
      };

      // Drag-n-Drop component event handler
      onDragEnd = result => {
        if (!result.destination || result.destination.index === result.source.index) {
          return;
        }

        const numbers = this.reorder(
          this.state.config.numbers,
          result.source.index,
          result.destination.index
        );
        this.handleChangeWithSetter(this.state.config.setNumbers)(numbers);
      };

      renderCustomNumberSelector = ({
        searchableNumbers,
        customNumber,
        showCreateCustomNumber,
        newCustomNumber,
        config,
        classes,
        t
      }) =>
        customNumber === null ? (
          showCreateCustomNumber ? (
            <Row paddingTop>
              <Column padding classes={{ box: classes.createVariableWrapper }}>
                <Row>
                  <TextField
                    value={newCustomNumber}
                    onChange={this.handleChangeNewCustomNumber}
                    label={t("createCustomNumber")}
                    fullWidth
                  />
                </Row>
                <Row>
                  <Stretch />
                  <ConfirmButtons
                    confirmLabel={t("createNumber")}
                    onConfirm={this.handleCreateCustomNumber}
                    onCancel={this.handleCancelCreateCustomNumber}
                    blocked={!newCustomNumber}
                  />
                </Row>
              </Column>
            </Row>
          ) : (
            <Row paddingTop>
              <Column>
                <Row>
                  {/* <div className={classes.searchableChipSelector}> */}
                  <SearchableChipSelector
                    searchable={searchableNumbers}
                    topLevelOnlyClassName={classes.searchableChipSelector}
                    className={classes.searchableChipSelectorList}
                    // className={classes.searchableChipSelector}
                    name="selectedCustomNumber"
                    value={customNumber}
                    label={t("customNumber")}
                    emptyLabel={t("select")}
                    onChange={this.handleChangeFromEvent(config.setCustomNumber)}
                    oneValue
                  />
                  {/* </div> */}
                </Row>
                <Row>
                  <Stretch />
                  <PrimaryTextLink
                    className={classes.createNewLink}
                    onClick={this.handleShowCreateCustomNumber}
                  >
                    {t("createCustomNumber")}
                  </PrimaryTextLink>
                </Row>
              </Column>
            </Row>
          )
        ) : (
          <Row paddingTop>
            <Column>
              <Row>
                <Typography variant="caption">{t("customNumber")}</Typography>
              </Row>
              <Row>
                <SelectedAccountRow
                  item={customNumber}
                  onRemove={this.handleRemoveSelectedCustomNumber}
                />
              </Row>
              {!customNumber.id && (
                <Row>
                  <Text variant="errorMessage">
                    <Icon>warning</Icon> &nbsp;{t("numberNotAccept")}
                  </Text>
                </Row>
              )}
            </Column>
          </Row>
        );

      renderSelectOwnedNumber = ({ number, searchableNumbers, config, classes, t }) =>
        !number ? (
          <Row paddingTop>
            <SearchableChipSelector
              searchable={searchableNumbers}
              name="selectedNumber"
              topLevelOnlyClassName={classes.searchableChipSelector}
              className={classes.searchableChipSelectorList}
              value={number}
              label={t("number")}
              emptyLabel={t("select")}
              onChange={this.handleChangeFromEvent(config.setNumber)}
              oneValue
            />
          </Row>
        ) : (
          <Row paddingTop>
            <Column>
              <Row>
                <Typography variant="caption">{t("number")}</Typography>
              </Row>
              <Row>
                <SelectedAccountRow item={number} onRemove={this.handleRemoveSelectedOwnedNumber} />
              </Row>
            </Column>
          </Row>
        );

      renderContent = config => {
        const {
          dialMode,
          editNumber,
          showCreateCustomNumber,
          showCreateNewVariable,
          newCustomNumber
        } = this.state;

        const {
          numberPresentationMode,
          numberMode,
          number,
          customNumber,
          codeMode,
          countryCode,
          localNumber,
          variable,
          reportLabel,
          timeout,
          // multi-dial
          multiNumberPresentationMode,
          distributionMode,
          numbers
        } = config;

        const {
          numberPresentationOptions,
          searchableNumbers,
          countryCodeOptions,
          getFormattedCode,
          searchableVariableOptions,
          timeOutOptions
        } = this.props;
        const { classes, t } = this.props;

        const RenderCustomNumberSelector = this.renderCustomNumberSelector;
        const RenderSelectOwnedNumber = this.renderSelectOwnedNumber;

        return (
          <div className={classes.contentWrapper}>
            <Column stretch>
              <Row paddingTop>
                <Column>
                  <Grid container direction="row" spacing={16}>
                    <Grid item className={classes.checkModeSimple}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={dialMode === "singleDial"}
                            onChange={this.handleChangeDialMode("singleDial")}
                          />
                        }
                        label={t("singleDial")}
                      />
                    </Grid>
                    <Grid item className={classes.checkModeAdvanced}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={dialMode === "multiDial"}
                            onChange={this.handleChangeDialMode("multiDial")}
                          />
                        }
                        label={t("multiDial")}
                      />
                    </Grid>
                  </Grid>
                </Column>
              </Row>
              {dialMode === "singleDial" && (
                <Row paddingTop>
                  <Column>
                    <Row paddingTop>
                      <Select
                        onChange={this.handleChangeNumberPresentationMode(config)}
                        getKey={mode => mode}
                        renderOption={t}
                        options={numberPresentationOptions}
                        value={numberPresentationMode}
                        label={t("numberPresentation")}
                        fullWidth
                      />
                    </Row>
                    {numberPresentationMode === "selectOwnedNumbers" && (
                      <RenderSelectOwnedNumber
                        number={number}
                        searchableNumbers={searchableNumbers}
                        config={config}
                        classes={classes}
                        t={t}
                      />
                    )}
                    {numberPresentationMode === "customPresentationNumber" && (
                      <RenderCustomNumberSelector
                        searchableNumbers={searchableNumbers}
                        customNumber={customNumber}
                        showCreateCustomNumber={showCreateCustomNumber}
                        newCustomNumber={newCustomNumber}
                        config={config}
                        classes={classes}
                        t={t}
                      />
                    )}
                    <Row paddingTop>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={numberMode === "number"}
                            onChange={this.handleChangeNumberMode(config)("number")}
                          />
                        }
                        label={t("number")}
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            checked={numberMode === "sip-uri"}
                            onChange={this.handleChangeNumberMode(config)("sip-uri")}
                          />
                        }
                        label={t("sipUri")}
                      />
                    </Row>
                    <Row paddingTop>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={codeMode === "countryCode"}
                            onChange={this.handleChangeCodeMode(config)("countryCode")}
                          />
                        }
                        label={
                          <Select
                            onChange={this.handleChangeWithSetter(config.setCountryCode)}
                            getKey={mode => mode}
                            renderOption={getFormattedCode}
                            options={countryCodeOptions}
                            value={countryCode}
                            label={t("countryCode")}
                            fullWidth
                          />
                        }
                        className={classes.grid60}
                        classes={{ label: classes.grid100 }}
                      />
                      <TextField
                        value={localNumber}
                        onChange={this.handleChangeFromEvent(config.setLocalNumber)}
                        label={t("number")}
                        fullWidth
                      />
                    </Row>
                    {showCreateNewVariable ? (
                      <Row paddingTop>
                        <Column padding classes={{ box: classes.createVariableWrapper }}>
                          <Row>
                            <TextField
                              value={newVariable}
                              onChange={this.handleChangeNewVariable}
                              label={t("variabler")}
                              fullWidth
                            />
                          </Row>
                          <Row>
                            <Stretch />
                            <ConfirmButtons
                              confirmLabel={t("createVariable")}
                              onConfirm={this.handleCreateNewVariable}
                              onCancel={this.handleCancelCreateNewVariable}
                              blocked={!newVariable}
                            />
                          </Row>
                        </Column>
                      </Row>
                    ) : (
                      <div>
                        <Row paddingTop>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={codeMode === "variable"}
                                onChange={this.handleChangeCodeMode(config)("variable")}
                              />
                            }
                            label={
                              // <div className={classes.searchableChipSelector}>
                              <SearchableChipSelector
                                searchable={searchableVariableOptions}
                                topLevelOnlyClassName={classes.searchableChipSelector}
                                className={classes.searchableChipSelectorListWithRadio}
                                // className={classes.searchableChipSelector}
                                name="selectedVariable"
                                value={variable}
                                emptyLabel={t("variable")}
                                onChange={this.handleChangeFromEvent(config.setVariable)}
                                oneValue
                              />
                              // </div>
                            }
                            className={classes.grid100}
                            classes={{ label: classes.searchableChipSelectorWrapper }}
                          />
                        </Row>
                        <Row>
                          <Stretch />
                          <PrimaryTextLink
                            className={classes.createNewLink}
                            onClick={this.handleShowCreateNewVariable}
                          >
                            {t("createNewVariable")}
                          </PrimaryTextLink>
                        </Row>
                      </div>
                    )}
                    {customNumber && codeMode === "variable" && !customNumber.id && (
                      <Row>
                        <Text variant="errorMessage">
                          <Icon>warning</Icon> &nbsp;{t("numberWillbeWithheld")}
                        </Text>
                      </Row>
                    )}
                    <Row paddingTop>
                      <Select
                        onChange={this.handleChangeWithSetter(config.setTimeout)}
                        getKey={time => time}
                        renderOption={time => t("secs", { seconds: time })}
                        options={timeOutOptions}
                        value={timeout}
                        label={t("timeoutAfterRingingFor")}
                        className={classes.grid60}
                      />
                      <TextField
                        label={t("labelForReports")}
                        value={reportLabel}
                        onChange={this.handleChangeFromEvent(config.setReportLabel)}
                        fullWidth
                      />
                    </Row>
                  </Column>
                </Row>
              )}
              {dialMode === "multiDial" && (
                <Row paddingTop>
                  <Column>
                    <Row paddingBottom>
                      <Text className={classes.heading}>{t("callDistribution")}</Text>
                    </Row>
                    <Row>
                      <Column>
                        <Grid container direction="row" spacing={16}>
                          <Grid item className={classes.checkModeSimple}>
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={distributionMode === "blast"}
                                  onChange={this.handleChangeDistributionMode("blast")}
                                />
                              }
                              label={t("blast")}
                            />
                            <Tooltip
                              content={
                                <TooltipContent title={t("blast")} text={t("blastTooltip")} />
                              }
                              placement="top"
                            >
                              <Icon color="inherit" className={classes.tooltipIcon}>
                                info
                              </Icon>
                            </Tooltip>
                          </Grid>
                          <Grid item className={classes.checkModeAdvanced}>
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={distributionMode === "sequential"}
                                  onChange={this.handleChangeDistributionMode("sequential")}
                                />
                              }
                              label={t("sequential")}
                            />
                            <Tooltip
                              content={
                                <TooltipContent
                                  title={t("sequential")}
                                  text={t("sequentialTooltip")}
                                />
                              }
                              placement="top"
                            >
                              <Icon color="inherit" className={classes.tooltipIcon}>
                                info
                              </Icon>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Column>
                    </Row>
                    <Row paddingTopDouble>
                      <Select
                        onChange={this.handleMultiNumberPresentationMode}
                        getKey={mode => mode}
                        renderOption={t}
                        options={numberPresentationOptions}
                        value={multiNumberPresentationMode}
                        label={t("numberPresentation")}
                        fullWidth
                      />
                    </Row>
                    {multiNumberPresentationMode === "selectOwnedNumbers" && (
                      <RenderSelectOwnedNumber
                        number={number}
                        searchableNumbers={searchableNumbers}
                        config={config}
                        classes={classes}
                        t={t}
                      />
                    )}
                    {multiNumberPresentationMode === "customPresentationNumber" && (
                      <RenderCustomNumberSelector
                        searchableNumbers={searchableNumbers}
                        customNumber={customNumber}
                        showCreateCustomNumber={showCreateCustomNumber}
                        newCustomNumber={newCustomNumber}
                        config={config}
                        classes={classes}
                        t={t}
                      />
                    )}
                    <Row paddingTop>
                      <Column>
                        <Row>
                          <Row paddingHalf paddingLeft classes={{ box: classes.numbersListHeader }}>
                            <Box>{t("numbersWithCount", { count: numbers.length })}</Box>
                            <Stretch />
                            <Box>
                              <Button
                                onClick={this.handleAddNumber}
                                classes={{ root: classes.numberActionButton }}
                                variant="outlined"
                                color="inherit"
                              >
                                {t("addNumbers")}
                              </Button>
                            </Box>
                          </Row>
                        </Row>
                        {numbers && numbers.length ? (
                          <Row>
                            {/* <Column> */}
                            <DragDropContext onDragEnd={this.onDragEnd}>
                              <Droppable droppableId="list">
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={classes.grid100}
                                  >
                                    <Column>
                                      {numbers.map((item, key) => (
                                        <Draggable draggableId={String(key)} index={key} key={key}>
                                          {(provided, snapshot) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={clsx(
                                                classes.grid100,
                                                // classes.height100,
                                                classes.paddingTopHalf
                                              )}
                                            >
                                              {/* <Row paddingTopHalf> */}
                                              {!(editNumber && item.id === editNumber.id) ? (
                                                <Row
                                                  borderHalf
                                                  classes={{ box: classes.numberRow }}
                                                >
                                                  <DragAndDropRowSelector>
                                                    <NumberRow
                                                      item={item}
                                                      onMoreOptions={this.handleExpandOptions(item)}
                                                    />
                                                  </DragAndDropRowSelector>
                                                </Row>
                                              ) : (
                                                <DragAndDropRowSelector
                                                  wrapperClass={classes.createVariableWrapper}
                                                >
                                                  <Column padding>
                                                    <Row>
                                                      <FormControlLabel
                                                        control={
                                                          <Radio
                                                            checked={
                                                              editNumber.numberMode === "number"
                                                            }
                                                            onChange={this.handleEditChangeNumberMode(
                                                              "number"
                                                            )}
                                                          />
                                                        }
                                                        label={t("number")}
                                                      />
                                                      <FormControlLabel
                                                        control={
                                                          <Radio
                                                            checked={
                                                              editNumber.numberMode === "sip-uri"
                                                            }
                                                            onChange={this.handleEditChangeNumberMode(
                                                              "sip-uri"
                                                            )}
                                                          />
                                                        }
                                                        label={t("sipUri")}
                                                      />
                                                    </Row>
                                                    <Row paddingTop>
                                                      <FormControlLabel
                                                        control={
                                                          <Radio
                                                            checked={
                                                              editNumber.codeMode === "countryCode"
                                                            }
                                                            onChange={this.handleEditChangeCodeMode(
                                                              "countryCode"
                                                            )}
                                                          />
                                                        }
                                                        label={
                                                          <Select
                                                            onChange={
                                                              this.handleEditChangeCountryCode
                                                            }
                                                            getKey={mode => mode}
                                                            renderOption={getFormattedCode}
                                                            options={countryCodeOptions}
                                                            value={editNumber.countryCode}
                                                            label={t("countryCode")}
                                                            fullWidth
                                                          />
                                                        }
                                                        className={classes.grid60}
                                                        classes={{ label: classes.grid100 }}
                                                      />
                                                      <TextField
                                                        value={editNumber.localNumber}
                                                        onChange={this.handleEditChangeLocalNumber}
                                                        label={t("number")}
                                                        fullWidth
                                                      />
                                                    </Row>
                                                    {showCreateNewVariable ? (
                                                      <Row paddingTop>
                                                        <Column
                                                          padding
                                                          classes={{
                                                            box: classes.createVariableWrapper
                                                          }}
                                                        >
                                                          <Row>
                                                            <TextField
                                                              value={editNumber.newVariable}
                                                              onChange={
                                                                this.handleEditChangeNewVariable
                                                              }
                                                              label={t("variabler")}
                                                              fullWidth
                                                            />
                                                          </Row>
                                                          <Row>
                                                            <Stretch />
                                                            <ConfirmButtons
                                                              confirmLabel={t("createVariable")}
                                                              onConfirm={
                                                                this.handleEditCreateNewVariable
                                                              }
                                                              onCancel={
                                                                this
                                                                  .handleEditCancelCreateNewVariable
                                                              }
                                                              blocked={!editNumber.newVariable}
                                                            />
                                                          </Row>
                                                        </Column>
                                                      </Row>
                                                    ) : (
                                                      <div>
                                                        <Row paddingTop>
                                                          <FormControlLabel
                                                            control={
                                                              <Radio
                                                                checked={
                                                                  editNumber.codeMode === "variable"
                                                                }
                                                                onChange={this.handleEditChangeCodeMode(
                                                                  "variable"
                                                                )}
                                                              />
                                                            }
                                                            label={
                                                              // <div className={classes.searchableChipSelector}>
                                                              <SearchableChipSelector
                                                                searchable={
                                                                  searchableVariableOptions
                                                                }
                                                                topLevelOnlyClassName={
                                                                  classes.searchableChipSelector
                                                                }
                                                                className={
                                                                  classes.searchableChipSelectorListWithRadioPadding
                                                                }
                                                                // className={classes.searchableChipSelector}
                                                                name="selectedVariable"
                                                                value={editNumber.variable}
                                                                emptyLabel={t("variable")}
                                                                onChange={
                                                                  this.handleEditChangeVariable
                                                                }
                                                                oneValue
                                                              />
                                                              // </div>
                                                            }
                                                            className={classes.grid100}
                                                            classes={{
                                                              label:
                                                                classes.searchableChipSelectorWrapper
                                                            }}
                                                          />
                                                        </Row>
                                                        <Row>
                                                          <Stretch />
                                                          <PrimaryTextLink
                                                            className={classes.createNewLink}
                                                            onClick={
                                                              this.handleEditShowCreateNewVariable
                                                            }
                                                          >
                                                            {t("createNewVariable")}
                                                          </PrimaryTextLink>
                                                        </Row>
                                                      </div>
                                                    )}
                                                    <Row paddingTop>
                                                      <Select
                                                        onChange={this.handleEditChangeTimeout}
                                                        getKey={time => time}
                                                        renderOption={time =>
                                                          t("secs", { seconds: time })
                                                        }
                                                        options={timeOutOptions}
                                                        value={editNumber.timeout}
                                                        label={t("timeoutAfterRingingFor")}
                                                        className={classes.grid60}
                                                      />
                                                      <TextField
                                                        label={t("labelForReports")}
                                                        value={editNumber.reportLabel}
                                                        onChange={this.handleEditChangeReportLabel}
                                                        fullWidth
                                                      />
                                                    </Row>
                                                    <Row paddingTop>
                                                      <Select
                                                        onChange={
                                                          this
                                                            .handleEditChangeNumberPresentationMode
                                                        }
                                                        getKey={mode => mode}
                                                        renderOption={t}
                                                        options={[
                                                          ...numberPresentationOptions,
                                                          "overrideNumberPresentation"
                                                        ]}
                                                        value={editNumber.numberPresentationMode}
                                                        label={t("numberPresentation")}
                                                        fullWidth
                                                      />
                                                    </Row>
                                                    <Row paddingTop>
                                                      <PrimaryTextLink
                                                        className={classes.createNewLink}
                                                        onClick={this.handleDeleteNumber}
                                                      >
                                                        {t("delete")}
                                                      </PrimaryTextLink>
                                                      <Stretch />
                                                      <ConfirmButtons
                                                        onConfirm={this.handleSaveNumber}
                                                        onCancel={this.handleCancelCreateNewNumber}
                                                      />
                                                    </Row>
                                                  </Column>
                                                </DragAndDropRowSelector>
                                              )}
                                              {/* </Row> */}
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}
                                      {provided.placeholder}
                                    </Column>
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                            {/* </Column> */}
                          </Row>
                        ) : null}
                        {!numbers || !numbers.length ? (
                          <Row borderHalf>
                            <Row padding justifyChildrenCenter>
                              <Text className={classes.noNumbersCreated}>
                                {t("nothingCreatedWithField", { field: "Numbers" })}
                              </Text>
                            </Row>
                          </Row>
                        ) : null}
                      </Column>
                    </Row>
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

export default DialNodeDialog;
