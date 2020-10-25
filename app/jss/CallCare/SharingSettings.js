export const styleSheet = theme => ({
  paper: {
    padding: 32,
    margin: 32,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: 0
    }
  },

  page: {
    height: "100%"
  },

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
});
