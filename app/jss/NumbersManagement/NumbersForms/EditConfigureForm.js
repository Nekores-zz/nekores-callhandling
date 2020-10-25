export const styleSheet = theme => ({
  internalForm: {
    width: "100%",
    padding: "20px 40px",
    display: "block"
  },

  labelText: {
    display: "block",
    marginTop: 20,
    fontSize: 17,
    color: theme.colors.primary.black
  },

  textField: {
    // width: "272px",
    width: "30vw",
    position: "relative",
    bottom: "3px",
    marginBottom: "11px",
    [theme.breakpoints.only("xs")]: {
      width: "98%"
    }
  },

  assignBand: {
    width: "calc(30vw - 32px)",
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

  buttons: {}
});
