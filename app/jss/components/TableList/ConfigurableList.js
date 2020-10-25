export const styleSheet = theme => ({
  sectionHeader: {
    marginLeft: 0,
    marginTop: 18,
    marginBottom: 12,
    ...theme.typography.sectionHeaders,
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 32,
      overflowX: "hidden"
    }
  }
});
