export const styleSheet = theme => ({
  dialogPaper: {
    minWidth: 600,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
      width: "100%",
      height: "100%"
    }
  },

  dialogContent: {
    overflow: "hidden",
    overflowY: "auto",
    flex: 1,
    width: "100%",
    padding: "20px 24px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      overflow: "auto"
    }
  }
});
