export const styleSheet = theme => ({
  snackBar: {
    marginBottom: "30px",
    width: 912,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginBottom: "0px"
    }
  },

  message: {
    maxWidth: "884px",
    fontSize: "17px"
  }
});
