export const styleSheet = theme => ({
  cell: {
    flex: "1 1 0",
    paddingTop: 12,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
    ...theme.typography.primaryBody,
    textAlign: "left",
    overflowX: "hidden",
    backgroundColor: theme.colors.primary.white
  }
});
