export const styleSheet = theme => ({
  paper: {
    width: 250
  },

  title: {
    color: theme.colors.primary.black,
    fontWeight: 500,
    fontSize: 17,
    padding: 20
  },

  container: {
    marginBottom: 0,
    border: "1px solid lightgrey",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    width: "100%",
    position: "relative",
    minHeight: "none"
  },

  entered: {
    overflow: "hidden"
  },

  expandIcon: {
    color: theme.colors.primary.darkGrey,
    height: 22,
    width: 22,
    right: 2,
    top: 35
  },

  content: {
    margin: 1
  },

  expanded: {
    margin: 0
  },

  icon: {
    fontSize: 22
  },

  headingWrapper: {
    color: theme.colors.primary.darkGrey,
    display: "flex",
    top: 2
  },

  iconBox: {
    position: "relative",
    marginTop: 10,
    right: 4,
    marginBottom: 10
  },

  marginCollapse: {
    position: "relative",
    top: 15,
    right: 4,
    marginBottom: -5
  },

  warning: {
    color: theme.colors.primary.errorRed,
    position: "relative",
    right: 9,
    top: 5,
    fontSize: 22
  },

  avatar: {
    position: "relative",
    right: 5,
    height: 18,
    marginRight: 5,
    width: 18,
    top: 5
  },

  heading: {
    ...theme.typography.primaryBody,
    color: theme.colors.primary.darkGrey,
    display: "flex",
    top: 2,
    fontSize: 16,
    marginLeft: 4
  },

  numbersQuantity: {
    ...theme.typography.secondarySmallBody,
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 4
  },

  warningFields: {
    left: 20,
    top: 30,
    marginBottom: 41,
    marginTop: -14
  },

  spacer: {
    height: 25
  },

  expansionDetails: {
    marginTop: 2,
    padding: "8px 24px 8px"
  },

  numbers: {
    color: theme.colors.primary.darkGrey,
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 18
  }
});
