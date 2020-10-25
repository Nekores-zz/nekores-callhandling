export const styleSheet = theme => ({
  primaryTextButton: {
    ...theme.buttons.primaryTextLink,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: theme.colors.primary.main
    }
  },

  primaryTextButtonDisabled: {
    ...theme.buttons.primaryTextLink,
    fontWeight: "bold",
    color: `${theme.colors.primary.secondaryBlue} !important`,
    opacity: 0.47,
    backgroundColor: "white !important"
  },

  denseLeft: {
    paddingLeft: 16,
    marginLeft: -16
  },

  denseRight: {
    paddingRight: 16,
    marginRight: -16
  }
});
