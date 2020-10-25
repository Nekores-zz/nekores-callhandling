import { styleSheet as listPageStyleSheet } from "jss/Shared/ListPage";

export const styleSheet = theme => {
  const listPage = listPageStyleSheet(theme);

  return {
    // here we take a copy of our generic ListPage classes
    ...listPage,

    // we may add new or override any classes of generic ListPage below

    noSortGroupFn: {
      marginTop: 32,
      [theme.breakpoints.down("sm")]: {
        margin: 0
      }
    },

    example: {
      // css
    },

    titleText: {
      marginLeft: 32,
      marginBottom: 16,
      textTransform: "uppercase",
      fontWeight: 600,
      [theme.breakpoints.down("sm")]: {
        display: "block",
        marginTop: 20,
        marginLeft: 8,
        overflowX: "hidden"
      }
    }
  };
};
