export const styleSheet = theme => ({
  dialogPaper: {
    margin: "32px auto",
    height: "90%"
  },

  dialogPaperWithNoSelection: {
    margin: "32px auto"
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
  },

  selectAllOptions: {
    marginTop: 5,
    flex: "0 0 auto"
  },

  selectAllOption: {
    height: 36
  },

  subOption: {
    marginTop: -10,
    marginLeft: 20
  }

  // We are reverting back to previous state, as implementation of HubbubDialog, got reverted here too,
  // in order to fix issues - when implemented we can remove above code, and uncomment bellow code.

  // dialogPaper: {
  //   height: "90%",
  //   [theme.breakpoints.down("sm")]: {
  //     height: "100%"
  //   }
  // },

  // dialogContent: {
  //   width: 900,
  //   height: "100%",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "100%"
  //   }
  // },
});
