export const styleSheet = theme => ({
  pageContent: {
    flex: 1,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflowX: "hidden"
    }
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

  root: {
    position: "relative",
    top: 0,
    margin: "auto",
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    maxWidth: 1200,
    minWidth: 339,
    padding: 0
  },

  paper: {
    backgroundColor: "white",
    position: "relative",
    top: "0",
    margin: "auto",
    padding: 32
  },

  textField: {
    width: "100%"
  },

  buttons: {
    marginTop: 20,
    marginBottom: 3
  }
});
