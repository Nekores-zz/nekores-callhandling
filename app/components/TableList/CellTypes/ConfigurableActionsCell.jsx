/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], jun-2018 - aug-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { IconButton, Icon, withStyles } from "@material-ui/core";
import { TableListCellWrapper } from "components";
import { styleSheet } from "jss/components/TableList/CellTypes/FavoriteMenuCell";

class ConfigurableActionsCell extends Component {
  static propTypes = {
    rowData: PropTypes.object.isRequired,
    args: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired, // action i18nKey to be translated with t function | "menu" (reserved word)
        icon: PropTypes.string, // action material-ui icon name
        action: PropTypes.func, // action function
        isFavorite: PropTypes.func // only required for label === "favorite"
      })
    ),
    hidden: PropTypes.bool.isRequired,
    isHover: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,

    getActionPermission: PropTypes.func.isRequired,
    handleMoreClick: PropTypes.func,

    classes: PropTypes.object.isRequired
  };

  state = {
    actions: null
  };

  // set interval before building actions by checking on allowed actions with getActionPermission
  msWaitBeforeDisplayActions = 200;

  timer = null;

  clearTimer = () => {
    this.timer ? clearTimeout(this.timer) : null;
    this.timer = null;
    return null; // so we don't render anything
  };

  handleActionClick = action => event => {
    event.stopPropagation();
    action(this.props.rowData);
  };

  renderAction = (item, index) => {
    const { rowData, handleMoreClick, getActionPermission, classes } = this.props;

    switch (item.label) {
      case "menu": // getRowMenu fn. must be passed as prop to HubbubList, or will not render button
        return handleMoreClick ? (
          <IconButton key={index} onClick={handleMoreClick(rowData)} className={classes.icon}>
            <Icon className={classes.bigIconAlignment}>more_horiz</Icon>
          </IconButton>
        ) : null;

      case "favorite": // favorite checker "isFavorite" fn. must be defined, or will not render button
        return item.isFavorite ? (
          <IconButton
            key={index}
            onClick={this.handleActionClick(item.action)}
            className={classes.icon}
          >
            <Icon
              className={clsx(
                item.isFavorite(rowData) ? classes.isFavoriteOn : classes.isFavoriteOff,
                classes.bigIconAlignment
              )}
            >
              star
            </Icon>
          </IconButton>
        ) : null;

      default:
        return getActionPermission(rowData, item.label) ? (
          <IconButton
            key={index}
            onClick={this.handleActionClick(item.action)}
            className={classes.icon}
          >
            <Icon className={classes.bigIconAlignment}>{item.icon}</Icon>
          </IconButton>
        ) : null;
    }
  };

  buildActions = () => {
    if (this.props.args.length > 3)
      console.warn("ConfigurableActionsCell can fit max 3 actions - style might get jumpy!");

    this.setState({
      actions: this.props.args.length
        ? this.props.args.map((item, index) => this.renderAction(item, index))
        : null
    });
  };

  waitAndBuildActions = () => {
    if (!this.timer) this.time = setTimeout(this.buildActions, this.msWaitBeforeDisplayActions);
    return null; // so we don't render anything, for now
  };

  componentWillUnmount = () => this.clearTimer();

  render = () => {
    const { hidden, isHover, isSelected, classes } = this.props;

    const { actions } = this.state;

    return (
      <TableListCellWrapper
        hidden={hidden}
        isHover={isHover}
        isSelected={isSelected}
        className={classes.buttonsCellLarge}
        padding="none"
      >
        {isHover
          ? actions
            ? actions // once actions get build we just recover from cached state on hover
            : this.waitAndBuildActions()
          : this.clearTimer()}
      </TableListCellWrapper>
    );
  };
}

export default withStyles(styleSheet, { name: "ConfigurableActionsCell" })(ConfigurableActionsCell);
