export const styleSheet = theme => ({
  container: {
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      boxSizing: 'border-box',
      paddingLeft: '12px'
    },
    flex: '1'
  },
  title: {
    ...theme.typography.headline,
    lineHeight: '28px',
    letterSpacing: '-0.009em'
  },
  subtitle: {
    ...theme.typography.secondaryBody,
    lineHeight: '28px'
  },
  icon: {
    alignSelf: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  }
});