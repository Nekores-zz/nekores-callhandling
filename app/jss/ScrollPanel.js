export const styleSheet = theme => ({
  upperText: {
    minWidth: "200px",
    margin: "auto",
    maxWidth: "534px",
    position: "relative"
  },
  outer: {
    maxWidth: "530px",
    padding: "0",
    margin: "auto",
    position: "relative",
    height: "auto",
    top: "10vh",
    [theme.breakpoints.only("xs")]: {
      top: "4vh",
      transform: "none"
    },
    [theme.breakpoints.only("sm")]: {
      top: "6vh",
      transform: "none"
    },
    [theme.breakpoints.only("md")]: {
      top: "6vh",
      transform: "none"
    },
    "@media (min-height: 1024px)": {
      top: "12vh"
    },
    "@media only screen \
and (min-width: 768px)\
and (max-width : 800px)": {
      top: "4vh"
    },
    "@media only screen \
and (min-height: 1336px)\
and (max-width : 1400px)": {
      top: "4vh"
    },
    "@media only screen \
and (min-height : 900px)\
and (max-height : 960px)": {
      top: "12vh"
    }
  },
  headline: {
    fontSize: "24pt",
    position: "relative",
    left: "14px"
  },
  icon: {
    position: "relative",
    top: "9px",
    fontSize: "423px",
    height: 40,
    width: 38
  },
  scroller: {
    "@media (max-width: 1284px)": {
      display: "none"
    },

    [theme.breakpoints.only("lg")]: {
      display: "block"
    }
  },
  secondDiv: {
    display: "none",
    width: "100%",
    overflow: "hidden",
    marginTop: "2px",
    padding: "12px",
    paddingBottom: "20px",
    backgroundColor: "#F2F2F2",
    height: "auto",
    "@media (max-width: 1250px)": {
      display: "block",
      overflow: "hidden"
    }
  },
  container: {
    backgroundColor: theme.colors.primary.backgroundGrey,
    width: "100%",
    minWidth: "574px",
    margin: "auto"
  },
  paperGrid: {
    padding: "36px",
    marginBottom: "20px",
    minWidth: "534px",
    minHeight: "37px",
    "@media (max-width: 768px)": {
      width: "100%",
      boxSizing: "border-box",
      minWidth: "100%"
    }
  },
  pin: {
    display: "inline-block"
  },
  secondaryWrapper: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    bottom: "10px",
    padding: "5px"
  },
  wrapperMobile: {
    position: "relative"
  },
  sub: {
    fontWeight: "400",
    fontSize: "16pt",
    position: "relative",
    color: "black"
  },
  date: {
    position: "relative",
    top: "6px",
    display: "inline-block",
    "@media (max-width: 768px)": {
      fontSize: "12px",
      top: "12px",
      marginBottom: "12px"
    },
    float: "right",
    fontSize: "12pt"
  },
  divider: {
    clear: "right",
    position: "relative",
    marginBottom: "26px",
    "@media (max-width: 768px)": {
      fontSize: "12px"
    }
  },
  text: {
    ...theme.typography.primaryBody,
    lineHeight: "30px"
  }
});
