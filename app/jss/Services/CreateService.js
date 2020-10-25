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

  expansionPanelSummary: {
    minHeight: "72px",
    alignItems: "center",
    "&>div": {
      alignItems: "center"
    }
  },

  doneIcon: {
    margin: 0,
    color: theme.colors.primary.white,
    backgroundColor: theme.colors.primary.successGreen,
    float: "right"
  },

  column: {
    width: "50%",
    alignItems: "center",
    height: "40px",
    display: "table"
  },

  //textField should be removed when refactoring completes
  textField: {
    width: "96%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
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

  paper: {
    backgroundColor: "white",
    position: "relative",
    top: "0",
    margin: "auto",
    maxHeight: "10px",
    minWidth: "56vw",
    padding: 32,
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  internalForm: {
    width: "100%",
    display: "block"
  },

  buttons: {
    marginTop: 30,
    marginBottom: 35,
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "5%"
    }
  }
});
