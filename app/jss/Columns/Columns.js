export const styleSheet = theme => ({
  left: {
    position: "relative",
    [theme.breakpoints.only("md")]: {
      height: 732
    },
    [theme.breakpoints.only("sm")]: {
      height: 758
    }
  },
  right: {
    overflowX: "hidden",
    [theme.breakpoints.only("md")]: {},
    [theme.breakpoints.only("sm")]: {
      //marginTop: '31vh',
    }
  },
  twoColumnContainer: {
    overflowY: "auto",
    height: "100vh"
  }
});
