export const styleSheet = theme => ({
  button: {
    color: theme.colors.primary.white,
    fontSize: "20px",
    fontWeight: "400",
    textTransform: "unset",
    "&, &:hover": {
      background: "none"
    },
    maxWidth: 450,
    marginLeft: 4
  },

  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.only("xs")]: {
      display: "none"
    }
  }
});
