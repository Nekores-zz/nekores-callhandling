export const styleSheet = theme => ({
  dialogPaper: {
    height: "100% !important",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "100%"
    },
    overflowX: "hidden"
  },
  subTitle: {
    color: theme.colors.primary.darkGrey
  },

  dialogContent: {
    height: "100%",
    width: 600,
    display: "flex",
    flex: 1,
    alignContent: "stretch",
    justifyContent: "stretch",
    flexWrap: "nowrap",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%"
    }
  },

  listWrapper: {
    flex: 1,
    overflowY: "hidden"
  },

  list: {
    height: "100%",
    border: `solid 1px ${theme.colors.primary.lightGrey}`
  },

  listHeader: {
    paddingLeft: 24,
    paddingRight: 24,
    height: "44px",
    backgroundColor: theme.colors.primary.mainBlue,
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

  hoverRow: {
    backgroundColor: theme.colors.primary.backgroundGrey
  },

  emptyListRow: {
    height: 64,
    justifyContent: "center",
    ...theme.typography.secondarySmallBody
  },

  selectAllOption: {
    height: 36
  },

  backButton: {
    color: "currentColor",
    textTransform: "none",
    padding: 0
  },

  // actions: {
  //   marginRight: 16,
  //   marginBottom: 8
  // },

  // dialogTitle: {
  //   marginLeft: 2
  // },

  radioButtons: {
    marginLeft: 10,
    marginBottom: 10
  }
});
