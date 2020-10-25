export const tooltipStylesheet = theme => ({
  popper: {},

  tooltip: {
    borderRadius: "14px !important",
    backgroundColor: "rgb(100, 100, 100)",
    opacity: 0.9,
    padding: 24
  },

  tooltipRight: {
    "&:before": {
      content: '""',
      display: "block",
      width: 0,
      height: 0,
      position: "absolute",
      borderTop: "8px solid transparent",
      borderBottom: "8px solid transparent",
      borderRight: "8px solid rgb(100, 100, 100)",
      left: -8,
      top: "calc(50% - 7px)"
    }
  },

  tooltipTop: {
    "&:after": {
      content: '""',
      display: "block",
      width: 0,
      height: 0,
      position: "absolute",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderTop: "8px solid rgb(100, 100, 100)",
      bottom: -8,
      left: "calc(50% - 7px)"
    }
  }
});

export const tooltipContentStylesheet = theme => ({
  tooltipTitle: {
    ...theme.tooltip.title
  },

  tooltipText: {
    ...theme.tooltip.text
  }
});

export const tooltipTargetStylesheet = theme => ({
  tooltipTarget: {
    ...theme.tooltip.target
  }
});
