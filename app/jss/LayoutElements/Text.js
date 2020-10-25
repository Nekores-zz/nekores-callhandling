export const styleSheet = theme => ({
  headline: {
    ...theme.typography.headline
  },

  modalHeader: {
    fontWeight: 500,
    fontSize: "20px"
    // color: theme.colors.primary.black
  },

  subtitle: {
    ...theme.typography.subtitle
  },

  sectionHeaders: {
    ...theme.typography.sectionHeaders,
    color: theme.colors.primary.black,
    fontWeight: "bold"
  },

  primaryBody: {
    lineHeight: 1.4,
    ...theme.typography.primaryBody
  },

  secondaryBody: {
    ...theme.typography.secondaryBody
  },

  third: {
    ...theme.typography.third
  },

  primarySmallBody: {
    ...theme.typography.primarySmallBody
  },

  secondarySmallBody: {
    ...theme.typography.secondarySmallBody
  },

  thirdSmall: {
    ...theme.typography.thirdSmall
  },

  thirdSmallOutlined: {
    ...theme.typography.thirdSmall,
    border: `1px solid ${theme.colors.primary.secondaryBlue}`,
    borderRadius: 2,
    padding: "0px 4px"
  },

  caption: {
    ...theme.typography.caption
  },

  errorMessage: {
    ...theme.typography.errorMessage
  },

  primaryWhite: {
    ...theme.typography.primaryBody,
    color: theme.colors.primary.white
  },

  primaryWhiteSmall: {
    ...theme.typography.primarySmallBody,
    color: theme.colors.primary.white
  },

  bold: {
    fontWeight: "bold"
  },

  block: {
    display: "block"
  },

  italic: {
    fontStyle: "italic"
  }
});

export const warningMessageStyleSheet = theme => ({
  flex: {
    flex: 1
  }
});
