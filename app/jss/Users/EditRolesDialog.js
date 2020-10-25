export const styleSheet = theme => ({
  dialogPaper: {
    margin: "32px auto",
    height: "90%"
  },

  dialogContent: {
    width: 900,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  actions: {
    padding: "0px 20px 12px 0px"
  },

  buttons: {
    margin: 0
  }
});
