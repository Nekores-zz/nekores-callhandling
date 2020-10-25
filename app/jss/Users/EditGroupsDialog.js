export const styleSheet = theme => ({
  dialogPaper: {
    margin: "32px auto",
    width: 900,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  dialogContent: {
    height: 300,
    width: "100%",
    // display: "flex",
    // flex: 1,
    // alignContent: "stretch",
    // justifyContent: "stretch",
    // flexWrap: "nowrap",
    // overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: "auto"
    }
  },

  paper: {
    flex: 1,
    alignSelf: "stretch",
    justifySelf: "stretch",
    height: "100%",
    width: "100%"
    // width: 250
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

  groupsHeader: {
    paddingLeft: 24,
    paddingRight: 24,
    height: "44px",
    backgroundColor: theme.colors.primary.mainBlue,
    color: "white"
  },

  availableGroupsHeader: {
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

  groupRow: {
    position: "relative",
    cursor: "pointer"
  },

  hoverRow: {
    backgroundColor: theme.colors.primary.backgroundGrey
  },

  actions: {
    width: "calc(100% - 32px)",
    padding: "0px 16px 16px 16px",
    margin: 0
  }
});
