export const styleSheet = theme => ({
  internalForm: {
    width: "100%",
    padding: 20,
    paddingLeft: 40,
    display: "block"
  },

  textField: {
    width: "272px",
    position: "relative",
    bottom: "3px",
    marginBottom: "11px",
    [theme.breakpoints.only("xs")]: {
      width: "98%"
    }
  },

  checkboxChecked: {
    color: theme.colors.primary.secondaryBlue
  },

  checkboxLabel: {
    color: theme.colors.primary.darkGrey,
    fontWeight: 300,
    fontSize: "15px",
    position: "relative",
    right: "2px"
  },

  helperText: {
    marginTop: -5,
    marginLeft: 35
  },

  bandSelector: {
    marginTop: 16,
    marginLeft: 35
  },

  formGrp: {
    position: "relative"
  },

  searchableChipSelector: {
    width: "30vw",
    [theme.breakpoints.down("sm")]: {
      width: "50vw"
    }
  },

  buttons: {
    marginTop: 0,
    marginBottom: -20
  }
});
