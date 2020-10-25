/**
 * Created by Andy on 2018-02-11.
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
      flex: "1",
      flexDirection: "column",
      justifyContent: "space-between"
    },

    rememberPassword: {
      height: "96px"
    },

    formFooter: {
      ...loginForm.formFooter,
      marginTop: "0",
      height: "36px"
    },

    divider: {
      width: "calc(100% + 68px)",
      margin: "0 34px 0 -34px"
    }
  };
};
