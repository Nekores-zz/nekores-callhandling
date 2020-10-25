export const styleSheet = theme => ({
  paper: {
    padding: 32,
    margin: 32,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      margin: 0
    }
  },

  page: {
    height: "100%"
  },

  pageContent: {
    flex: 1,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflowX: "hidden"
    }
  },

  inviteByRadioGroup: {
    margin: -32,
    marginBottom: 32,
    padding: 32,
    paddingBottom: 24,
    backgroundColor: "#e8eaf6"
  },

  inviteByOption: {
    height: 40,
    [theme.breakpoints.down("sm")]: {
      height: 80
    }
  },

  recommend: {
    display: "inline"
  }
});
