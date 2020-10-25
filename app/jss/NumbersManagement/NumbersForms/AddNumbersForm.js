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
    fontSize: 16,
    right: 2
  },

  formGrp: {
    position: "relative"
  },

  buttons: {
    marginTop: 0,
    marginBottom: -20
  }
});
