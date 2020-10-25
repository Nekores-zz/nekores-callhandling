export const styleSheet = theme => ({
  dialogPaper: {
    minWidth: 350,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },
  dialogContent: {
    minWidth: 350,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },
  bodyText: {
    color: theme.colors.primary.errorRed,
    lineHeight: "1.4rem"
  },

  list: {
    maxHeight: "calc(100vh - 405px)",
    overflowY: "auto"
  },

  progress: {
    paddingTop: 8
  }
});
