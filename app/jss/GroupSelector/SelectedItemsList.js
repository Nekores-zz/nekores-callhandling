export const styleSheet = theme => ({
  list: {
    flex: 1,
    overflowY: "auto"
  },

  grayToolbar: {
    backgroundColor: theme.colors.primary.backgroundGrey,
    ...theme.typography.primaryBody
  },
  whiteToolbar: {
    backgroundColor: theme.colors.primary.white,
    ...theme.typography.primaryBody
  }
});
