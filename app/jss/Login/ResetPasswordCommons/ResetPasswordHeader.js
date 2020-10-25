export const styleSheet = theme => ({
  container: {},
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      boxSizing: "border-box",
      paddingLeft: "12px"
    },
    flex: "1"
  },
  title: {
    ...theme.typography.headline,
    lineHeight: "32px",
    fontSize: "32px",
    textIndent: "-3px",
    letterSpacing: "-0.009em",
    marginBottom: "16px"
  },
  subtitle: {
    ...theme.typography.secondaryBody,
    lineHeight: "15px",
    fontSize: "15px",
    fontWeight: "500"
  },
  icon: {
    alignSelf: "center",
    "&:hover": {
      cursor: "pointer"
    }
  }
});
