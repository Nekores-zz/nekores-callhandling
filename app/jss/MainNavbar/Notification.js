export const styleSheet = theme => ({
  popper: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: "-16px"
    }
  },

  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    top: -4,
    left: 0,
    marginTop: 1,
    width: "3em",
    height: "1em",
    "&::before": {
      content: "''",
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "0 1em 1em 1em",
      borderColor: `transparent transparent ${theme.colors.primary.white} transparent`
    }
  },

  iconButton: {
    color: theme.colors.primary.white,
    "&.opened": {
      "&::after": {
        opacity: "1"
      }
    },
    [theme.breakpoints.down("md")]: {
      width: "34px"
    }
  },

  badge: {
    backgroundColor: theme.colors.primary.actionGreen,
    textAlign: "center",
    fontSize: 9,
    minWidth: 14,
    borderRadius: 6,
    height: 14,
    top: 6,
    right: 5,
    "&.red": {
      backgroundColor: theme.colors.primary.errorRed
    }
  },

  notificationIcon: {
    fontSize: "32px"
  }
});
