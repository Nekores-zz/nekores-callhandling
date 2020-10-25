export const styleSheet = theme => ({
  roleRow: {
    position: "relative",
    cursor: "pointer"
  },

  icon: {
    width: 28,
    height: 28,
    fontSize: 14
  },

  paper: {
    flex: 1,
    alignSelf: "stretch",
    justifySelf: "stretch",
    height: "100%",
    width: 250
  },

  paperGrid: {
    height: "100%"
  },

  list: {
    flex: 1,
    overflowY: "auto",
    backgroundColor: theme.colors.primary.backgroundGrey
  },

  dialogPaper: {
    margin: "32px auto",
    [theme.breakpoints.down("xs")]: {
      margin: 32,
      alignSelf: "stretch",
      justifySelf: "stretch",
      flex: 1
    }
  },

  dialogContent: {
    maxHeight: 300,
    minWidth: 300,
    padding: 0,
    display: "flex",
    flex: 1,
    alignContent: "stretch",
    justifyContent: "stretch",
    flexWrap: "nowrap",
    //overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      height: "auto"
    }
  },

  actions: {
    width: "calc(100% - 32px)",
    padding: "0px 16px 0px 0px",
    margin: 0
  }
});
