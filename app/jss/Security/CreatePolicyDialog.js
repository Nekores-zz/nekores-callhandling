export const styleSheet = theme => ({
  dialogPaper: {
    margin: "32px auto",
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      height: "auto",
      margin: 32,
      alignSelf: "stretch",
      justifySelf: "stretch",
      flex: 1
    }
  },

  contentWrapper: {
    marginLeft: "-24px",
    marginRight: "-24px",
    marginTop: "-24px"
  },

  dialogContent: {
    display: "flex",
    flex: 1,
    padding: 0,
    alignContent: "stretch",
    justifyContent: "stretch",
    flexWrap: "nowrap",
    overflow: "hidden"
  },

  paddingNone: {
    padding: 0,
  },

  list: {
    flex: 1
  }
});
