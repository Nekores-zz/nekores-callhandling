/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author: Noah Brown
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Icon, withStyles } from "@material-ui/core";
import { Box, Row, Column, Stretch } from "components/LayoutElements";
import { translate } from "react-i18next";
import { styleSheet } from "jss/LayoutElements/DragAndDropRowSelector";

class DragAndDropRowSelector extends Component {
  static propTypes = {
    className: PropTypes.string,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = { name: "DragAndDropRowSelector" };

  render = () => {
    const { className, handleProps, wrapperClass, children, classes, t } = this.props;

    return (
      <Row classes={{ box: clsx(classes.rowWrapper, wrapperClass) }}>
        <Column classes={{ box: classes.dragIndicatorBox }} {...handleProps}>
          <Icon className={classes.dragIndicator}>drag_indicator</Icon>
        </Column>
        <Column stretch>{children}</Column>
      </Row>
    );
  };
}

export default withStyles(styleSheet, { name: "DragAndDropRowSelector" })(
  translate("common")(DragAndDropRowSelector)
);
