export const styleSheet = theme => ({
  buttonsWrapper: {
    width: "100%",
    height: 38,
    marginTop: 15,
    marginBottom: 15
  },

  submitWrapper: {
    position: "relative",
    margin: 0
  },

  progress: {
    color: theme.colors.primary.white,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },

  altActionButton: {
    [theme.breakpoints.only("xs")]: {
      marginLeft: 10
    },
    float: "left"
  },

  cancelButton: {
    marginRight: 15,
    [theme.breakpoints.only("xs")]: {
      marginRight: 10
    },
    float: "right"
  },

  confirmButton: {
    float: "right"
  }
});
