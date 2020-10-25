import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Chip, Icon, withStyles, Avatar } from "@material-ui/core";
import { translate } from "react-i18next";
import { styleSheet } from "jss/Services/RowElements/AssignedNumbersRow";

class AssignedNumbersRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    isItemSelected: PropTypes.func.isRequired,
    handleToggleItem: PropTypes.func,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { item, handleToggleItem, classes, t } = this.props;
    const isItemSelected = this.props.isItemSelected(item);
    return (
      <div className={classes.AssignedNumbersRowName}>
        <Chip
          classes={{
            root: classes.selectNumbersChip
          }}
          variant="outlined"
          className={classes.chipStyle}
          label={item.number}
          onDelete={() => {
            handleToggleItem(item);
          }}
          avatar={
            <Avatar style={{ background: item.bandColor }} className={classes.avatarIco}>
              {item.bandIcon}
            </Avatar>
          }
          deleteIcon={
            !isItemSelected ? (
              <Icon className={classes.crossBtn}>add_circle</Icon>
            ) : (
              <Icon className={classes.plusBtn}>cancel</Icon>
            )
          }
        />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "AssignedNumbersRow" })(
  translate("common")(AssignedNumbersRow)
);
