/**
 * by A. Prates, nov-2018
 * Modified by, Sajid U. / Sept-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, List, Paper, withStyles } from "@material-ui/core";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/GroupSelector/ItemItemsDialog";

class ItemItemsDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    itemItems: PropTypes.array.isRequired,
    itemItemsHeading: PropTypes.string.isRequired,
    RowElement: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  // Dialog Header
  dialogHeader = (itemItemsHeading, onClose) => (
    <HubbubDialogHeader icon={false} onClose={onClose} headerTitle={itemItemsHeading} />
  );

  // Dialog Content
  dialogContent = (RowElement, itemItems, classes) => (
    <div className={classes.dialogContent}>
      <Paper elevation={2} classes={{ root: classes.paper }}>
        <Grid container direction="column" alignItems="stretch" className={classes.paperGrid}>
          <List classes={{ root: classes.list }}>
            {itemItems.map((item, index) => (
              <RowElement
                key={index}
                item={item}
                isItemSelected={() => false}
                handleToggleItem={() => {}}
                openItemItemsDialog={() => {}}
                viewMode={"compact"}
              />
            ))}
          </List>
        </Grid>
      </Paper>
    </div>
  );

  // Dialog Footer
  dialogFooter = onClose => (
    <HubbubDialogFooter
      onClose={onClose}
      onConfirm={() => {
        alert("confirmed!");
      }}
    />
  );

  render() {
    const { onClose, itemItems, itemItemsHeading, RowElement, classes, t } = this.props;

    return (
      <HubbubDialog
        open={true}
        onClose={onClose}
        classes={{ paper: classes.dialogPaper }}
        dialogHeader={this.dialogHeader(itemItemsHeading, onClose)}
        dialogContent={this.dialogContent(RowElement, itemItems, classes)}
        dialogFooter={this.dialogFooter(onClose)}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "ItemItemsDialog" })(
  translate("common")(ItemItemsDialog)
);
