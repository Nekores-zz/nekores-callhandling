export const styleSheet = (theme) => ({
  option: {
    padding: 10,
    paddingLeft: 20,
    color: 'gray',
    cursor: 'pointer',
  },
  active: {
    color: theme.colors.primary.secondaryBlue,
    backgroundColor: theme.colors.primary.backgroundGrey,
  },
});