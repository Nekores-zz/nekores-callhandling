export const styleSheet = theme => ({
  input: {
    ...theme.typography.primaryBody
  },

  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
  },

  error: {
    ...theme.typography.errorMessage,
    color: `${theme.colors.primary.errorRed} !important`
  },

  underline: {
    "&:before": {
      borderBottom: `1px solid ${theme.colors.primary.lightGrey} !important`
    },
    "&:after": {
      borderBottom: `2px solid ${theme.colors.primary.secondaryBlue} !important`
    },
    "&:hover:before": {
      borderBottom: `2px solid ${theme.colors.primary.lightGrey} !important`
    }
  },

  fullWidth: {
    width: '100%',
  },
});
