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

  marginTopSmall: {
    marginTop: 16
  },

  marginTopMedium: {
    marginTop: 24
  },

  marginTopLarge: {
    marginTop: 32
  },

  marginTopExtraLarge: {
    marginTop: 48
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

  userRow: {
    height: 70
  },

  list: {
    flex: 1,
    overflowY: "auto",
    height: 300
  },

  marginRight: {
    marginRight: 20
  },

  marginLeft: {
    marginLeft: 20
  },

  listWrapper: {
    flex: 1
  },

  listPaper: {
    flex: 1,
    alignSelf: "stretch",
    justifySelf: "stretch",
    height: "100%"
  },

  paperGrid: {
    height: "100%"
  },

  cursorPointer: {
    cursor: "pointer"
  },

  searchInput: {
    color: theme.colors.primary.white
  },

  grayToolbar: {
    backgroundColor: theme.colors.primary.backgroundGrey,
    ...theme.typography.primaryBody
  },

  select: {
    minWidth: 300,
    [theme.breakpoints.down("sm")]: {
      minWidth: 200
    }
  },

  buttons: {
    marginTop: 20,
    marginBottom: 3
  }
});
