import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, AppBar, Toolbar, Portal, Icon, withStyles } from "@material-ui/core";
import { BulkMenu } from "components";
import { styleSheet } from "jss/components/TableList/SelectionBar";

class SelectionBar extends Component {
  static propTypes = {
    bulkActions: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    dataCount: PropTypes.number.isRequired,
    isSelectionInverted: PropTypes.bool.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    unselect: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,

    classes: PropTypes.object.isRequired
  };

  state = {
    isBulkMenuOpen: false,
    bulkMenu: {
      menu: null,
      anchorElement: null
    }
  };

  showBulkMenu = menu => event =>
    this.setState({
      isBulkMenuOpen: true,
      bulkMenu: { menu: menu, anchorElement: event.target }
    });

  hideBulkMoreMenu = () =>
    this.setState({
      isBulkMenuOpen: false,
      bulkMenu: { menu: null, anchorElement: null }
    });

  handleBulkMenuAction = actionFn => event => {
    event.stopPropagation();
    const { selected, isSelectionInverted } = this.props;
    actionFn([...selected], isSelectionInverted, this.props.unselect);
  };

  BulkMenu = () =>
    this.state.isBulkMenuOpen ? (
      <BulkMenu
        selection={this.props.selected}
        inverted={this.props.isSelectionInverted}
        clearSelection={this.props.unselect}
        onClose={this.hideBulkMoreMenu}
        bulkMenu={this.state.bulkMenu}
        t={this.props.t}
      />
    ) : null;

  render() {
    const {
      bulkActions,
      selected,
      dataCount,
      isSelectionInverted,
      areAllSelected,
      toggle,
      unselect,
      classes,
      t
    } = this.props;

    const BulkMenu = this.BulkMenu;

    return (
      <Portal>
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar className={classes.selectionToolbar}>
            <Button onClick={unselect} color="inherit" className={classes.backButton}>
              <Icon>keyboard_backspace</Icon>&nbsp;&nbsp;{t("back")}
            </Button>
            <div className={classes.selectedCount}>
              <IconButton onClick={toggle} color="inherit">
                {areAllSelected ? <Icon>check_box</Icon> : <Icon>check_box_outline_blank</Icon>}
              </IconButton>
              {isSelectionInverted ? dataCount - selected.length : selected.length} {t("selected")}
            </div>
            {bulkActions.map((action, index) => {
              return action.bulkMenu ? (
                <IconButton
                  key={index}
                  onClick={this.showBulkMenu(action.bulkMenu)}
                  color="inherit"
                >
                  <Icon>{action.icon}</Icon>
                </IconButton>
              ) : action.label ? (
                <Button
                  key={index}
                  onClick={this.handleBulkMenuAction(action.onClick)}
                  color="inherit"
                  className={classes.actionButton}
                  variant="outlined"
                >
                  {action.icon && (
                    <Fragment>
                      <Icon>{action.icon}</Icon>&nbsp;&nbsp;
                    </Fragment>
                  )}
                  {t(action.label)}
                </Button>
              ) : (
                <IconButton
                  key={index}
                  onClick={this.handleBulkMenuAction(action.onClick)}
                  color="inherit"
                >
                  <Icon>{action.icon}</Icon>
                </IconButton>
              );
            })}
          </Toolbar>
        </AppBar>

        <BulkMenu />
      </Portal>
    );
  }
}

export default withStyles(styleSheet, { name: "SelectionBar" })(SelectionBar);
