export const styleSheet = theme => ({
  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left",
  },

  asterisk: {
    color: theme.colors.primary.secondaryBlue
  },

  errorMessage: {
    ...theme.typography.errorMessage,
    color: `${theme.colors.primary.errorRed} !important`
  },

  inputError: {
    "&:after": {
      borderBottom: `1px solid ${theme.colors.primary.errorRed} !important`
    }
  },

  input: {
    ...theme.typography.primaryBody
  },

  readOnly: {
    opacity: 0.4
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
