export const styleSheet = theme => ({
  field: {
    width: "calc(100% - 48px)",
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 8
  },

  fieldWithHelper: {
    width: "calc(100% - 48px)",
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24
  },

  parentDomain: {
    color: "black",
    fontWeight: 500,
    fontSize: 15,
    marginBottom: -2
  },

  helper: {
    display: "flex",
    marginLeft: 24,
    marginRight: 24
  },

  helperText: {
    marginLeft: 35
  },

  avatarHelperAc: {
    height: 13,
    width: 13,
    marginRight: 5,
    position: "relative",
    top: 3
  },

  colorDoneIcon: {
    background: theme.colors.secondary.darkGreen
  },

  iconHelper: {
    fontSize: 9
  },

  iconDone: {
    color: "white"
  },

  textHelperDone: {
    fontSize: "0.875rem",
    color: theme.colors.secondary.darkGreen
  },

  textHelperClose: {
    color: theme.colors.primary.errorRed
  }
});
