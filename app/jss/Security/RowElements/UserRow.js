export const styleSheet = theme => ({
  userRow: {
    position: "relative",
    cursor: "pointer",
    height: 70
  },

  checkbox: {
    width: 40,
    height: 40
  },

  userName: {
    ...theme.typography.primaryBody
  },

  descriptionText: {
    ...theme.typography.secondarySmallBody
  },

  marginTopItem: {
    marginTop: 12
  },

  chip: {
    height: 25,
    fontWeight: "bold",
    fontSize: "12px",
    color: theme.colors.primary.darkGrey
  }
});
