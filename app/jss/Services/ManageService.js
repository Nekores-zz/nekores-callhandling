export const styleSheet = theme => ({
  root: {
    position: "relative",
    top: 0,
    margin: "auto",
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    maxWidth: "1200px",
    minWidth: "339px",
    padding: 0
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    height: "40px",
    display: "table-header-group"
  },

  asterisk: {
    color: theme.colors.primary.secondaryBlue
  },

  textField: {
    width: "96%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  helperText: {
    color: theme.colors.primary.secondaryBlue
  },

  wrapper: {
    width: "100%",
    display: "flex",
    position: "relative",
    top: 32,
    margin: 0,
    marginBottom: 32,
    [theme.breakpoints.down("sm")]: {
      top: 0,
      bottom: 0
    }
  },

  paper: {
    backgroundColor: "white",
    position: "relative",
    top: "0",
    margin: "auto",
    padding: 24
  },

  internalForm: {
    padding: 20,
    width: "100%",
    display: "block"
  },

  bottomButtons: {
    width: "100%",
    height: 38,
    marginTop: 30,
    marginBottom: 35,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "5%"
    }
  },

  internalButtons: {
    width: "100%",
    height: 38,
    marginTop: 15,
    marginBottom: 15
  },

  btnCancel: {
    marginRight: 15,
    [theme.breakpoints.only("xs")]: {
      marginRight: 10
    },
    float: "right"
  },

  btnSubmit: {
    float: "right"
  },

  //// SettingsForm style classes /////

  inputStartTime: {
    marginRight: "30px",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    }
  },

  inputEndTime: {
    marginRight: "30px",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginTop: "30px"
    }
  },

  versionSelector: {
    width: "30vw",
    [theme.breakpoints.only("xs")]: {
      width: "100vw"
    }
  }
});
