import { styleSheet as listPageStyleSheet } from "jss/Shared/ListPage";

export const styleSheet = theme => {
  const listPage = listPageStyleSheet(theme);

  return {
    ...listPage,

    paper: {
      padding: 32,
      margin: 32,
      textAlign: "center"
    },

    msgText: {
      maxWidth: 700,
      margin: "16px auto"
    }
  };
};
