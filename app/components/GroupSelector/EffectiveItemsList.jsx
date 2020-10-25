/**
 * by A. Prates, jan-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/GroupSelector/EffectiveItemsList";

class EffectiveItemsList extends Component {
  static propTypes = {
    effectiveItems: PropTypes.array.isRequired,
    openItemItemsDialog: PropTypes.func,
    RowElement: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { effectiveItems, openItemItemsDialog, RowElement, classes } = this.props;

    return (
      <List classes={{ root: classes.list }}>
        {effectiveItems.map((item, index) => (
          <RowElement
            key={index}
            item={item}
            isItemSelected={() => true}
            handleToggleItem={() => {}}
            openItemItemsDialog={openItemItemsDialog}
            viewMode={"effective"}
          />
        ))}
      </List>
    );
  }
}

export default withStyles(styleSheet, { name: "EffectiveItemsList" })(EffectiveItemsList);
