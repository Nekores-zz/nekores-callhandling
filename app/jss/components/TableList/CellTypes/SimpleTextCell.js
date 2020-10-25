export const styleSheet = theme => ({
  simpleText: {
    ...theme.typography.subtitle,
    color: theme.colors.primary.darkGrey
  },
  darkGray: {
    color: theme.colors.primary.darkGrey,
  },
  rawText: {
    color: theme.colors.primary.mediumGrey,
    //whiteSpace: "nowrap",

    whiteSpace: "nowrap",
    overflow: "hidden",

    textOverflow: "ellipsis",
    width: "10em"
  }
});
