export const styleSheet = theme => ({
  defaultIcon: {
    color: theme.colors.primary.successGreen,
    paddingRight: 8,
    fontSize: "1em",
    marginRight: "8px",
    marginBottom: "-2px"
  },

  defaultText: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.successGreen
  },

  exceptionIcon: {
    color: theme.colors.secondary.lightOrange,
    paddingRight: 8,
    fontSize: "1em",
    marginRight: "8px",
    marginBottom: "-2px"
  },

  exceptionText: {
    ...theme.typography.subtitle,
    color: theme.colors.secondary.lightOrange
  }
});
