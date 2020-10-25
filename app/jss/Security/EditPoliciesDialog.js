export const styleSheet = theme => ({
  dialogPaper: {
    width: "100%",
    maxHeight: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      height: "100%"
      // margin: 32,
      // alignSelf: "stretch",
      // justifySelf: "stretch",
      // flex: 1
    },
    overflowX: "hidden"
  },

  dialogContent: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  listWrapper: {
    flex: 1,
    width: "100%"
  },

  paper: {
    flex: 1,
    alignSelf: "stretch",
    justifySelf: "stretch",
    height: "100%"
  },

  paperGrid: {
    height: "100%"
  },

  list: {
    flex: 1,
    overflowY: "auto"
  },

  icon: {
    width: 28,
    height: 28,
    fontSize: 14
  },

  listHeader: {
    paddingLeft: 24,
    paddingRight: 24,
    height: "44px",
    backgroundColor: theme.colors.primary.mainBlue,
    color: "white"
  },

  availableListHeader: {
    cursor: "pointer"
  },

  checkbox: {
    width: 28,
    height: 28
  },

  searchTextField: {
    flex: 1,
    minWidth: 0
  },

  searchInput: {
    color: "white",
    "::placeholder": {
      color: "white",
      opacity: 1
    }
  },

  searchUnderline: {
    "&:before": {
      backgroundColor: "white !important"
    },
    "&:after": {
      backgroundColor: "white !important"
    }
  },

  itemRow: {
    height: 64,
    position: "relative",
    cursor: "pointer"
  },

  hoverRow: {
    backgroundColor: theme.colors.primary.backgroundGrey
  },

  actions: {
    marginRight: 16,
    marginBottom: 8
  }
});
