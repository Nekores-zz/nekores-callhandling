export const styleSheet = theme => ({ 
  headSection: {
    backgroundColor: theme.colors.primary.secondaryBlue,
    padding: "20px 30px",
    color: theme.colors.primary.white
  },
  sectionTitle: {
    fontWeight: "400",
    color: theme.colors.primary.white,
    textTransform: "capitalize",
    margin: 0,
    position: "relative",
    top: "1px"
  },
  pill: {
    ...theme.typography.secondaryBody,
    fontSize: 12,
    marginLeft: "8px",
    background: theme.colors.primary.white,
    cursor: "pointer",
    padding: "0px 5px"
  },
  headerIcon: {
    color: theme.colors.primary.white
  }
});
