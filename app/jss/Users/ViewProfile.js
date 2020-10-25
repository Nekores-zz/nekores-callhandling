export const styleSheet = (theme) => ({
  pageContent: {
    flex: 1,
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      overflowX: 'hidden',
    },
  },
  paper: {
    margin: 32,
    padding: 32,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      overflowX: 'hidden',
    },
  },
  avatar: {
    width: 300,
    height: 300,
  },
  userName: {
    ...theme.typography.headline,
  },
  userJob: {
    ...theme.typography.primaryBody,
  },
  userFieldCaption: {
    ...theme.typography.secondarySmallBody,
  },
  userFieldText: {
    ...theme.typography.primaryBody,
  },
  sectionHeader: {
    ...theme.typography.sectionHeaders,
    color: theme.colors.primary.black,
    fontWeight: 'bold',
  },
  marginBottom: {
    marginBottom: 30,
  },
  marginBottomSmall: {
    marginBottom: 20,
  },
});