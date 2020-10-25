import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Icon, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/DropDownToggle";

class DropDownToggle extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    opened: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired
  };

  render() {
    const { name, opened, classes, className } = this.props;

    return (
      <div>
        <Button
          className={className}
          classes={{ root: classes.button }}
          disableRipple
        >
          <div className={classes.ellipsis}>{name}</div>
          {opened ? <Icon>arrow_drop_up</Icon> : <Icon>arrow_drop_down</Icon>}
        </Button>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "DropDownToggle" })(
  DropDownToggle
);
