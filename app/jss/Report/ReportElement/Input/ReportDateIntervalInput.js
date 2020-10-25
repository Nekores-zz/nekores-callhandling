export const styleSheet = theme => ({
  input: {
    color: theme.colors.primary.darkGrey,
    fontSize: "14px",
    fontWeight: "normal"
  },
  inputStartTime: {
    width: "50%",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
  },
  inputEndTime: {
    width: "50%",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
  },
  asterisk: {
    color: theme.colors.primary.secondaryBlue
  },
  helperText: {
    color: theme.colors.primary.secondaryBlue
  },
  errorText: {
    color: theme.colors.primary.errorRed
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
  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
  }
});
