export const styleSheet = theme => ({
  root: {
    width: "100%",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.17)",
    border: "1px solid #D8D8D8",
    borderRadius: 0,
    marginTop: "20px",
    "&:hover": {
      backgroundColor: theme.colors.secondary.lightestBlue,
      cursor: "pointer"
    }
  },
  defaultCard: {
    // borderTop: "8px solid red !important"
  }
  // blueCard: {
  //   borderTop: "8px solid #2196F3"
  // },
  // greenCard: {
  //   borderTop: "8px solid #00C853"
  // },
  // redCard: {
  //   borderTop:"8px solid #D32F2F"
  // },
  // pinkCard: {
  //   borderTop:"8px solid #E91E63"
  // },
  // yellowCard: {
  //   borderTop:"8px solid #FFC107"
  // }
  // bullet: {
  //   display: "inline-block",
  //   margin: "0 2px",
  //   transform: "scale(0.8)"
  // },
  // title: {
  //   fontSize: 14,
  // },
  // pos: {
  //   marginBottom: 12
  // }
});
