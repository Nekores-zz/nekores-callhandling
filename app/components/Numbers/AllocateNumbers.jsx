/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], mar-2018 - oct-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Icon, Grid, Paper, FormControlLabel, Radio, withStyles } from "@material-ui/core";
import { Text, SearchableChipSelector, ConfirmButtons } from "components";
import { DetailsForm, ReAssignNumbers } from "components/Numbers";
import { AddServiceItem } from "components/Services";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Numbers/AllocateNumbers";
import { DiodeSearchable } from "utils/commonShapes";

class AllocateNumbers extends Component {
  static propTypes = {
    // TODO: this component needs further review as in real we are going to work with lazy loading,
    // TODO: we will also have lazy loading and inverted selection inside the confirm dialog!
    //
    numbers: PropTypes.array.isRequired,
    // numbersCount: PropTypes.number.isRequired,
    // isLoading: PropTypes.bool.isRequired,
    // loadMore: PropTypes.func.isRequired,
    // selectedItems: PropTypes.array.isRequired,
    // inverted: PropTypes.bool.isRequired,

    searchableServices: DiodeSearchable.isRequired,

    handleBack: PropTypes.func.isRequired,
    handleReAllocate: PropTypes.func.isRequired,
    handleCreateServiceAndReAllocate: PropTypes.func.isRequired,
    removeNumber: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    dialog: false,
    selectedOption: "selectAService",
    selectedService: null
  };

  addServiceOption = {
    name: this.props.t("newService"),
    label: this.props.t("plusService")
  };

  handleReAllocate = () => this.props.handleReAllocate();

  handleCreateServiceAndReAllocate = () => this.props.handleCreateServiceAndReAllocate();

  closeReAssignNumbersDialog = () => this.setState({ dialog: false });

  openReAssignNumbersDialog = () => this.setState({ dialog: true });

  ReAssignNumbersDialog = () =>
    this.state.dialog ? (
      <ReAssignNumbers
        numbers={this.props.numbers}
        service={this.state.selectedService.name}
        onCancel={this.closeReAssignNumbersDialog}
        onConfirm={
          this.state.selectedService === this.addServiceOption
            ? this.handleCreateServiceAndReAllocate
            : this.handleReAllocate
        }
      />
    ) : null;

  formInputChange = event => this.setState({ [event.target.name]: event.target.value });

  DetailsPanel = ({ reallocateMode }) => (
    <Grid item className={this.props.classes.detailsWrapper}>
      <DetailsForm
        numbers={this.props.numbers}
        removeNumber={this.props.removeNumber}
        reallocateMode={reallocateMode}
      />
    </Grid>
  );

  SelectAService = () => (
    <div className={this.props.classes.searchableChipSelector}>
      <SearchableChipSelector
        searchable={this.props.searchableServices}
        topLevelOnlyClassName={this.props.classes.searchableChipSelectorTopLevel}
        className={this.props.classes.searchableChipSelector}
        name="selectedService"
        value={this.state.selectedService}
        emptyLabel={this.props.t("selectAService")}
        onChange={this.formInputChange}
        addOption={this.addServiceOption}
        AddOptionItem={AddServiceItem}
        oneValue
      />
    </div>
  );

  ReallocateOptions = () => {
    const { classes, t } = this.props;
    const { selectedOption } = this.state;

    const SelectAService = this.SelectAService;

    return (
      <Fragment>
        <br />
        <br />

        <FormControlLabel
          control={
            <Radio
              checked={selectedOption === "selectAService"}
              onChange={this.formInputChange}
              name="selectedOption"
              value="selectAService"
            />
          }
          label={t("selectAServiceUppercase")}
        />

        {selectedOption === "selectAService" ? (
          <div className={classes.selectAService}>
            <SelectAService />
          </div>
        ) : null}

        <br />

        <FormControlLabel
          control={
            <Radio
              checked={selectedOption === "noService"}
              onChange={this.formInputChange}
              name="selectedOption"
              value="noService"
            />
          }
          label={t("noService")}
        />

        {selectedOption === "noService" ? (
          <Grid container className={classes.noService} direction="row" wrap="nowrap">
            <Grid item>
              <Icon className={classes.warning}>warning</Icon>
            </Grid>
            <Grid item>
              <Text variant="errorMessage">{t("removeNumbersfromServiceWarning")}</Text>
            </Grid>
          </Grid>
        ) : null}
      </Fragment>
    );
  };

  render = () => {
    const { numbers, handleBack, classes, t } = this.props;
    const { selectedOption, selectedService } = this.state;

    const DetailsPanel = this.DetailsPanel;
    const SelectAService = this.SelectAService;
    const ReallocateOptions = this.ReallocateOptions;
    const ReAssignNumbersDialog = this.ReAssignNumbersDialog;

    const reallocateMode = !!numbers.find(n => n.status === "Active");

    return (
      <div className={classes.pageContent}>
        <DetailsPanel reallocateMode={reallocateMode} />

        <ReAssignNumbersDialog />

        <Grid item className={classes.wrapper}>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              {t("serviceAllocation")}

              {reallocateMode ? <ReallocateOptions /> : <SelectAService />}

              <br />
              <br />
              <br />

              <ConfirmButtons
                className={classes.buttons}
                confirmLabel={
                  selectedService === this.addServiceOption ? t("saveCreateService") : t("save")
                }
                onConfirm={
                  selectedOption === "noService" || !reallocateMode
                    ? this.handleReAllocate
                    : this.openReAssignNumbersDialog
                }
                blocked={
                  !numbers.length || (selectedOption === "selectAService" && !selectedService)
                }
                onCancel={handleBack}
              />
            </Paper>
          </div>
        </Grid>
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "AllocateNumbers" })(
  translate("numbers")(AllocateNumbers)
);
