import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, Avatar } from "@material-ui/core";
import { hashCode, extractLabel } from "utils/utils";
import { stylesheet } from "jss/components/List/ListAvatar";

class ListAvatar extends PureComponent {
  static propTypes = {
    color: PropTypes.any,
    name: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { name, label, children, classes, className, ...props } = this.props;

    const safeLabel = name
      ? extractLabel(name)
      : label
      ? label
          .trim()
          .substring(0, 4)
          .trim()
      : "";

    const color =
      typeof this.props.color === "number"
        ? this.props.color
        : typeof this.props.color === "string"
        ? hashCode(this.props.color)
        : 0; // unexpected color PropType

    return (
      <Avatar
        className={clsx(
          classes.avatar,
          classes[`length${safeLabel.length}`],
          classes[`color${color % 10}`],
          className
        )}
        {...props}
      >
        {safeLabel}
        {children}
      </Avatar>
    );
  }
}
export default withStyles(stylesheet, { name: "ListAvatar" })(ListAvatar);
