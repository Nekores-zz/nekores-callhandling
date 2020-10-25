export const styleSheet = theme => ({
  status: {
    ...theme.typography.subTitle,
    fontSize: 16,
    whiteSpace: "nowrap",
    textTransform: "capitalize"
  },

  icon: {
    paddingRight: 8,
    fontSize: "1em",
    marginRight: "8px",
    marginBottom: "-2px"
  },

  active: {
    color: theme.colors.primary.successGreen
  },

  suspended: {
    color: theme.colors.secondary.lightOrange
  },

  incomplete: {
    color: theme.colors.secondary.darkOrange
  },

  closed: {
    color: theme.colors.primary.errorRed
  }
});
