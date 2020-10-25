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

  sectionHeader: {
    margin: 32,
    ...theme.typography.sectionHeaders,
    fontWeight: "bold"
  },

  paper: {
    margin: 32,
    textAlign: "center",
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflowX: "hidden"
    }
  }
});
