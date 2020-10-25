export const styleSheet = theme => ({
  popover: {
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },

  popoverPaper: {
    width: "100%"
  },

  searchField: {
    width: "100%",
    padding: 5
  },

  searchIcon: {
    color: theme.colors.primary.mediumGrey
  },

  listPanelWrapper: {
    width: "100%"
  },

  listPanel: {
    maxHeight: 250,
    overflow: "auto",
    overflowX: "hidden"
  },

  listItem: {
    height: 50
  },

  expansionPanel: {
    marginTop: 1,
    marginBottom: 0,
    "&:before": {
      display: "none"
    }
  },

  expansionPanelSummary: {
    minHeight: 72,
    alignItems: "center",
    "&>div": {
      alignItems: "center"
    },
    background: "#eee"
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    height: 40,
    marginTop: 18
  },

  expansionPanelDetails: {
    padding: 0
  },

  filterRow: {
    color: theme.colors.primary.darkGrey,
    borderBottom: `0.5px solid ${theme.colors.primary.lightGrey}`
  },

  filterText: {
    marginLeft: 16,
  },

  filterCheckbox: {
  }
});
