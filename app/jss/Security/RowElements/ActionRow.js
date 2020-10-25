export const styleSheet = theme => ({
  actionRow: {
    position: "relative",
    cursor: "pointer",
    alignItems: "flex-start"
  },

  checkboxDiv: {
    marginTop: 8,
    width: 40,
    height: 40
  },

  checkbox: {
    width: 36,
    height: 36,
    padding: 0
  },

  avatarDiv: {
    marginTop: 8,
    width: 40,
    height: 40
  },

  avatar: {
    width: 40,
    height: 40
  },

  actionName: {
    ...theme.typography.primaryBody,
    marginTop: 15
  },

  marginTopItem: {
    marginTop: 12
  },

  listActions: {
    height: "100%"
  }
});
