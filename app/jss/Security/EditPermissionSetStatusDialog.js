export const styleSheet = theme => ({
  dialogPaper: {
    margin: "32px auto",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      margin: 32,
      alignSelf: "stretch",
      justifySelf: "stretch",
      flex: 1
    }
  },

  dialogContent: {
    width: 400,
    height: 150,
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      height: "auto"
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

  buttons: {
    marginTop: 0,
    marginBottom: 24,
    marginRight: 24
  }
});
