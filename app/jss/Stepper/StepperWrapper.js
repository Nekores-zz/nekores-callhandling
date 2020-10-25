export const styleSheet = theme => ({
  root: {
    position: "relative",
    margin: "auto",
    width: "100%",
    maxWidth: "692px",
    minWidth: "289px",
    padding: 0
  },

  stepper: {
    position: "relative",
    paddingLeft: "56px",
    paddingTop: 33,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 25
    }
  },

  avatar: {
    position: "relative",
    right: "8px"
  },

  mainWrapper: {
    width: "100%"
  },

  wrapper: {
    width: "100%",
    display: "flex",
    position: "relative",
    top: "32px",
    margin: "auto",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      top: "0px"
    },
    [theme.breakpoints.only("md")]: {
      flexDirection: "column",
      top: "0px"
    },
    [theme.breakpoints.only("sm")]: {
      flexDirection: "column",
      top: "0px"
    }
  },

  sidebar: {
    right: 120,
    transform: "translateX(42%)",
    border: "1px solid lightgrey",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    width: "100%",
    position: "relative",
    [theme.breakpoints.only("xs")]: {
      position: "relative",
      right: 0,
      bottom: 0,
      width: "100%"
    },
    [theme.breakpoints.only("md")]: {
      position: "relative",
      width: "100%"
    },
    [theme.breakpoints.only("sm")]: {
      position: "relative",
      flexGrow: 12
    }
  },

  connector: {
    height: "15px",
    position: "relative",
    bottom: "12px",
    border: "1px solid black",
    visibility: "hidden"
  },

  connectorAlt: {
    height: "26px",
    position: "relative",
    left: "12px",
    marginBottom: "8px",
    borderLeft: "1px solid #bdbdbd"
  },

  avatardiv: {
    display: "none"
  },

  avatarp: {
    position: "relative",
    top: "13px",
    left: "16px"
  },

  paper: {
    backgroundColor: "white",
    position: "absolute",
    top: "0",
    flexGrow: 5,
    margin: "auto",
    maxHeight: "10px",
    minWidth: "56vw",
    width: "43%",
    padding: 0,
    backgroundColor: "blue"
  },

  paperFullWidth: {
    minWidth: "1244px",
    padding: 0
  },

  undo: {
    color: theme.colors.primary.secondaryBlue,
    fontSize: "18px",
    position: "relative"
  },

  iconEnter: {
    position: "relative",
    bottom: "12px",
    color: "yellow"
  },

  btnCancel: {
    position: "relative",
    padding: 0,
    left: "26px",
    marginRight: "2px",
    top: "12px",
    height: "38px",
    width: "102px",
    boxSizing: "content-box",
    paddingBottom: "1.5px",
    paddingTop: "0.2px",
    right: "12px",
    verticalAlign: "baseline",
    [theme.breakpoints.only("xs")]: {
      float: "left",
      position: "relative",
      top: "12px"
    }
  },

  button: {
    [theme.breakpoints.only("xs")]: {
      width: "auto",
      float: "right"
    },
    left: "15px",
    position: "relative",
    minWidth: "112px",
    width: "auto",
    margin: "12px",

    ...theme.buttons.action,
    "@media only screen and (max-width : 311px)": {
      position: "relative",
      lineHeight: 0.9
    },

    "&:hover": {
      ...theme.buttons.actionHover
    },
    "&:disabled": {
      ...theme.buttons.actionDisabled
    },
    "&:active": {
      ...theme.buttons.actionPressed
    }
  },

  buttonMargin: {
    marginBottom: "-20x"
  },

  btnWrapper: {
    position: "absolute",
    float: "right",
    display: "flex",
    paddingRight: "10px",
    position: "relative",
    left: "2px",
    top: 1,
    marginTop: 4,
    marginBottom: 1,
    [theme.breakpoints.only("xs")]: {
      width: "auto"
    }
  },

  saveMargin: {
    marginBottom: "-20px"
  },

  label: {
    fontSize: "17px",
    position: "relative",
    top: "1px",
    left: "8px",
    color: "black"
  },

  getStepContent: {
    position: "relative",
    marginLeft: "26px",
    bottom: "12px",
    paddingLeft: "14px",
    padding: 0,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: "0",
      marginLeft: "0"
    }
  },

  stepContent: {
    position: "relative",
    top: "4px",
    paddingRight: "4px",
    paddingLeft: "12px",
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 15
    }
  }
});
