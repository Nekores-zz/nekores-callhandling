export const styleSheet = theme => ({
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

  paper: {
    padding: 32,
    margin: 32,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: 0
    }
  },

  marginBottomMedium: {
    marginBottom: 24
  },

  marginBottomLarge: {
    marginBottom: 32
  },

  marginBottomSmall: {
    marginBottom: 16
  },

  marginTopSmall: {
    marginTop: 16
  },

  marginTopMedium: {
    marginTop: 24
  },

  marginTopExtraLarge: {
    marginTop: 48
  },

  select: {
    minWidth: 300,
    [theme.breakpoints.down("sm")]: {
      minWidth: 200
    }
  },

  page: {
    height: "100%"
  },

  roleRow: {
    height: 60
  },

  marginTopLarge: {
    marginTop: 32
  },

  buttons: {
    marginTop: 20,
    marginBottom: 3
  }
});
