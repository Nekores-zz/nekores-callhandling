export const styleSheet = theme => ({
  roleRow: {
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

  roleName: {
    ...theme.typography.primaryBody,
    marginTop: 2,
    marginBottom: -2
  },

  descriptionText: {
    ...theme.typography.secondarySmallBody,
    marginTop: 8
  },

  marginTopItem: {
    marginTop: 12
  },

  chip: {
    marginLeft: 8,
    height: 25,
    fontWeight: "bold",
    fontSize: "12px",
    color: theme.colors.primary.darkGrey
  },

  listActions: {
    height: "100%"
  }
});
