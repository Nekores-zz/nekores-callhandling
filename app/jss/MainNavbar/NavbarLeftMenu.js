export const styleSheet = theme => ({
  leftMenuWrapper: {
    display: "flex"
  },

  popover: {
    marginTop: "10px"
  },

  dropdownToggle: {
    padding: "8px 12px 8px 0",
    [theme.breakpoints.only("sm")]: {
      maxWidth: 340
    }
  },

  menuListPaper: {
    marginTop: "0"
  },

  menuList: {
    padding: "0"
  }
});
