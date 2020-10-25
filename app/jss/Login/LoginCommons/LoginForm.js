/**
 * Created by Andy on 2018-02-11.
 */
export const styleSheet = theme => ({
  form: {
    width: "100%"
  },

  inputError: {
    "&:after": {
      background: theme.colors.primary.errorRed
    }
  },

  inputLabel: {
    ...theme.typography.secondaryBody,
    "& > span": {
      color: theme.colors.login.link
    }
  },

  inputLabelFocused: {
    transform: "none",
    ...theme.typography.caption
  },

  inputWrapper: {
    "& + &": {
      marginTop: "21px"
    }
  },

  formFooter: {
    marginTop: "86px",
    height: "36px"
  },

  buttons: {
    marginTop: -36
  },

  summaryLink: {
    ...theme.buttons.default,
    ...theme.buttons.thirdTextLink,
    lineHeight: "36px"
  },

  nextButton: {
    ...theme.buttons.default,
    ...theme.buttons.action,
    float: "right",
    "&:hover": {
      ...theme.buttons.actionHover
    },
    "&:focus, &:active": {
      ...theme.buttons.actionPressed
    },
    "&[disabled]": {
      ...theme.buttons.action,
      ...theme.buttons.actionDisabled
    }
  },

  helperError: {
    ...theme.typography.errorMessage
  }
});
