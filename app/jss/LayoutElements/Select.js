export const selectStylesheet = theme => ({
  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
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
    opacity: 0.6
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

  white: {
    color: 'white',
    borderColor: 'white',
  },
});

export const multiselectStylesheet = theme => ({
  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
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
    opacity: 0.6
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
