import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/Holder";

class Holder extends Component {
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    placeholder: PropTypes.any,
    label: PropTypes.any,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  state = {
    isHover: false
  };

  handleClick = event => {
    let { onClick } = this.props;
    if (onClick) {
      onClick(event);
    }
  };

  handleHoverChange = isHover => () => {
    this.setState({ isHover });
  };

  hasValue = () => {
    const { children } = this.props;
    return children && !(children.length !== undefined && !children.length);
  };

  Value = ({ classes, children, adornment }) => (
    <div className={classes.value}>
      {children}
      {adornment !== undefined ? (
        <div className={classes.inputAdornment}>{adornment}</div>
      ) : null}
    </div>
  );

  Label = ({ classes, label }) => <div className={classes.label}>{label}</div>;

  Placeholder = ({ classes, placeholder, adornment }) => (
    <div className={classes.placeholder}>
      {placeholder}
      {adornment !== undefined ? (
        <div className={classes.inputAdornment}>{adornment}</div>
      ) : null}
    </div>
  );

  Underline = ({ classes, isHover }) => (
    <div
      className={[
        classes.underline,
        isHover ? classes.hoverUnderline : ""
      ].join(" ")}
    />
  );

  render() {
    const { adornment, label, className, classes } = this.props;

    return (
      <div
        onClick={this.handleClick}
        onMouseEnter={this.handleHoverChange(true)}
        onMouseLeave={this.handleHoverChange(false)}
        className={[classes.root, className || ""].join(" ")}
      >
        {label ? <this.Label {...this.props} {...this.state} /> : null}
        {this.hasValue() ? (
          <this.Value {...this.props} {...this.state} />
        ) : (
          <this.Placeholder {...this.props} {...this.state} />
        )}

        <this.Underline {...this.props} {...this.state} />
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "Holder" })(Holder);
