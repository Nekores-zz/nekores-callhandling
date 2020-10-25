export const styleSheet = theme => ({
  footerHeading: {
    display: "flex",
    padding: "13px 24px 9px",
    height: "100%",
    "&:hover": {
      cursor: "pointer"
    }
  },

  poweredWrapper: {
    flex: 1
  },

  powered: {
    ...theme.typography.caption,
    width: "100%",
    display: "inline-block"
  },

  poweredBy: {
    width: "100%",
    display: "inline-block",
    fontWeight: "700",
    color: theme.colors.primary.mainBlue
  },

  footerHeadingIcon: {
    fill: theme.colors.primary.darkGrey,
    alignSelf: "center"
  },

  menuPaper: {
    width: "267px",
    marginLeft: "-16px",
    marginTop: "-40px"
  }
});
