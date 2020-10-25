export const styleSheet = theme => ({
  pageContent: {
    flex: 1,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      overflowX: "hidden"
    }
  },

  wrapper: {
    width: "100%",
    display: "flex",
    position: "relative",
    top: 32,
    margin: 0,
    marginBottom: 32,
    [theme.breakpoints.down("sm")]: {
      top: 0,
      bottom: 0
    }
  },

  root: {
    position: "relative",
    top: 0,
    margin: "auto",
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    maxWidth: "1200px",
    minWidth: "339px",
    padding: 0
  },

  paper: {
    backgroundColor: theme.colors.primary.white,
    position: "relative",
    top: "0",
    margin: "auto",
    padding: 24
  },

  internalForm: {
    width: "100%",
    display: "block",
    padding: 20
  },

  sharingOption: {
    height: 32
  },

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
