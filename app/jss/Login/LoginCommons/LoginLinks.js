/**
 * Created by Andy on 2018-02-11.
 */
export const styleSheet = theme => ({
  container: {
    ...theme.typography.secondarySmallBody,
    color: "#ffffff",
    marginTop: "30px",
    [theme.breakpoints.up("md")]: {
      marginBottom: "30px"
    },
    "& a": {
      color: "#ffffff",
      textDecoration: "none",
      "&:visited, &:hover": {
        color: "#ffffff"
      }
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: "30px",
    },
  },

  powered: {
    "& a": {
      fontWeight: "700"
    }
  },

  links: {
    textAlign: "right",
    "& a + a": {
      marginLeft: "14px"
    }
  }
});
