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
    top: -4,
    left: 0,
    marginTop: -2,
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
      borderColor: `transparent transparent ${theme.colors.secondary.almostWhiteGray} transparent`
    }
  },

  iconButton: {
    marginRight: 5,
    marginLeft: 5,
    "&.opened": {
      "&::after": {
        opacity: "1"
      }
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "-5px",
      marginLeft: 0
    }
  },

  usersMenuAvatar: {
    width: "38px",
    height: "38px"
  }
});
