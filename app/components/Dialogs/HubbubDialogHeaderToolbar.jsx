/**
 * by Sajid U. - SEPT 2019
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon, withStyles } from "@material-ui/core";
import { translate } from "react-i18next";
import clsx from "clsx";
import { IconButton } from "components/Elements";
import { RowMenu } from "components";
import { styleSheet } from "jss/components/Dialogs/HubbubDialogHeaderToolbar";

class HubbubDialogHeaderToolbar extends PureComponent {
  static propTypes = {
    onStar: PropTypes.any,
    onRun: PropTypes.any,
    onEdit: PropTypes.any,
    onPrint: PropTypes.any,
    onSave: PropTypes.any,
    menu: PropTypes.array,
    HeaderVariation: PropTypes.string,
    rowData: PropTypes.object,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };
  emptyRowMenu = {
    isOpen: false,
    anchorElement: null,
    row: null
  };

  state = {
    rowMenu: this.emptyRowMenu
  };

  handleMoreClick = row => event => {
    event.stopPropagation();
    this.showRowMenu(row, event.target);
  };

  handleOptionClick = optionFn => event => {
    event.stopPropagation();
    optionFn(this.props.rowData);
  };

  showRowMenu = (row, anchorElement) =>
    this.setState({ rowMenu: { isOpen: true, anchorElement, row } });

  hideRowMenu = () => this.setState({ rowMenu: this.emptyRowMenu });
  render() {
    const {
      onSave,
      onPrint,
      onStar,
      onRun,
      onEdit,
      menu,
      HeaderVariation,
      rowData,
      classes,
      t
    } = this.props;
    return (
      <>
        {!!onStar ? (
          <IconButton className={classes.icon} onClick={this.handleOptionClick(onStar)}>
            <Icon className={clsx(classes[HeaderVariation + "Color"], classes.isFavoriteOn)}>
              star
            </Icon>
          </IconButton>
        ) : null}

        {!!onEdit ? (
          <IconButton className={classes.icon} onClick={this.handleOptionClick(onEdit)}>
            <Icon className={classes[HeaderVariation + "Color"]}>edit</Icon>
          </IconButton>
        ) : null}
        {!!onRun ? (
          <IconButton className={classes.icon} onClick={this.handleOptionClick(onRun)}>
            <Icon className={classes[HeaderVariation + "Color"]}>play_circle_outline</Icon>
          </IconButton>
        ) : null}

        {!!onSave ? (
          <IconButton className={classes.icon} onClick={this.handleOptionClick(onSave)}>
            <Icon className={classes[HeaderVariation + "Color"]}>save_alt</Icon>
          </IconButton>
        ) : null}

        {!!onPrint ? (
          <IconButton className={classes.icon} onClick={this.handleOptionClick(onPrint)}>
            <Icon className={classes[HeaderVariation + "Color"]}>print</Icon>
          </IconButton>
        ) : null}

        {!!menu ? (
          <>
            <IconButton className={classes.icon} onClick={this.handleMoreClick(rowData)}>
              <Icon className={classes[HeaderVariation + "Color"]}>more_horiz</Icon>
            </IconButton>
            <RowMenu menu={menu} onClose={this.hideRowMenu} rowMenu={this.state.rowMenu} t={t} />
          </>
        ) : null}
      </>
    );
  }
}

export default withStyles(styleSheet, { name: "HubbubDialogHeaderToolbar" })(
  translate("common")(HubbubDialogHeaderToolbar)
);
