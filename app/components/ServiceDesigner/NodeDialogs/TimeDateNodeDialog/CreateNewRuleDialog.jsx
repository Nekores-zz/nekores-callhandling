import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withWidth, Button } from "@material-ui/core";
import {
  Text,
  HubbubDialog,
  HubbubDialogHeader,
  HubbubDialogFooter,
  AvatarSimpleCell,
  SimpleTextCell,
  HubbubList,
  StretchingGridItem,
  ListAvatar
} from "components";
import {
  Select,
  Page,
  Box,
  Stretch,
  Collapse,
  Progress,
  Line,
  TextField,
  NumberField,
  Row,
  Column,
  Padding,
  ChipInput,
  Checkbox,
  Radio,
  Tooltip,
  ConfirmButtons,
  ExpandableSectionRadio,
  HorizontalDivider
} from "components/LayoutElements";
import { IconButton, Icon, PrimaryButton, PrimaryTextLink } from "components/Elements";
import { translate } from "react-i18next";
import {
  dateTimeTypeOptions,
  dateTimeOperatorOptions,
  dateTimeValueOptions
} from "config/serviceDesignerMockData";

const styleSheet = theme => ({
  dialogPaper: {
    minWidth: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },

  statesListHeader: {
    position: "relative",
    background: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.secondaryBlue}`
  },

  addConditionButton: {
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.white}`
  },

  conditionItem: {
    background: "#eee"
  },

  operatorSelectBox: {
    marginRight: 10,
    width: "40%"
  },

  dateTimeValueBox: {
    width: "100%"
  }
});

class CreateNewRuleDialog extends Component {
  static propTypes = {
    rule: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    dateTimeTypeOptions,
    dateTimeOperatorOptions,
    dateTimeValueOptions
  };

  state = {
    rule: this.props.rule ? this.props.rule : {
      name: "",
      description: "",
      conditions: []
    }
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSave = () => {
    this.props.onSave(this.state.rule);
  };

  handleNameChange = event => {
    const rule = this.state.rule;
    rule.name = event.target.value;
    this.setState({ rule });
  };

  handleDescriptionChange = event => {
    const rule = this.state.rule;
    rule.description = event.target.value;
    this.setState({ rule });
  };

  handleAddCondition = () => {
    const rule = this.state.rule;
    rule.conditions.push({ type: "", operator: "", value: "" });
    this.setState({ rule });
  };

  handleRemoveCondition = condition => event => {
    const rule = this.state.rule;
    rule.conditions.splice(rule.conditions.indexOf(condition), 1);
    this.setState({ rule });
  };

  handleChangeDateTimeType = condition => event => {
    console.log(event);
    const rule = this.state.rule;
    rule.conditions[rule.conditions.indexOf(condition)].type = event;
    rule.conditions[rule.conditions.indexOf(condition)].value = "";
    this.setState({ rule });
  };

  handleChangeOperator = condition => event => {
    const rule = this.state.rule;
    rule.conditions[rule.conditions.indexOf(condition)].operator = event;
    this.setState({ rule });
  };

  handleChangeDateTimeValue = condition => event => {
    const rule = this.state.rule;
    rule.conditions[rule.conditions.indexOf(condition)].value = event.target
      ? event.target.value
      : event;
    this.setState({ rule });
  };

  // Dialog Header
  dialogHeader = t => (
    <HubbubDialogHeader
      icon="keyboard_backspace"
      onIconHandle={this.handleClose}
      onClose={this.handleClose}
      headerVariation="grey"
      headerTitle={t("createNewRule")}
    />
  );

  // Dialog Content
  dialogContent = (rule, classes, t) => {
    const { dateTimeTypeOptions, dateTimeOperatorOptions, dateTimeValueOptions } = this.props;

    return (
      <Column className={classes.dialogContent}>
        <Row paddingTop>
          <Text variant="secondaryBody">{t("ruleWillTrueWithEveryCondition")}</Text>
        </Row>
        <Row paddingTop>
          <TextField
            label={t("ruleName")}
            value={rule.name}
            onChange={this.handleNameChange}
            fullWidth
            required
          />
        </Row>
        <Row paddingTop>
          <TextField
            label={t("ruleDescription")}
            value={rule.description}
            onChange={this.handleDescriptionChange}
            fullWidth
            multiline
            required
          />
        </Row>
        <Row paddingTop>
          <Row paddingHalf paddingLeft classes={{ box: classes.statesListHeader }}>
            <Box>{t("conditionsWithCount", { count: rule.conditions.length })}</Box>
            <Stretch />
            <Box>
              <Button
                onClick={this.handleAddCondition}
                classes={{ root: classes.addConditionButton }}
                variant="outlined"
                color="inherit"
              >
                {t("addNewCondition")}
              </Button>
            </Box>
          </Row>
        </Row>
        {rule.conditions && rule.conditions.length ? (
          rule.conditions.map((item, key) => (
            <Row paddingTopHalf key={key}>
              <Row padding classes={{ box: classes.conditionItem }}>
                <Column>
                  <Row>
                    <Select
                      onChange={this.handleChangeDateTimeType(item)}
                      getKey={x => x}
                      renderOption={t}
                      options={dateTimeTypeOptions}
                      value={item.type}
                      label={t("dateTimeType")}
                      fullWidth
                    />
                  </Row>
                  {dateTimeValueOptions[item.type] !== undefined && (
                    <Row paddingTop classes={{ box: classes.dateTimeMatch }}>
                      <Select
                        onChange={this.handleChangeOperator(item)}
                        getKey={x => x}
                        // renderOption={t}
                        options={dateTimeOperatorOptions}
                        value={item.operator}
                        label={t("operator")}
                        className={classes.operatorSelectBox}
                      />

                      {dateTimeValueOptions[item.type].type === "number" ? (
                        <TextField
                          type="number"
                          value={item.value}
                          min={dateTimeValueOptions[item.type].min}
                          max={dateTimeValueOptions[item.type].max}
                          onChange={this.handleChangeDateTimeValue(item)}
                          label={t("dateTimeValue")}
                          className={classes.dateTimeValueBox}
                        />
                      ) : (
                        <Select
                          onChange={this.handleChangeDateTimeValue(item)}
                          getKey={x => x}
                          renderOption={t}
                          options={dateTimeValueOptions[item.type].options}
                          value={item.value}
                          label={t("dateTimeValue")}
                          fullWidth
                        />
                      )}
                    </Row>
                  )}
                  <Row paddingTop>
                    <Stretch />
                    <Box>
                      <PrimaryTextLink
                        // className={classes.addMoreDates}
                        onClick={this.handleRemoveCondition(item)}
                      >
                        {t("delete")}
                      </PrimaryTextLink>
                    </Box>
                  </Row>
                </Column>
              </Row>
            </Row>
          ))
        ) : (
          <Row borderHalf>
            <Row padding justifyChildrenCenter>
              <Text className={classes.noRulesCreated}>
                {t("nothingCreatedWithField", { field: "Conditions" })}
              </Text>
            </Row>
          </Row>
        )}
      </Column>
    );
  };

  // Dialog Footer
  dialogFooter = (rule, t) => (
    <HubbubDialogFooter
      confirmLabel={t(this.props.rule ? "save" : "createRule")}
      onClose={this.handleClose}
      onConfirm={this.handleSave}
      blocked={!(rule.name && rule.description && rule.conditions && rule.conditions.length)}
    />
  );

  // Main Render
  render = () => {
    const { classes, t } = this.props;
    const { rule } = this.state;

    return (
      <HubbubDialog
        open={true}
        maxWidth="md"
        dialogClass={{ paper: classes.dialogPaper }}
        dialogHeader={this.dialogHeader(t)}
        dialogContent={this.dialogContent(rule, classes, t)}
        dialogFooter={this.dialogFooter(rule, t)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "CreateNewRuleDialog" })(
    translate(["servicedesigner", "security", "common"])(CreateNewRuleDialog)
  )
);
