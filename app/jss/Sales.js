export const styleSheet = theme => ({
  root: {
    width: "100%",
    height: "100vh",
    background: 'url("https://www.w3schools.com/w3css/img_fjords.jpg")',
    backgroundSize: "cover",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    [theme.breakpoints.only("sm")]: {
      display: "none"
    },
    "@media (max-width: 1250px)": {
      display: "none",
      overflow: "hidden"
    }
  },
  tour: {
    textTransform: "none"
  },
  btn: {
    height: "46px",
    width: "153px",
    background: "white",
    color: theme.colors.primary.mainBlue,
    position: "absolute",
    top: "37.1%",
    transform: "translateY(-50%)",
    transform: "translateX(20%)"
  }
});
