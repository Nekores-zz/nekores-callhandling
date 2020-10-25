import { green } from "@material-ui/core/colors";

export const styleSheet = theme => ({
  outer: {
    border: `1px dashed ${theme.colors.primary.lightGrey}`,
    padding: 8,
    [theme.breakpoints.down('sm')]: {
      border: "none",
      padding: 0,
    }
  },

  container: {
    border: `2px solid ${theme.colors.primary.lightGrey}`,
    padding: theme.spacing.unit * 4,
    color: "rgba(0, 0, 0, 0.47)",
    [theme.breakpoints.down('sm')]: {
      border: "none",
      padding: 0,
    }
  },

  title: {
    fontSize: "1.2em"
  },

  icon: {
    position: "relative",
    top: 7,
    left: -3,
    margin: 2
  },

  success: {
    color: theme.colors.primary.actionGreen,
    marginRight: theme.spacing.unit * 2,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
    }
  },

  fail: {
    color: theme.colors.primary.errorRed,
    marginRight: theme.spacing.unit * 2,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
    }
  },

  showErrors: {
    color: theme.colors.primary.errorRed,
    textDecoration: "underline",
    cursor: "pointer"
  },
});
