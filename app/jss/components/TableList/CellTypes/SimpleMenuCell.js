export const styleSheet = theme => ({
  buttonsCell: {
    width: 90,
    padding: "0px 10px 0px 0px",
    whiteSpace: "nowrap",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      width: "auto"
    }
  },

  icon: {
    width: 40,
    height: 40
  },

  withBadage: {
    width: 84
  },

  bigIconAlignment: {
    marginTop: -4
  },

  noWarp: {
    whiteSpace: "nowrap"
  }
});
