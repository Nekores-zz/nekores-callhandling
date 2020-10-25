export const stylesheet = (theme) => ({
  listHeader: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: theme.colors.primary.mainBlue,
    color: theme.colors.primary.white,
  },
  colorMain: {
    backgroundColor: theme.colors.primary.mainBlue,
  },
  colorSecondary: {
    backgroundColor: theme.colors.primary.secondaryBlue,
  },
});

export const dividerStylesheet = (theme) => ({
  divider: {
    width: 1,
    height: 36,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: theme.colors.primary.white,
    opacity: 0.4,
  },
});

export const inputStylesheet = (theme) => ({
  input: {
    color: theme.colors.primary.white,
  },
});

export const searchStylesheet = (theme) => ({
  icon: {
    color: theme.colors.primary.white,
    cursor: 'pointer',
  },
  iconDark: {
    color: theme.colors.primary.darkGrey,
    cursor: 'pointer',
  },
  input: {
    width: 0,
    flex: 1,
  },
  inputDark: {
    width: 0,
    flex: 1,
    color: theme.colors.primary.darkGrey
  },
});

export const buttonStylesheet = (theme) => ({
  button: {
    color: "currentColor",
    padding: '4px 16px',
  },

  border: {
    border: "1px solid currentColor",
  },

  nav: {
    textTransform: "none",
  },
});
