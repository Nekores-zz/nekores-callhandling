import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { translate } from "react-i18next";
import {
  FormControlLabel,
  Checkbox,
  Radio,
  withStyles
} from "@material-ui/core";
import { Pending, } from "components";
import { Column, Row, Text, } from "components/LayoutElements";
import * as formFields from "../../../api/serviceDesigner";

const styleSheet = theme => ({
  
  formCheckboxControl: {
    width: 28,
    height: 28,
    marginLeft: 12,
    marginRight: 8
  },

  formRadioControl: {
    alignItems: "flex-start",
    marginTop: -12,
  },

  formRadioLabel: {
    color: theme.colors.primary.darkGrey,
    paddingTop: 12,
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
  },

  description: {
    color: theme.colors.primary.mediumGrey,
    marginLeft: 36,
  }
});

class GroupingForm extends Component {
  static propTypes = {
    panelIndex: PropTypes.number, // should be set on creation mode
    data: PropTypes.shape({
      getGrouping: PropTypes.func
    }),

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    formName: formFields.FORM_CCP_GROUPING
  };

  onFail = reason => {
    alert(JSON.stringify(reason));
    return null;
  };

  state = {
    grouping: {
      groupingMode: "",
      combineStateToDay: true
    },
    diode: {
      loading: true,
      error: null,
      data: null
    }
  };

  updateState = (setter, value) => this.setState({ grouping: setter(value) });

  handleChange = setter => event => this.updateState(setter, event.target.value);

  handleChangeGroupingMode = groupingMode => () => {
    this.updateState(this.state.grouping.setGroupingMode, groupingMode);
  };

  handleChangeCombineStateToDay = () => {
    this.updateState(
      this.state.grouping.setCombineStateToDay,
      !this.state.grouping.combineStateToDay
    );
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
      .getGrouping()
      .then(grouping =>
        this.setState({
          grouping,
          diode: { loading: false, data: grouping }
        })
      )
      .catch(error => this.setState({ diode: { loading: false, error: error } }));
  };

  renderForm = grouping => () => {
    const { panelIndex, classes, t } = this.props;
    const { groupingMode, combineStateToDay } = grouping;

    return (
      <Column stretch>
        <Row>
          <FormControlLabel
            control={
              <Radio
                checked={groupingMode === "doNotGroupDays"}
                onChange={this.handleChangeGroupingMode("doNotGroupDays")}
              />
            }
            label={t("doNotGroupDays")}
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
                checked={groupingMode === "groupAllDaysWithSameOpeningHours"}
                onChange={this.handleChangeGroupingMode("groupAllDaysWithSameOpeningHours")}
              />
            }
            label={t("groupAllDaysWithSameOpeningHours")}
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
                checked={groupingMode === "groupDaysWhenConsecutive"}
                onChange={this.handleChangeGroupingMode("groupDaysWhenConsecutive")}
              />
            }
            label={t("groupDaysWhenConsecutive")}
            classes={{
              root: classes.formRadioControl,
              label: classes.formRadioLabel
            }}
          />
        </Row>
        <Row paddingTopDouble paddingBottom>
          <Text className={classes.heading}>{t("states")}</Text>
        </Row>
        <Row>
          <FormControlLabel
            control={
              <Checkbox
                checked={!combineStateToDay}
                onChange={this.handleChangeCombineStateToDay}
                className={classes.formCheckboxControl}
              />
            }
            label={t("doNotCombineSameStatesSameDay")}
          />
        </Row>
        <Row>
          <Text className={classes.description}>{t("preventReadingSameStateSameTime")}</Text>
        </Row>
      </Column>
    );
  };

  render = () => {
    const { diode, grouping } = this.state;

    return (
      <Pending
        content={diode}
        onResponse={this.renderForm(grouping)}
        onFail={this.onFail}
        operationMode="diode"
        fullWidth
      />
    );
  };
}

export default withStyles(styleSheet, { name: "GroupingForm" })(
  translate(["servicedesigner", "common"])(GroupingForm)
);
