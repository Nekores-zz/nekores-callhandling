export const styleSheet = theme => ({
  expansionPanelSummary: {
    minHeight: 72,
    alignItems: "center",
    "&>div": {
      alignItems: "center"
    }
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    height: 40,
    marginTop: 18,
    marginLeft: 18
  },

  blockedHeading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    height: 40,
    marginTop: 18,
    marginLeft: 18,
    color: theme.colors.primary.lightGrey
  },

  doneIcon: {
    margin: 0,
    color: theme.colors.primary.white,
    backgroundColor: theme.colors.primary.successGreen,
    float: "right",
    [theme.breakpoints.only("xs")]: {
      marginRight: 5
    }
  },

  column: {
    width: "50%",
    height: 40,
    [theme.breakpoints.only("xs")]: {
      width: "20%"
    }
  },

  avatar: {
    backgroundColor: theme.colors.primary.secondaryBlue
  },

  blockedAvatar: {
    backgroundColor: theme.colors.secondary.lighterBlue
  },

  stepIcon: {
    fontSize: 20,
    marginLeft: 1,
    marginTop: 1
  }
});
