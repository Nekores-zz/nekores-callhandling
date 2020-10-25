/**
 * Created by Andy on 2018-02-11.
 */
export const styleSheet = theme => ({
  buttonsContainer: {
    marginTop: 18,
    justifyContent: "space-between"
  },

  button: {
    width: 104,
    height: 36,
    [theme.breakpoints.down("xs")]: {
      width: 80,
      height: 28
    }
  },

  googleButton: {
    background: "#ef4538",
    "&:hover": {
      background: "#D62C1F"
    }
  },

  facebookButton: {
    background: "#4267b2",
    "&:hover": {
      background: "#294E99"
    }
  },

  linkedinkButton: {
    background: "#0078b7",
    "&:hover": {
      background: "#005F9E"
    }
  },

  icon: {
    height: 18,
    fill: "#ffffff"
  }
});
