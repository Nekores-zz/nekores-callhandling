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

  paper: {
    margin: 32,
    padding: 32,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflowX: "hidden"
    }
  },

  sectionHeader: {
    ...theme.typography.sectionHeaders,
    color: theme.colors.primary.black,
    fontWeight: "bold"
  },

  hintText: {
    ...theme.typography.caption,
    marginTop: 10,
    flexShrink: 1
  },

  chip: {
    margin: "0 8px 8px 0"
  },

  bold: {
    fontWeight: "bold"
  },

  marginBottomSmall: {
    marginBottom: 16
  },

  marginBottomMedium: {
    marginBottom: 24
  },

  marginBottomLarge: {
    marginBottom: 32
  },

  primaryText: {
    ...theme.typography.primaryBody,
    textAlign: "left"
  },

  smallText: {
    ...theme.typography.primarySmallBody,
    textAlign: "left"
  },

  flex: {
    flex: 1
  },

  internalButtons: {
    width: "100%",
    height: 38,
    marginTop: 20,
    marginBottom: 5
  }
});
