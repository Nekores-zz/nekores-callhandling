export const styleSheet = theme => ({
  root: {
    position: "relative",
    top: 32,
    margin: "auto",
    width: "90%",
    maxWidth: "1200px",
    minWidth: "339px",
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
});
