/**
 * by Sajid U. - SEPT 2019
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { DialogTitle, Icon, Grid, withStyles, Paper } from "@material-ui/core";
import { translate } from "react-i18next";
import { Text } from "components";
import { IconButton } from "components/Elements";
import clsx from "clsx";
import HubbubDialogHeaderToolbar from "./HubbubDialogHeaderToolbar";
import { styleSheet } from "jss/components/Dialogs/HubbubDialogHeader";

class HubbubDialogHeader extends Component {
  static propTypes = {
    avatar: PropTypes.any,
    onStar: PropTypes.any,
    onRun: PropTypes.any,
    onClose: PropTypes.func,
    onIconHandle: PropTypes.func,
    onEdit: PropTypes.any,
    onPrint: PropTypes.any,
    onSave: PropTypes.any,
    menu: PropTypes.any,
    headerVariation: PropTypes.string,
    headerTitle: PropTypes.string,
    rowData: PropTypes.object,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      avatar,
      menu,
      icon,
      headerVariation,
      headerTitle,
      onClose,
      onEdit,
      onSave,
      onPrint,
      onStar,
      onRun,
      rowData,
      HeaderDesc,
      classes,
      onIconHandle,
      t
    } = this.props;

    const HeaderVariation = headerVariation || "default";
    return (
      <DialogTitle className={clsx(classes[HeaderVariation + "Bg"] + " " + classes.parent)}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.containerStyle}
        >
          <Grid item className={classes.columnStyle}>
            {avatar ? (
              <div className={classes.avatar}> {avatar}</div>
            ) : !icon ? null : (
              <Icon
                className={clsx(classes[HeaderVariation + "TextColor"], classes.TitleIcon)}
                onClick={onIconHandle}
              >
                {icon || "warning"}
              </Icon>
            )}
            <Text
              className={clsx(classes[HeaderVariation + "TextColor"] + " " + classes.text)}
              block
              variant="modalHeader"
            >
              {/* !RegExp("^s+$").test(headerTitle)  */}
              {!/[A-Z]/.test(headerTitle[0]) ? t(`${headerTitle}`) : headerTitle}
              {!!HeaderDesc && (
                <Text variant="secondarySmallBody" block>
                  {t(`${HeaderDesc}`)}
                </Text>
              )}
            </Text>
          </Grid>
          <Grid item className={clsx(classes.columnStyle, classes.menuStyle)}>
            <HubbubDialogHeaderToolbar
              onStar={onStar}
              onRun={onRun}
              onSave={onSave}
              onPrint={onPrint}
              onEdit={onEdit}
              menu={menu}
              rowData={rowData}
              HeaderVariation={HeaderVariation}
            />
            <IconButton onClick={onClose}>
              <Icon className={classes[HeaderVariation + "Color"]}>close</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
    );
  }
}

export default withStyles(styleSheet, { name: "HubbubDialogHeader" })(
  translate("common")(HubbubDialogHeader)
);
