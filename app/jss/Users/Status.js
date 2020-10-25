export const styleSheet = (theme) => ({
  status: {
    ...theme.typography.subTitle,
    fontSize: 16,
    whiteSpace: 'nowrap',
  },
  Active: {
    color: theme.colors.primary.successGreen,
  },
  Inactive: {
    color: theme.colors.primary.errorRed,
  },
  Pending: {
    color: theme.colors.secondary.lightOrange,
  },
});