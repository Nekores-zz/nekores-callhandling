import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import { styleSheet } from "jss/Users/Status";
import { translate } from "react-i18next";

class Status extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
  };

  render() {
    const { status, classes, className, t } = this.props;
    return (
      <Typography className={[classes.status, classes[status], className].join(" ")}>
        ● {t(status)}
      </Typography>
    );
  }
}

export default withStyles(styleSheet, { name: "Status" })(
  translate("users")(Status)
);
