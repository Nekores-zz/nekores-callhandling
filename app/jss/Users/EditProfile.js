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
    margin: 32,
    padding: 32,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflowX: "hidden"
    }
  },

  avatar: {
    width: 300,
    height: 300,
    [theme.breakpoints.down("sm")]: {
      width: 75,
      height: 75
    }
  },

  userFieldCaption: {
    ...theme.typography.caption,
    marginBottom: 6
  },

  userFieldText: {
    ...theme.typography.primaryBody
  },

  sectionHeader: {
    ...theme.typography.sectionHeaders,
    color: theme.colors.primary.black,
    fontWeight: "bold"
  },

  marginBottom: {
    marginBottom: 30
  },

  marginBottomSmall: {
    marginBottom: 20
  },

  marginBottomLarge: {
    marginBottom: 60
  },

  editProfileButton: {
    backgroundColor: "white",
    margin: 20
  },

  grid: {
    flexWrap: "nowrap",
    marginBottom: 20
  },

  leftSidePanel: {
    width: "50%",
    flexShrink: 1
  },

  rightSidePanel: {
    width: "50%",
    flexShrink: 1
  },

  chipInput: {
    width: "100%"
  },

  buttons: {
    marginTop: 20,
    marginBottom: 3
  }
});
