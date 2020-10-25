import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { styleSheet } from "jss/LayoutElements/InfiniteScroll";

class InfiniteScroll extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    onScrollPositionChange: PropTypes.func,
    onScrolledToEnd: PropTypes.func.isRequired,
    onScrollPositionSetter: PropTypes.func,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  scrollTo = scrollNode => scrollPosition => {
    if (scrollNode) {
      scrollNode.scrollTop = scrollPosition;
    }
  };

  handleRef = scrollNode => {
    if (this.props.onScrollPositionSetter) {
      this.props.onScrollPositionSetter(this.scrollTo(scrollNode));
    }
  };

  handleScroll = event => {
    const { onScrollPositionChange, onScrolledToEnd } = this.props;
    if (onScrollPositionChange) onScrollPositionChange(event.target.scrollTop);

    const bottom = event.target.scrollHeight - event.target.scrollTop < event.target.clientHeight + 1;
    if (bottom) onScrolledToEnd(event);
  };

  render() {
    const { children, classes, className } = this.props;

    return (
      <div
        ref={this.handleRef}
        onScroll={this.handleScroll}
        className={clsx(classes.content, className)}
      >
        {children}
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "InfiniteScroll" })(InfiniteScroll);
