/**
 * by, Sajid U. / SEPT-2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, List, ListItem, Link, withStyles, withWidth } from "@material-ui/core";
import { Text, HubbubDialog, HubbubDialogHeader } from "components";
import { translate } from "react-i18next";
import { CallcareErrors, RowError } from "../../models/Callcare";
import { styleSheet } from "jss/CallCare/CSVErrorListDialog";

class CSVErrorListDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onViewDetail: PropTypes.func,
    open: PropTypes.bool,
    errors: PropTypes.array,

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  state = { minimalAccInfo: this.props.minimalAccInfo };

  // handleCreate = () => this.props.onCreate(this.state.minimalAccInfo.toScala());
  handleViewDetail = (rowId, errId) => () => this.props.onViewDetail(rowId, errId);

  handleClose = () => this.props.onClose();

  isMobile = () => {
    return this.props.width === "xs";
  };

  // Dialog Header
  dialogHeader = (errors, t) => (
    <HubbubDialogHeader
      onClose={this.handleClose}
      icon="info"
      onPrint={() => {
        alert("You have clicked Print!");
      }}
      onSave={() => {
        alert("You have clicked Save!");
      }}
      headerVariation="red" // "default", "grey, ""red"
      headerTitle={t("detectedErrors", { errorCount: CallcareErrors.getErrorsCount(errors) })}
    />
  );

  // Dialog Content
  dialogContent = (errors, classes, t) => (
    <div className={classes.dialogContent}>
      {errors.map((item, rowIndex) => {
        return (
          <ListItem key={item.rowNumber} className={classes.rowIssue}>
            <List className={classes.rowIssueContent}>
              <ListItem
                className={classes.listItemHeader + " " + classes.listItem}
                key={item.rowNumber + "_header"}
              >
                <Text className={classes.row}>{t("rowNumber", { rowNumber: item.rowNumber })}</Text>
                <Text className={classes.issues}>
                  {t("issues", { issueCnt: RowError.getErrorCount(item) })}
                </Text>
              </ListItem>
              {item.errors.map((err, errIndex) => {
                const rowNumberError = RowError.getRows(item.rowNumber, err);
                return (
                  <ListItem
                    key={item.rowNumber + "_" + errIndex}
                    className={classes.columnIssueWrapper + " " + classes.listItem}
                  >
                    <Grid item className={classes.columnIssue}>
                      <Text className={classes.columnIssueTitle}>
                        {t(err.key + "Title", { ...RowError.getErrorMsg(err).title })}
                      </Text>
                      <br />
                      {rowNumberError && (
                        <Text className={classes.columnIssueRows}>
                          {t(rowNumberError.key, rowNumberError.data)}
                        </Text>
                      )}
                      <Text className={classes.columnIssueContent}>
                        {t(err.key + "Content", { ...RowError.getErrorMsg(err).content })}
                      </Text>
                    </Grid>
                    {RowError.isDetailExist(err) && (
                      <Grid item className={classes.issueButtons}>
                        <Link
                          className={classes.viewButton}
                          onClick={this.handleViewDetail(rowIndex, errIndex)}
                          key={item.rowNumber + "_link"}
                        >
                          {t("view")}
                        </Link>
                      </Grid>
                    )}
                  </ListItem>
                );
              })}
            </List>
          </ListItem>
        );
      })}
    </div>
  );

  render = () => {
    const { open, errors, classes, t } = this.props;

    return (
      <HubbubDialog
        open={open}
        maxWidth="md"
        onClose={this.handleClose}
        dialogClass={{ paper: classes.dialogPaper }}
        dialogHeader={this.dialogHeader(errors, t)}
        dialogContent={this.dialogContent(errors, classes, t)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "CSVErrorListDialog" })(translate("callcare")(CSVErrorListDialog))
);
