export const styleSheet = theme => ({
  versionStatusIconDL: {
    color: theme.colors.primary.successGreen,
    paddingRight: 8,
    fontSize: "1em",
    marginRight: "8px",
    marginBottom: "-2px"
  },

  versionStatusCellDL: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.successGreen
  },

  versionStatusIconAE: {
    color: theme.colors.secondary.lightOrange,
    paddingRight: 8,
    fontSize: "1em",
    marginRight: "8px",
    marginBottom: "-2px"
  },

  versionStatusCellAE: {
    ...theme.typography.subtitle,
    color: theme.colors.secondary.lightOrange
  },

  versionStatusIconNV: {
    color: theme.colors.primary.errorRed,
    paddingRight: 8,
    fontSize: "1em",
    marginRight: "8px",
    marginBottom: "-2px"
  },

  versionStatusCellNV: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.errorRed
  },

  versionStatusIconG: {
    color: theme.colors.primary.darkGrey,
    paddingRight: 8,
    fontSize: "1em",
    marginRight: "8px",
    marginBottom: "-2px"
  },

  versionStatusCellG: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.darkGrey
  },

  noWarp: {
    whiteSpace: "nowrap"
  }
});
