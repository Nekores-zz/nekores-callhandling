export const styleSheet = theme => ({
  internalForm: {
    width: "100%"
    // display: "block"
  },
  textField: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  advancedOptionsTitle: {
    marginBottom: "20px"
  }
});
