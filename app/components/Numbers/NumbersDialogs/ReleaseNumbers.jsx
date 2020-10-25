/**
 * by A. Prates, mar-2019
 * Modified by: Sajid U. / Sept-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Grid,
  Divider,
  List,
  FormGroup,
  FormControlLabel,
  Checkbox,
  withWidth,
  withStyles
} from "@material-ui/core";
import { Text } from "components";
import { DialogNumberRow } from "components/Numbers";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Numbers/NumbersDialogs/ReleaseNumbers";
import { HubbubDialog, HubbubDialogHeader, HubbubDialogFooter } from "components";

class ReleaseNumbers extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    numbersCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
    inverted: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,

    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    confirmed: false
  };

  tryLoadInterval = null;

  tryLoadMore = () => {
    if (this.tryLoadInterval === null) this.tryLoadInterval = setInterval(this.loadMore, 1000);
  };

  loadMore = () => {
    this.clearTryLoadInterval();
    this.props.loadMore();
  };

  clearTryLoadInterval = () => {
    if (this.tryLoadInterval !== null) {
      clearInterval(this.tryLoadInterval);
      this.tryLoadInterval = null;
    }
  };

  componentWillUnmount = () => this.clearTryLoadInterval();

  toggleCheckbox = name => () => {
    this.setState({ [name]: !this.state[name] });
  };

  // Dialog Header
  dialogHeader = (onCancel, t) => (
    <HubbubDialogHeader
      headerVariation="red"
      icon="warning"
      onClose={onCancel}
      headerTitle={t("areYouSure")}
    />
  );

  // Dialog Content
  dialogContent = (isLoading, displayableItems, blocked, classes, t) => (
    <>
      <br />
      <br />

      <Text variant="secondaryBody" className={classes.bodyText}>
        {t("tryingToReleaseMsg")}
      </Text>
      <br />
      <br />
      <br />
      <Divider />
      <List classes={{ root: classes.list }}>
        {displayableItems.map((number, index) => (
          <DialogNumberRow key={index} number={number} />
        ))}
        {isLoading ? (
          <Grid className={classes.progress} container justify="center">
            <CircularProgress />
          </Grid>
        ) : null}
      </List>
      <br />

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={!blocked} onChange={this.toggleCheckbox("confirmed")} />}
          label={t("confirmReleaseNumbersMsg")}
        />
      </FormGroup>
    </>
  );

  // Dialog Footer
  dialogFooter = (onConfirm, onCancel, selectedItems, inverted, blocked, t) => (
    <HubbubDialogFooter
      onConfirm={() => onConfirm(selectedItems, inverted)}
      confirmLabel={t("releaseNumbers")}
      onConfirmRed
      blocked={blocked}
      onCancel={onCancel}
    />
  );
  render() {
    const {
      numbers,
      numbersCount,
      isLoading,
      selectedItems,
      inverted,
      onCancel,
      onConfirm,
      width,
      classes,
      t
    } = this.props;
    const blocked = !this.state.confirmed;
    const fullScreen = width === "sm" || width === "xs";

    const hasMore = numbers.length < numbersCount;
    if (inverted && !isLoading && hasMore) this.tryLoadMore();

    const displayableItems = inverted
      ? numbers.filter(n => !selectedItems.find(item => item === n))
      : selectedItems;
    return (
      <HubbubDialog
        open={true}
        maxWidth="md"
        dialogHeader={this.dialogHeader(onCancel, t)}
        dialogContent={this.dialogContent(isLoading, displayableItems, blocked, classes, t)}
        dialogFooter={this.dialogFooter(onConfirm, onCancel, selectedItems, inverted, blocked, t)}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "ReleaseNumbers" })(
  withWidth()(translate("numbers")(ReleaseNumbers))
);
