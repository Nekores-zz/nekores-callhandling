export const styleSheet = theme => ({
  logoComponent: {
    alignSelf: "center",
    background: "#ffffff",
    color: "#035eb8",
    fontWeight: "900",
    fontStyle: "italic",
    width: "65px",
    height: "65px",
    position: "absolute",
    top: "22px",
    left: "26px",
    "&:hover": {
      cursor: "pointer"
    }
  },

  inline: {
    position: "relative",
    top: "auto",
    left: "auto",
    height: "40px",
    width: "40px",
    background: theme.colors.primary.white,
    color: theme.colors.primary.black,
    fontSize: "0.8rem"
  }
});
