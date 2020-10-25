export const styleSheet = theme => ({
  button: {
    width: "100%",
    maxWidth: "33%",
    height: "99px",
    boxSizing: "border-box",
    minWidth: "50px",
    border: "1px solid transparent",
    borderRadius: 0,
    "&:hover": {
      background: "none",
      border: `1px solid ${theme.colors.primary.lightGrey}`
    }
  },
  buttonContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  buttonIcon: {
    fontSize: "40px",
    width: "auto",
    "&.dashboard": {
      color: theme.colors.secondary.pink
    },
    "&.accounts": {
      color: theme.colors.secondary.lightPurple
    },
    "&.reports": {
      color: theme.colors.secondary.darkPurple
    },
    "&.settings": {
      color: theme.colors.secondary.lightBlue
    },
    "&.services": {
      color: theme.colors.secondary.cyan
    },
    "&.users": {
      color: theme.colors.secondary.teal
    },
    "&.groups": {
      color: theme.colors.secondary.darkGreen
    },
    "&.security": {
      color: theme.colors.secondary.lightGreen
    },
    "&.billing": {
      color: theme.colors.secondary.lime
    },
    '&.callcare': {
      color: theme.colors.secondary.yellow
    },
  },
  buttonTitle: {
    color: theme.colors.primary.darkGrey,
    marginTop: "10px",
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "400"
  }
});
