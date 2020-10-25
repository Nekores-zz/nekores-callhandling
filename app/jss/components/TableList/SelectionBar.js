export const styleSheet = theme => ({
  appBar: {
    boxShadow: "none"
  },

  selectionToolbar: {
    height: 64,
    backgroundColor: theme.colors.primary.secondaryBlue
  },

  backButton: {
    textTransform: "none",
    fontSize: 16
  },

  actionButton: {
    marginLeft: 12,
    textTransform: "uppercase",
    fontSize: 14,
    border: `1px solid ${theme.colors.primary.white}`
  },

  selectedCount: {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "flex-start",
    marginLeft: 200,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  }
});
