export const styleSheet = theme => ({
  commonStyleColumnHead: {
    ...theme.typography.subtitle,
    height: 56,
    verticalAlign: "middle"
  },

  default: {
    backgroundColor: theme.colors.primary.white,
    color: theme.colors.primary.black
  },

  blueColumnHead: {
    color: theme.colors.primary.white,
    backgroundColor: theme.colors.primary.mainBlue
  },

  darkblueColumnHead: {
    color: theme.colors.primary.white,
    backgroundColor: theme.colors.primary.mainBlue
  }
});
