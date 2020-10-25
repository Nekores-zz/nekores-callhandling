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

  buttonsCellLarge: {
    width: 130,
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

  isFavoriteOn: {
    cursor: "pointer",
    color: theme.colors.secondary.yellow
  },

  isFavoriteOff: {
    cursor: "pointer"
  },

  bigIconAlignment: {
    marginTop: -4
  }
});
