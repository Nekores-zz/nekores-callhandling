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

  marginTopSmall: {
    marginTop: 16
  },

  marginBottomSmall: {
    marginBottom: 16
  },

  marginTopMedium: {
    marginTop: 24
  },

  select: {
    minWidth: 300,
    [theme.breakpoints.down("sm")]: {
      minWidth: 200
    }
  },

  icon: {
    color: theme.colors.primary.darkGrey
  },

  marginBottomExtraLarge: {
    marginBottom: 48
  },

  marginTopExtraLarge: {
    marginTop: 48
  },

  buttons: {
    marginTop: 20,
    marginBottom: 3
  }
});
