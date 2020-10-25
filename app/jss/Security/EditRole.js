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

  roleRow: {
    height: 72
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

  enableOnChildAccountsOptions: {
    paddingLeft: 50
  },

  enableOnChildAccountsOption: {
    height: 32
  },

  secondaryButton: {
    color: "currentColor",
    border: "1px solid currentColor"
  },

  list: {
    border: `1px solid ${theme.colors.primary.lightGrey}`
  },

  marginRight: {
    marginRight: 20
  },

  listWrapper: {
    flex: 1
  },

  listPaper: {
    flex: 1,
    alignSelf: "stretch",
    justifySelf: "stretch",
    maxHeight: "100%"
  },

  paperGrid: {
    height: 400
  },

  list: {
    flex: 1,
    overflowY: "auto"
  },

  cursorPointer: {
    cursor: "pointer"
  },

  searchInput: {
    color: theme.colors.primary.white
  },

  tabEffectiveHeader: {
    height: 60,
    backgroundColor: theme.colors.primary.secondaryBlue,
    color: theme.colors.primary.white
  },

  tabSelectedHeader: {
    height: 60,
    backgroundColor: theme.colors.primary.mainBlue,
    color: theme.colors.primary.white
  },

  indicator: {
    backgroundColor: theme.colors.primary.white,
    height: 4
  },

  tabLabel: {
    fontSize: 16,
    textTransform: "none",
    height: 60,
    width: 210
  },

  buttons: {
    marginTop: 20,
    marginBottom: 3
  }
});
