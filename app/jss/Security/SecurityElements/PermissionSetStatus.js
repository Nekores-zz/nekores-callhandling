export const styleSheet = theme => ({
  status: {
    ...theme.typography.subTitle,
    fontSize: 16,
    whiteSpace: "nowrap",
    textTransform: "capitalize"
  },

  active: {
    color: theme.colors.primary.successGreen
  },

  available: {
    color: theme.colors.secondary.lightGreen
  },

  disabled: {
    color: theme.colors.primary.errorRed
  }
});
