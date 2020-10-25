export const styleSheet = theme => ({
  cell: {
    width: 0,
    height: "100%",
    overflow: "visible",
    position: "relative",
    backgroundColor: theme.colors.primary.white,
    borderBottom: "1px solid rgba(224, 224, 224, 1)"
  },

  bar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 4,
    height: "100%",
    backgroundColor: theme.colors.primary.mainBlue
  }
});
