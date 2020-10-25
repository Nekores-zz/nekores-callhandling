export const styleSheet = theme => ({
  popover: {
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },

  popoverPaper: {
    width: "100%"
  },

  searchField: {
    width: "100%",
    padding: 5
  },

  searchIcon: {
    color: theme.colors.primary.mediumGrey
  },

  listPanelWrapper: {
    width: "100%"
  },

  listPanel: {
    maxHeight: 250,
    overflow: "auto",
    overflowX: "hidden"
  },

  listItem: {
    height: 50
  },
});
