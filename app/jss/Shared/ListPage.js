export const styleSheet = theme => ({
  pageContent: {
    flex: 1,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflowX: "hidden"
    }
  },

  list: {
    marginTop: 6,
    marginLeft: 26,
    marginRight: 26,
    marginBottom: 32,
    textAlign: "center",
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      marginBottom: 32,
      overflowX: "hidden"
    }
  },

  addButton: {
    background: theme.colors.primary.actionGreen,
    color: theme.colors.primary.white,
    position: "sticky",
    float: "right",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    "&:hover": {
      background: theme.colors.primary.actionGreen,
      opacity: 0.85
    }
  }
});
