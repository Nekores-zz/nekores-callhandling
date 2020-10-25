import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Icon, withStyles } from "@material-ui/core";
import { styleSheet, warningMessageStyleSheet } from "jss/LayoutElements/Text";

// VARIANT OPTIONS:
// headline
// modalHeader
// subtitle
// sectionHeaders
// primaryBody
// secondaryBody
// third
// primarySmallBody
// secondarySmallBody
// thirdSmall
// caption
// errorMessage
// primaryWhite
// primaryWhiteSmall

export const Text = withStyles(styleSheet, { name: "Text" })(
  class Text extends PureComponent {
    static propTypes = {
      variant: PropTypes.string.isRequired,
      block: PropTypes.bool,
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      children: PropTypes.any,
      className: PropTypes.string,

      classes: PropTypes.any.isRequired
    };

    static defaultProps = {
      variant: "primaryBody"
    };

    render() {
      const { children, variant, block, bold, italic, classes, className, ...props } = this.props;

      return (
        <span
          className={clsx(
            classes[variant],
            {
              [classes.block]: block,
              [classes.bold]: bold,
              [classes.italic]: italic
            },
            className
          )}
          {...props}
        >
          {children}
        </span>
      );
    }
  }
);

export const Bold = props => <Text bold {...props} />;

export const WarningMessage = withStyles(warningMessageStyleSheet, {
  name: "WarningMessage"
})(
  class WarningMessage extends PureComponent {
    static propTypes = {
      children: PropTypes.any,
      className: PropTypes.string,

      classes: PropTypes.any.isRequired
    };

    render() {
      const { children, classes, className } = this.props;

      return (
        <Text variant="errorMessage" block className={className}>
          <Grid container direction="row" alignItems="center" spacing={16}>
            <Grid item>
              <Icon>warning</Icon>
            </Grid>
            <Grid item className={classes.flex}>
              {children}
            </Grid>
          </Grid>
        </Text>
      );
    }
  }
);
