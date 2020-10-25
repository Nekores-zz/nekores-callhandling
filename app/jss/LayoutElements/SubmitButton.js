export const styleSheet = theme => ({
  submitButton: {
    ...theme.buttons.default,
    ...theme.buttons.action,
    "&:hover": {
      ...theme.buttons.actionHover
    },
    "&[disabled]": {
      ...theme.buttons.action,
      ...theme.buttons.actionDisabled
    }
  },
  wideButton:{
    paddingLeft: 60,
    paddingRight: 60,
    boxShadow: "none"
  },

  submitButtonDisabled: {
    ...theme.buttons.actionDisabled
  },

  submitButtonRed: {
    ...theme.buttons.default,
    ...theme.buttons.action,
    background: theme.colors.primary.errorRed,
    "&:hover": {
      background: theme.colors.primary.errorRed,
      opacity: "0.85"
    },
    "&[disabled]": {
      ...theme.buttons.action,
      ...theme.buttons.actionDisabled,
      backgroundColor: theme.colors.primary.errorRed
    }
  },

  submitButtonDisabledRed: {
    ...theme.buttons.actionDisabled,
    backgroundColor: theme.colors.primary.errorRed
  }
});
