import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Radio, Grid, Typography, withStyles } from "@material-ui/core";
import { PrimaryTextButton, SubmitButton, TextField } from "components";
import PricingPlansDialog from "./PricingPlansDialog";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Accounts/CreateAccount";

class PricingPlanForm extends Component {
  static propTypes = {
    savePanel: PropTypes.func.isRequired,
    panelIndex: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    creditLimit: this.props.data.defaultPricingPlan.creditLimit,
    currentLimit: this.props.data.defaultPricingPlan.currentLimit,
    remainingCredit: this.props.data.defaultPricingPlan.remainingCredit,
    isPlanField: false,
    isCreditLimit: false,
    selectedValue: "a",
    checkedStates: [false, false, false, false],
    stringInput: "",
    isLeftIcon: "",
    selectedValue: ""
  };

  handleChange = event => {
    this.setState({
      selectedValue: event.target.value,
      isError: true,
      isCreditLimit: !this.state.isCreditLimit
    });
  };

  handlePlanFields = () => {
    this.setState({
      isPlanField: true
    });
  };
  handleChangeRadio = event => {
    this.setState({
      value: event.target.value,
      isCreditLimit: !this.state.isCreditLimit
    });
  };
  showCreditLimitError = () => {
    return true;
  };
  handleCreditLimit = prop => event => {
    this.setState({
      [prop]: event.target.value,
      isError: true,
      value: event.target.value
    });
  };

  handleHover = index => {
    this.setState({
      isLeftIcon: index
    });
  };

  handleOnLeave = index => {
    if (this.state.checked === false) {
      this.setState({
        isLeftIcon: 20
      });
    } else {
      this.setState({
        isLeftIcon: index
      });
    }
  };

  handleChangeRadio = index => {
    let states = this.state.checkedStates;
    states[index] = !states[index];
    this.setState({
      checked: !this.state.checked,
      isLeftIcon: index
    });
  };

  handlePlanDetails = id => {
    this.setState({
      isDetails: false,
      plan: id,
      isSearchInput: false,
      searchIcon: false
    });
  };
  render() {
    const { panelIndex, classes, t } = this.props;
    const { creditLimit, currentLimit, remainingCredit } = this.state;

    let plan = (
      <div className={classes.yourPlan}>
        <TextField label={t("yourPlan")} fullWidth value="Plan B" margin="normal" />
        <PrimaryTextButton>{t("changePlan")}</PrimaryTextButton>
      </div>
    );

    return (
      <form className={classes.formInput} autoComplete="off">
        <Grid className={classes.gridPricingRoot} container spacing={24}>
          <Grid className={classes.prepay} item xs={12}>
            <div style={{ display: "flex", position: "relative", right: 12 }}>
              <Radio
                checked={this.state.selectedValue === "a"}
                value="a"
                onChange={this.handleChange}
              />
              <Typography className={classes.gridItemCreditInner}>{t("prepay")}</Typography>
            </div>
          </Grid>
          <Grid className={classes.gridItemCredit} item xs={12}>
            <div className={classes.creditContainer}>
              <div className={classes.credit}>
                <Radio
                  checked={this.state.selectedValue === "b"}
                  onChange={this.handleChange}
                  value="b"
                />
                <Typography className={classes.gridItemCreditInner}>{t("credit")}</Typography>
              </div>
            </div>

            <div className={classes.currentLimit}>
              <Typography className={classes.captionCredit} variant="caption">
                {t("currentLimit")}
              </Typography>
              <Typography className={classes.typeCredit}>{currentLimit}</Typography>
            </div>

            <div className={classes.total}>
              <Typography className={classes.total} variant="caption">
                {t("total")}
              </Typography>
              <Typography className={classes.remainPadding}>{remainingCredit}</Typography>
            </div>

            {this.state.isCreditLimit ? (
              <div className={classes.creditLimit}>
                <TextField
                  classes={{
                    underline: classes.underline,
                    label: classes.label,
                    errorMessage: classes.errorMessage
                  }}
                  className={classes.textCreditLimit}
                  error={this.showCreditLimitError()}
                  helperText={
                    this.showCreditLimitError()
                      ? t("You have entered a number that is more than your remaining credit")
                      : null
                  }
                  value={creditLimit}
                  onChange={this.handleCreditLimit("creditLimit")}
                  label={t("Credit limit for this account")}
                />
              </div>
            ) : null}
          </Grid>
        </Grid>
        <PricingPlansDialog
          plans={this.props.data.plans}
          accountPanelTitles={this.props.data.accountPanelTitles}
          handlePlanFields={this.handlePlanFields}
          isField={this.state.isPlanField}
        />

        <div className={classes.btnPlanMargin}>
          <SubmitButton
            className={classes.btnSubmit}
            onClick={event => this.props.savePanel(event, panelIndex, { ...this.state })}
          >
            {t("Save")}
          </SubmitButton>
          <Button className={classes.btnCancel}>{t("Cancel")}</Button>
        </div>
      </form>
    );
  }
}
export default withStyles(styleSheet, { name: "PricingPlanForm" })(
  translate("accounts")(PricingPlanForm)
);
