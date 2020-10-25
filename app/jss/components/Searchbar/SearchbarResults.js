export const styleSheet = theme => ({
  wrapper: {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden",
    marginTop: "-3px"
  },

  dividerBar: {
    height: "10px",
    width: "100%",
    background: "#fafafa"
  },

  wrapperHidden: {
    display: "none"
  },

  list: {
    background: "#fafafa",
    maxHeight: "240px",
    boxSizing: "border-box"
  },

  listItem: {
    height: "58px",
    background: theme.colors.primary.white
  },

  listItemSelected: {
    height: "58px",
    background: theme.colors.primary.lightGrey
  }
});
