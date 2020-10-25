export const styleSheet = theme => ({
  expansionPanelRoot: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },

  expanded: {},

  expansionPanelSummaryRoot: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },

  expansionPanelSummaryContent: {
    "&$expanded": {
      margin: "12px 0"
    }
  },

  expansionPanelDetailsRoot: {
    padding: 2
  },

  intervalWrapper: {
    padding: 40
  },

  wideDialogElement: {
    width: 544,
    marginBottom: 20
  }
});
