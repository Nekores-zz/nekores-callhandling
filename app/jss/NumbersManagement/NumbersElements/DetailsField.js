export const styleSheet = theme => ({
  textFieldWrapper: {
    height: 2,
    paddingBottom: 29,
    marginBottom: 5
  },

  select: {
    color: theme.colors.primary.black,
    width: 132,
    marginBottom: -16,
    marginTop: -16,
    lineHeight: 12,
    marginLeft: 11
  },

  icon: {
    right: 14,
    fontSize: 20,
    marginTop: -5
  },

  label: {
    color: theme.colors.primary.darkGrey,
    position: "relative",
    left: 12,
    bottom: 34,
    paddingTop: 0,
    fontSize: 14,
    margin: 0,
    marginBottom: 6
  },

  menuItem: {
    color: theme.colors.primary.darkGrey,
    fontSize: 16
  },

  avatar: {
    fontSize: 5,
    height: 18,
    width: 18,
    right: 8
  }
});
