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

  marginTopSmall: {
    marginTop: 16
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

  flex: {
    flex: 1
  },

  bold: {
    fontWeight: "bold"
  },

  secondaryText: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
  },

  smallText: {
    ...theme.typography.primarySmallBody,
    textAlign: "left"
  },

  hintText: {
    ...theme.typography.caption,
    marginTop: 10,
    flexShrink: 1
  },

  managePasswordOption: {
    height: 40
  },

  managePasswordForm: {
    paddingLeft: 35
  },

  status: {
    lineHeight: "34px"
  },

  select: {
    marginTop: 10,
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    }
  },

  listButton: {
    marginTop: 8
  },

  deleteButton: {
    marginTop: 8,
    color: theme.colors.primary.errorRed
  },

  listItem: {
    marginLeft: -24
  },

  activated: {
    color: theme.colors.primary.successGreen
  },

  textField: {
    width: "60%",
    marginBottom: 8,
    [theme.breakpoints.down("sm")]: {
      width: "80%"
    }
  }
});
