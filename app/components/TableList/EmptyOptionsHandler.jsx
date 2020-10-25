/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: 4ητonio Prατєs [antonioprates@gmail.com], sep-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import { Text, SubmitButton } from "components";
import { styleSheet } from "jss/components/TableList/EmptyOptionsHandler";

class EmptyOptionsHandler extends Component {
  static propTypes = {
    isLoading: PropTypes.bool, // handles render according to diode loading state
    hasHits: PropTypes.bool.isRequired, // has hits/data for query/filtering results
    List: PropTypes.func.isRequired, // list render function if  hasHits === true
    t: PropTypes.func.isRequired, // i18n translate function to be provided from parent

    isEmpty: PropTypes.bool, // empty situation cannot be inferred from hasHits, as it depends on query/filtering results
    handleAddClick: PropTypes.func, // function to start creating items used for "getStarted" if isEmpty === true
    // handleClearFilters: PropTypes.func, // function to clear filters in case of no results for a non empty list
    emptyMessageKeys: PropTypes.shape({
      startCreatingTitle: PropTypes.string, // used on default empty page (hasHits === false && isEmpty === true)
      startCreatingMsg: PropTypes.string, //  used on default empty page (hasHits === false && isEmpty === true)
      noHitsTitle: PropTypes.string, //  used on default no results page (hasHits === false && isEmpty === false)
      noHitsMsg: PropTypes.string // used on default no results (hasHits === false && isEmpty === false)
    }),

    children: PropTypes.any, // all other to be rendered no matter what, like dialogs

    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    emptyMessageKeys: {
      startCreatingTitle: "startCreating",
      startCreatingMsg: "startCreatingMsg",
      noHitsTitle: "noHits",
      noHitsMsg: "noHitsMsg"
    }
  };

  render = () => {
    const {
      isLoading,
      hasHits,
      List,
      t,
      isEmpty,
      handleAddClick,
      // handleClearFilters,
      emptyMessageKeys,
      children,

      classes
    } = this.props;

    // we render list if is loading, because it can render loader even on empty data
    return isLoading || hasHits || isEmpty === undefined ? (
      <List>{children}</List>
    ) : (
      <div className={classes.pageContent}>
        <Paper className={classes.paper} elevation={4}>
          <Text variant="headline">
            {t(isEmpty ? emptyMessageKeys.startCreatingTitle : emptyMessageKeys.noHitsTitle)}
          </Text>

          <br />
          <br />

          <Text variant="primaryBody" className={classes.msgText}>
            {t(isEmpty ? emptyMessageKeys.startCreatingMsg : emptyMessageKeys.noHitsMsg)}
          </Text>

          {/* TODO: in the future we might want to clear filter options as well

          <br />
          <br />
          <br />

          <SubmitButton onClick={isEmpty ? handleAddClick : handleClearFilters}>
            {t(isEmpty ? "getStarted" : "clearFilters")}
          </SubmitButton> */}

          {isEmpty && handleAddClick && (
            <>
              <br />
              <br />
              <br />
              <SubmitButton onClick={handleAddClick}>{t("getStarted")}</SubmitButton>
            </>
          )}
        </Paper>
        {children}
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "EmptyOptionsHandler" })(EmptyOptionsHandler);
