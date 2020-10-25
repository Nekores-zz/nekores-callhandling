import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Checkbox,
  Chip,
  Grid,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import { ListAvatar } from "components";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Security/RowElements/RoleRow";

class RoleRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    isItemSelected: PropTypes.func.isRequired,
    handleToggleItem: PropTypes.func.isRequired,
    openItemItemsDialog: PropTypes.func,
    viewMode: PropTypes.string.isRequired,

    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  state = {
    open: false
  };

  handleToggleDropdown = () => this.setState({ open: !this.state.open });

  render() {
    const { open } = this.state;
    const {
      item,
      handleToggleItem,
      openItemItemsDialog,
      viewMode, // expected: "available" | "selected" | "compact" | "effective"
      classes,
      t
    } = this.props;

    const isItemSelected = this.props.isItemSelected(item);

    return (
      <ListItem
        divider
        key={item.id}
        onClick={this.handleToggleDropdown}
        className={classes.roleRow}
      >
        {isItemSelected && viewMode === "available" ? (
          <div className={classes.checkboxDiv}>
            <Checkbox
              onClick={handleToggleItem(item)}
              checked={true}
              className={classes.checkbox}
            />
          </div>
        ) : (
          <div
            onClick={viewMode !== "effective" ? handleToggleItem(item) : undefined}
            className={classes.avatarDiv}
          >
            <ListItemAvatar className={classes.avatar}>
              <ListAvatar color={item.id} name={item.name} />
            </ListItemAvatar>
          </div>
        )}

        {viewMode === "compact" ? (
          <ListItemText primary={item.name} secondary={item.permissionSetName} />
        ) : (
          <ListItemText
            primary={
              <Fragment>
                <Typography className={classes.roleName}>{item.name}</Typography>

                {open ? (
                  <Typography className={clsx(classes.descriptionText, classes.marginTopItem)}>
                    {item.description}
                  </Typography>
                ) : null}

                {item.children && item.children.length ? (
                  <Grid container alignItems="flex-end">
                    <Grid item>
                      <Typography className={classes.descriptionText}>
                        {t("SetComposedOf", { set: item.permissionSetName })}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        label={t("countRoles", { count: item.children.length })}
                        className={classes.chip}
                        onClick={event => {
                          event.stopPropagation();
                          openItemItemsDialog(item);
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container alignItems="flex-end">
                    <Grid item>
                      <Typography className={classes.descriptionText}>
                        {item.permissionSetName}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Fragment>
            }
          />
        )}

        {viewMode === "compact" ? null : (
          <ListItemSecondaryAction className={classes.listActions}>
            <IconButton className={classes.marginTopItem} onClick={this.handleToggleDropdown}>
              {open ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
            </IconButton>
            {viewMode === "effective" ? null : (
              <IconButton className={classes.marginTopItem} onClick={handleToggleItem(item)}>
                {!isItemSelected ? <Icon>add_circle_outline</Icon> : <Icon>highlight_off</Icon>}
              </IconButton>
            )}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default withStyles(styleSheet, { name: "RoleRow" })(translate("security")(RoleRow));
