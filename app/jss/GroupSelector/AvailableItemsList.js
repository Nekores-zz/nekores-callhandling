export const styleSheet = theme => ({
  listPaper: {
    flex: 1,
    alignSelf: "stretch",
    justifySelf: "stretch",
    boxShadow: "none",
    border: "1px solid",
    borderRadius: 0,
    borderColor: theme.colors.primary.lightGrey
  },

  paperGrid: {
    height: 360,
    [theme.breakpoints.down("sm")]: {
      height: "100%"
    }
  },

  compact: {
    height: 260
  },

  stretch: {
    height: "calc(90vh - 255px)"
  },

  stretch2: {
    height: "calc(90vh - 372px)"
  },

  list: {
    flex: 1,
    overflowY: "auto"
  },

  roleRow: {
    height: 60
  },

  listHeader: {
    height: 64
  },

  listHeaderLight: {
    backgroundColor: theme.colors.primary.backgroundGrey,
    color: theme.colors.primary.black
  },
  whiteToolbar: {
    backgroundColor: "white !important",
    borderTop: "1px solid",
    borderColor: theme.colors.primary.lightGrey,
    ...theme.typography.primaryBody
  },

  listHeaderText: {
    textAlign: "start",
    marginLeft: 8
  },

  searchInput: {
    color: theme.colors.primary.white
  },

  verticalLine: {
    width: 1,
    height: 38,
    backgroundColor: theme.colors.primary.white,
    marginLeft: 10,
    marginRight: 10,
    opacity: 0.5
  }
});
