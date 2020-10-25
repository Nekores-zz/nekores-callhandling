export const styleSheet = theme => ({
  loginComponent: {
    position: "relative",
    transform: "translateY(-1%)",
    top: "15vh",
    [theme.breakpoints.only("md")]: {
      maxWidth: "398px",
      transform: "translateY(2%)"
    },
    [theme.breakpoints.only("sm")]: {
      top: 144,
      width: "400px",
      transform: "translateY(2%)"
    },
    [theme.breakpoints.only("lg")]: {
      width: "400px",
      top: "19vh"
    },
    [theme.breakpoints.only("xl")]: {
      top: "17vh",
      marginBottom: "3vh"
    },
    margin: "auto",
    maxWidth: "398px",
    [theme.breakpoints.down("xs")]: {
      width: "308px",
      position: "relative",
      top: "auto",
      left: "auto",
      transform: "none",
      margin: "32px auto"
    }
  },

  paper: {
    //display: "flex",
    //flexDirection: "column",
    //minHeight: '465px',
    paddingTop: "32px",
    paddingBottom: "34px",
    paddingLeft: "34px",
    paddingRight: "34px",
    borderRadius: "4px",
    //width: "398px",
    [theme.breakpoints.down("xs")]: {
      //width: "318px",
      paddingTop: "32px",
      paddingBottom: "34px",
      paddingLeft: "17px",
      paddingRight: "17px"
      //overflowX: "hidden"
    }
  },

  passwordForm: {
    flex: "1",
    flexDirection: "column"
  },

  titleWrapper: {
    display: "flex",
    paddingBottom: "19px"
  },

  divider: {
    margin: "33px 0 20px 0"
  },

  buttonsWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },

  buttonsContainer: {
    paddingTop: "83px"
  },

  buttonRemove: {
    ...theme.buttons.secondaryTextLink,
    marginLeft: "-16px"
  },

  buttonAnotherAccount: {
    ...theme.buttons.thirdTextLink,
    marginRight: "-16px"
  }
});
