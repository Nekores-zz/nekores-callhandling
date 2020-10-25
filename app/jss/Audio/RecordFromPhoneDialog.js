export const styleSheet = theme => ({
  dialogPaper: {
    maxWidth: "100%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },

  dialogContent: {
    overflow: "hidden",
    margin: "-20px -24px"
  },

  normalText: {
    fontSize: 16,
    fontWeight: 400
  },

  boldText: {
    fontSize: 16,
    fontWeight: "bold"
  },

  daysNumberField: {
    marginLeft: theme.spacing.unit * 2
  },

  divider: {
    background: "#ddd",
    width: "100%"
  }
});
