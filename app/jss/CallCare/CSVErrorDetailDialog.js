export const styleSheet = theme => ({
  dialogPaper: {
    maxWidth: "100%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },

  dialogContent: {
    overflow: "hidden",
    margin: "-20px -24px"
  },

  rowIssue: {
    width: "100%",
    padding: 0
  },

  rowIssueContent: {
    width: "100%"
  },

  listErrorItem: {
    borderBottom: "1px solid #ccc",
    padding: "20px 0px 20px 0px",
    margin: "0px 30px 0px 30px",
    width: "auto",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "start"
    }
  },

  rowInfo: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing.unit
    }
  },

  rowInfoHelper: {
    color: theme.colors.primary.mediumGrey,
    fontWeight: 500,
    fontSize: "0.8em",
    bottom: theme.spacing.unit,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
      fontWeight: 800,
      bottom: 0
    }
  },

  rowInfoNumber: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing.unit
    }
  },

  moreId: {
    color: theme.colors.primary.actionGreen,
    marginLeft: theme.spacing.unit,
    fontSize: "0.9em",
    cursor: "pointer"
  },

  rowStatus: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing.unit
    }
  },

  issueIcon: {
    fontSize: "1.5em",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    position: "relative",
    top: 4,
    [theme.breakpoints.down("sm")]: {
      marginLeft: -4
    }
  },

  issueStatus: {
    bottom: 8
  },

  issueContent: {
    top: 6,
    position: "relative"
  },

  icon_success: {
    color: theme.colors.primary.actionGreen
  },

  icon_error: {
    color: theme.colors.primary.errorRed
  },

  moreIssuesLinkWrapper: {
    padding: "40px 30px",
    borderBottom: "1px solid #ccc"
  },

  moreIssuesLink: {
    color: theme.colors.secondary.lightBlue,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none"
    }
  },

  listItem: {
    borderBottom: "1px solid #ccc",
    padding: "20px 30px",
    width: "100%",
    minWidth: "100%"
  },

  listItemHeader: {
    fontSize: "1.5em",
    width: "100%",
    justifyContent: "space-between"
  },

  row: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "black"
  },

  issues: {
    color: theme.colors.primary.errorRed,
    float: "right",
    fontWeight: 500
  },

  columnIssueWrapper: {
    padding: "15px 30px",
    justifyContent: "space-between"
  },

  columnIssueHeader: {
    borderBottom: "1px solid #ccc",
    padding: "15px 0px",
    margin: "0px 30px"
  },

  columnIssue: {},

  issueButtons: {},

  viewButton: {
    textDecoration: "none",
    cursor: "pointer",
    textTransform: "uppercase"
  },

  columnIssueTitle: {
    fontWeight: "bold",
    lineHeight: "1.7em"
  },

  columnIssueContent: {
    lineHeight: "1.7em"
  },

  columnIssueRows: {
    fontWeight: 500
  }
});
