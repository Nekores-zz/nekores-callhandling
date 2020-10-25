export const styleSheet = theme => ({
  internalForm: {
    width: "100%",
    padding: 20,
    paddingLeft: 40,
    display: "block"
  },

  textField: {
    width: 120,
    marginLeft: 32,
    //marginRight: 32,
    position: "relative",
    bottom: 3,
    marginBottom: 11,
    [theme.breakpoints.only("xs")]: {
      width: "98%"
    }
  },

  checkboxChecked: {
    color: theme.colors.primary.secondaryBlue
  },

  checkboxLabel: {
    color: theme.colors.primary.darkGrey,
    fontSize: 16,
    right: 2
  },

  formGroup: {
    position: "relative",
    top: -16,
    marginLeft: 32
  },

  checkBoxes: {
    display: "inline-block",
    position: "relative",
    marginLeft: 10,
    [theme.breakpoints.only("sm")]: {
      marginLeft: 0
    },
    top: 20
  },

  exclude: {
    marginLeft: 32,
    [theme.breakpoints.only("sm")]: {
      marginLeft: 0
    },
    top: 20,
    marginBottom: 20
  },

  excludeChipInput: {
    width: "100%"
  }
});
