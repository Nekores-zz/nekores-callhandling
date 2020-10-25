export const styleSheet = theme => ({
  buttonsContainer: {
    height: 90
  },

  button: {
    width: "100%",
    height: 36,
    borderRadius: 2,
    [theme.breakpoints.down("xs")]: {
      height: 28
    }
  },

  googleButton: {
    background: "#ef4538",
    "&:hover": {
      background: "#D62C1F"
    }
  },

  salesforceButton: {
    background: "#1198d7",
    "&:hover": {
      background: "#0877ae"
    }
  },

  icon: {
    height: 15,
    fill: "#ffffff",
    position: "absolute",
    left: 10
  },

  text: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: 500
  }
});
