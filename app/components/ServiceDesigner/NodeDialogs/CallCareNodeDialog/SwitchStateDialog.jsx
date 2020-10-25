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
import { IconButton, Icon, PrimaryButton } from "components/Elements";
import { translate } from "react-i18next";
import { states, stateOptions } from "config/serviceDesignerMockData";

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

  stateActionButton: {
    color: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.white}`
  },

  stateItem: {
    background: "#eee"
  },

  stateSelectBox: {
    marginRight: 10,
    width: "60%"
  }
});

class SwitchStateDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    states: PropTypes.array.isRequired,
    stateOptions: PropTypes.array,
    getEmptyStates: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    //states,
    stateOptions
  };

  state = {
    states: this.props.states
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSave = () => {
    this.props.onSave(this.state.states);
  };

  handleRefresh = () => {
    this.setState({ states: this.props.states });
  };

  /**
   * Get Empty object of nested object
   * Fot getting empty nested object, we should call getEmpty<fieldName> using capitalize
   */
  handleAddState = () => {
    const states = this.state.states;
    states.push(this.props.getEmptyStates());
    this.setState({ states });
  };

  handleStateChange = (index, state) => (value, event) => {
    let states = this.state.states;
    const id = states.indexOf(state);
    states[id] = { ...state }.setState(value);
    this.setState({ states });
  };

  handleDescriptionChange = (index, state) => event => {
    let states = this.state.states;
    const id = states.indexOf(state);
    states[id] = { ...state }.setDescription(event.target.value);
    this.setState({ states });
  };

  handleRemoveState = state => () => {
    const states = this.state.states;
    states.splice(states.indexOf(state), 1);
    this.setState({ states });
  };

  // Dialog Header
  dialogHeader = t => (
    <HubbubDialogHeader
      icon="keyboard_backspace"
      onIconHandle={this.handleClose}
      onClose={this.handleClose}
      headerVariation="grey"
      headerTitle={t("switchOnStates")}
    />
  );

  // Dialog Content
  dialogContent = (states, classes, t) => (
    <Column className={classes.dialogContent}>
      <Row paddingBottomHalf>
        <Row paddingHalf paddingLeft classes={{ box: classes.statesListHeader }}>
          <Box>
            {t("autoDetectedStates", {
              count: states.filter(state => state.typeOfState === "autoDetected").length
            })}
          </Box>
          <Stretch />
          <Box>
            <Button
              onClick={this.handleRefresh}
              classes={{ root: classes.stateActionButton }}
              variant="outlined"
              color="inherit"
            >
              {t("refresh")}
            </Button>
          </Box>
        </Row>
      </Row>
      {states
        .filter(state => state.typeOfState === "autoDetected")
        .map((item, key) => (
          <Row paddingBottomHalf key={key}>
            <Row padding classes={{ box: classes.stateItem }}>
              <Select
                onChange={this.handleStateChange(key, item)}
                getKey={x => x}
                renderOption={t}
                options={this.props.stateOptions}
                value={item.state}
                label={t("state")}
                className={classes.stateSelectBox}
              />
              <TextField
                label={t("description")}
                value={item.description}
                onChange={this.handleDescriptionChange(key, item)}
                fullWidth
              />
              <IconButton onClick={this.handleRemoveState(item)}>
                <Icon>delete</Icon>
              </IconButton>
            </Row>
          </Row>
        ))}
      <Row paddingTopHalf paddingBottomHalf>
        <Row paddingHalf paddingLeft classes={{ box: classes.statesListHeader }}>
          <Box>
            {t("manuallyAddedStates", {
              count: states.filter(state => state.typeOfState !== "autoDetected").length
            })}
          </Box>
          <Stretch />
          <Box>
            <Button
              onClick={this.handleAddState}
              classes={{ root: classes.stateActionButton }}
              variant="outlined"
              color="inherit"
            >
              {t("addState")}
            </Button>
          </Box>
        </Row>
      </Row>
      {states
        .filter(state => state.typeOfState !== "autoDetected")
        .map((item, key) => (
          <Row paddingBottomHalf key={key}>
            <Row padding classes={{ box: classes.stateItem }}>
              <Select
                onChange={this.handleStateChange(key, item)}
                getKey={x => x}
                renderOption={t}
                options={this.props.stateOptions}
                value={item.state}
                label={t("state")}
                className={classes.stateSelectBox}
              />
              <TextField
                label={t("description")}
                value={item.description}
                onChange={this.handleDescriptionChange(key, item)}
                fullWidth
              />
              <IconButton onClick={this.handleRemoveState(item)}>
                <Icon>delete</Icon>
              </IconButton>
            </Row>
          </Row>
        ))}
    </Column>
  );

  // Dialog Footer
  dialogFooter = t => (
    <HubbubDialogFooter
      confirmLabel={t("save")}
      onClose={this.handleClose}
      onConfirm={this.handleSave}
    />
  );

  // Main Render
  render = () => {
    const { classes, t } = this.props;
    const { states } = this.state;

    return (
      <HubbubDialog
        open={true}
        maxWidth="md"
        dialogClass={{ paper: classes.dialogPaper }}
        dialogHeader={this.dialogHeader(t)}
        dialogContent={this.dialogContent(states, classes, t)}
        dialogFooter={this.dialogFooter(t)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "SwitchStateDialog" })(
    translate(["servicedesigner", "security", "common"])(SwitchStateDialog)
  )
);
