export const styleSheet = theme => ({
  dialogContent: {
    paddingLeft: 32,
    paddingRight: 32
  },

  dialogPaper: {
    width: "600px",
    overflow: "hidden"
  },

  marginField: {
    marginTop: 22
  },

  asterisk: {
    color: theme.colors.primary.mainBlue,
  },

  close: {
    left: 16,
    bottom: 8
  },

  dialogTitle: {
    boxShadow: "none",
    backgroundColor: theme.colors.primary.lightGrey,
    position: "relative",
    padding: 32,
    paddingBottom: 16
  },

  typoWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },

  inviteTypo: {
    position: "relative",
    right: 20,
    marginTop: "-16px"
  },

  buttons: {
    paddingRight: 32,
    marginBottom: 32
  }
});
