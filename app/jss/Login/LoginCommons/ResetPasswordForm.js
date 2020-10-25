/**
 * Created by Andy on 2018-02-18.
 */
import { styleSheet as loginFormStyleSheet } from "jss/Login/LoginCommons/LoginForm";

// Extending the LoginForm styles
export const styleSheet = theme => {
  const loginForm = loginFormStyleSheet(theme);

  return {
    ...loginForm,

    form: {
      ...loginForm.form,
      marginTop: "41px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },

    formFooter: {
      ...loginForm.formFooter,
      marginTop: "0",
      justifyContent: "flex-end",
      display: "flex",
      flexDirection: "column",
      flexGrow: "1"
    },

    footerButtons: {
      justifyContent: "flex-end"
    },

    inputWrapper: {
      ...loginForm.inputWrapper,
      flex: "0",
      maxHeight: "48px"
    },

    divider: {
      width: "calc(100% + 68px)",
      margin: "0 34px 0 -34px"
    },

    passwordLabel: {
      textAlign: "right",
      "&.weak": {
        color: theme.colors.primary.errorRed
      },
      "&.medium": {
        color: theme.colors.secondary.darkAmber
      },
      "&.strong": {
        color: theme.colors.primary.successGreen
      }
    },

    buttons: {
      marginTop: 110,
      // marginBottom: 10,
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        marginLeft: "5%"
      }
    }
  };
};
