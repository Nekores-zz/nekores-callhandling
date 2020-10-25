export const styleSheet = theme => ({
  numberRow: {
    position: "relative",
    cursor: "pointer",
    alignItems: "flex-start"
  },

  warningIcon: {
    padding: 0,
    marginTop: 8,
    marginLeft: -16,
    marginRight: 0,
    marginBottom: 8,
    color: theme.colors.primary.errorRed
  },

  number: {
    ...theme.typography.primaryBody,
    marginTop: 10
  },

  service: {
    ...theme.typography.primaryBody,
    color: theme.colors.primary.successGreen
  },

  flashIcon: {
    marginBottom: -8
  }
});
