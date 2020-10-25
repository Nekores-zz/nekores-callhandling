
export const dividerStylesheet = (theme) => {
  let unit = 1;
  return {
    divider: {
      width: '100%',
      backgroundColor: theme.colors.primary.lightGrey,
      height: unit,
    },
    half: {
      height: .5 * unit,
    },
    single: {
      height: unit,
    },
    double: {
      height: 2 * unit,
    },
    light: {
      backgroundColor: theme.colors.primary.lightGrey,
    },
    dark: {
      backgroundColor: theme.colors.primary.black,
    },
  };
};
