import { styleSheet as loginFormStyleSheet } from "jss/Login/LoginCommons/LoginForm";
import { withTheme } from "@material-ui/core";

export const styleSheet = theme => {
  const loginForm = loginFormStyleSheet(theme);

  return {
    loginComponent: {
      position: "relative",
      transform: "translateY(-1%)",
      top: "15vh",
      [theme.breakpoints.only("md")]: {
        top: 144
      },
      [theme.breakpoints.only("sm")]: {
        transform: "translateY(2%)"
      },
      [theme.breakpoints.only("md")]: {
        top: "20vh",
        transform: "translateY(2%)"
      },
      [theme.breakpoints.only("lg")]: {
        top: "19vh"
      },
      [theme.breakpoints.only("xl")]: {
        top: "17vh"
      },
      margin: "auto",
      // maxWidth: "398px",
      [theme.breakpoints.down("xs")]: {
        minWidth: "245px",
        position: "relative",
        top: "auto",
        left: "auto",
        transform: "none",
        margin: "32px auto"
      }
    },

    paper: {
      display: "flex",
      flexDirection: "row",
      minHeight: "425px",
      height: "425px",
      borderRadius: "2px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        minHeight: "none",
        height: "100%",
        overflow: "scroll"
      }
    },

    welcomePage: {
      overflow: "hidden",
      background: "rgb(63, 81, 181)",
      [theme.breakpoints.down("sm")]: {
        height: 300
      }
    },

    createPasswordPage: {
      padding: 30
    },

    divider: {
      margin: "30px 0 20px 0"
    },

    welcomeInputWrapper: {
      width: "100%",
      padding: "90px 30px 220px 30px",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        padding: "40px 30px 30px 30px"
      }
    },

    welcomeTitle: {
      fontSize: "35px",
      padding: "5px 0px",
      color: "white"
    },

    subTitle: {
      fontSize: "18px",
      color: "white",
      fontWeight: "400"
    },

    welcomeText: {
      width: "100%",
      position: "relative",
      fontSize: "1em",
      color: "#ddd",
      padding: "10px 0px"
    },

    welcomeTextRequest: {
      color: "rgb(2, 225, 120)",
      cursor: "pointer"
    },

    form: {
      width: "100%",
      height: "100%"
    },

    formInputWrapper: {
      ...loginForm.inputWrapper,
      flex: "0",
      maxHeight: "48px"
      // marginBottom: 20,
    },

    confirmButton: {
      width: "100%",
      position: "relative",
      left: 0,
      right: 0,
      margin: "30px 0px 20px 0px",
      borderRadius: 1
    },

    clearButton: {
      position: "relative",
      left: "calc(50% - 24px)",
      top: 20,
      color: theme.colors.secondary.lightGreen
    },

    errorWrapper: {
      // height: "100%",
      // overflowY: "scroll",
      maxHeight: "none",
      minHeight: 50
    },

    errorHeaderTitle: {
      color: theme.colors.primary.errorRed,
      top: 8,
      position: "relative"
    },

    errorShortBody: {
      maxHeight: 80,
      overflowY: "hidden"
    },

    errorShortMessage: {
      color: theme.colors.primary.darkGrey + " !important"
    },

    expandButton: {
      color: theme.colors.primary.successGreen,
      fontSize: "0.9em",
      fontWeight: 600,
      cursor: "pointer"
    },

    errorBody: {
      // width: "100%",
      height: "100%",
      // padding: 8,
      overflowY: "scroll"
    },

    errorIcon: {
      color: theme.colors.primary.errorRed,
      marginRight: 8,
      fontSize: "24px",
      position: "relative",
      top: -4
    },

    errorMessage: {
      // color: theme.colors.primary.darkGrey + " !important"
      fontSize: "1em",
      fontWeight: 400,
      lineHeight: "1.2em",
      color: `${theme.colors.primary.darkGrey} !important`
    },

    errorPanel: {
      background: "white"
    }
  };
};
