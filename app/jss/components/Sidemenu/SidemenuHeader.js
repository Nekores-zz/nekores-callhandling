export const styleSheet = theme => ({
  sidemenuHeaderTitleWrapper: {
    padding: '20px 0 0 20px'
  },
  sidemenuHeaderTitle: {
    ...theme.typography.headline,
    marginBottom: '18px'
  },
  subcategoryText: {
    ...theme.typography.subtitle,
    fontWeight: 500,
    '&.active': {
      color: theme.colors.primary.secondaryBlue
    }
  },
  iconActive: {
    fill: theme.colors.primary.secondaryBlue
  }
});