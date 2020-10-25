export const styleSheet = theme => ({
  root: {
    padding: "20px 30px"
  },
  chartTitle: {
    position: "relative",
    bottom: "15px",
    zIndex: 1,
    color: theme.colors.primary.darkGrey,
    fontSize: "14px"
  },
  circularProgress: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto"
  }
});
