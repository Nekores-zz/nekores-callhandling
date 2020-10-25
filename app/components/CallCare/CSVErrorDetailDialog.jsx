/**
 * by, Sajid U. / SEPT-2019
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Icon, List, ListItem, Hidden, withStyles, withWidth } from "@material-ui/core";
import { Text, HubbubDialog, HubbubDialogHeader } from "components";
import { translate } from "react-i18next";
import { RowError } from "models/Callcare";
import { styleSheet } from "jss/CallCare/CSVErrorDetailDialog";

class CSVErrorDetailDialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    open: PropTypes.bool,
    currentRow: PropTypes.number.isRequired,
    currentErr: PropTypes.number.isRequired,
    errors: PropTypes.array,
    moreIssues: PropTypes.object,

    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    showMoreIssues: false,
    showMoreID: {}
  };

  // handleCreate = () => this.props.onCreate(this.state.minimalAccInfo.toScala());
  handleCreate = () => {};

  handleClose = () => this.props.onClose();

  handleBack = () => this.props.onBack();

  handleToggleMoreIssues = () => this.setState({ showMoreIssues: !this.state.showMoreIssues });

  handleToggleShowMoreID = rowId => () =>
    this.setState({
      showMoreID: { ...this.state.showMoreID, [rowId]: !this.state.showMoreID[rowId] }
    });

  // Dialog Header
  dialogHeader = t => (
    <HubbubDialogHeader
      icon="keyboard_backspace"
      onIconHandle={this.handleBack}
      onPrint={() => {
        alert("You have clicked Print!");
      }}
      onSave={() => {
        alert("You have clicked Save!");
      }}
      headerVariation="red" // "default", "grey", "red"
      onClose={this.handleClose}
      headerTitle={t("errorDetails")}
    />
  );

  // Dialog Content
  dialogContent = (listErrors, rowNumberError, error, classes, t) => (
    <div className={classes.dialogContent}>
      <div className={classes.columnIssueWrapper + " " + classes.columnIssueHeader}>
        <Grid item className={classes.columnIssue}>
          <Text className={classes.columnIssueTitle}>
            {t(error.key + "Title", { ...RowError.getErrorMsg(error).title })}
          </Text>
          <br />
          {rowNumberError && (
            <Text className={classes.columnIssueRows}>
              {t(rowNumberError.key, rowNumberError.data)}
            </Text>
          )}
          <Text className={classes.columnIssueContent}>
            {t(error.key + "Content", { ...RowError.getErrorMsg(error).content })}
          </Text>
        </Grid>
      </div>
      <List>{listErrors}</List>
      {/* <div className={classes.moreIssuesLinkWrapper}>
            <Link className={classes.moreIssuesLink} onClick={this.handleToggleMoreIssues}>
              {t(showMoreIssues ? "hideMoreIssues" : "showMoreIssues", {
                rowCount: moreIssues.length,
                columnName: error.data.columnName,
                columnNo: error.data.columnNo,
              })}
            </Link>
          </div>
          {showMoreIssues && <List>{listMoreIssues}</List>} */}
    </div>
  );

  render = () => {
    const { open, errors, currentRow, currentErr, classes, width, t } = this.props;
    const { showMoreIssues, showMoreID } = this.state;
    const fullScreen = width === "sm" || width === "xs";

    // buggable
    if (currentRow == -1 && currentErr == -1) return <div />;

    const error = RowError.getErrorByIndex(errors, currentRow, currentErr);
    const moreIssues = RowError.getColumnRelatedErrors(errors, error);

    const listErrors = error.key == "Collision" && (
      <div>
        {error.data.insertedRows.map(item => {
          return (
            <ListItem key={item.rowId} className={classes.listErrorItem}>
              <Grid item lg={3} md={6} sm={12} xs={12} className={classes.rowInfo}>
                <Text className={classes.rowInfoHelper}>{t("rowId")}</Text>
                <Hidden smDown>
                  <br />
                </Hidden>
                <Text className={classes.rowInfoNumber}>
                  {showMoreID[item.rowId] ? item.rowId : item.rowId.substring(0, 10) + "..."}
                  <Text
                    className={classes.moreId}
                    onClick={this.handleToggleShowMoreID(item.rowId)}
                  >
                    {showMoreID[item.rowId] ? t("less") : t("more")}
                  </Text>
                </Text>
              </Grid>
              <Grid item lg={3} md={6} sm={12} xs={12} className={classes.rowStatus}>
                <Icon className={clsx(classes.issueIcon, classes.icon_success)}>
                  {"check_circle"}
                </Icon>
                <Text className={classes.issueStatus}>{t("inserted")}</Text>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Text className={classes.issueContent}>{item.rowInfo}</Text>
              </Grid>
            </ListItem>
          );
        })}
        {
          <ListItem key={errors[currentRow].rowId} className={classes.listErrorItem}>
            <Grid item lg={3} md={6} sm={12} xs={12} className={classes.rowInfo}>
              <Text className={classes.rowInfoHelper}>{t("row")}</Text>
              <Hidden smDown>
                <br />
              </Hidden>
              <Text className={classes.rowInfoNumber}>{errors[currentRow].rowNumber}</Text>
            </Grid>
            <Grid item lg={3} md={6} sm={12} xs={12} className={classes.rowStatus}>
              <Icon className={classes.issueIcon + " " + classes.icon_error}>{"error"}</Icon>
              <Text className={classes.issueStatus}>{t("collided")}</Text>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Text className={classes.issueContent}>{errors[currentRow].rowInfo}</Text>
            </Grid>
          </ListItem>
        }
      </div>
    );

    const listMoreIssues = moreIssues.map((err, key) => {
      return (
        <ListItem
          key={"moreIssues_" + key}
          className={classes.columnIssueWrapper + " " + classes.listItem}
        >
          <Grid item className={classes.columnIssue}>
            <Text className={classes.columnIssueTitle}>
              {err.key && t(err.key + "Title", { ...RowError.getErrorMsg(err.error).title })}
            </Text>
            <br />
            <Text className={classes.columnIssueContent}>
              {err.key && t(err.key + "Content", { ...RowError.getErrorMsg(err.error).content })}
            </Text>
          </Grid>
        </ListItem>
      );
    });

    const rowNumberError = RowError.getRows(errors[currentRow].rowNumber, error);

    return (
      <HubbubDialog
        open={open}
        maxWidth="md"
        onClose={this.handleClose}
        dialogClass={{ paper: classes.dialogPaper }}
        dialogHeader={this.dialogHeader(t)}
        dialogContent={this.dialogContent(listErrors, rowNumberError, error, classes, t)}
      />
    );
  };
}

export default withWidth()(
  withStyles(styleSheet, { name: "CSVErrorDetailDialog" })(
    translate("callcare")(CSVErrorDetailDialog)
  )
);
