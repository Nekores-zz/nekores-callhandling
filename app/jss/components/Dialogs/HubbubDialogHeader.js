export const styleSheet = theme => ({
  parent: {
    position: "relative",
    boxShadow: "none",
    paddingLeft: "22px 24px"
  },
  containerStyle: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "46px"
    }
  },
  columnStyle: {
    display: "inline-flex",
    alignItems: "center"
  },
  menuStyle: {
    [theme.breakpoints.down("sm")]: {
      top: 0,
      right: 0,
      position: "absolute",
      borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
      width: "100%",
      display: "block",
      textAlign: "right"
    }
  },
  avatar: {
    marginRight: 15
  },
  TitleIcon: {
    color: theme.colors.primary.black,
    fontSize: 40,
    cursor: "pointer",
    marginRight: 15
  },
  text: {
    color: theme.colors.primary.black,
    paddingLeft: 5
  },

  // DIALOG HEADER VARIATIONS - "default", "grey", "red"

  //  BACKGROUND COLOR
  defaultBg: {
    backgroundColor: theme.colors.primary.white,
    borderBottom: `1px solid ${theme.colors.primary.lightGrey}`
  },
  greyBg: {
    borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
    backgroundColor: theme.colors.primary.backgroundGrey
  },
  redBg: {
    backgroundColor: theme.colors.primary.errorRed
  },

  //  TEXT COLOR
  defaultColor: {
    color: theme.colors.primary.darkGrey
  },
  defaultTextColor: {
    color: theme.colors.primary.black
  },
  greyColor: {
    color: theme.colors.primary.darkGrey
  },
  greyTextColor: {
    color: theme.colors.primary.black
  },
  redColor: {
    color: theme.colors.primary.white
  },
  redTextColor: {
    color: theme.colors.primary.white
  }
});
