export const styleSheet = theme => ({
  rowWrapper: {
    width: "100%",
    height: "100%"
  },

  dragIndicatorBox: {
    maxWidth: 24,
    // height: "100%",
    borderRight: "1px solid #aaa",
    display: "flex",
    alignItems: "center",
    cursor: "grab"
  },

  dragIndicator: {
    margin: "auto",
    color: theme.colors.primary.lightGrey
  }
});
