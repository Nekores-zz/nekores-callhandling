import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Tooltip as MUITooltip, Typography, withStyles } from "@material-ui/core";
import {
  tooltipStylesheet,
  tooltipContentStylesheet,
  tooltipTargetStylesheet
} from "jss/LayoutElements/Tooltip";

export const Tooltip = withStyles(tooltipStylesheet, { name: "Tooltip" })(
  class Tooltip extends PureComponent {
    static propTypes = {
      content: PropTypes.any.isRequired,
      placement: PropTypes.string
    };

    render() {
      let { content, placement, children, classes } = this.props;

      return (
        <MUITooltip
          title={content}
          placement={placement ? placement : "right"}
          PopperProps={{
            modifiers: {
              preventOverflow: { enabled: false },
              hide: { enabled: false }
            }
          }}
          classes={{
            popper: classes.popper,
            tooltip: classes.tooltip,
            tooltipPlacementLeft: classes.tooltipLeft,
            tooltipPlacementRight: classes.tooltipRight,
            tooltipPlacementTop: classes.tooltipTop,
            tooltipPlacementBottom: classes.tooltipBottom
          }}
        >
          {children}
        </MUITooltip>
      );
    }
  }
);

export const TooltipContent = withStyles(tooltipContentStylesheet, {
  name: "TooltipContent"
})(({ title, text, classes }) => (
  <Fragment>
    <Typography variant="h6" classes={{ root: classes.tooltipTitle }}>
      {" "}
      {title}{" "}
    </Typography>
    <Typography classes={{ root: classes.tooltipText }}> {text} </Typography>
  </Fragment>
));

export const TooltipTarget = withStyles(tooltipTargetStylesheet, {
  name: "TooltipTarget"
})(({ children, classes, className, ...props }) => (
  <span className={clsx(classes.tooltipTarget, className)} {...props}>
    {" "}
    {children}{" "}
  </span>
));
