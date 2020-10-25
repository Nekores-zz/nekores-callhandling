import { styleSheet as listPageStyleSheet } from "jss/Shared/ListPage";

export const styleSheet = theme => {
  const listPage = listPageStyleSheet(theme);

  return {
    ...listPage,

    paper: {
      padding: 32,
      margin: 32,
      [theme.breakpoints.down("sm")]: {
        margin: 0
      }
    },

    formContent: {
      marginLeft: -32,
      width: "95%"
    }
  };
};
