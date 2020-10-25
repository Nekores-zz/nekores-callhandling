export const styleSheet = theme => ({
  formInput: {
    width: "100%",
    margin: "auto",
    marginLeft: 56,
    marginRight: 16,
    position: "relative",
    bottom: 22
  },

  gridMargin: {
    marginTop: -4,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: 22
    }
  },

  textField: {
    width: "100%",
    marginTop: 29
  },

  rightItemWidth: {
    width: "100%"
  },

  postZipCode: {
    display: "flex",
    position: "relative",
    justifyContent: "space-between"
  },

  primaryBtnZipLeft: {
    position: "relative",
    right: 8
  },

  primaryBtnZip: {
    position: "relative",
    left: 8
  },

  addressLines: {
    position: "relative",
    bottom: 16,
    marginBottom: 16
  },

  buttons: {
    marginTop: 24,
    marginBottom: -8
  }
});
