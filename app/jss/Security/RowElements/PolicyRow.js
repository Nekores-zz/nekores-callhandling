export const styleSheet = theme => ({
  policyRow: {
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

  policyName: {
    ...theme.typography.primaryBody,
    marginTop: 2,
    marginBottom: -2
  },

  descriptionText: {
    ...theme.typography.secondarySmallBody,
    maxWidth: 200,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 130
    }
  },

  marginTopItem: {
    marginTop: 12
  },

  marginTopItemClosed: {
    marginTop: 6
  },

  listActions: {
    height: "100%"
  }
});
