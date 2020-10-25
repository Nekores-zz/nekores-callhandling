export const contentStyleSheet = (theme) => ({
  
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

  wrapper: {
    width: "100%",
    display: "flex",
    position: "relative",
    top: 32,
    margin: 0,
    marginBottom: 32,
    [theme.breakpoints.down("sm")]: {
      top: 0,
      bottom: 0
    }
  },

  root: {
    position: "relative",
    top: 0,
    margin: "auto",
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    maxWidth: "1200px",
    minWidth: "339px",
    padding: 0
  },

});

export const paperStyleSheet = (theme) => ({

  paper: {
    backgroundColor: theme.colors.primary.white,
    position: "relative",
    top: "0",
    margin: "auto",
  },

});
