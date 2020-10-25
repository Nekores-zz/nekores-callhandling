export const styleSheet = theme => ({
  dialogPaper: {
    margin: "32px auto",
    [theme.breakpoints.down("xs")]: {
      margin: 32,
      alignSelf: "stretch",
      justifySelf: "stretch",
      flex: 1
    }
    //height: "90%"
  },

  dialogTitle: {
    background: theme.colors.primary.errorRed
  },

  titleIcon: {
    color: theme.colors.primary.white,
    fontSize: 40,
    marginRight: 10,
    marginBottom: -10
  },

  titleText: {
    color: theme.colors.primary.white
  },

  bodyText: {
    color: theme.colors.primary.errorRed
  },

  list: {
    maxHeight: "calc(100vh - 405px)",
    overflowY: "auto"
  },

  progress: {
    paddingTop: 8
  },

  dialogContent: {
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  actions: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    padding: "0px 28px 20px 16px",
    margin: 0,
    display: "block"
  }
});
