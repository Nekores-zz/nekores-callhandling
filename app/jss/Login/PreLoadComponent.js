export const styleSheet = theme => ({
  loginComponent: {
    position: "relative",
    transform: "translateY(-1%)",
    top: "15vh",
    [theme.breakpoints.only("md")]: {
      top: 144,
      maxWidth: "398px"
    },
    [theme.breakpoints.only("sm")]: {
      top: 144,
      width: "400px",
      transform: "translateY(2%)"
    },
    [theme.breakpoints.only("md")]: {
      top: "20vh",
      transform: "translateY(2%)"
    },
    [theme.breakpoints.only("lg")]: {
      width: "400px",
      top: "19vh"
    },

    [theme.breakpoints.only("xl")]: {
      top: "17vh"
    },
    margin: "auto",
    maxWidth: "none",
    minWidth: "none",
    width: "fit-content",
    [theme.breakpoints.down("xs")]: {
      minWidth: "245px",
      maxWidth: "398px",
      position: "relative",
      top: "auto",
      left: "auto",
      transform: "none",
      margin: "32px auto"
    }
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "385px",
    padding: "40px 20px",
    borderRadius: "4px",
    textAlign: "center",
    width: "auto",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "32px",
      paddingBottom: "34px",
      paddingLeft: "17px",
      paddingRight: "17px",
      overflowX: "hidden"
    }
  },

  inputWrapper: {
    width: "auto"
  },

  checkIcon: {
    color: "rgb(0, 200, 83)",
    fontSize: 80,
    margin: "40px 0px 0px 0px"
  },

  successTitle: {
    fontSize: "26px",
    lineHeight: "30px",
    padding: "20px 10px 30px 10px",
    width: "auto",
    [theme.breakpoints.down("xs")]: {
      wordBreak: "break-word"
    }
  },

  emailAddress: {
    color: theme.colors.primary.secondaryBlue,
    fontSize: "20px",
    cursor: "pointer"
  }
});
