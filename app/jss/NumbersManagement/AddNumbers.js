export const styleSheet = theme => ({
  root: {
    position: "relative",
    top: 0,
    margin: "auto",
    width: "90%",
    maxWidth: "1200px",
    minWidth: "339px",
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  pageContent: {
    flex: 1,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflow: "hidden"
    }
  },

  wrapper: {
    width: "calc(100% - 266px)",
    top: 32,
    margin: 0,
    marginBottom: 32,
    display: "flex",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      top: 0,
      bottom: 0
    }
  },

  detailsWrapper: {
    width: 250,
    marginTop: 32,
    marginBottom: 32,
    marginRight: 32,
    marginLeft: -16,
    float: "right",
    display: "flex",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  detailsPaper: {
    width: 250,
    height: 500
  }
});
