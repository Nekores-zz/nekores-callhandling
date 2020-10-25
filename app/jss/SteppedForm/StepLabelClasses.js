export const styleSheet = theme => ({
  root: {
    width: 40,
    height: 40,
    color: theme.colors.primary.mediumGrey,
    "&$active": {
      color: theme.colors.primary.secondaryBlue
    },
    "&$completed": {
      color: theme.colors.primary.secondaryBlue
    }
  },

  active: {
    // do not remove: root class needs this reference
  },

  completed: {
    // do not remove: root class needs this reference
  }
});
