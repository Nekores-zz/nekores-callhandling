export const styleSheet = theme => ({
  appsListPaper: {
    marginTop: 4,
    width: 352,
    color: theme.colors.primary.darkGrey,
    padding: 0,
    background: theme.colors.primary.white,
    borderRadius: 1,
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.13)",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 10px)",
      //marginRight: 6,
      marginLeft: 10
    }
  },

  appListContainer: {
    width: "100%",
    maxHeight: "70vh",
    overflowY: "auto",
    // display: "flex",
    // justifyContent: "space-between",
    // boxSizing: "border-box",
    padding: "20px 20px 15px 20px"
  },

  searchIcon: {
    color: theme.colors.primary.darkGrey
  },
  searchInputApplist: {
    "&:before": {
      borderColor: theme.colors.primary.lightGrey
    }
  },

  buttonMoreWrapper: {
    background: theme.colors.primary.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "44px",
    position: "sticky",
    bottom: 0,
    borderTop: "1px solid #D8D8D8"
  },

  buttonMore: {
    ...theme.buttons.thirdTextLink,
    textTransform: "uppercase",
    width: "100%",
    borderRadius: 0
  },

  appsListContainer: {
    paddingTop: "23px"
  }
});
