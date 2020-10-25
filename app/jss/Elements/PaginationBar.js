export const styleSheet = theme => ({
  paginationWrapper: {
    width: "100%",
    background: "#eee"
  },

  rowsPerPage: {
    width: 200
  },

  navButtonGroup: {
    border: `1px solid ${theme.colors.primary.lightGrey}`,
    borderRadius: 5,
    background: theme.colors.primary.white
  },

  firstButton: {},

  lastButton: {
    borderRight: "none"
  },

  navButton: {
    borderRight: `1px solid ${theme.colors.primary.lightGrey}`,
    width: 50,
    fontSize: "1em"
  },

  normal: {
    color: theme.colors.primary.mediumGrey,
    minWidth: 50
  },

  disabled: {
    color: `${theme.colors.primary.black} !important`,
    minWidth: 50
  },

  selected: {
    color: theme.colors.primary.secondaryBlue,
    minWidth: 50
  }
});
