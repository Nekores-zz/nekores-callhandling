export const styleSheet = theme => ({
  dialogPaper: {
    height: "90%",
    width: "100% !important",
    [theme.breakpoints.down("sm")]: {
      height: "100%"
    },
    overflowX: "hidden"
  },

  dialogContent: {
    marginTop: 20,
    width: "100% !important",
    overflow: "hidden",
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
