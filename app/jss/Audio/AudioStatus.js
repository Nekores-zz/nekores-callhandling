export const styleSheet = theme => ({
  status: {
    ...theme.typography.subTitle,
    fontSize: 16,
    whiteSpace: "nowrap",
    textTransform: "capitalize"
  },

  icon: {
    paddingRight: 8,
    fontSize: "24px",
    marginRight: "8px",
    marginBottom: "-6px",
  },

  pending: {
    color: theme.colors.secondary.lightOrange
  },

  inprogress: {
    color: theme.colors.secondary.lime
  },

  placeholder: {
    color: theme.colors.secondary.darkOrange
  },

  complete: {
    color: theme.colors.primary.secondaryBlue,
    textTransform: "uppercase"
  },
  multiversion: {
    color: theme.colors.secondary.lightPurple,
    textTransform: "none"
  }
});
