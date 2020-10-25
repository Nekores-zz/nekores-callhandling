export const styleSheet = theme => ({
  wrapper: {
    width: "100%",
    boxSizing: "border-box",
    height: "48px",
    paddingTop: "16px"
  },

  inputsWrapper: {
    display: "flex",
    height: "32px",
    transform: "translateY(-16px)"
  },

  label: {
    textAlign: "left",
    padding: "6px 0 7px",
    transform: "translate(0, 0)",
    transition:
      "font-size 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    "&::before": {
      left: "0",
      right: "0",
      bottom: "0",
      height: "1px",
      content: '""',
      position: "absolute",
      transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      pointerEvents: "none",
      backgroundColor: "rgba(0, 0, 0, 0.42)"
    }
  },

  labelFocused: {
    padding: "0",
    ...theme.typography.caption,
    transform: "translate(0, -16px)",
    transition:
      "font-size 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    "&::before": {
      display: "none"
    }
  },

  labelError: {
    ...theme.typography.errorMessage
  },

  inputWrapper: {
    width: "24px",
    "& + &": {
      marginLeft: "6px"
    }
  },

  input: {
    ...theme.typography.primaryBody,
    textAlign: "center"
  },

  inputError: {
    "&:after": {
      borderBottom: `1px solid ${theme.colors.primary.errorRed} !important`
    }
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
  }
});
