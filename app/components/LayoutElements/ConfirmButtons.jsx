/**
 * by A. Prates, feb-2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, CircularProgress, Grid, withStyles } from "@material-ui/core";
import { SubmitButton, PrimaryTextButton } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/LayoutElements/ConfirmButtons";

class ConfirmButtons extends PureComponent {
  static propTypes = {
    confirmLabel: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    isSubmit: PropTypes.bool, // uses confirm button as a 'classic' submit form button
    onConfirmRed: PropTypes.bool,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    blocked: PropTypes.bool,
    cancelLabel: PropTypes.string,
    onCancel: PropTypes.func,
    altActionLabel: PropTypes.string,
    onAltAction: PropTypes.func,
    className: PropTypes.string,
    subClassName: PropTypes.string,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = { isLoading: false };

  isMounted = false;

  setStateIfMounted = (newState, callback) =>
    this.isMounted ? this.setState(newState, callback) : callback;

  submitHandler = event => {
    event.stopPropagation();
    event.persist(); // we need to persist event because we are flying event in async code
    this.setState({ isLoading: true }, () => {
      this.props
        .onConfirm(event)
        .then(response =>
          this.setStateIfMounted(
            { isLoading: false },
            () => this.props.onSuccess && this.props.onSuccess(response)
          )
        )
        .catch(failure =>
          this.setStateIfMounted(
            { isLoading: false },
            () => this.props.onFailure && this.props.onFailure(failure)
          )
        );
    });
  };

  componentDidMount = () => (this.isMounted = true);

  componentWillUnmount = () => (this.isMounted = false);

  render() {
    const {
      confirmLabel,
      onConfirm,
      isSubmit,
      onConfirmRed,
      onSuccess,
      onFailure,
      blocked,
      cancelLabel,
      onCancel,
      altActionLabel,
      onAltAction,
      className,
      subClassName,

      classes,
      t
    } = this.props;

    const { isLoading } = this.state;

    // are props onSuccess or onFailure defined?
    const confirmAsPromise = onSuccess || onFailure;

    return (
      <div className={clsx(classes.buttonsWrapper, className)}>
        {onAltAction && (
          <PrimaryTextButton
            onClick={onAltAction}
            className={classes.altActionButton}
            disabled={isLoading}
          >
            {altActionLabel ? altActionLabel : t("skip")}
          </PrimaryTextButton>
        )}

        <Grid item className={classes.submitWrapper}>
          <SubmitButton
            onClick={confirmAsPromise ? this.submitHandler : onConfirm}
            red={onConfirmRed}
            className={clsx(classes.confirmButton, subClassName)}
            disabled={blocked || isLoading}
            type={isSubmit ? "submit" : undefined}
          >
            {confirmLabel ? confirmLabel : t("save")}
            {isLoading && <CircularProgress size={24} className={classes.progress} />}
          </SubmitButton>
        </Grid>

        {onCancel && (
          <Button onClick={onCancel} className={classes.cancelButton} disabled={isLoading}>
            {cancelLabel ? cancelLabel : t("cancel")}
          </Button>
        )}
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "ConfirmButtons" })(
  translate("common")(ConfirmButtons)
);
