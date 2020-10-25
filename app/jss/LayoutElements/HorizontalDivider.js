/**
 * Created by Andy on 2018-02-11.
 */
export const styleSheet = theme => ({
  container: {
    height: "15px",
    position: "relative",
    width: "100%",
    textAlign: "center",
    overflow: "hidden"
  },

  text: {
    fontSize: "14px",
    lineHeight: "15px",
    fontWeight: "normal",
    color: "#A3A3A3",
    "&::before, &::after": {
      content: "''",
      display: "block",
      width: "50%",
      height: "1px",
      background: "#A3A3A3",
      position: "absolute",
      top: "50%",
      left: "0",
      borderBox: "box-sizing",
      marginRight: "-14px",
      marginLeft: "-14px"
    },
    "&::before": {},
    "&::after": {
      left: "auto",
      right: "0"
    }
  }
});
