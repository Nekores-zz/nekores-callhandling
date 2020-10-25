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

  marginBottomSmall: {
    marginBottom: 16
  },

  marginBottomMedium: {
    marginBottom: 24
  },

  marginBottomLarge: {
    marginBottom: 32
  },

  marginBottomExtraLarge: {
    marginBottom: 48
  },

  select: {
    display: "flex",
    width: 300
  },

  formHead: {
    margin: -32,
    marginBottom: 32,
    padding: 32,
    paddingBottom: 24,
    backgroundColor: "#e8eaf6"
  },

  buttons: {
    marginTop: 20,
    marginBottom: 3
  }
});
