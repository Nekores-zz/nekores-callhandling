export const styleSheet = theme => ({
  sectionHeader: {
    ...theme.typography.sectionHeaders,
    color: theme.colors.primary.black,
    fontWeight: "bold"
  },

  emailGridItem: {
    flex: 1,
    minWidth: 200
  },

  nameGridItem: {
    flex: 1,
    minWidth: 130
  },

  hintText: {
    ...theme.typography.caption,
    marginTop: 10,
    flexShrink: 1
  },

  chip: {
    margin: "0 8px 8px 0"
  },

  bold: {
    fontWeight: "bold"
  },

  marginBottomSmall: {
    marginBottom: 16
  },

  marginBottomMedium: {
    marginBottom: 24
  },

  marginBottomLarge: {
    marginBottom: 32
  },

  primaryText: {
    ...theme.typography.primaryBody,
    textAlign: "left"
  },

  smallText: {
    ...theme.typography.secondarySmallBody,
    textAlign: "left"
  },

  buttonProgress: {
    color: theme.colors.primary.successGreen,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },

  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },

  removeUserItem: {
    marginRight: -16
  }
});
