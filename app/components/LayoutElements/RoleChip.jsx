import React from "react";
import PropTypes from "prop-types";
import { Chip, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/RoleChip";

class RoleChip extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    name: PropTypes.string.isRequired,
    roleType: PropTypes.string,
    color: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.any
  };

  RoleType = ({ classes, color, roleType }) => (
    <span className={classes.roleType} style={{ backgroundColor: color }}>
      {roleType}
    </span>
  );

  render() {
    const { name, onDelete, classes, className } = this.props;

    return (
      <Chip
        label={name}
        onDelete={onDelete}
        avatar={<this.RoleType {...this.props} />}
        classes={{ root: classes.chip }}
        className={className}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "RoleChip" })(RoleChip);
