export const styleSheet = theme => ({
  type: {
    ...theme.typography.subTitle,
    fontSize: 16,
    whiteSpace: "nowrap",
    textTransform: "capitalize"
  },

  // icon: {
  //   paddingRight: 8,
  //   fontSize: "1em",
  //   marginRight: "8px",
  //   marginBottom: "-2px"
  // },

  iconWrapper: {
    height: 24,
    width: 24,
    bottom: -4,
    marginLeft: 4,
    marginRight: 8,
    display: "inline-flex",
    background: theme.colors.primary.black
  },

  icon: {
    height: 22,
    width: 22,

    display: "block",
    background: theme.colors.primary.white
  }
});
