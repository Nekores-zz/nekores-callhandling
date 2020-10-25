export const styleSheet = theme => ({
  dialogPaper: {
    height: "100% !important",
    minWidth: 600,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
      width: "100%",
      height: "100%"
    },
    overflowX: "hidden"
  },

  dialogContent: {
    height: "100%",
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%"
    }
  },
  mobileView: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  column1: {
    height: "calc(100% - 500px)"
    // [theme.breakpoints.down("sm")]: {}
  },
  listWrapper: {
    flex: 1,
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto"
    }
  },

  list: {
    height: "100%",
    border: `solid 1px ${theme.colors.primary.lightGrey}`
    // display: "block"
  },

  listHeader: {
    paddingLeft: 24,
    paddingRight: 24,
    height: "44px",
    backgroundColor: theme.colors.primary.secondaryBlue,
    color: "white"
  },

  listItems: {
    flex: 1,
    overflowY: "auto"
  },

  icon: {
    width: 28,
    height: 28,
    fontSize: 14
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

  emptyListRow: {
    height: 64,
    justifyContent: "center",
    ...theme.typography.secondarySmallBody
  },

  hoverRow: {
    backgroundColor: theme.colors.primary.backgroundGrey
  },

  selectAllOption: {
    height: 36
  },

  backButton: {
    color: "currentColor",
    textTransform: "none",
    padding: 0
  },

  actions: {
    width: "calc(100% - 32px)",
    padding: "0px 16px 16px 16px",
    margin: 0
  }
});
