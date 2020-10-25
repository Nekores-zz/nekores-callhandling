export const styleSheet = theme => ({
  buttonWrapper: {
    display: "block",
    height: 56
  },

  button: {
    ...theme.typography.subtitle,
    padding: 20,
    height: "100%"
  },

  icon: {
    ...theme.typography.primaryBody,
    color: theme.colors.primary.gray,
    fontSize: 24
  },

  buttonActive: {
    color: theme.colors.primary.white,
    backgroundColor: theme.colors.primary.secondaryBlue,
    padding: 20,
    height: "100%"
  },

  iconActive: {
    color: theme.colors.primary.white
  }
});
