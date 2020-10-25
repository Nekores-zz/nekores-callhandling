export const styleSheet = theme => ({
  paper: {
    width: 250
  },

  title: {
    color: theme.colors.primary.white,
    backgroundColor: theme.colors.primary.mainBlue,
    fontSize: 17,
    padding: 24
  },

  divider: {
    marginBottom: 20
  },

  number: {
    marginLeft: 12,
    marginBottom: 8
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
    top: 40
  },

  content: {
    paddingBottom: 14
  },

  expanded: {
    marginTop: 0,
    marginBottom: 0
  },

  icon: {
    fontSize: 22
  },

  iconBox: {
    position: "relative",
    marginTop: 10,
    right: 4,
    marginBottom: 10
  },

  titleIcon: {
    fontSize: 22,
    color: theme.colors.primary.white,
    marginBottom: -4,
    marginRight: 8
  },

  avatar: {
    position: "relative",
    right: 5,
    height: 18,
    marginRight: 5,
    width: 18,
    marginTop: 18
  },

  headingWrapper: {
    color: theme.colors.primary.darkGrey,
    display: "flex",
    top: 2
  },

  marginCollapse: {
    display: "content",
    position: "relative"
  },

  heading: {
    ...theme.typography.primaryBody,
    color: theme.colors.primary.darkGrey,
    display: "flex",
    top: 2,
    fontSize: 16,
    marginLeft: 4,
    marginTop: 16
  },

  subtitle: {
    marginTop: 16,
    display: "flex"
  },

  numbersQuantity: {
    ...theme.typography.secondarySmallBody,
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 4
  },

  warning: {
    marginTop: 6,
    fontWeight: 500,
    color: theme.colors.primary.errorRed
  },

  expansionDetails: {
    display: "block",
    padding: "8px 24px 8px"
  },

  numberButton: {
    display: "block",
    width: "100%",
    marginBottom: 8
  },

  numberButtonRoot: {
    border: `1px solid ${theme.colors.primary.errorRed}`
  },

  buttonIcon: {
    float: "left",
    fontSize: 24,
    marginTop: 3,
    marginLeft: -5,
    color: theme.colors.primary.errorRed
  },

  buttonNumber: {
    display: "inline-block",
    float: "left",
    marginLeft: 16
  },

  buttonTextContent: {
    display: "flex",
    margin: -4,
    textTransform: "initial"
  },

  buttonX: {
    marginTop: 9,
    marginRight: -8,
    fontSize: 13,
    float: "right"
  },

  buttonTextContent2: {
    display: "flex",
    textTransform: "initial",
    marginLeft: -16
  },

  buttonX2: {
    marginTop: 5,
    marginRight: -8,
    fontSize: 13,
    float: "right"
  },

  noNumbers: {
    display: "block",
    padding: 24,
    paddingTop: 0,
    paddingBottom: 20
  }
});
