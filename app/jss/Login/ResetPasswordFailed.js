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
    // maxWidth: "398px",
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
    minHeight: "365px",
    padding: "40px 60px",
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

  expiredTitle: {
    fontSize: "26px",
    lineHeight: "30px",
    width: "auto",
    padding: "20px 10px",
    [theme.breakpoints.down("xs")]: {
      wordBreak: "break-word"
    }
  },

  subTitle: {
    fontSize: "16px",
    padding: "5px 0px",
    color: "#999"
  },

  requestButtons: {
    width: "100%",
    position: "relative",
    left: 0,
    right: 0,
    top: 20,
    margin: "30px 0px 20px 0px",
    borderRadius: 1
  }
});
